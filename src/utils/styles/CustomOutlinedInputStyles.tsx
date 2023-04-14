import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: 600,

  [theme.breakpoints.only("sm")]: {
    width: 400,
  },

  [theme.breakpoints.only("xs")]: {
    width: "100%",
  },
}));

export const Label = styled("label")(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.secondary.light,
  fontFamily: "Open Sans, Roboto, sans-serif",
  fontWeight: 600,
  display: "block",
  marginBottom: ".5rem",
}));

export const StyledOutlineInput = styled(OutlinedInput)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 0,
  width: "100%",

  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.secondary.light}`,
      borderWidth: 1,
      border: `1px solid ${theme.palette.secondary.light}`,
    },
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.secondary.light}`,
  },

  "&:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.secondary.light}`,
    },
  },

  "& .MuiOutlinedInput-input": {
    padding: "1rem",
  },
}));

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  marginLeft: 0,
  fontSize: "1.2rem",
  fontWeight: 600,
  color: theme.palette.error.main,
}));
