import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { styled, Theme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

type CustomAppBarProps = {
  lastElement: string;
};

export const StyledAppBar = styled(
  (props: AppBarProps) => <AppBar {...props} />,
  { shouldForwardProp: (prop) => prop !== "lastElement" }
)<CustomAppBarProps>(({ lastElement, theme }) => ({
  background: "#fff",
  padding: "1rem 2rem 1rem 0",
  display: lastElement === "print" ? "none" : "flex",

  [theme.breakpoints.only("xs")]: {
    padding: "1rem 1rem 1rem 0",
  },
}));

export const StyledLogo = styled("img")(({ theme }) => ({
  width: 200,

  [theme.breakpoints.only("xs")]: {
    width: 150,
    display: "block",
    marginBottom: "1rem",
  },
}));

export const ProfileIconButton = styled(IconButton)({
  width: 30,
  height: 30,
  overflow: "hidden",
  padding: 0,
});
