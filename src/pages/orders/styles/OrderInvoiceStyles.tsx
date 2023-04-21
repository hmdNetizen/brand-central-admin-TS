import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

export const Logo = styled("img")({
  width: 200,
});

export const ContentContainer = styled(Grid)({
  background: "#fff",
  padding: "3rem 2rem",
  borderRadius: 5,
});
