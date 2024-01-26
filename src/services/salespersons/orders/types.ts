import React from "react";
import {
  OrderPaymentStatusTypes,
  OrderReturnedPayload,
  OrderStatusTypes,
} from "src/services/orders/OrderTypes";

export type SalespersonOrderResponsePayload = Omit<
  OrderReturnedPayload,
  "ordersCustomer"
> & {
  placedBy: {
    id: string;
    fullName: string;
    email: string;
  };
  orderedFor: {
    id: string;
    companyName: string;
    phone: string;
  };
};

export type SalespersonOrdersPayloadTypes = {
  data: {
    results: Array<SalespersonOrderResponsePayload>;
    total: number;
  };
};

export type SingleSalespersonOrderPayloadTypes = {
  data: SalespersonOrderResponsePayload;
};

export type UpdateSalespersonOrderRequestPayload = {
  orderStatus: OrderStatusTypes;
  paymentStatus?: OrderPaymentStatusTypes;
  orderId: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SalespersonOrderInitStateTypes = {
  loadingOrders: boolean;
  loadingOrderAction: boolean;
  loadingSingleOrder: boolean;
  salespersonOrders: Array<SalespersonOrderResponsePayload>;
  salespersonPendingOrders: Array<SalespersonOrderResponsePayload>;
  salespersonCompletedOrders: Array<SalespersonOrderResponsePayload>;
  singleOrder: SalespersonOrderResponsePayload | null;
  pendingOrdersTotal: number;
  totalOrders: number;
  error: null | string;
};
