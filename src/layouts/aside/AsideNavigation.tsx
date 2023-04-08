import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AsideList from "./AsideList";

type CustomAsideProps = {
  menuSlideIn: boolean;
};

const Aside = styled("aside", {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<CustomAsideProps>(({ theme, menuSlideIn }) => ({
  paddingLeft: menuSlideIn ? ".5rem" : "1.5em",
  paddingRight: menuSlideIn ? ".5rem" : "1.5em",
  paddingTop: "1em",
  paddingBottom: "15em",
  height: "100vh",
  boxShadow: "5px -5px 7px #eee",
  position: "fixed",
  overflowY: "auto",
  overflowX: "hidden",
  zIndex: theme.zIndex.appBar + 1,
  background: theme.palette.primary.main,
  transition: "all .25s ease-in-out",
  width: !menuSlideIn ? 300 : "7rem",

  "& .MuiListItemButton-root": {
    marginBottom: "1em",
    paddingLeft: menuSlideIn ? 0 : 16,
    paddingRight: menuSlideIn ? 0 : 16,
    justifyContent: menuSlideIn ? "center" : "flex-start",

    "&:hover": {
      backgroundColor: theme.palette.common.darkerGrey,
      borderRadius: 5,
    },

    [theme.breakpoints.only("xs")]: {
      display: menuSlideIn ? "none" : "flex",
    },
  },

  "& .menu-icon": {
    color: "#fff",
  },

  "& .MuiListItemIcon-root": {
    minWidth: menuSlideIn ? "auto" : 50,
  },

  "& .MuiTypography-root": {
    fontSize: "1.5rem",
    color: "#fff",
  },

  "& .MuiListItemButton-root.Mui-selected": {
    backgroundColor: theme.palette.common.darkerGrey,
    borderRadius: ".5rem",

    "&:hover": {
      backgroundColor: theme.palette.common.darkerGrey,
    },

    "& .MuiTypography-root": {
      color: "#fff",
    },
  },

  "&::-webkit-scrollbar": {
    width: ".85rem",
  },

  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 1rem rgba(0, 0, 0, 0.2)",
  },

  "&::-webkit-scrollbar-thumb": {
    borderRadius: ".5rem",
    background: theme.palette.common.darkerGrey,
  },

  [theme.breakpoints.only("xs")]: {
    paddingTop: "5rem",
    zIndex: 1,
    width: menuSlideIn ? 0 : "80%",
    paddingLeft: menuSlideIn ? 0 : "1.5rem",
    paddingRight: menuSlideIn ? 0 : "1.5rem",
  },
}));

const ArrowIconWrapper = styled("div")<CustomAsideProps>(
  ({ theme, menuSlideIn }) => ({
    background: "#262626",
    border: "1px solid #fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 22,
    height: 22,
    borderRadius: ".5rem",
    position: "fixed",
    left: menuSlideIn ? "6rem" : 287,
    top: "9rem",
    cursor: "pointer",
    zIndex: theme.zIndex.appBar + 2,
    color: "#fff",
    transition: "left .25s ease-in-out",

    "&:hover": {
      background: theme.palette.primary.main,
    },

    [theme.breakpoints.only("xs")]: {
      top: "12rem",
      display: "none",
    },
  })
);

type AsideNavigationProps = {
  menuSlideIn: boolean;
  setMenuSlideIn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenu: number;
  selectedSubMenu: number;
};

const AsideNavigation = (props: AsideNavigationProps) => {
  const { menuSlideIn, selectedMenu, selectedSubMenu, setMenuSlideIn } = props;
  return (
    <Aside menuSlideIn={menuSlideIn}>
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
