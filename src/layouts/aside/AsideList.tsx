import React from "react";
import List from "@mui/material/List";
import AsideListItem from "./AsideListItem";
import ListItemButtonWithoutSubMenu from "./ListItemButtonWithoutSubMenu";
import { menus } from "src/lib/dataset/menus";

type AsideListProps = {
  menuSlideIn: boolean;
  selectedMenu: number;
  selectedSubMenu: number;
};

const AsideList = (props: AsideListProps) => {
  const { menuSlideIn, selectedMenu, selectedSubMenu } = props;
  return (
    <List sx={{ width: "100%" }} component="nav">
      {menus.map((menu) =>
        menu.hasOwnProperty("subMenus") ? (
          <AsideListItem
            menu={menu}
            menuSlideIn={menuSlideIn}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
          />
        ) : (
          <ListItemButtonWithoutSubMenu
            menu={menu}
            menuSlideIn={menuSlideIn}
            selectedMenu={selectedMenu}
          />
        )
      )}
    </List>
  );
};

export default AsideList;
