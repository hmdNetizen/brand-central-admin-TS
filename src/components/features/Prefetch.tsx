import { useEffect, useLayoutEffect } from "react";
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
  const socket = io(BASE_URL, {
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

  const orderNotifications = useTypedSelector(
    (state) => state.notifications.orderNotifications
  );
  const customerNotifications = useTypedSelector(
    (state) => state.notifications.customerNotifications
  );
  const lowStockNotifications = useTypedSelector(
    (state) => state.notifications.lowStockNotifications
  );
  const messagesNotifications = useTypedSelector(
    (state) => state.notifications.messagesNotifications
  );
  const preOrderNotifications = useTypedSelector(
    (state) => state.notifications.preOrderNotifications
  );

  const accessToken = useTypedSelector((state) => state.auth.accessToken);
  const admin = useTypedSelector((state) => state.user.admin);

  useEffect(() => {
    socket.open();
    socket.emit("adminJoin", { email: admin?.companyEmail });

    return () => {
      socket.off("adminJoin");
      socket.close();
    };
  }, [socket, admin]);

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
    addNewPreOrderNotification(data);
  };

  useEffect(() => {
    socket.on("newUser", handleAddNewCustomerNotification);

    return () => {
      socket.off("newUser", handleAddNewCustomerNotification);
      socket.close();
    };
  }, [customerNotifications]);

  useEffect(() => {
    socket.on("newOrder", handleAddNewOrderNotification);

    return () => {
      socket.off("newOrder", handleAddNewOrderNotification);
      socket.close();
    };
  }, [orderNotifications]);

  useEffect(() => {
    socket.on("lowStock", handleLowStockNotification);

    return () => {
      socket.off("lowStock", handleLowStockNotification);
      socket.close();
    };
  }, [lowStockNotifications]);

  useEffect(() => {
    socket.on("new_contact_message", handleNewMessageNotification);

    return () => {
      socket.off("new_contact_message", handleNewMessageNotification);
      socket.close();
    };
  }, [messagesNotifications]);

  useEffect(() => {
    socket.on("newPreOrderNotification", handleNewPreOrderNotification);

    return () => {
      socket.off("newPreOrderNotification", handleNewPreOrderNotification);
      socket.close();
    };
  }, [preOrderNotifications]);

  useLayoutEffect(() => {
    if (accessToken) {
      setAuthorizationToken(accessToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      loadAdminProfile(navigate);
      getAllPreOrders();
    }
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

  return <Outlet />;
};

export default Prefetch;
