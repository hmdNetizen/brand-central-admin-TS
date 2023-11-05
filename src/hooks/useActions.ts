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
  categoriesActions,
  brandsActions,
  couponActions,
  messagesActions,
  shippingActions,
  settingsActions,
  salespersonActions,
  salespersonOrdersActions,
  salespersonCustomersActions,
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
      ...categoriesActions,
      ...brandsActions,
      ...couponActions,
      ...messagesActions,
      ...shippingActions,
      ...settingsActions,
      ...salespersonActions,
      ...salespersonOrdersActions,
      ...salespersonCustomersActions,
    },
    dispatch
  );
};
