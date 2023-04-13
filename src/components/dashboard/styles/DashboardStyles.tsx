import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { DashboardProps } from "src/pages/dashboard/types";

export const Container = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<DashboardProps>(({ theme, menuSlideIn }) => ({
  padding: "4rem 3rem",

  [theme.breakpoints.only("sm")]: {
    padding: menuSlideIn ? "4rem 3rem" : "4rem 1.5rem",
  },

  [theme.breakpoints.only("xs")]: {
    padding: "6rem 2rem 5rem",
  },
}));

export const InforTableWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<DashboardProps>(({ theme, menuSlideIn }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "2rem",
  width: "100%",
  overflowX: "auto",

  [theme.breakpoints.only("md")]: {
    gridTemplateColumns: menuSlideIn ? "repeat(2, 1fr)" : "1fr",
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridColumnGap: 0,
  },
}));
