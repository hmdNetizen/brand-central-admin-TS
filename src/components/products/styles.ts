import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

export const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  fontSize: "3rem",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.error.main,
  },
}));

export const StyledButton = styled(Button)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    background: theme.palette.secondary.main,
    textTransform: "none",
    padding: "1rem 3rem",
    borderRadius: "3rem",
    fontSize: "1.6rem",
    fontWeight: 400,

    "&:hover": {
      background: theme.palette.secondary.light,
    },

    "&:active": {
      background: theme.palette.secondary.dark,
    },
  })
);
