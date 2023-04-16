import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  initStateType,
  PreOrderedPayloadType,
  DeletePreOrderType,
  UpdateStockType,
} from "./PreOrderTypes";
import { ProductTypes } from "../products/ProductTypes";

type UserWishListUserIdTypes = {
  _id: string;
  companyName: string;
  companyEmail: string;
};

const initialState: initStateType = {
  loadingPreOrders: false,
  loadingPreOrderAction: false,
  preOrders: [],
  filteredPreOrders: [],
  preOrdersUpdatedStock: [],
  singlePreOrder: null,
  error: null,
};

export const getAllPreOrders = createAsyncThunk(
  "pre-orders",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/wishlist");
      const result = data as PreOrderedPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching pre-orders"
      );
    }
  }
);

export const deletePreOrder = createAsyncThunk(
  "delete-preorder",
  async (details: DeletePreOrderType, thunkAPI) => {
    const { preOrderId, setOpenDeletePreOrder } = details;
    try {
      const { status } = await axios.delete(
        `/api/wishlist/admin/${preOrderId}`
      );

      if (status === 200) {
        setOpenDeletePreOrder(false);
      }

      return preOrderId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const preorderSlice = createSlice({
  name: "pre-order",
  initialState,
  reducers: {
    setCurrentPreOrder: (state, action: PayloadAction<ProductTypes>) => {
      state.singlePreOrder = action.payload;
    },
    getPreOrderData: (state, action: PayloadAction<ProductTypes[]>) => {
      state.filteredPreOrders = action.payload;
    },
    handleFilteredPreOrdersData: (
      state,
      action: PayloadAction<{ text: string; preOrderData: ProductTypes[] }>
    ) => {
      const keys = ["companyEmail", "companyName"];
      if (action.payload.text) {
        let newPreOrder = [...action.payload.preOrderData]
          .filter((element) =>
            element.userWishList.some((subElement) =>
              keys.some((key) =>
                subElement.userId[key as keyof UserWishListUserIdTypes]
                  .toLowerCase()
                  .includes(action.payload.text.toLowerCase())
              )
            )
          )
          .map((element) => {
            return {
              ...element,
              userWishList: element.userWishList.filter((subElement) =>
                keys.some((key) =>
                  subElement.userId[key as keyof UserWishListUserIdTypes]
                    .toLowerCase()
                    .includes(action.payload.text.toLowerCase())
                )
              ),
            };
          });

        state.filteredPreOrders = newPreOrder;
      } else {
        state.filteredPreOrders = action.payload.preOrderData;
      }
    },
    showAvailableStockForPreOrders: (
      state,
      action: PayloadAction<{
        productData: ProductTypes[];
        preOrderData: ProductTypes[];
      }>
    ) => {
      const products = [...action.payload.productData];
      const preOrders = [...action.payload.preOrderData];

      // Finds all wishlist items whose current stock is atleast 2 for non-multiples and 12 for multiples("EA" units)
      const sanitzePreOrders = preOrders.map((preOrder) => {
        // Find index of the preordered item in the products array
        const productIndex = products.findIndex(
          (product) => product._id === preOrder._id
        );

        const currentProduct = products[productIndex];

        // Checks if the index of the product exist and that the stock is
        // atleast 2 if the unit is not EA And 2 if it is not EA
        if (
          productIndex !== -1 &&
          ((currentProduct.units === "EA" &&
            currentProduct.productStock >= 12) ||
            (currentProduct.units !== "EA" && currentProduct.productStock >= 2))
        ) {
          return preOrder;
        }
      });

      // FIrst of all filter out the null values and then returns all wishlists that has
      // isNotified property in the userWishList array set to false.
      // isNotified is used to track the notification that has been either ignored or fulfilled via
      // email sent to customer.
      const productsInStock = sanitzePreOrders
        .filter((item) => item !== null)
        // eslint-disable-next-line
        .filter((newPreOrder) => {
          const itemCopy = { ...newPreOrder };
          itemCopy.userWishList = itemCopy.userWishList?.filter(
            (wishlist) => !wishlist.isNotified
          );
          if (itemCopy?.userWishList?.length! > 0) {
            return itemCopy;
          }
        });

      const emailList: string[] = [];
      productsInStock.forEach((item) => {
        return item?.userWishList.map((wishlist) =>
          emailList.push(wishlist.userId.companyEmail)
        );
      });

      // Returns unique email from the email list
      const uniqueEmails = emailList.filter(
        (email, index, self) => self.indexOf(email) === index
      );

      type ProductListType = {
        customerData:
          | {
              id: string;
              companyEmail: string;
              companyName: string;
            }[]
          | undefined;
        productData: ProductTypes[];
      };

      const productList: ProductListType[] = [];

      productsInStock.forEach((product, index, self) => {
        if (product?.userWishList?.length! > 1) {
          const productData = {
            customerData: product?.userWishList.map((wishlist) => ({
              companyEmail: wishlist.userId.companyEmail,
              companyName: wishlist.userId.companyName,
              id: wishlist.userId._id,
            })),
            productData: [product],
          };

          productList.push(productData);
        } else {
          const emailIndex = uniqueEmails.findIndex(
            (email) => email === product?.userWishList[0].userId.companyEmail
          );

          const newProductsInStock = {
            customerData: {
              id: product?.userWishList[0].userId._id,
              companyEmail: product?.userWishList[0].userId.companyEmail,
              companyName: product?.userWishList[0].userId.companyName,
            },
            productData: self.filter(
              (product) =>
                Array.isArray(product?.userWishList) &&
                product?.userWishList?.length! < 2 &&
                product?.userWishList[0].userId.companyEmail ===
                  uniqueEmails[emailIndex]
            ),
          };

          productList.push(newProductsInStock);
        }
      });

      const result = productList
        .filter((item, index, self) => {
          if (Array.isArray(item.customerData)) {
            return item;
          } else {
            return (
              self.findIndex(
                (newItem) =>
                  newItem.customerData.id === item.customerData.id &&
                  newItem.customerData.companyEmail ===
                    item.customerData.companyEmail
              ) === index
            );
          }
        })
        .map((product) => ({
          id: uuidv4(),
          ...product,
        }));

      state.preOrdersUpdatedStock = result;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPreOrders.pending, (state) => {
        state.loadingPreOrders = true;
      })
      .addCase(getAllPreOrders.fulfilled, (state, action) => {
        state.loadingPreOrders = false;
        state.preOrders = action.payload;
        state.error = null;
      })
      .addCase(getAllPreOrders.rejected, (state, action) => {
        state.loadingPreOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deletePreOrder.pending, (state) => {
        state.loadingPreOrderAction = true;
      })
      .addCase(deletePreOrder.fulfilled, (state, action) => {
        state.loadingPreOrderAction = false;
        state.preOrders = state.preOrders.filter(
          (preorder) => preorder._id !== action.payload
        );
        state.error = null;

        toast.success("Pre-order successfully deleted", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deletePreOrder.rejected, (state, action) => {
        state.loadingPreOrderAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const {
  setCurrentPreOrder,
  getPreOrderData,
  handleFilteredPreOrdersData,
} = preorderSlice.actions;
export default preorderSlice.reducer;
