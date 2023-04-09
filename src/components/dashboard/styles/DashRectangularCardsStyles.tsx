import { styled } from "@mui/material/styles";
import { CardPropTypes } from "../types";

export const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<CardPropTypes>(({ theme, menuSlideIn }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "2rem",
  width: "100%",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [theme.breakpoints.only("sm")]: {
    gridTemplateColumns: menuSlideIn ? "1fr 1fr" : "1fr",
  },
  [theme.breakpoints.only("xs")]: {
    gridTemplateColumns: "1fr",
  },
}));
