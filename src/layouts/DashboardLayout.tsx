import React, { useState, Fragment } from "react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [menuSlideIn, setMenuSlideIn] = useState<boolean>(false);
  return (
    <Fragment>
      <Header menuSlideIn={menuSlideIn} setMenuSlideIn={setMenuSlideIn} />
      <Outlet />
      <footer>Footer</footer>
    </Fragment>
  );
};

export default DashboardLayout;
