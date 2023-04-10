import { ProductTypes } from "../products/ProductTypes";

export type PreOrderedPayloadType = {
  data: ProductTypes[];
};

export type initStateType = {
  loadingPreOrder: boolean;
  preOrders: ProductTypes[];
  error: null | string;
};
