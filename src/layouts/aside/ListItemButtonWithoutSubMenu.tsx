import React from "react";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MenuTypes } from "src/lib/dataset/menuTypes";
import { Link, LinkProps } from "react-router-dom";
import { styled } from "@mui/material/styles";

type CustomListItemButtonProps = {
  menu: MenuTypes;
  selectedMenu: number;
  menuSlideIn: boolean;
};

interface ButtonSelectedProps extends ListItemButtonProps {
  menuId: number;
  selectedMenu: number;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "menuId" && prop !== "selectedMenu",
})<ButtonSelectedProps & { component: React.ElementType; to: LinkProps["to"] }>(
  ({ theme, menuId, selectedMenu }) => ({
    background:
      menuId === selectedMenu ? theme.palette.primary.dark : "transparent",
    borderRadius: menuId === selectedMenu ? 5 : 0,
  })
);

const ListItemButtonWithoutSubMenu = (props: CustomListItemButtonProps) => {
  const { menu, selectedMenu, menuSlideIn } = props;
  return (
    <StyledListItemButton
      disableRipple
      style={{ justifyContent: "center" }}
      component={Link}
      to={menu.path}
      menuId={menu.id}
      selectedMenu={selectedMenu}
    >
      <ListItemIcon>
        {React.createElement(menu.icon, {
          className: "menu-icon",
          size: 25,
        })}
      </ListItemIcon>

      {!menuSlideIn ? <ListItemText>{menu.title}</ListItemText> : null}
    </StyledListItemButton>
  );
};

export default ListItemButtonWithoutSubMenu;
