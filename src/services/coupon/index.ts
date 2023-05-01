import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitStateType, BrandReturnedPayload } from "./CouponTypes";

const initialState: InitStateType = {
  loading: false,
  coupons: [],
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default couponSlice.reducer;
