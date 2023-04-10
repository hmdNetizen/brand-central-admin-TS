import { styled } from "@mui/material/styles";

type OutletProps = {
  menuSlideIn: boolean;
  orderId: string;
  pathname: string;
};

export const OutletContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "menuSlideIn" && prop !== "orderId" && prop !== "pathname",
})<OutletProps>(({ theme, menuSlideIn, orderId, pathname }) => ({
  transition: "all .25s ease-in-out",
  paddingLeft:
    pathname === `/admin/orders/${orderId}/invoice/print`
      ? 0
      : menuSlideIn
      ? "7rem"
      : 300,
  overflowX: "hidden",

  [theme.breakpoints.only("xs")]: {
    paddingLeft:
      pathname === `/admin/orders/${orderId}/invoice/print`
        ? 0
        : menuSlideIn
        ? 0
        : "80%",
  },
}));
