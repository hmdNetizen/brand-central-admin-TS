import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Content = styled(Grid)({
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  background: "#fff",
  borderRadius: 5,
  padding: "2rem 3rem 5rem",
});

export const SuccessWrapper = styled(Grid)(({ theme }) => ({
  background: theme.palette.common.lightGreen,
  padding: "1rem 3rem",
  borderRadius: 5,
}));

export const SuccessMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 400,
  fontSize: "1.35rem",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "1rem",
  fontSize: "1.5rem",
  textTransform: "none",
  background: theme.palette.primary.light,
  borderRadius: 0,

  "&:hover": {
    background: theme.palette.primary.light,
  },

  "&:active": {
    background: theme.palette.primary.main,
  },
}));
