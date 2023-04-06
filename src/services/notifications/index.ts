import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initStateTypes } from "./NotificationTypes";

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
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default notificationSlice.reducer;
