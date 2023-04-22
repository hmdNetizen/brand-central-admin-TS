import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Prefetch from "src/components/features/Prefetch";
import DashboardLayout from "src/layouts/DashboardLayout";
import Login from "src/pages/auth/Login";
import Categories from "src/pages/categories/Categories";
import BlockedCustomers from "src/pages/customers/BlockedCustomers";
import CustomerProfileDetails from "src/pages/customers/CustomerProfileDetails";
import Customers from "src/pages/customers/Customers";
import Dashboard from "src/pages/dashboard/Dashboard";
import AllOrders from "src/pages/orders/AllOrders";
import CompletedOrders from "src/pages/orders/CompletedOrders";
import DeclinedOrders from "src/pages/orders/DeclinedOrders";
import OrderDetails from "src/pages/orders/OrderDetails";
import OrderInvoice from "src/pages/orders/OrderInvoice";
import PendingOrders from "src/pages/orders/PendingOrders";
import PrintOrderInvoice from "src/pages/orders/PrintOrderInvoice";
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
                <Route path=":orderId">
                  <Route
                    index
                    element={<OrderDetails menuSlideIn={menuSlideIn} />}
                  />
                  <Route path="invoice">
                    <Route index element={<OrderInvoice />} />
                    <Route path="print" element={<PrintOrderInvoice />} />
                  </Route>
                </Route>
              </Route>
              <Route path="pre-orders">
                <Route index element={<PreOrders />} />
              </Route>
              <Route path="customers">
                <Route index element={<Customers />} />
                <Route path="blocked" element={<BlockedCustomers />} />
                <Route
                  path=":customerId"
                  element={<CustomerProfileDetails menuSlideIn={menuSlideIn} />}
                />
              </Route>
              <Route path="categories">
                <Route index element={<Categories />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default PagesRoutes;
