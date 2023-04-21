import { styled } from "@mui/material/styles";

type OutletProps = {
  menuSlideIn: boolean;
  pathname: string;
};

export const OutletContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "menuSlideIn" && prop !== "pathname",
})<OutletProps>(({ theme, menuSlideIn, pathname }) => ({
  transition: "all .25s ease-in-out",
  paddingLeft: pathname.includes("/invoice/print")
    ? 0
    : menuSlideIn
    ? "7rem"
    : 300,
  overflowX: "hidden",

  [theme.breakpoints.only("xs")]: {
    paddingLeft: pathname.includes("/invoice/print")
      ? 0
      : menuSlideIn
      ? 0
      : "80%",
  },
}));
