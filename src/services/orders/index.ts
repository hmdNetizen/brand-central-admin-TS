import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateType,
  RecentOrdersPayloadType,
  RecentSalesPayloadType,
  OrdersCountReturnedPayload,
  OrderReturnedPayload,
  SendEmailProps,
  SingleOrderPayloadType,
} from "./OrderTypes";

const initialState: initStateType = {
  loadingOrders: false,
  orders: [],
  completedOrders: [],
  recentOrders: [],
  pendingOrdersCount: 0,
  processingOrdersCount: 0,
  completedOrdersCount: 0,
  lastThirtyDaysSale: 0,
  totalSales: 0,
  loadingSingleOrder: false,
  singleOrder: null,
  sendingEmail: false,
  emailSuccess: "",
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

export const getOrdersCount = createAsyncThunk(
  "orders-count",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/orders/count");

      const result = data as OrdersCountReturnedPayload;

      return {
        processingOrders: result.data.processing,
        pendingOrders: result.data.pending,
        completedOrders: result.data.completed,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occured while fetching orders");
    }
  }
);

export const sendOrderStatusEmail = createAsyncThunk(
  "send-email",
  async (details: SendEmailProps, thunkAPI) => {
    const { setOpen, ...fields } = details;

    try {
      const { status } = await axios.post(`/api/messages`, fields);

      if (status === 200) setOpen(false);

      return fields;
    } catch (error) {
      return thunkAPI.rejectWithValue("Email could not be sent");
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "single-order",
  async (orderId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      const result = data as SingleOrderPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Order could not be retrieved");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<OrderReturnedPayload>) => {
      state.singleOrder = action.payload;
    },
  },
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
    builder.addCase(getOrdersCount.fulfilled, (state, action) => {
      state.completedOrdersCount = action.payload.completedOrders;
      state.pendingOrdersCount = action.payload.pendingOrders;
      state.processingOrdersCount = action.payload.processingOrders;
    });
    builder
      .addCase(sendOrderStatusEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendOrderStatusEmail.fulfilled, (state, action) => {
        state.sendingEmail = false;
        state.emailSuccess = "Email Sent";
        state.error = null;
      })
      .addCase(sendOrderStatusEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSuccess = "";
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.loadingSingleOrder = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loadingSingleOrder = false;
        state.singleOrder = action.payload;
        state.error = null;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loadingSingleOrder = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
