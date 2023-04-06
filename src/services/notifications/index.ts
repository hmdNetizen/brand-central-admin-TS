import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateTypes,
  OrderNotificationPayloadType,
  PreOrderNotificationPayloadType,
  LowStockNotificationPayloadType,
  CustomerNotificationPayloadType,
  MessagesNotificationPayloadType,
  OrderNotificationReturnedData,
  CustomerNotificationReturnedData,
} from "./NotificationTypes";

const initialState: initStateTypes = {
  orderNotifications: [],
  customerNotifications: [],
  lowStockNotifications: [],
  messagesNotifications: [],
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

export const markOrdersNotificationsAsRead = createAsyncThunk(
  "mark-order-as-read",
  async (orderId: string, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/notifications/new-order/${orderId}`
      );
      const result = data as OrderNotificationReturnedData;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while updating notification");
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

export const markCustomerNotificationsAsRead = createAsyncThunk(
  "mark-customer-as-read",
  async (customerId: string, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/notifications/new-customer/${customerId}`
      );
      const result = data as CustomerNotificationReturnedData;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while updating notification");
    }
  }
);

export const getMessagesNotifications = createAsyncThunk(
  "messages-notification",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/contact");
      const result = data as MessagesNotificationPayloadType;

      return result.data.data;
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
    builder
      .addCase(getMessagesNotifications.pending, (state) => {
        state.loadingMessagesNotifications = true;
      })
      .addCase(getMessagesNotifications.fulfilled, (state, action) => {
        state.loadingMessagesNotifications = false;
        state.messagesNotifications = action.payload;
        state.error = null;
      })
      .addCase(getMessagesNotifications.rejected, (state, action) => {
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(markOrdersNotificationsAsRead.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(markOrdersNotificationsAsRead.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.orderNotifications = state.orderNotifications.map((order) =>
          order._id === action.payload._id ? { ...order, isRead: true } : order
        );
        state.error = null;
      })
      .addCase(markOrdersNotificationsAsRead.rejected, (state, action) => {
        state.loadingNotificationAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(markCustomerNotificationsAsRead.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(markCustomerNotificationsAsRead.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.customerNotifications = state.customerNotifications.map(
          (customer) =>
            customer._id === action.payload._id
              ? { ...customer, isRead: true }
              : customer
        );
        state.error = null;
      })
      .addCase(markCustomerNotificationsAsRead.rejected, (state, action) => {
        state.loadingNotificationAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default notificationSlice.reducer;
