import React, { useState } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";
import { MenuTypes } from "src/lib/dataset/menuTypes";
import ListItemSubMenu from "./ListItemSubMenu";
import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionSummaryButton,
} from "./styles/AsideListItemStyles";

type AsideListItemProps = {
  menuSlideIn: boolean;
  selectedMenu: number;
  selectedSubMenu: number;
  menu: MenuTypes;
};

const AsideListItem = (props: AsideListItemProps) => {
  const { menuSlideIn, selectedMenu, selectedSubMenu, menu } = props;

  const { pathname } = useLocation();

  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panelId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  return (
    <StyledAccordion
      expanded={expanded === menu.id}
      onChange={handleChange(menu.id)}
      TransitionProps={{ unmountOnExit: true }}
      elevation={0}
      key={menu.id}
      menuSlideIn={menuSlideIn}
    >
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="transaction-content"
        id="transactions"
        menuId={menu.id}
        selectedMenu={selectedMenu}
      >
        <StyledAccordionSummaryButton disableRipple>
          <ListItemIcon>
            {React.createElement(menu.icon, {
              size: 25,
              className: "menu-icon",
            })}
          </ListItemIcon>

          {!menuSlideIn ? <ListItemText>{menu.title}</ListItemText> : null}
        </StyledAccordionSummaryButton>
      </StyledAccordionSummary>
      {!menuSlideIn ? (
        <AccordionDetails>
          {menu.subMenus?.map((subMenu) => (
            <ListItemSubMenu
              key={subMenu.subId}
              pathname={pathname}
              subMenu={subMenu}
              selectedSubMenu={selectedSubMenu}
            />
          ))}
        </AccordionDetails>
      ) : null}
    </StyledAccordion>
  );
};

export default AsideListItem;
