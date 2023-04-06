import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../axios";
import {
  initStateTypes,
  OrderNotificationPayloadType,
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
    } catch (error: AxiosError<string> | any) {
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
  },
});

export default notificationSlice.reducer;
