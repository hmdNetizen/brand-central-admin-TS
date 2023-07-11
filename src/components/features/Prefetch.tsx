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
import { useNavigate } from "react-router-dom";

const Prefetch = () => {
  const socket = io(`${BASE_URL}`);
  const navigate = useNavigate();

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
    loadAdminProfile,
    getAllSiteData,
    fetchAllProducts,
    getAllPreOrders,
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
    if (localStorage.accessToken) {
      setAuthorizationToken(localStorage.accessToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) loadAdminProfile(navigate);
  }, [accessToken]);

  useEffect(() => {
    getOrdersNotifications();
    getCustomersNotifications();
    getLowStockNotifications();
    getPreOrderNotifications();
    getMessagesNotifications();
    getAllSiteData();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getAllPreOrders();
    }
  }, [accessToken]);

  return <Outlet />;
};

export default Prefetch;
