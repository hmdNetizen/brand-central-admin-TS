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
  transactionDetails: {
    transactionId: string;
  };
};

type OrdersProductsType = {
  products: {
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
};

export type OrderReturnedPayload = {
  id: string;
  orderId: string;
  orderStatus: string;
  orderDate: string;
  orderNote: string;
  orderTotalQuantity: number;
  orderShippingAmount: number;
  orderDiscount: number;
  promoCode: string;
  orderPaymentAmount: number;
  orderPaymentMethod: string;
  orderPaymentStatus: string;
  orderPaymentDate: string;
  orderInVoiceNumber: string;
  shippingAddress: AddressType;
  billingAddress: AddressType;
  shipToAddress: boolean;
  paymentReceipt: PaymentMethodType | null;
  ordersCustomer: {
    id: string;
    email: string;
  };
  ordersProducts: OrdersProductsType[];
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

export type SendEmailProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  to: string | string[];
  subject: string;
  content: string;
};

export type initStateType = {
  loadingOrders: boolean;
  orders: OrderReturnedPayload[];
  completedOrders: OrderReturnedPayload[];
  recentOrders: RecentOrdersReturnedPayload[];
  pendingOrdersCount: number;
  processingOrdersCount: number;
  completedOrdersCount: number;
  lastThirtyDaysSale: number;
  totalSales: number;
  loadingSingleOrder: boolean;
  singleOrder: null | OrderReturnedPayload;
  sendingEmail: boolean;
  emailSuccess: string;
  error: string | null;
};
