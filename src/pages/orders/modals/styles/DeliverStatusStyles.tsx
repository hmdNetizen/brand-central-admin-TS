import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const FormContainer = styled(Grid)<{ component: React.ElementType }>({
  padding: "2rem 3rem",
});

export const SubmitButton = styled(Button)(({ theme }) => ({
  minWidth: 180,
  fontSize: "1.6rem",
  fontWeight: 400,
  textTransform: "none",
  borderRadius: 0,

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

export const CancelButton = styled(Button)(({ theme }) => ({
  fontSize: "1.5rem",
  textTransform: "none",
  padding: ".5rem 2rem",
  borderRadius: 0,
  color: theme.palette.error.main,
  background: theme.palette.common.lightRed,
}));
