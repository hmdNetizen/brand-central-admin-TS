import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth";
// import userReducer from "./user";
// import productReducer from "./product";
// import utilsReducer from "./utils";
// import commonReducer from "./common";
// import orderReducer from "./orders";
// import customersReducer from "./customers";
// import couponReducer from "./coupon";
// import settingsReducer from "./settings";
// import shippingReducer from "./shipping";
// import preOrderReducer from "./pre-orders";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // user: userReducer,
    // orders: orderReducer,
    // customers: customersReducer,
    // utils: utilsReducer,
    // products: productReducer,
    // common: commonReducer,
    // coupon: couponReducer,
    // settings: settingsReducer,
    // shipping: shippingReducer,
    // preOrders: preOrderReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export default store;
