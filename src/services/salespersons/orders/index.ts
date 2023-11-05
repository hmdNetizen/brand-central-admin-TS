import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "src/config/config";
import axios from "src/services/axios";
import { QueryParams } from "src/services/types";
import {
  SalespersonOrderInitStateTypes,
  SalespersonOrdersPayloadTypes,
} from "./types";

const initialState: SalespersonOrderInitStateTypes = {
  loadingOrders: false,
  salespersonOrders: [],
  totalOrders: 0,
  error: null,
  singleOrder: null,
};

export const getSingleSalespersonOrders = createAsyncThunk(
  "get-single-salesperson-orders",
  async (details: QueryParams & { salespersonId: string }, thunkAPI) => {
    const { page, limit, salespersonId } = details;

    try {
      const { data } = await axios.get(
        config.salespersons.orders.getById(salespersonId),
        { params: { page, limit } }
      );

      const result = data as SalespersonOrdersPayloadTypes;

      return {
        orders: result.data.results,
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

const salespersonOrdersSlice = createSlice({
  name: "salespersonOrders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSingleSalespersonOrders.pending, (state, action) => {
        state.loadingOrders = true;
      })
      .addCase(getSingleSalespersonOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.salespersonOrders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.error = null;
      })
      .addCase(getSingleSalespersonOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

const {} = salespersonOrdersSlice.actions;
export default salespersonOrdersSlice.reducer;
