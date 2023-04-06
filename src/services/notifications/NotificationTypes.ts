interface NotificationDataTypes {
  _id: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderNotificationReturnedPayload
  extends NotificationDataTypes {
  orderId: string;
}

export interface CustomerNotificationReturnedPayload
  extends NotificationDataTypes {
  customerId: string;
}

export interface LowStockNotificationReturnedPayload
  extends NotificationDataTypes {
  productId: string;
  productName: string;
  currentStockQuantity: string;
  brandName: string;
}

export interface PreOrderNotificationReturnedPayload
  extends NotificationDataTypes {
  productId: string;
  productName: string;
  customerName: string;
  brandName: string;
}

export type OrderNotificationPayloadType = {
  data: OrderNotificationReturnedPayload[];
};

export type CustomerNotificationPayloadType = {
  data: CustomerNotificationReturnedPayload[];
};

export type LowStockNotificationPayloadType = {
  data: LowStockNotificationReturnedPayload[];
};

export type PreOrderNotificationPayloadType = {
  data: PreOrderNotificationReturnedPayload[];
};

export type initStateTypes = {
  orderNotifications: OrderNotificationReturnedPayload[];
  customerNotifications: CustomerNotificationReturnedPayload[];
  lowStockNotifications: LowStockNotificationReturnedPayload[];
  preOrderNotifications: PreOrderNotificationReturnedPayload[];
  loadingPreOrderNotification: boolean;
  loadingOrdersNotifications: boolean;
  loadingCustomerNotification: boolean;
  loadingLowStockNotifications: boolean;
  loadingMessagesNotifications: boolean;
  loadingNotificationAction: boolean;
  loadingPreorderNotification: boolean;
};
