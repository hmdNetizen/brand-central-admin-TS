import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateTypes,
  CustomerPayloadType,
  CustomerExcerptPayloadType,
} from "./CustomerTypes";

const initialState: initStateTypes = {
  loadingCustomers: false,
  customers: [],
  recentCustomers: [],
  numberOfCustomersInThirtyDays: 0,
  totalCustomers: 0,
  error: null,
};

export const getRecentCustomers = createAsyncThunk(
  "get-customers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/customers/recent");
      const result = data as CustomerExcerptPayloadType;

      return {
        data: result.data.data,
        lastThirtyDays: result.data.lastThirtyDays,
        totalCustomers: result.data.totalCustomers,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching customers"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRecentCustomers.pending, (state) => {
        state.loadingCustomers = true;
      })
      .addCase(getRecentCustomers.fulfilled, (state, action) => {
        state.loadingCustomers = false;
        state.recentCustomers = action.payload.data;
        state.numberOfCustomersInThirtyDays = action.payload.lastThirtyDays;
        state.totalCustomers = action.payload.totalCustomers;
      })
      .addCase(getRecentCustomers.rejected, (state, action) => {
        state.loadingCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default customerSlice.reducer;
