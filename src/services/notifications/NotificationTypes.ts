import { ReceivedEmailReturnedPayload } from "../messages/MessageTypes";

interface NotificationDataTypes {
  _id: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderNotificationReturnedPayload
  extends NotificationDataTypes {
  orderId: string;
  isAddedBySalesperson?: boolean;
  salespersonOrderId?: string;
}

// Object shape returned from API
export type OrderNotificationReturnedData = {
  data: OrderNotificationReturnedPayload;
};

export interface CustomerNotificationReturnedPayload
  extends NotificationDataTypes {
  customerId: string;
}

// Object shape returned from API
export type CustomerNotificationReturnedData = {
  data: CustomerNotificationReturnedPayload;
};

export interface LowStockNotificationReturnedPayload
  extends NotificationDataTypes {
  productId: string;
  productName: string;
  currentStockQuantity: string;
  brandName: string;
}

// Object shape returned from API
export type LowStockNotificationReturnedData = {
  data: LowStockNotificationReturnedPayload;
};

export interface PreOrderNotificationReturnedPayload
  extends NotificationDataTypes {
  productId: string;
  productName: string;
  customerName: string;
  brandName: string;
}

// Object shape returned from API
export type PreOrderNotificationReturnedData = {
  data: PreOrderNotificationReturnedPayload;
};

export type MessagesNotificationReturnedPayload = Pick<
  ReceivedEmailReturnedPayload,
  "_id" | "isRead" | "createdAt"
>;

// Object shape returned from API
// export type MessageNotificationReturnedData = {
//   data: {
//     data: MessagesNotificationReturnedPayload;
//   };
// };

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

export type MessagesNotificationPayloadType = {
  data: {
    data: MessagesNotificationReturnedPayload[];
  };
};

export type initStateTypes = {
  orderNotifications: OrderNotificationReturnedPayload[];
  customerNotifications: CustomerNotificationReturnedPayload[];
  lowStockNotifications: LowStockNotificationReturnedPayload[];
  preOrderNotifications: PreOrderNotificationReturnedPayload[];
  messagesNotifications: MessagesNotificationReturnedPayload[];
  loadingPreOrderNotification: boolean;
  loadingOrdersNotifications: boolean;
  loadingCustomerNotification: boolean;
  loadingLowStockNotifications: boolean;
  loadingMessagesNotifications: boolean;
  loadingNotificationAction: boolean;
  loadingPreorderNotification: boolean;
  error: null | string;
};
