import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  initStateType,
  PreOrderedPayloadType,
  DeletePreOrderType,
  UpdateStockType,
  CustomerListDataType,
  PreOrderMultiplesRequestType,
} from "./PreOrderTypes";
import { ProductTypes } from "../products/ProductTypes";
import { AxiosError } from "axios";
import { logout } from "../auth";

type UserWishListUserIdTypes = {
  _id: string;
  companyName: string;
  companyEmail: string;
};

type ProductListDataType = {
  customerData: CustomerListDataType[] | CustomerListDataType;
  productData: ProductTypes[];
};

const initialState: initStateType = {
  loadingPreOrders: false,
  loadingPreOrderAction: false,
  preOrders: [],
  filteredPreOrders: [],
  preOrdersUpdatedStock: [],
  filteredUpdatedStock: [],
  singlePreOrder: null,
  singleUpdatedStock: null,
  error: null,
};

export const getAllPreOrders = createAsyncThunk(
  "pre-orders",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/wishlist");
      const result = data as PreOrderedPayloadType;

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        if (
          error.response.data.error ===
          "You are not authorized to perform this action"
        ) {
          thunkAPI.dispatch(logout());
          return thunkAPI.rejectWithValue(error.response.data.error);
        } else {
          return thunkAPI.rejectWithValue(error.response.data.error);
        }
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching preorders."
        );
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while deleting preorder"
        );
      }
    }
  }
);

export const updatePreOrderMultiples = createAsyncThunk(
  "update-preorder",
  async (details: PreOrderMultiplesRequestType, thunkAPI) => {
    const { productId, isNotified, addedBy, itemId } = details;
    try {
      await axios.put(`/api/wishlist/update/multiple`, {
        productId,
        isNotified,
        addedBy,
      });

      return itemId;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while updating pre-order"
        );
      }
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
    getUpdatedStock: (state, action: PayloadAction<UpdateStockType[]>) => {
      state.filteredUpdatedStock = action.payload;
    },
    setSingleUpdatedStock: (state, action: PayloadAction<UpdateStockType>) => {
      state.singleUpdatedStock = action.payload;
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
      const preOrderData = [...action.payload.preOrderData];

      /* Finds all wishlist items whose current stock is atleast 2 for 
     non-multiples and 12 for multiples("EA" units)  */

      const sanitizePreOrder = preOrderData.map((preOrder) => {
        // Find index of the preordered item in the products array
        const productIndex = products.findIndex(
          (product) => product._id === preOrder._id
        );

        const currentProduct = products[productIndex];

        // Checks if the index of the product exist and that the stock is
        // atleast 2 if the unit is not EA And 2 if it is not EA

        if (currentProduct) {
          if (
            (currentProduct.units === "EA" &&
              currentProduct.productStock >= 12) ||
            (currentProduct.units !== "EA" && currentProduct.productStock >= 2)
          ) {
            return preOrder;
          } else {
            return null;
          }
        }
      });

      /* - FIrst of all filter out the nullish values and then returns all wishlists that has
       - isNotified property in the userWishList array set to false.
       - isNotified is used to track the notification that has been either ignored or fulfilled via
         email sent to customer.
      */
      let productsInStock: ProductTypes[] = [];

      if (sanitizePreOrder) {
        sanitizePreOrder.filter((item): ProductTypes | undefined => {
          if (item) {
            productsInStock.push(item);
            return item;
          }
        });
      }

      productsInStock = productsInStock.filter((newPreOrder) => {
        const itemCopy = { ...newPreOrder };

        itemCopy.userWishList = itemCopy.userWishList.filter(
          (wishlist) => !wishlist.isNotified
        );

        if (itemCopy.userWishList.length > 0) {
          return itemCopy;
        }
      });

      const emailList: string[] = [];

      for (let i = 0; i < productsInStock.length; i++) {
        productsInStock[i].userWishList.forEach((wishlist) =>
          emailList.push(wishlist.userId.companyEmail)
        );
      }

      // Returns unique email from the email list
      const uniqueEmails = emailList.filter(
        (email, index, self) => self.indexOf(email) === index
      );

      const productsList: ProductListDataType[] = [];

      productsInStock.forEach((product, index, self) => {
        if (product.userWishList.length > 1) {
          const preOrderData = {
            customerData: product.userWishList.map((wishlist) => ({
              companyEmail: wishlist.userId.companyEmail,
              companyName: wishlist.userId.companyName,
              id: wishlist.userId._id,
            })),
            productData: [product],
          };

          productsList.push(preOrderData);
        } else {
          const emailIndex = uniqueEmails.findIndex(
            (email) => email === product.userWishList[0].userId.companyEmail
          );

          const newProductsInStock = {
            customerData: {
              id: product.userWishList[0].userId._id,
              companyEmail: product.userWishList[0].userId.companyEmail,
              companyName: product.userWishList[0].userId.companyName,
            },
            productData: self.filter(
              (product) =>
                product.userWishList.length < 2 &&
                product.userWishList[0].userId.companyEmail ===
                  uniqueEmails[emailIndex]
            ),
          };

          productsList.push(newProductsInStock);
        }
      });

      const results = productsList
        .filter((item, index, self) => {
          if (Array.isArray(item.customerData)) {
            return item;
          } else {
            return (
              self.findIndex(
                (newItem) =>
                  // @ts-ignore
                  newItem.customerData.id === item.customerData.id &&
                  // @ts-ignore
                  newItem.customerData.companyEmail ===
                    // @ts-ignore
                    item.customerData.companyEmail
              ) === index
            );
          }
        })
        .map((product) => ({
          id: uuidv4(),
          ...product,
        }));

      state.preOrdersUpdatedStock = results;
    },
    handleFilteredUpdatedStock: (
      state,
      action: PayloadAction<{
        text: string;
        updatedPreOrderData: UpdateStockType[];
      }>
    ) => {
      const keys = ["companyEmail", "companyName"];

      type CustomerListExcerptType = Pick<
        CustomerListDataType,
        "companyEmail" | "companyName"
      >;

      if (action.payload.text) {
        const newUpdatedPreOrder = [
          ...action.payload.updatedPreOrderData,
        ].filter((item) => {
          const itemCopy: ProductListDataType = { ...item };
          if (Array.isArray(itemCopy.customerData)) {
            return itemCopy.customerData.filter((customer) =>
              keys.some((key) =>
                customer[key as keyof CustomerListExcerptType]
                  .toLowerCase()
                  .includes(action.payload.text.toLowerCase())
              )
            );
          } else {
            return keys.some(
              (key) =>
                !Array.isArray(itemCopy.customerData) &&
                itemCopy.customerData[key as keyof CustomerListExcerptType]
                  .toLowerCase()
                  .includes(action.payload.text.toLowerCase())
            );
          }
        });

        state.filteredUpdatedStock = newUpdatedPreOrder;
      } else {
        state.filteredUpdatedStock = state.preOrdersUpdatedStock;
      }
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
    builder
      .addCase(updatePreOrderMultiples.pending, (state) => {
        state.loadingPreOrderAction = true;
      })
      .addCase(updatePreOrderMultiples.fulfilled, (state, action) => {
        state.loadingPreOrderAction = false;
        state.preOrdersUpdatedStock = state.preOrdersUpdatedStock.filter(
          (item) => item.id !== action.payload
        );
        state.error = null;
      })
      .addCase(updatePreOrderMultiples.rejected, (state, action) => {
        state.loadingPreOrderAction = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;

          toast.error(action.payload, {
            position: "top-center",
            hideProgressBar: true,
          });
        }
      });
  },
});

export const {
  setCurrentPreOrder,
  getPreOrderData,
  handleFilteredPreOrdersData,
  showAvailableStockForPreOrders,
  getUpdatedStock,
  handleFilteredUpdatedStock,
  setSingleUpdatedStock,
} = preorderSlice.actions;
export default preorderSlice.reducer;
