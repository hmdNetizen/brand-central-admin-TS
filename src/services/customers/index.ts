import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateTypes,
  CustomerExcerptPayloadType,
  SingleCustomerPayloadType,
  AllCustomersPayloadType,
  PaginatedCustomersQueryType,
} from "./CustomerTypes";
import { UserProfileReturnedPayload } from "../user/UserTypes";

const initialState: initStateTypes = {
  loadingCustomers: false,
  customers: [],
  recentCustomers: [],
  numberOfCustomersInThirtyDays: 0,
  totalCustomers: 0,
  loadingSingleCustomer: false,
  singleCustomer: null,
  error: null,
};

export const getAllCustomers = createAsyncThunk(
  "all-customers",
  async (details: PaginatedCustomersQueryType, thunkAPI) => {
    try {
      const { page, limit } = details;
      const { data } = await axios.get(
        `/api/customers?page=${page}&limit=${limit}`
      );
      const result = data as AllCustomersPayloadType;

      return {
        customers: result.data.customers,
        totalCustomers: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

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

export const getSingleCustomer = createAsyncThunk(
  "single-customer",
  async (customerId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/customers/${customerId}`);
      const result = data as SingleCustomerPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching customer data"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCurrentCustomer: (
      state,
      action: PayloadAction<UserProfileReturnedPayload>
    ) => {
      state.singleCustomer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.loadingCustomers = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loadingCustomers = false;
        state.customers = action.payload.customers;
        state.totalCustomers = action.payload.totalCustomers;
        state.error = null;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loadingCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
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
    builder
      .addCase(getSingleCustomer.pending, (state) => {
        state.loadingSingleCustomer = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.loadingSingleCustomer = false;
        state.singleCustomer = action.payload;
        state.error = null;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.loadingSingleCustomer = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCustomer } = customerSlice.actions;
export default customerSlice.reducer;
