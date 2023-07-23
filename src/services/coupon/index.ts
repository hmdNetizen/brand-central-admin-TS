import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";
import axios from "../axios";
import {
  InitStateType,
  CouponReturnedPayload,
  CouponReturnedPayloadType,
  SingleCouponPayloadType,
  CouponRequestData,
  CouponReturnedPayloadTypes,
} from "./CouponTypes";

const initialState: InitStateType = {
  loading: false,
  loadingCouponActivation: false,
  loadingRequestAction: false,
  coupons: [],
  singleCoupon: null,
  total: 0,
  error: null,
};

export const getAllCoupons = createAsyncThunk(
  "get-all-coupons",
  async (query: { page: number; limit: number }, thunkAPI) => {
    const { page, limit } = query;
    try {
      const { data } = await axios.get(
        `/api/coupon-code/v1?page=${page}&limit=${limit}`
      );
      const result = data as CouponReturnedPayloadTypes;

      return {
        coupons: result.data.data,
        total: result.data.total,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching coupons"
        );
      }
    }
  }
);

export const getSearchedCoupon = createAsyncThunk(
  "get-searched-coupons",
  async (
    query: { page: number; limit: number; searchTerm: string },
    thunkAPI
  ) => {
    const { page, limit, searchTerm } = query;
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
    try {
      const { data } = await axios.get(
        `/api/coupon-code/v1?page=${page}&limit=${limit}${searchQuery}`
      );
      const result = data as CouponReturnedPayloadTypes;

      return {
        coupons: result.data.data,
        total: result.data.total,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching coupons"
        );
      }
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again."
        );
      }
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
        return thunkAPI.rejectWithValue(
          "Something went wrong. Please try again."
        );
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching coupons"
        );
      }
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "delete-coupon",
  async (
    details: {
      couponId: string;
      setOpenDeleteCoupon: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { couponId, setOpenDeleteCoupon } = details;
    try {
      const { status } = await axios.delete(
        `/api/coupon-code/delete/${couponId}`
      );

      if (status === 200) {
        setOpenDeleteCoupon(false);
      }

      return couponId;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Coupon could not be deleted.");
      }
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
        state.coupons = action.payload.coupons;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload.coupons;
      state.total = action.payload.total;
      state.error = null;
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
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.loadingRequestAction = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loadingRequestAction = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload
        );
        state.error = null;

        toast.error(`Coupon is successfully deleted`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loadingRequestAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCoupon } = couponSlice.actions;
export default couponSlice.reducer;
