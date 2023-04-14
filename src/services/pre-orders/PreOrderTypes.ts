import React from "react";
import { ProductTypes } from "../products/ProductTypes";

export type PreOrderedPayloadType = {
  data: ProductTypes[];
};

export type DeletePreOrderType = {
  preOrderId: string;
  setOpenDeletePreOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

export type initStateType = {
  loadingPreOrder: boolean;
  loadingPreOrderAction: boolean;
  preOrders: ProductTypes[];
  filteredPreOrders: ProductTypes[];
  singlePreOrder: null | ProductTypes;
  error: null | string;
};
