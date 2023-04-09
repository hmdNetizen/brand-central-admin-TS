import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateType,
  RecentOrdersPayloadType,
  RecentSalesPayloadType,
} from "./OrderTypes";

const initialState: initStateType = {
  loadingOrders: false,
  completedOrders: [],
  recentOrders: [],
  lastThirtyDaysSale: 0,
  totalSales: 0,
  error: null,
};

export const getRecentSales = createAsyncThunk(
  "recent-sales",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/orders/completed/recent");
      const result = data as RecentSalesPayloadType;

      return {
        totalSales: result.data.total,
        lastThirtyDays: result.data.lastThirtyDays,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching sales");
    }
  }
);

export const getRecentOrders = createAsyncThunk(
  "recent-orders",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/orders/recent");
      const result = data as RecentOrdersPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching orders");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRecentSales.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getRecentSales.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.lastThirtyDaysSale = action.payload.lastThirtyDays;
        state.totalSales = action.payload.totalSales;
        state.error = null;
      })
      .addCase(getRecentSales.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getRecentOrders.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.recentOrders = action.payload;
        state.error = null;
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default ordersSlice.reducer;
