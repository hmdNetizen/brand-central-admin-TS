import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid, { GridProps } from "@mui/material/Grid";
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

export const DetailsWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "menuSlideIn",
})<GridProps & { menuSlideIn: boolean }>(({ theme, menuSlideIn }) => ({
  background: "#fff",
  padding: "5rem 2rem 5rem 0",
  marginBottom: "5rem",

  [theme.breakpoints.only("md")]: {
    flexDirection: menuSlideIn ? "row" : "column",
    paddingLeft: menuSlideIn ? 0 : "2rem",
    paddingTop: menuSlideIn ? "5rem" : "3rem",
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "2rem 2rem 5rem",
  },

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1.5rem 5rem",
  },
}));

export const PageHeading = styled(Typography)({
  fontWeight: 700,
});

export const Avatar = styled("img")({
  width: 200,
});

export const MessageButton = styled(Button)({
  fontSize: "1.25rem",
  textTransform: "none",
});
