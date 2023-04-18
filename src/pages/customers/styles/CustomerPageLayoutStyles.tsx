import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

export const ContainerWrapper = styled(Grid)(({ theme }) => ({
  background: "#fff",
  padding: "2rem 3rem",
  borderRadius: 5,

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1rem",
  },
}));
