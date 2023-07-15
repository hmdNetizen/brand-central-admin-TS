import { SendEmailToCustomerType } from "./../messages/MessageTypes";

import React from "react";
import { ProductTypes } from "../products/ProductTypes";

export type PreOrderedPayloadType = {
  data: ProductTypes[];
};

export type DeletePreOrderType = {
  preOrderId: string;
  setOpenDeletePreOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CustomerListDataType = {
  companyEmail: string;
  companyName: string;
  id: string;
};

export type UpdateStockType = {
  id: string;
  customerData: CustomerListDataType | CustomerListDataType[];
  productData: ProductTypes[];
};

export interface NotificiationEmailRequestType extends SendEmailToCustomerType {
  stock: UpdateStockType;
}

export type PreOrderMultiplesRequestType = {
  productId: string[] | string;
  isNotified: boolean;
  addedBy: string | string[];
  itemId: string;
};

export type initStateType = {
  loadingPreOrders: boolean;
  loadingPreOrderAction: boolean;
  preOrders: ProductTypes[];
  filteredPreOrders: ProductTypes[];
  preOrdersUpdatedStock: UpdateStockType[];
  filteredUpdatedStock: UpdateStockType[];
  singlePreOrder: null | ProductTypes;
  singleUpdatedStock: UpdateStockType | null;
  error: null | string;
};
