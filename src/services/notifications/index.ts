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
  LowStockNotificationReturnedData,
  PreOrderNotificationReturnedData,
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

export const clearAllOrdersNotifications = createAsyncThunk(
  "clear-all-orders-notification",
  async (_, thunkAPI) => {
    try {
      await axios.delete(`/api/notifications/new-order/delete`);
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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

export const markLowStockNotificationsAsRead = createAsyncThunk(
  "mark-low-stock-as-read",
  async (stockId: string, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/notifications/low-stock/${stockId}`
      );
      const result = data as LowStockNotificationReturnedData;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while updating notification");
    }
  }
);

export const clearAllLowStockNotifications = createAsyncThunk(
  "clear-all-low-stock-notification",
  async (_, thunkAPI) => {
    try {
      await axios.delete(`/api/notifications/low-stock/delete`);
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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

export const markPreOrderNotificationsAsRead = createAsyncThunk(
  "mark-pre-order-as-read",
  async (preorderId: string, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/api/notifications/pre-order/${preorderId}`
      );

      const result = data as PreOrderNotificationReturnedData;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error while updating notification");
    }
  }
);

export const clearAllPreOrderNotifications = createAsyncThunk(
  "clear-all-pre-order-notification",
  async (_, thunkAPI) => {
    try {
      await axios.delete(`/api/notifications/pre-order/delete`);
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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

export const clearAllCustomersNotifications = createAsyncThunk(
  "clear-all-customers-notification",
  async (_, thunkAPI) => {
    try {
      await axios.delete(`/api/notifications/new-customer/delete`);
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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

export const markMessageNotificationAsRead = createAsyncThunk(
  "mark-message-as-read",
  async (messageId: string, thunkAPI) => {
    try {
      await axios.patch(`/api/contact/read/${messageId}`);

      return messageId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error updating notification(s)");
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
      })
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
      })
      .addCase(clearAllOrdersNotifications.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(clearAllOrdersNotifications.fulfilled, (state) => {
        state.loadingNotificationAction = false;
        state.orderNotifications = [];
        state.error = null;
      })
      .addCase(clearAllOrdersNotifications.rejected, (state, action) => {
        state.loadingNotificationAction = false;
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
      })
      .addCase(markLowStockNotificationsAsRead.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(markLowStockNotificationsAsRead.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.lowStockNotifications = state.lowStockNotifications.map((stock) =>
          stock._id === action.payload._id ? { ...stock, isRead: true } : stock
        );
        state.error = null;
      })
      .addCase(markLowStockNotificationsAsRead.rejected, (state, action) => {
        state.loadingNotificationAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      })
      .addCase(clearAllLowStockNotifications.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(clearAllLowStockNotifications.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.lowStockNotifications = [];
        state.error = null;
      })
      .addCase(clearAllLowStockNotifications.rejected, (state, action) => {
        state.loadingNotificationAction = false;
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
      })
      .addCase(markPreOrderNotificationsAsRead.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(markPreOrderNotificationsAsRead.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.loadingNotificationAction = false;
        state.preOrderNotifications = state.preOrderNotifications.map(
          (preOrder) =>
            preOrder._id === action.payload._id
              ? { ...preOrder, isRead: true }
              : preOrder
        );
        state.error = null;
      })
      .addCase(markPreOrderNotificationsAsRead.rejected, (state, action) => {
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      })
      .addCase(clearAllPreOrderNotifications.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(clearAllPreOrderNotifications.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.preOrderNotifications = [];
        state.error = null;
      })
      .addCase(clearAllPreOrderNotifications.rejected, (state, action) => {
        state.loadingNotificationAction = false;
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
      })
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
      })
      .addCase(clearAllCustomersNotifications.pending, (state) => {
        state.loadingNotificationAction = true;
      })
      .addCase(clearAllCustomersNotifications.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.customerNotifications = [];
        state.error = null;
      })
      .addCase(clearAllCustomersNotifications.rejected, (state, action) => {
        state.loadingNotificationAction = false;
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
      })
      .addCase(markMessageNotificationAsRead.pending, (state, action) => {
        state.loadingNotificationAction = true;
      })
      .addCase(markMessageNotificationAsRead.fulfilled, (state, action) => {
        state.loadingNotificationAction = false;
        state.messagesNotifications = state.messagesNotifications.map(
          (messages) =>
            messages._id === action.payload
              ? { ...messages, isRead: true }
              : messages
        );
        state.error = null;
      })
      .addCase(markMessageNotificationAsRead.rejected, (state, action) => {
        state.loadingNotificationAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export default notificationSlice.reducer;
