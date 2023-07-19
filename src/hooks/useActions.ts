import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  authActions,
  notificationActions,
  userActions,
  customerActions,
  ordersActions,
  preOrderActions,
  productActions,
  commonActions,
  utilActions,
  categoriesActions,
  brandsActions,
  couponActions,
  messagesActions,
  shippingActions,
  settingsActions,
  salespersonActions,
} from "src/services/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authActions,
      ...notificationActions,
      ...userActions,
      ...customerActions,
      ...ordersActions,
      ...preOrderActions,
      ...productActions,
      ...commonActions,
      ...utilActions,
      ...categoriesActions,
      ...brandsActions,
      ...couponActions,
      ...messagesActions,
      ...shippingActions,
      ...settingsActions,
      ...salespersonActions,
    },
    dispatch
  );
};
