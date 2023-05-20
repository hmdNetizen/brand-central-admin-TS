import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ZipCodeReturnedPayload,
  ZipCodeReturnedPayloadTypes,
} from "./ShoppingTypes";
import { initStateType } from "./ShoppingTypes";
import axios from "../axios";

const initialState: initStateType = {
  loading: false,
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
  },
});

export const { setCurrentZipCode } = shippingSlice.actions;
export default shippingSlice.reducer;
