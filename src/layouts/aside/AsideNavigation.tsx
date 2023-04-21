import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AsideList from "./AsideList";
import { Aside, ArrowIconWrapper } from "./styles/AsideNavigationStyles";
import { useLocation } from "react-router-dom";

type AsideNavigationProps = {
  menuSlideIn: boolean;
  setMenuSlideIn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenu: number;
  selectedSubMenu: number;
};

const AsideNavigation = (props: AsideNavigationProps) => {
  const { menuSlideIn, selectedMenu, selectedSubMenu, setMenuSlideIn } = props;
  const { pathname } = useLocation();
  return (
    <Aside
      menuSlideIn={menuSlideIn}
      style={{
        display: pathname.includes("/invoice/print") ? "none" : "block",
      }}
    >
      <ArrowIconWrapper
        menuSlideIn={menuSlideIn}
        onClick={() => setMenuSlideIn((prev) => !prev)}
      >
        {menuSlideIn ? (
          <ArrowForwardIosIcon style={{ fontSize: "1rem" }} />
        ) : (
          <ArrowBackIosNewIcon style={{ fontSize: "1rem" }} />
        )}
      </ArrowIconWrapper>
      <AsideList
        menuSlideIn={menuSlideIn}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
      />
    </Aside>
  );
};

export default AsideNavigation;
