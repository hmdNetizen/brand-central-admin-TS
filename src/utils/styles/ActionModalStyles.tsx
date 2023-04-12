import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

export const HeadingWrapper = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem",
  background: theme.palette.secondary.light,
  color: "#fff",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: "#fff",
    fontSize: "2rem",
  },
  "&:hover": {
    "& .MuiSvgIcon-root": {
      color: theme.palette.error.main,
    },
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  background: "#f4f4f4",
  color: theme.palette.primary.main,
  textTransform: "none",
  fontSize: "1.8rem",
  fontWeight: 400,
  boxShadow: "none",

  "&:hover": {
    background: "#f4f4f4",
    color: theme.palette.error.main,
  },
  "&:active": {
    background: "#eee",
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  textTransform: "none",
  fontSize: "1.8rem",
  fontWeight: 400,
  boxShadow: "none",

  "&:hover": {
    background: theme.palette.error.light,
  },

  "&:active": {
    background: theme.palette.error.dark,
  },
  "&:disabled": {
    background: theme.palette.error.light,
    color: "#fff",
  },
}));

export const StyledCircularProgress = styled(CircularProgress)({
  marginRight: "1rem",
  "&.MuiCircularProgress-root": {
    color: "#f2f2f2",
  },
});
