import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateTypes,
  OrderNotificationPayloadType,
  PreOrderNotificationPayloadType,
  LowStockNotificationPayloadType,
  CustomerNotificationPayloadType,
} from "./NotificationTypes";

const initialState: initStateTypes = {
  orderNotifications: [],
  customerNotifications: [],
  lowStockNotifications: [],
  //   messagesNotifications: [],
  preOrderNotifications: [],
  loadingPreOrderNotification: false,
  loadingOrdersNotifications: false,
  loadingCustomerNotification: false,
  loadingLowStockNotifications: false,
  loadingMessagesNotifications: false,
  loadingNotificationAction: false,
  loadingPreorderNotification: false,
  error: null,
};

export const getOrdersNotifications = createAsyncThunk(
  "order-notification",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/notifications/new-order");
      const result = data as OrderNotificationPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while fetching notifications");
    }
  }
);

export const getLowStockNotifications = createAsyncThunk(
  "low-stock-notification",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/notifications/low-stock");
      const result = data as LowStockNotificationPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while fetching notifications");
    }
  }
);

export const getPreOrderNotifications = createAsyncThunk(
  "pre-order-notification",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/notifications/pre-order");
      const result = data as PreOrderNotificationPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while fetching notifications");
    }
  }
);

export const getCustomersNotifications = createAsyncThunk(
  "customers-notification",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/notifications/new-customer");
      const response = data as CustomerNotificationPayloadType;

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while fetching notifications");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersNotifications.pending, (state) => {
        state.loadingOrdersNotifications = true;
      })
      .addCase(getOrdersNotifications.fulfilled, (state, action) => {
        state.loadingOrdersNotifications = false;
        state.orderNotifications = action.payload;
        state.error = null;
      })
      .addCase(getOrdersNotifications.rejected, (state, action) => {
        state.loadingOrdersNotifications = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getLowStockNotifications.pending, (state) => {
        state.loadingLowStockNotifications = true;
      })
      .addCase(getLowStockNotifications.fulfilled, (state, action) => {
        state.loadingLowStockNotifications = false;
        state.lowStockNotifications = action.payload;
        state.error = null;
      })
      .addCase(getLowStockNotifications.rejected, (state, action) => {
        state.loadingLowStockNotifications = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getPreOrderNotifications.pending, (state) => {
        state.loadingPreOrderNotification = true;
      })
      .addCase(getPreOrderNotifications.fulfilled, (state, action) => {
        state.loadingPreorderNotification = false;
        state.preOrderNotifications = action.payload;
        state.error = null;
      })
      .addCase(getPreOrderNotifications.rejected, (state, action) => {
        state.loadingPreOrderNotification = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getCustomersNotifications.pending, (state) => {
        state.loadingCustomerNotification = true;
      })
      .addCase(getCustomersNotifications.fulfilled, (state, action) => {
        state.loadingCustomerNotification = false;
        state.customerNotifications = action.payload;
        state.error = null;
      })
      .addCase(getCustomersNotifications.rejected, (state, action) => {
        state.loadingCustomerNotification = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default notificationSlice.reducer;
