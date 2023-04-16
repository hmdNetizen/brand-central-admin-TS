import React from "react";
import { ProductTypes } from "../products/ProductTypes";

export type PreOrderedPayloadType = {
  data: ProductTypes[];
};

export type DeletePreOrderType = {
  preOrderId: string;
  setOpenDeletePreOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UpdateStockType = {
  id: string;
  customerData: {
    id: string;
    companyEmail: string;
    companyName: string;
  }[];
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
