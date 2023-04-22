import CustomIconButton from "src/utils/CustomIconButton";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const CategoryIcon = styled("img")({
  width: 40,
  maxHeight: 60,
});

export const OptionsTableData = styled("div")({
  minWidth: 150,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridColumnGap: "1rem",
});

export const ActionButton = styled(CustomIconButton)({
  minWidth: 150,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridColumnGap: "1rem",
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
