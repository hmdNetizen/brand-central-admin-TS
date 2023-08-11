import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const PrivateRoute = ({ ...rest }) => {
  const accessToken = useTypedSelector((state) => state.auth.accessToken);

  const location = useLocation();

  if (accessToken) {
    return <Outlet {...rest} />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
