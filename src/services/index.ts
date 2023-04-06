import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
// import userReducer from "./user";
// import productReducer from "./product";
import utilsReducer from "./utils";
// import commonReducer from "./common";
// import orderReducer from "./orders";
// import customersReducer from "./customers";
// import couponReducer from "./coupon";
// import settingsReducer from "./settings";
// import shippingReducer from "./shipping";
// import preOrderReducer from "./pre-orders";

const rootReducer = combineReducers({
  auth: authReducer,
  utils: utilsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
