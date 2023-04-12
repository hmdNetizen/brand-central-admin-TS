import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(({ theme }) => ({
  background: "red",
  position: "absolute",
  bottom: 5,
  right: 5,
  padding: "1rem",

  [theme.breakpoints.only("xs")]: {
    width: "100%",
    right: 0,
    bottom: 0,
  },
}));

export const FormContainer = styled(Grid)<
  GridProps & { component: React.ElementType }
>({
  padding: "2rem",
  background: "#fff",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  textTransform: "none",
  width: "100%",
  background: theme.palette.secondary.dark,

  "&:hover": {
    background: theme.palette.secondary.light,
  },
  "&:active": {
    background: theme.palette.secondary.dark,
  },

  "&:disabled": {
    cursor: "not-allowed",
    pointerEvents: "all !important",
    background: theme.palette.secondary.light,
    color: "#fff",
  },
}));

export const StyledCircularProgress = styled(CircularProgress)({
  marginRight: "1rem",
  "&.MuiCircularProgress-root": {
    color: "#f2f2f2",
  },
});
