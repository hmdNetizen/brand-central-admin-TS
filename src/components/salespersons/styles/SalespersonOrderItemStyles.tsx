import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LinkProps } from "react-router-dom";

export const OrderStatus = styled(Typography)({
  padding: ".5rem .5rem",
  textAlign: "center",
  borderRadius: 20,
  fontWeight: 700,
});

export const StyledButton = styled(Button)<{
  component: React.ElementType;
  to: LinkProps["to"];
}>({
  borderRadius: 20,
  fontSize: "1.25rem",
  fontWeight: 500,
  textTransform: "none",
});
