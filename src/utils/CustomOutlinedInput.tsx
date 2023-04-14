import React from "react";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import {
  StyledFormControl,
  StyledOutlineInput,
  Label,
  StyledFormHelperText,
} from "./styles/CustomOutlinedInputStyles";

interface PropsType extends OutlinedInputProps {
  label: string;
  labelId: string;
  value: string | number;
  errorMessage: string;
  formControlWidth: number | string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomOutlinedInput = (props: PropsType): JSX.Element => {
  const {
    label,
    labelId,
    value,
    onChange,
    errorMessage,
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
      {errorMessage && (
        <StyledFormHelperText id="outlined-weight-helper-text">
          {errorMessage}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default CustomOutlinedInput;
