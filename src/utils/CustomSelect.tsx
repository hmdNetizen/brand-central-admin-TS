import React from "react";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import {
  StyledSelect,
  StyledMenuItem,
  Label,
  Error,
} from "./styles/CustomSelectStyles";

interface CustomSelectProps
  extends Omit<SelectProps<string>, "onChange" | "renderValue"> {
  value: string;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
  options: (string | number)[];
  label?: string;
  placeholder?: string;
  name?: string;
  errorMessage?: string;
  hasLabel: boolean;
  renderValue?: (value: unknown) => React.ReactNode;
}

const CustomSelect = (props: CustomSelectProps) => {
  const {
    value,
    onChange,
    options,
    name,
    label,
    placeholder,
    errorMessage,
    hasLabel,
    ...restProps
  } = props;
  return (
    <FormControl sx={{ width: "100%" }}>
      <Label hasLabel={hasLabel}>{label}</Label>
      <StyledSelect
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Category" }}
        name={name}
        {...restProps}
      >
        {placeholder && (
          <StyledMenuItem value="">
            <em style={{ fontWeight: 400 }}>{placeholder}</em>
          </StyledMenuItem>
        )}
        {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <StyledMenuItem value={option} key={index}>
              {typeof option === "string" ? option.toUpperCase() : option}
            </StyledMenuItem>
          ))}
      </StyledSelect>
      {errorMessage && <Error>{errorMessage}</Error>}
    </FormControl>
  );
};

CustomSelect.defaultProps = {
  hasLabel: true,
};

export default CustomSelect;
