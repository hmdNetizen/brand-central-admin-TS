import React, { useState } from "react";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { MenuTypes, SubMenuTypes } from "src/lib/dataset/menuTypes";
import ListItemSubMenu from "./ListItemSubMenu";

interface CustomAccordionProps extends AccordionProps {
  menuSlideIn: boolean;
}

interface CustomAccordionSummaryProps extends AccordionSummaryProps {
  menuId: number;
  selectedMenu: number;
}

const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<CustomAccordionProps>(({ theme, menuSlideIn }) => ({
  "&.Mui-expanded": {
    margin: 0,
  },
  "&:last-of-type": {
    borderRadius: 5,
  },

  "&.MuiPaper-root": {
    background: "transparent",
    marginBottom: "1rem",
    borderRadius: 5,

    "&::before": {
      background: "transparent",
    },
  },

  [theme.breakpoints.only("xs")]: {
    display: menuSlideIn ? "none" : "block",
  },
}));

const StyledAccordionSummary = styled(
  AccordionSummary
)<CustomAccordionSummaryProps>(({ theme, menuId, selectedMenu }) => ({
  padding: 0,
  paddingRight: 5,
  background:
    menuId === selectedMenu ? theme.palette.primary.dark : "transparent",
  borderRadius: menuId === selectedMenu ? 5 : 0,

  "& .MuiSvgIcon-root": {
    fill: "#fff",
    fontSize: "2.5rem",
  },

  "&.Mui-expanded": {
    minHeight: "auto",
  },

  "& .MuiAccordionSummary-content": {
    margin: 0,

    "&.Mui-expanded": {
      margin: 0,
    },
  },

  "&:hover": {
    background: theme.palette.common.darkerGrey,
    borderRadius: 5,
  },
}));

const StyledAccordionSummaryButton = styled(ListItemButton)({
  "&:hover": {
    background: "transparent",
  },
});

type AsideListItemProps = {
  menuSlideIn: boolean;
  selectedMenu: number;
  selectedSubMenu: number;
  menu: MenuTypes;
  subMenu: SubMenuTypes;
};

const AsideListItem = (props: AsideListItemProps) => {
  const { menuSlideIn, selectedMenu, selectedSubMenu, menu, subMenu } = props;

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
