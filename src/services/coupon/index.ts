import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  InitStateType,
  BrandReturnedPayload,
  BrandReturnedPayloadType,
} from "./CouponTypes";

const initialState: InitStateType = {
  loading: false,
  coupons: [],
  error: null,
};

export const getAllCoupons = createAsyncThunk(
  "get-all-coupons",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/coupon-code`);
      const result = data as BrandReturnedPayloadType;

      return result.data.reverse();
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching coupons");
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default couponSlice.reducer;
