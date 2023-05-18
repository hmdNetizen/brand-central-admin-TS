import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./user";
import productReducer from "./products";
import utilsReducer from "./utils";
import notificationReducer from "./notifications";
import commonReducer from "./common";
import orderReducer from "./orders";
import customersReducer from "./customers";
import couponReducer from "./coupon";
// import settingsReducer from "./settings";
import shippingReducer from "./shipping";
import preOrderReducer from "./pre-orders";
import categoriesReducer from "./categories";
import brandsReducer from "./brands";
import messagesReducer from "./messages";

const rootReducer = combineReducers({
  auth: authReducer,
  utils: utilsReducer,
  notifications: notificationReducer,
  user: userReducer,
  customers: customersReducer,
  orders: orderReducer,
  preOrders: preOrderReducer,
  products: productReducer,
  common: commonReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  coupon: couponReducer,
  messages: messagesReducer,
  shipping: shippingReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
