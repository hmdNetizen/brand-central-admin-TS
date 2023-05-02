import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../axios";
import {
  InitStateType,
  CouponReturnedPayload,
  CouponReturnedPayloadType,
  SingleCouponPayloadType,
} from "./CouponTypes";

const initialState: InitStateType = {
  loading: false,
  loadingActivation: false,
  loadingRequestAction: false,
  coupons: [],
  singleCoupon: null,
  error: null,
};

export const getAllCoupons = createAsyncThunk(
  "get-all-coupons",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/coupon-code`);
      const result = data as CouponReturnedPayloadType;

      return result.data.reverse();
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching coupons");
    }
  }
);

export const toggleCouponActivation = createAsyncThunk(
  "toggle-coupon-activation",
  async (details: { couponId: string; isActive: boolean }, thunkAPI) => {
    const { couponId, isActive } = details;
    try {
      const { data } = await axios.patch(
        `/api/coupon-code/toggle/${couponId}`,
        { isActive }
      );
      const result = data as SingleCouponPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCurrentCoupon: (state, action: PayloadAction<CouponReturnedPayload>) => {
      state.singleCoupon = action.payload;
    },
  },
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
    builder
      .addCase(toggleCouponActivation.pending, (state) => {
        state.loadingActivation = true;
      })
      .addCase(toggleCouponActivation.fulfilled, (state, action) => {
        state.loadingActivation = false;
        state.coupons = state.coupons.map((coupon) =>
          coupon._id === action.payload._id
            ? { ...coupon, isActive: action.payload.isActive }
            : coupon
        );
        state.error = null;

        if (action.payload.isActive) {
          toast.success(`${action.payload.couponCode} has been activated`, {
            position: "top-center",
            hideProgressBar: true,
          });
        } else {
          toast.error(`${action.payload.couponCode} has been deactivated`, {
            position: "top-center",
            hideProgressBar: true,
          });
        }
      })
      .addCase(toggleCouponActivation.rejected, (state, action) => {
        state.loadingActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCoupon } = couponSlice.actions;
export default couponSlice.reducer;
