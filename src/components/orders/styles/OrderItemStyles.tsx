import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

export const ActionButton = styled(Button)({
  minWidth: 64,
  padding: "1rem 1.5rem",
  borderRadius: "2rem",
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.error.main,
  width: 35,
  height: 35,

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

export const OptionsTableData = styled("div")({
  minWidth: 250,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridColumnGap: "1rem",
});

export const StyledChip = styled(Chip)({
  padding: ".5rem .5rem",
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1.5rem",
});

export const CompletedButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  minWidth: 120,
  paddingLeft: ".25rem",
  paddingRight: ".25rem",
  textTransform: "none",
  borderRadius: 20,
  background: theme.palette.success.dark,

  "&:hover": {
    background: theme.palette.success.main,
  },

  "&:active": {
    background: theme.palette.success.dark,
  },
}));
