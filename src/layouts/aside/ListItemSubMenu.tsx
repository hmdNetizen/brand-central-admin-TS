import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SubMenuTypes } from "src/lib/dataset/menuTypes";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

type ListSubMenuProps = {
  selectedSubMenu: number;
  pathname: string;
  subMenu: SubMenuTypes;
};

const ListItemSubMenu = (props: ListSubMenuProps) => {
  const { pathname, selectedSubMenu, subMenu } = props;
  const theme = useTheme();

  return (
    <ListItemButton
      key={subMenu.subId}
      style={{
        marginBottom: 5,
        borderRadius: 5,
        background:
          pathname === `${subMenu.path}` && selectedSubMenu === subMenu.subId
            ? theme.palette.common.darkerGrey
            : "transparent",
      }}
      component={Link}
      to={subMenu.path}
    >
      <ListItemText>{subMenu.title}</ListItemText>
    </ListItemButton>
  );
};

export default ListItemSubMenu;
