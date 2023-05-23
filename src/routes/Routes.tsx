import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Prefetch from "src/components/features/Prefetch";
import DashboardLayout from "src/layouts/DashboardLayout";
import Login from "src/pages/auth/Login";
import BrandsCategory from "src/pages/brands-categories/BrandsCategories";
import Brands from "src/pages/brands/Brands";
import DeactivatedBrands from "src/pages/brands/DeactivatedBrands";
import Categories from "src/pages/categories/Categories";
import Coupons from "src/pages/coupons/Coupons";
import BlockedCustomers from "src/pages/customers/BlockedCustomers";
import CustomerProfileDetails from "src/pages/customers/CustomerProfileDetails";
import Customers from "src/pages/customers/Customers";
import Dashboard from "src/pages/dashboard/Dashboard";
import Favicon from "src/pages/general-settings/Favicon";
import Logo from "src/pages/general-settings/Logo";
import ReceivedMessages from "src/pages/messages/ReceivedMessages";
import SentMessages from "src/pages/messages/SentMessages";
import AllOrders from "src/pages/orders/AllOrders";
import CompletedOrders from "src/pages/orders/CompletedOrders";
import DeclinedOrders from "src/pages/orders/DeclinedOrders";
import OrderDetails from "src/pages/orders/OrderDetails";
import OrderInvoice from "src/pages/orders/OrderInvoice";
import PendingOrders from "src/pages/orders/PendingOrders";
import PrintOrderInvoice from "src/pages/orders/PrintOrderInvoice";
import ProcessingOrders from "src/pages/orders/ProcessingOrders";
import PreOrders from "src/pages/pre-orders/PreOrders";
import ShippingZipCodes from "src/pages/shipping/ShippingZipCodes";
import SubCategories from "src/pages/subcategories/SubCategories";

const PagesRoutes = () => {
  const [menuSlideIn, setMenuSlideIn] = useState<boolean>(false);
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
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
              <Route path="subcategories">
                <Route index element={<SubCategories />} />
              </Route>
              <Route path="brands-categories">
                <Route index element={<BrandsCategory />} />
              </Route>
              <Route path="brands">
                <Route index element={<Brands />} />
                <Route path="deactivated" element={<DeactivatedBrands />} />
              </Route>
              <Route path="coupons">
                <Route index element={<Coupons />} />
              </Route>
              <Route path="messages">
                <Route index path="sent-messages" element={<SentMessages />} />
                <Route
                  path="received-messages"
                  element={<ReceivedMessages />}
                />
              </Route>
              <Route path="shipping">
                <Route index path="zip-codes" element={<ShippingZipCodes />} />
              </Route>
              <Route path="general-settings">
                <Route index path="logo" element={<Logo />} />
                <Route path="favicon" element={<Favicon />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default PagesRoutes;
