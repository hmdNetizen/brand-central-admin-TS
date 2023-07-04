import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
