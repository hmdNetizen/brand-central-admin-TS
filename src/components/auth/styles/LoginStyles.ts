import Grid, { GridProps } from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography, { TypographyProps } from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

export const Container = styled(Grid)(({ theme }) => ({
  minHeight: "100vh",

  [theme.breakpoints.only("xs")]: {
    padding: "0 2rem",
  },
}));

export const LoginBox = styled(Grid)<
  GridProps & { component: React.ElementType }
>(({ theme }) => ({
  padding: "3rem 5rem 3rem",
  background: "#fff",
  borderRadius: 5,
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",

  [theme.breakpoints.only("xs")]: {
    padding: "2rem",
    width: "100%",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: 0,
  background: theme.palette.secondary.dark,
  padding: ".75rem 0",
  fontSize: "1.7rem",
  fontWeight: 600,

  "&:hover": {
    background: theme.palette.secondary.light,
    boxShadow: "none",
  },

  "&:active": {
    background: theme.palette.secondary.main,
    boxShadow: "none",
  },

  "&:disabled": {
    cursor: "not-allowed",
    pointerEvents: "all !important",
    background: theme.palette.secondary.light,
    color: "#fff",
  },
}));

export const Heading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  textTransform: "uppercase",
  marginBottom: "2rem",
}));

export const ErrorsList = styled(Grid)(({ theme }) => ({
  marginBottom: "2rem",
  padding: "2rem 2rem 2rem 3rem",
  background: theme.palette.common.lightRed,
  alignSelf: "center",
  width: 500,

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const ErrorMsg = styled(Typography)<
  TypographyProps & { component: React.ElementType }
>({
  fontSize: "1.5rem",
  textAlign: "center",
  "&:not(:first-of-type)": {
    paddingTop: ".5rem",
  },
});

export const SuccessMsgWrapper = styled(Grid)(({ theme }) => ({
  marginBottom: "2rem",
  background: theme.palette.common.lightGreen,
  padding: "1rem",
  width: 250,
}));

export const SuccessMsg = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.success.main,
}));

export const StyledCircularProgress = styled(CircularProgress)({
  marginRight: "1rem",
  "&.MuiCircularProgress-root": {
    color: "#f2f2f2",
  },
});
