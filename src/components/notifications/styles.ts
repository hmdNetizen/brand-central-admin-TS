import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const Container = styled(Grid)(({ theme }) => ({
  padding: "2rem",
  borderBottom: `1px solid ${theme.palette.common.lightGrey}`,

  [theme.breakpoints.down("sm")]: {
    padding: "2rem 0.5rem",
  },
}));

export const CompanyName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.secondary.dark,
  textTransform: "uppercase",
}));

export const EmailButton = styled(Button)({
  fontSize: "1.2rem",
});

export const IgnoreButton = styled(Button)({
  fontSize: "1.05rem",
  color: "#fff",
  minWidth: 56,
});

export const ProductImage = styled("img")(({ theme }) => ({
  width: 100,

  [theme.breakpoints.only("xs")]: {
    width: 60,
  },
}));

export const HeadingWrapper = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem",
  background: theme.palette.secondary.main,
  color: "#fff",
}));
