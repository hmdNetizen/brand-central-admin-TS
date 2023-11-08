import React from "react";

type AddressType = {
  customerName: string;
  address: string;
  city: string;
  phoneNumber: string;
  zipCode: string;
};

type PaymentMethodType = {
  platform: string;
  transactionFee: number;
  transactionDetails: {
    transactionId: string;
  };
};

export type OrdersProductsType = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    itemCode: string;
    brandName: string;
    priceCode1: number;
    priceCode2: number;
    priceCode3: number;
    priceCode4: number;
    hasImage: boolean;
    shippingCategory: string;
    productUPC: string;
  };
  productQuantity: number;
  productTotalCost: number;
  isSpecial: boolean;
};

export type OrderStatusTypes =
  | "pending"
  | "completed"
  | "declined"
  | "processing"
  | "";

export type OrderPaymentStatusTypes = "paid" | "unpaid" | "processing" | "";

export type OrderReturnedPayload = {
  id: string;
  _id?: string;
  orderId: string;
  orderStatus: OrderStatusTypes;
  orderDate: string;
  orderNote: string;
  orderTotalQuantity: number;
  orderShippingAmount: number;
  orderDiscount: number;
  promoCode: string;
  orderPaymentAmount: number;
  orderPaymentMethod: string;
  orderPaymentStatus: OrderPaymentStatusTypes;
  orderPaymentDate: string;
  orderInVoiceNumber: string;
  deliveryMethod: string;
  shippingAddress: AddressType;
  billingAddress: AddressType;
  shipToAddress: boolean;
  paymentReceipt: PaymentMethodType | null;
  ordersCustomer: {
    id: string;
    email: string;
  };
  ordersProducts: OrdersProductsType[];
  /* I added this here just to bypass TS error. This field is not 
   available in the Order schema rather in the salesperson's */
  placedBy?: {
    id: string;
    fullName: string;
    email: string;
  };
};

export type RecentSalesPayloadType = {
  data: {
    total: number;
    lastThirtyDays: number;
  };
};

export type RecentOrdersType = Pick<
  OrderReturnedPayload,
  "orderId" | "orderDate"
>;

export type OrderExcerptDataTypes = Pick<
  OrderReturnedPayload,
  | "id"
  | "orderId"
  | "orderDate"
  | "orderPaymentAmount"
  | "orderTotalQuantity"
  | "ordersCustomer"
  | "orderStatus"
>;

export interface RecentOrdersReturnedPayload extends RecentOrdersType {
  _id: string;
}

export type RecentOrdersPayloadType = {
  data: RecentOrdersReturnedPayload[];
};

export type OrdersCountReturnedPayload = {
  data: {
    pending: number;
    processing: number;
    completed: number;
  };
};

export type SingleOrderPayloadType = {
  data: OrderReturnedPayload;
};

export type OrderUpdateType = {
  orderId: string;
  setOpenDeliveryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  orderStatus: string;
  orderPaymentStatus: string;
};

export type PaginatedOrdersQueryType = {
  page: number;
  limit: number;
  status?: "pending" | "processing" | "completed" | "declined";
  searchTerm?: string;
};

export type PaginatedOrdersPayloadType = {
  data: {
    orders: OrderReturnedPayload[];
    total: number;
  };
};

export type initStateType = {
  loadingOrders: boolean;
  loadingOrderAction: boolean;
  orders: OrderReturnedPayload[];
  totalOrders: number;
  completedOrders: OrderReturnedPayload[];
  recentOrders: RecentOrdersReturnedPayload[];
  pendingOrdersCount: number;
  processingOrdersCount: number;
  completedOrdersCount: number;
  lastThirtyDaysSale: number;
  totalSales: number;
  loadingSingleOrder: boolean;
  singleOrder: null | OrderReturnedPayload;
  error: string | null;
};
