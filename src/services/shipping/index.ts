import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ZipCodeReturnedPayload,
  ZipCodeReturnedPayloadTypes,
} from "./ShoppingTypes";
import { initStateType } from "./ShoppingTypes";
import axios from "../axios";
import { AxiosError } from "axios";
import React from "react";

const initialState: initStateType = {
  loading: false,
  loadingZipCodeAction: false,
  zipCodes: [],
  total: 0,
  singleZipCode: null,
  error: null,
};

export const getShippingZipCodes = createAsyncThunk(
  "shipping/get-shipping-zipCodes",
  async (query: { page: number; limit: number }, thunkAPI) => {
    const { page, limit } = query;
    try {
      const { data } = await axios.get(
        `/api/zip-code/v1?page=${page}&limit=${limit}`
      );
      const result = data as ZipCodeReturnedPayloadTypes;

      return {
        zipCodes: result.data.data,
        total: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching zip codes");
    }
  }
);

export const getSearchedZipCodes = createAsyncThunk(
  "searched/shipping-zipCodes",
  async (
    query: { page: number; limit: number; searchTerm?: string },
    thunkAPI
  ) => {
    const { page, limit, searchTerm } = query;
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
    try {
      const { data } = await axios.get(
        `/api/zip-code/v1?page=${page}&limit=${limit}${searchQuery}`
      );
      const result = data as ZipCodeReturnedPayloadTypes;

      return {
        zipCodes: result.data.data,
        total: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching zip codes");
    }
  }
);

export const addShippingZipCodes = createAsyncThunk(
  "shipping/addShippingZipCodes",
  async (
    details: {
      zipCode: string;
      setZipCode: React.Dispatch<React.SetStateAction<string>>;
      setOpenZipCode: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { setOpenZipCode, setZipCode, zipCode } = details;
    try {
      const { data, status } = await axios.post(`/api/zip-code`, { zipCode });
      const result = data as { data: ZipCodeReturnedPayload };

      if (status === 200) {
        setOpenZipCode(false);
        setZipCode("");
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

export const updateShippingZipCodes = createAsyncThunk(
  "shipping/updateShippingZipCodes",
  async (
    details: {
      zipId: string;
      zipCode: string;
      setZipCode: React.Dispatch<React.SetStateAction<string>>;
      setOpenZipCode: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { setOpenZipCode, setZipCode, zipId, zipCode } = details;
    try {
      const { data, status } = await axios.put(`/api/zip-code/${zipId}`, {
        zipCode,
      });
      const result = data as { data: ZipCodeReturnedPayload };

      if (status === 200) {
        setOpenZipCode(false);
        setZipCode("");
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

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setCurrentZipCode: (
      state,
      action: PayloadAction<ZipCodeReturnedPayload>
    ) => {
      state.singleZipCode = action.payload;
    },
    clearZipCodeError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getShippingZipCodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShippingZipCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.zipCodes = action.payload.zipCodes;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(getShippingZipCodes.rejected, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getSearchedZipCodes.fulfilled, (state, action) => {
      state.loading = false;
      state.zipCodes = action.payload.zipCodes;
      state.total = action.payload.total;
      state.error = null;
    });
    builder
      .addCase(addShippingZipCodes.pending, (state) => {
        state.loadingZipCodeAction = true;
      })
      .addCase(addShippingZipCodes.fulfilled, (state, action) => {
        state.loadingZipCodeAction = false;
        state.zipCodes = [action.payload, ...state.zipCodes];
        state.error = null;
      })
      .addCase(addShippingZipCodes.rejected, (state, action) => {
        state.loadingZipCodeAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateShippingZipCodes.pending, (state) => {
        state.loadingZipCodeAction = true;
      })
      .addCase(updateShippingZipCodes.fulfilled, (state, action) => {
        state.loadingZipCodeAction = false;
        state.zipCodes = [action.payload, ...state.zipCodes];
        state.error = null;
      })
      .addCase(updateShippingZipCodes.rejected, (state, action) => {
        state.loadingZipCodeAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentZipCode, clearZipCodeError } = shippingSlice.actions;
export default shippingSlice.reducer;
