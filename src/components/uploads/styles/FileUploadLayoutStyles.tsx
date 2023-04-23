import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

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
