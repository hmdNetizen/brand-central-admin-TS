import React, { useState, Fragment, useEffect } from "react";
import Header from "./header/Header";
import { Outlet, Params, useParams, useLocation } from "react-router-dom";
import AsideNavigation from "./aside/AsideNavigation";
import { OutletContainer } from "src/layouts/DashLayoutStyles";
import { menus } from "src/lib/dataset/menus";

type DashLayoutProps = {
  menuSlideIn: boolean;
  setMenuSlideIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardLayout = (props: DashLayoutProps) => {
  const { menuSlideIn, setMenuSlideIn } = props;

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
