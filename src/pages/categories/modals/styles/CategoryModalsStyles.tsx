import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ContentContainer = styled(Grid)({
  paddingBottom: "3rem",
});

export const ErrorsList = styled(Grid)<{ component: React.ElementType }>(
  ({ theme }) => ({
    padding: "2rem 2rem 2rem 3rem",
    background: theme.palette.common.lightRed,
    alignSelf: "center",
    marginTop: "1rem",
    borderRadius: 5,
    listStyle: "none",
  })
);

export const ErrorMessage = styled(Typography)<{
  component: React.ElementType;
}>({
  fontSize: "1.5rem",
  "&:not(:first-of-type)": {
    paddingTop: ".5rem",
  },
});

export const StyledFormContainer = styled(Grid)<{
  component: React.ElementType;
}>({
  padding: "2rem",
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
    // color: (props) => (props.loading ? "#fff" : "inherit"),
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

export const StyledChip = styled(Chip)(({ theme }) => ({
  marginTop: ".5rem",
  borderRadius: 0,
  height: 25,
  fontSize: "1rem",
  borderColor: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  display: "flex",
  width: 100,
  textAlign: "center",
}));
