import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import CustomIconButton from "src/utils/CustomIconButton";

export const OptionsTableData = styled("div")({
  minWidth: 150,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridColumnGap: "1rem",
});

export const ActionButton = styled(CustomIconButton)({
  minWidth: 64,
  padding: "1rem 1.5rem",
  borderRadius: "2rem",
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
