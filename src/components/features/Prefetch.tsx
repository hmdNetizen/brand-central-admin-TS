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
  const socket = io(`wss://brand-central-server.onrender.com`, {
    transports: ["websocket", "polling"],
    forceNew: true,
    reconnectionAttempts: 3,
    timeout: 2000,
  });

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
    socket.open();
    console.log("Connected");
    socket.emit("adminJoin", { email: "testingAccount2@admin.com" });

    return () => {
      socket.off("adminJoin");
      socket.close();
    };
  }, [socket]);

  const handleAddNewCustomerNotification = (
    data: CustomerNotificationReturnedPayload
  ) => {
    addNewUserNotification(data);
  };

  const handleAddNewOrderNotification = (
    data: OrderNotificationReturnedPayload
  ) => {
    addNewOrderNotification(data);
  };

  const handleLowStockNotification = (data: {
    lowStock: LowStockNotificationReturnedPayload;
    newOrder: OrderNotificationReturnedPayload;
  }) => {
    addNewLowStockNotification(data.lowStock);
  };

  const handleNewMessageNotification = (
    data: MessagesNotificationReturnedPayload
  ) => {
    addNewMessageNotification(data);
  };

  const handleNewPreOrderNotification = (
    data: PreOrderNotificationReturnedPayload
  ) => {
    console.log("Yay!!!");
    addNewPreOrderNotification(data);
  };

  useEffect(() => {
    socket.on("newUser", handleAddNewCustomerNotification);

    return () => {
      socket.off("newUser", handleAddNewCustomerNotification);
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("newOrder", handleAddNewOrderNotification);

    return () => {
      socket.off("newOrder", handleAddNewOrderNotification);
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("lowStock", handleLowStockNotification);

    return () => {
      socket.off("lowStock", handleLowStockNotification);
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on("new_contact_message", handleNewMessageNotification);

    return () => {
      socket.off("new_contact_message", handleNewMessageNotification);
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.emit("adminJoin", { email: "testingAccount2@admin.com" });
    socket.on("newPreOrderNotification", handleNewPreOrderNotification);

    return () => {
      socket.off("newPreOrderNotification", handleNewPreOrderNotification);
      socket.close();
    };
  }, [preOrderNotifications]);

  // useEffect(() => {

  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [
  //   orderNotifications,
  //   customerNotifications,
  //   lowStockNotifications,
  //   preOrderNotifications,
  //   messagesNotifications,
  // ]);

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
