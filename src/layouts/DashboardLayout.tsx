import React, { useState, Fragment, useEffect } from "react";
import Header from "./header/Header";
import { Outlet, Params, useParams, useLocation } from "react-router-dom";
import AsideNavigation from "./aside/AsideNavigation";
import { styled } from "@mui/material/styles";
import { menus } from "src/lib/dataset/menus";

type OutletProps = {
  menuSlideIn: boolean;
  orderId: string;
  pathname: string;
};

const OutletContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "menuSlideIn" && prop !== "orderId" && prop !== "pathname",
})<OutletProps>(({ theme, menuSlideIn, orderId, pathname }) => ({
  transition: "all .25s ease-in-out",
  paddingLeft:
    pathname === `/admin/orders/${orderId}/invoice/print`
      ? 0
      : menuSlideIn
      ? "7rem"
      : 300,
  overflowX: "hidden",

  [theme.breakpoints.only("xs")]: {
    paddingLeft:
      pathname === `/admin/orders/${orderId}/invoice/print`
        ? 0
        : menuSlideIn
        ? 0
        : "80%",
  },
}));

const DashboardLayout = () => {
  const [menuSlideIn, setMenuSlideIn] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState<number>(0);

  const { orderId, customerId }: Readonly<Params<string>> = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const menuList = [...menus];

    menuList.forEach((menu) => {
      switch (pathname) {
        case menu.path:
          if (selectedMenu !== menu.id) {
            setSelectedMenu(menu.id);
          }
          break;
        case `/admin/orders/${orderId}`:
        case `/admin/orders/${orderId}/invoice`:
          setSelectedMenu(1);
          break;
        case `/admin/customers/${customerId}`:
          setSelectedMenu(3);
          break;
        default:
          break;
      }
    });
  }, [selectedMenu, pathname, orderId, customerId]);

  useEffect(() => {
    [...menus].map((menu) => {
      return (
        menu.hasOwnProperty("subMenus") &&
        menu.subMenus?.forEach((subMenu) => {
          switch (pathname) {
            case `${subMenu.path}`:
              if (subMenu.subId !== selectedSubMenu) {
                setSelectedSubMenu(subMenu.subId);
                setSelectedMenu(menu.id);
              }
              break;
            default:
              break;
          }
        })
      );
    });
  }, [selectedSubMenu, pathname]);

  return (
    <Fragment>
      <Header menuSlideIn={menuSlideIn} setMenuSlideIn={setMenuSlideIn} />
      <AsideNavigation
        menuSlideIn={menuSlideIn}
        setMenuSlideIn={setMenuSlideIn}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
      />
      <OutletContainer
        menuSlideIn={menuSlideIn}
        orderId={orderId!}
        pathname={pathname}
      >
        <Outlet />
      </OutletContainer>
      <footer>Footer</footer>
    </Fragment>
  );
};

export default DashboardLayout;
