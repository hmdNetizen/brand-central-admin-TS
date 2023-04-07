import { Routes, Route } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import Login from "src/pages/auth/Login";
import Dashboard from "src/pages/Dashboard";

const PagesRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default PagesRoutes;
