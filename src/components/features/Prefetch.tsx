import React, { useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Prefetch = () => {
  const {
    orderNotifications,
    customerNotifications,
    lowStockNotifications,
    messagesNotifications,
    preOrderNotifications,
  } = useTypedSelector((state) => state.notifications);

  useEffect(() => {}, []);

  return <Outlet />;
};

export default Prefetch;
