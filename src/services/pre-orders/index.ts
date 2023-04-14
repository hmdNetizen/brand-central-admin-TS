import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from "react-toastify";
import {
  initStateType,
  PreOrderedPayloadType,
  DeletePreOrderType,
} from "./PreOrderTypes";
import { ProductTypes } from "../products/ProductTypes";

type UserWishListUserIdTypes = {
  _id: string;
  companyName: string;
  companyEmail: string;
};

const initialState: initStateType = {
  loadingPreOrder: false,
  loadingPreOrderAction: false,
  preOrders: [],
  filteredPreOrders: [],
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
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPreOrders.pending, (state) => {
        state.loadingPreOrder = true;
      })
      .addCase(getAllPreOrders.fulfilled, (state, action) => {
        state.loadingPreOrder = false;
        state.preOrders = action.payload;
        state.error = null;
      })
      .addCase(getAllPreOrders.rejected, (state, action) => {
        state.loadingPreOrder = false;
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
