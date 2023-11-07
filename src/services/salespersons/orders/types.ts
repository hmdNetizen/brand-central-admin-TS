import { OrderReturnedPayload } from "src/services/orders/OrderTypes";

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

export type SalespersonOrderInitStateTypes = {
  loadingOrders: boolean;
  loadingSingleOrder: boolean;
  salespersonOrders: Array<SalespersonOrderResponsePayload>;
  singleOrder: SalespersonOrderResponsePayload | null;
  totalOrders: number;
  error: null | string;
};
