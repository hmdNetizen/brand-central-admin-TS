import React, { useEffect, useLayoutEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import setAuthorizationToken from "src/services/auth/setAuthToken";
import { io } from "socket.io-client";
import { BASE_URL } from "src/services/BASE_URL";
import {
  OrderNotificationReturnedPayload,
  OrderNotificationReturnedData,
} from "src/services/notifications/NotificationTypes";

const Prefetch = () => {
  const socket = io(`${BASE_URL}`);

  const { addNewOrderNotification } = useActions();

  const {
    orderNotifications,
    customerNotifications,
    lowStockNotifications,
    messagesNotifications,
    preOrderNotifications,
  } = useTypedSelector((state) => state.notifications);

  useEffect(() => {
    socket.on("newOrder", (data: OrderNotificationReturnedPayload) => {
      addNewOrderNotification(data);
    });
  }, []);

  useLayoutEffect(() => {
    if (localStorage.accessToken) {
      setAuthorizationToken(localStorage.accessToken);
    }

    // eslint-disable-next-line
  }, [localStorage.accessToken]);

  return <Outlet />;
};

export default Prefetch;
