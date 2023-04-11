import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

type LabelProps = {
  hasLabel: boolean;
};

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiList-root &.MuiMenu-list": {
    paddingTop: 0,
    width: "100%",
  },
  "& .MuiOutlinedInput-input": {
    padding: "1rem 1rem",
    fontSize: "1.4rem",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.lightGrey,
  },

  "&.MuiOutlinedInput-root": {
    minWidth: 48,
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.common.lightGrey}`,
        borderWidth: 1,
      },
    },
  },
}));

const Label = styled("label", {
  shouldForwardProp: (prop) => prop !== "hasLabel",
})<LabelProps>(({ theme, hasLabel }) => ({
  display: "block",
  fontSize: "1.5rem",
  color: theme.palette.secondary.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 500,
  marginBottom: hasLabel ? ".75rem" : 0,
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: "1.4rem",
});

const Error = styled("small")(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.error.main,
  fontFamily: "Open Sans, Roboto",
  fontWeight: 600,
}));

interface CustomSelectProps
  extends Omit<SelectProps<string>, "onChange" | "renderValue"> {
  value: string;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
  options: (string | number)[];
  label: string;
  placeholder: string;
  name: string;
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
