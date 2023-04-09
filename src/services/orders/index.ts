import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initStateType } from "./OrderTypes";

const initialState: initStateType = {
  loadingOrders: false,
  completedOrders: [],
  recentOrders: [],
  lastThirtyDaysSale: 0,
  totalSales: 0,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default ordersSlice.reducer;
