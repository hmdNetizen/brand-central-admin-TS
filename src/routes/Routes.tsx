import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Prefetch from "src/components/features/Prefetch";
import DashboardLayout from "src/layouts/DashboardLayout";
import Login from "src/pages/auth/Login";
import Dashboard from "src/pages/dashboard/Dashboard";
import AllOrders from "src/pages/orders/AllOrders";
import PendingOrders from "src/pages/orders/PendingOrders";

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
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default PagesRoutes;
