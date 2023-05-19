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
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/zip-code`);
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
  },
});

export const { setCurrentZipCode } = shippingSlice.actions;
export default shippingSlice.reducer;
