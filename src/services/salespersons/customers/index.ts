import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { config } from "src/config/config";
import axios from "src/services/axios";
import { QueryParams } from "src/services/types";
import {
  InitStateTypes,
  SalespersonCustomerPayloadTypes,
  SalespersonCustomerResponsePayload,
} from "./types";

const initialState: InitStateTypes = {
  loadingSalespersonCustomers: false,
  salespersonCustomers: [],
  singleSalespersonCustomer: null,
  totalCustomers: 0,
  error: null,
};

type QueryTypes = QueryParams & { salespersonId: string };

export const getSalespeopleCustomers = createAsyncThunk(
  "get-salespeople-customers",
  async (details: QueryParams, thunkAPI) => {
    const { limit, page } = details;
    try {
      const { data } = await axios.get(config.salespersons.customers.get, {
        params: { page, limit },
      });
      const results = data as SalespersonCustomerPayloadTypes;

      return {
        customers: results.data.results,
        total: results.data.total,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const getSingleSalespersonCustomers = createAsyncThunk(
  "get-single-salesperson-customers",
  async (details: QueryTypes, thunkAPI) => {
    const { page, limit, salespersonId } = details;
    try {
      const { data } = await axios.get(
        config.salespersons.customers.getById(salespersonId),
        {
          params: {
            page,
            limit,
          },
        }
      );

      const result = data as SalespersonCustomerPayloadTypes;

      return {
        customers: result.data.results,
        total: result.data.total,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

const salespersonCustomerSlice = createSlice({
  name: "salespersonCustomers",
  initialState,
  reducers: {
    setCurrentSalespeopleCustomer: (
      state,
      action: PayloadAction<SalespersonCustomerResponsePayload>
    ) => {
      state.singleSalespersonCustomer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSingleSalespersonCustomers.pending, (state, action) => {
        state.loadingSalespersonCustomers = true;
      })
      .addCase(getSingleSalespersonCustomers.fulfilled, (state, action) => {
        state.loadingSalespersonCustomers = false;
        state.salespersonCustomers = action.payload.customers;
        state.totalCustomers = action.payload.total;
        state.error = null;
      })
      .addCase(getSingleSalespersonCustomers.rejected, (state, action) => {
        state.loadingSalespersonCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSalespeopleCustomers.pending, (state) => {
        state.loadingSalespersonCustomers = true;
      })
      .addCase(getSalespeopleCustomers.fulfilled, (state, action) => {
        state.loadingSalespersonCustomers = false;
        state.salespersonCustomers = action.payload.customers;
        state.totalCustomers = action.payload.total;
        state.error = null;
      })
      .addCase(getSalespeopleCustomers.rejected, (state, action) => {
        state.loadingSalespersonCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentSalespeopleCustomer } =
  salespersonCustomerSlice.actions;
export default salespersonCustomerSlice.reducer;
