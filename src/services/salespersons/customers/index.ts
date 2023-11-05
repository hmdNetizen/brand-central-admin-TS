import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "src/config/config";
import axios from "src/services/axios";
import { QueryParams } from "src/services/types";
import { InitStateTypes, SalespersonCustomerPayloadTypes } from "./types";

const initialState: InitStateTypes = {
  loadingSalespersonCustomers: false,
  salespersonCustomers: [],
  totalCustomers: 0,
  error: null,
};

type QueryTypes = QueryParams & { salespersonId: string };

export const getSingleSalespersonCustomers = createAsyncThunk(
  "get-single-salesperson-customers",
  async (details: QueryParams & { salespersonId: string }, thunkAPI) => {
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
  reducers: {},
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
  },
});

export const {} = salespersonCustomerSlice.actions;
export default salespersonCustomerSlice.reducer;
