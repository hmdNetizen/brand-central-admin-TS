type OrderNotificationReturnedPayload = {
  _id: string;
  orderId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrderNotificationType = {
  data: OrderNotificationReturnedPayload[];
};
