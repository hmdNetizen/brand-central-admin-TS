import FormControl from "@mui/material/FormControl";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: 600,

  [theme.breakpoints.only("sm")]: {
    width: 400,
  },

  [theme.breakpoints.only("xs")]: {
    width: "100%",
  },
}));

const Label = styled("label")(({ theme }) => ({
  fontSize: "1.5rem",
  color: theme.palette.secondary.light,
  fontFamily: "Open Sans, Roboto, sans-serif",
  fontWeight: 600,
  display: "block",
  marginBottom: ".5rem",
}));

const StyledOutlineInput = styled(OutlinedInput)(({ theme }) => ({
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

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  marginLeft: 0,
  fontSize: "1.2rem",
  fontWeight: 600,
  color: theme.palette.error.main,
}));

type PropsType = {
  label: string;
  labelId: string;
  value: string | number;
  error: string;
  formControlWidth: number | string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const CustomOutlinedInput = (
  props: PropsType & { [key: string]: any }
): JSX.Element => {
  const {
    label,
    labelId,
    value,
    onChange,
    error,
    formControlWidth,
    ...restProps
  } = props;

  return (
    <StyledFormControl
      variant="outlined"
      style={{ width: formControlWidth ? formControlWidth : undefined }}
    >
      <Label htmlFor={labelId}>{label}</Label>
      <StyledOutlineInput
        id={labelId}
        value={value}
        onChange={onChange}
        aria-describedby="company name"
        inputProps={{
          "aria-label": "Company name",
        }}
        {...restProps}
      />
      {error && (
        <StyledFormHelperText id="outlined-weight-helper-text">
          {error}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default CustomOutlinedInput;
