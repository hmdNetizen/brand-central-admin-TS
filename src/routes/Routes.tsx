import { Routes, Route } from "react-router-dom";
import Login from "src/pages/auth/Login";

const PagesRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </main>
  );
};

export default PagesRoutes;
