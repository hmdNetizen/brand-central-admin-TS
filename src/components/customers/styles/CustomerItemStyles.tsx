import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { LinkProps } from "react-router-dom";
import CustomIconButton from "src/utils/CustomIconButton";

export const OptionsTableData = styled("div")({
  minWidth: 350,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridColumnGap: "1rem",
});

export const ActionButton = styled(CustomIconButton)<{
  component?: React.ElementType;
  to?: LinkProps["to"];
}>({
  minWidth: 64,
  padding: "1rem 1.5rem",
  borderRadius: "2rem",
});

export const UnblockButton = styled(Button)({
  fontSize: "1.2rem",
  color: "#fff",
  fontWeight: 600,
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.error.main,
  maxWidth: 42,

  "&:hover": {
    background: theme.palette.error.light,
  },

  "&:active": {
    background: theme.palette.error.dark,
  },

  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
}));
