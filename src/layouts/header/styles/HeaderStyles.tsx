import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { styled, Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

type CustomAppBarProps = {
  lastElement: string;
};

export const StyledAppBar = styled((props: AppBarProps & SxProps<Theme>) => (
  <AppBar {...props} />
))<CustomAppBarProps>(({ lastElement, theme, ...props }) => ({
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
