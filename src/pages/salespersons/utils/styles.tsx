import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const Container = styled(Grid)(({ theme }) => ({
  padding: "2rem 4rem",

  [theme.breakpoints.down("md")]: {
    padding: "2rem",
  },

  [theme.breakpoints.only("xs")]: {
    padding: "4rem 1rem",
  },
}));
