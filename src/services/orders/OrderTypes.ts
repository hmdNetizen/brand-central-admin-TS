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

type OrderProductsType = {
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
  ordersProducts: OrderProductsType[];
};

export type RecentOrdersPayloadType = {
  data: {
    total: number;
    lastThirtyDays: number;
  };
};

export type initStateType = {
  loadingOrders: boolean;
  completedOrders: OrderReturnedPayload[];
  recentOrders: OrderReturnedPayload[];
  lastThirtyDaysSale: number;
  totalSales: number;
  error: string | null;
};
