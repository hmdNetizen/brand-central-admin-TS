import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const Container = styled(Grid)<GridProps & { pathname: string }>(
  ({ theme, pathname }) => ({
    padding: !pathname.includes("/invoice/print") ? "1rem 2rem 5rem 2rem" : 0,

    [theme.breakpoints.only("xs")]: {
      padding: !pathname.includes("/invoice/print") ? "5rem 1rem 5rem 1rem" : 0,
    },
  })
);

export const Logo = styled("img")({
  width: 200,
});

export const ContentContainer = styled(Grid)({
  background: "#fff",
  padding: "3rem 2rem",
  borderRadius: 5,
});
