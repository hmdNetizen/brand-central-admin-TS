import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

interface CustomAccordionProps extends AccordionProps {
  menuSlideIn: boolean;
}

interface CustomAccordionSummaryProps extends AccordionSummaryProps {
  menuId: number;
  selectedMenu: number;
}

export const StyledAccordion = styled(Accordion, {
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

export const StyledAccordionSummary = styled(
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

export const StyledAccordionSummaryButton = styled(ListItemButton)({
  "&:hover": {
    background: "transparent",
  },
});
