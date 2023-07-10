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

export type initStateType = {
  loadingPreOrders: boolean;
  loadingPreOrderAction: boolean;
  preOrders: ProductTypes[];
  filteredPreOrders: ProductTypes[];
  preOrdersUpdatedStock: UpdateStockType[];
  singlePreOrder: null | ProductTypes;
  error: null | string;
};
