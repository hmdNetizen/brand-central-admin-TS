import React, { useEffect, useLayoutEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import setAuthorizationToken from "src/services/auth/setAuthToken";
import { io } from "socket.io-client";
import { BASE_URL } from "src/services/BASE_URL";
import {
  OrderNotificationReturnedPayload,
  CustomerNotificationReturnedPayload,
  LowStockNotificationReturnedPayload,
  MessagesNotificationReturnedPayload,
  PreOrderNotificationReturnedPayload,
} from "src/services/notifications/NotificationTypes";

const Prefetch = () => {
  const socket = io(`${BASE_URL}`);

  const {
    addNewOrderNotification,
    addNewUserNotification,
    addNewLowStockNotification,
    addNewMessageNotification,
    addNewPreOrderNotification,
    getOrdersNotifications,
    getCustomersNotifications,
    getLowStockNotifications,
    getPreOrderNotifications,
    getMessagesNotifications,
  } = useActions();

  const {
    orderNotifications,
    customerNotifications,
    lowStockNotifications,
    messagesNotifications,
    preOrderNotifications,
  } = useTypedSelector((state) => state.notifications);

  const { adminEmail, accessToken } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    socket.emit("adminJoin", { email: adminEmail });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    socket.on("newOrder", (data: OrderNotificationReturnedPayload) => {
      addNewOrderNotification(data);
    });

    socket.on("newUser", (data: CustomerNotificationReturnedPayload) => {
      addNewUserNotification(data);
    });

    socket.on(
      "lowStock",
      (data: {
        lowStock: LowStockNotificationReturnedPayload;
        newOrder: OrderNotificationReturnedPayload;
      }) => {
        addNewLowStockNotification(data.lowStock);
        addNewOrderNotification(data.newOrder);
      }
    );

    socket.on(
      "new_contact_message",
      (data: MessagesNotificationReturnedPayload) => {
        addNewMessageNotification(data);
      }
    );

    socket.on(
      "newPreOrderNotification",
      (data: PreOrderNotificationReturnedPayload) => {
        addNewPreOrderNotification(data);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [
    orderNotifications,
    customerNotifications,
    lowStockNotifications,
    preOrderNotifications,
    messagesNotifications,
  ]);

  useLayoutEffect(() => {
    if (accessToken) {
      setAuthorizationToken(accessToken);
    }

    // eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    getOrdersNotifications();
    getCustomersNotifications();
    getLowStockNotifications();
    getPreOrderNotifications();
    getMessagesNotifications();
  }, []);

  return <Outlet />;
};

export default Prefetch;
