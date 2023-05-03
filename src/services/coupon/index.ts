import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axios from "../axios";
import {
  InitStateType,
  CouponReturnedPayload,
  CouponReturnedPayloadType,
  SingleCouponPayloadType,
  CouponRequestData,
} from "./CouponTypes";

const initialState: InitStateType = {
  loading: false,
  loadingCouponActivation: false,
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

export const addNewCoupon = createAsyncThunk(
  "add-new-coupon",
  async (details: CouponRequestData, thunkAPI) => {
    const { setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.post(`/api/coupon-code`, fields);
      const result = data as SingleCouponPayloadType;

      if (status === 201) {
        setOpen(false);
      }

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "update-coupon",
  async (details: CouponRequestData, thunkAPI) => {
    const { couponId, setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.patch(
        `/api/coupon-code/update/${couponId}`,
        fields
      );
      const result = data as SingleCouponPayloadType;

      if (status === 200) {
        setOpen(false);
      }

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error Adding Coupon");
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
        state.loadingCouponActivation = true;
      })
      .addCase(toggleCouponActivation.fulfilled, (state, action) => {
        state.loadingCouponActivation = false;
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
        state.loadingCouponActivation = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(addNewCoupon.pending, (state, action) => {
        state.loadingRequestAction = true;
      })
      .addCase(addNewCoupon.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.coupons = [action.payload, ...state.coupons];

        toast.success(`${action.payload?.couponCode} added successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });

        state.error = null;
      })
      .addCase(addNewCoupon.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateCoupon.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.coupons = state.coupons.map((coupon) =>
          coupon._id === action.payload._id
            ? { ...coupon, ...action.payload }
            : coupon
        );

        toast.success(`${action.payload?.couponCode} updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });

        state.error = null;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCoupon } = couponSlice.actions;
export default couponSlice.reducer;
