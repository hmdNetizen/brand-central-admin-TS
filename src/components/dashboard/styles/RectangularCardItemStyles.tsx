import Grid, { GridProps } from "@mui/material/Grid";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { LinkProps } from "react-router-dom";

interface ContainerProps extends GridProps {
  primaryColor: string;
  secondaryColor: string;
}

type IconWrapperProps = Pick<ContainerProps, "primaryColor">;

export const Container = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== "primaryColor" && prop !== "secondaryColor",
})<ContainerProps>(({ primaryColor, secondaryColor }) => ({
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  padding: "2rem",
  borderRadius: 5,
  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
  position: "relative",
  overflow: "hidden",
  color: "#fff",
  cursor: "pointer",
  transition: "transform .25s ease-in-out",

  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const StyledButton = styled(Button)<
  ButtonProps & { component: React.ElementType; to: LinkProps["to"] }
>(({ theme }) => ({
  minWidth: 100,
  textTransform: "none",
  borderRadius: 20,
  background: "#fff",
  color: theme.palette.primary.main,
  fontSize: "1.4rem",
  position: "relative",
  zIndex: 9,

  "&:hover": {
    background: "#fff",
  },
}));

export const IconWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "primaryColor",
})<IconWrapperProps>(({ theme, primaryColor }) => ({
  minWidth: 150,
  background: primaryColor,
  height: 300,
  display: "flex",
  paddingLeft: "2rem",
  paddingTop: "2rem",
  alignItems: "center",
  position: "absolute",
  right: "-3rem",
  transform: "rotate(20deg)",

  [theme.breakpoints.only("lg")]: {
    right: "-5rem",
  },
}));
