import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Prefetch from "src/components/features/Prefetch";
import DashboardLayout from "src/layouts/DashboardLayout";
import Login from "src/pages/auth/Login";
import BlockedCustomers from "src/pages/customers/BlockedCustomers";
import Customers from "src/pages/customers/Customers";
import Dashboard from "src/pages/dashboard/Dashboard";
import AllOrders from "src/pages/orders/AllOrders";
import CompletedOrders from "src/pages/orders/CompletedOrders";
import DeclinedOrders from "src/pages/orders/DeclinedOrders";
import PendingOrders from "src/pages/orders/PendingOrders";
import ProcessingOrders from "src/pages/orders/ProcessingOrders";
import PreOrders from "src/pages/pre-orders/PreOrders";

const PagesRoutes = () => {
  const [menuSlideIn, setMenuSlideIn] = useState<boolean>(false);
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route element={<Prefetch />}>
            <Route
              path="/dashboard"
              element={
                <DashboardLayout
                  menuSlideIn={menuSlideIn}
                  setMenuSlideIn={setMenuSlideIn}
                />
              }
            >
              <Route index element={<Dashboard menuSlideIn={menuSlideIn} />} />
              <Route path="orders">
                <Route index element={<AllOrders />} />
                <Route path="pending" element={<PendingOrders />} />
                <Route path="completed" element={<CompletedOrders />} />
                <Route path="processing" element={<ProcessingOrders />} />
                <Route path="declined" element={<DeclinedOrders />} />
              </Route>
              <Route path="pre-orders">
                <Route index element={<PreOrders />} />
              </Route>
              <Route path="customers">
                <Route index element={<Customers />} />
                <Route path="blocked" element={<BlockedCustomers />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default PagesRoutes;
