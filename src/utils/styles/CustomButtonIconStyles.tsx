import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { LinkProps } from "react-router-dom";
import { CustomIconButtonProps } from "../CustomIconButton";
import Button from "@mui/material/Button";

type ButtonPropTypes = Omit<
  CustomIconButtonProps,
  "loading" | "className" | "title"
>;

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "background" && prop !== "minWidth" && prop !== "borderRadius",
})<ButtonPropTypes & { component?: React.ElementType; to?: LinkProps["to"] }>(
  ({ background, minWidth, borderRadius }) => ({
    borderRadius: borderRadius,
    textTransform: "none",
    boxShadow: "none",
    fontSize: "1.35rem",
    background: background.main,
    minWidth: minWidth,

    "&:hover": {
      background: background.light,
      boxShadow: "none",
    },
    "&:active": {
      background: background.dark,
      boxShadow: "none",
    },
  })
);

export const StyledCircularProgress = styled(CircularProgress)({
  marginRight: "1rem",
  "&.MuiCircularProgress-root": {
    color: "#f2f2f2",
  },
});
