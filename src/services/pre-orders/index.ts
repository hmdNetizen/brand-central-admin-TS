import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { initStateType, PreOrderedPayloadType } from "./PreOrderTypes";

const initialState: initStateType = {
  loadingPreOrder: false,
  preOrders: [],
  error: null,
};

export const getPreOrders = createAsyncThunk(
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

const preorderSlice = createSlice({
  name: "pre-order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPreOrders.pending, (state) => {
        state.loadingPreOrder = true;
      })
      .addCase(getPreOrders.fulfilled, (state, action) => {
        state.loadingPreOrder = false;
        state.preOrders = action.payload;
        state.error = null;
      })
      .addCase(getPreOrders.rejected, (state, action) => {
        state.loadingPreOrder = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default preorderSlice.reducer;
