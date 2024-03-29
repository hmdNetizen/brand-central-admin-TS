import React from "react";
import PI from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./styles/PhoneNumberInput.css";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { CountryData } from "react-phone-input-2";

let PhoneInput: any;

if (import.meta.env.MODE === "development") {
  PhoneInput = PI;
} else {
  PhoneInput = (PI as any).default !== null ? (PI as any).default : PI;
}

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  marginLeft: 0,
  fontSize: "1.2rem",
  fontWeight: 600,
  color: theme.palette.error.main,
}));

const StyledFormControl = styled(FormControl)({
  width: "100%",
  borderRadius: 5,
});

const Label = styled("label")<
  React.LabelHTMLAttributes<HTMLLabelElement> & { labelColor: string }
>(({ theme, labelColor }) => ({
  fontSize: "1.5rem",
  color: labelColor ? labelColor : theme.palette.secondary.main,
  fontFamily: "Open Sans, Roboto, sans-serif",
  fontWeight: 500,
  display: "block",
  marginBottom: ".75rem",
}));

type PhoneInputProps = {
  value: string;
  onChange: (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  name: string;
  error: string;
  labelId: string;
  labelColor: string;
  label: string;
  placeholder?: string;
};

const PhoneNumberInput = (props: PhoneInputProps) => {
  const {
    value,
    onChange,
    name,
    error,
    labelId,
    label,
    labelColor,
    placeholder,
    ...rest
  } = props;

  return (
    <StyledFormControl variant="outlined">
      <Label htmlFor={labelId} labelColor={labelColor}>
        {label}
      </Label>
      <PhoneInput
        country={"us"}
        value={value}
        onChange={onChange}
        enableSearch
        inputProps={{ name: name, id: labelId }}
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <StyledFormHelperText id="outlined-weight-helper-text">
          {error}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

PhoneNumberInput.defaultProps = {
  labelColor: "",
};

export default PhoneNumberInput;
