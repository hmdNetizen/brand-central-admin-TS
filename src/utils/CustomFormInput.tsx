import React, { Fragment } from "react";
import { FormInput, FormLabel, Error } from "./styles/CustomFormInputStyles";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelId?: string;
  label?: string;
  type: string;
  placeholder: string;
  error?: string;
  labelColor?: string;
  right?: React.ReactNode;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number | string
  ) => void;
}

const CustomFormInput = (props: FormInputProps) => {
  const {
    labelId,
    label,
    type,
    placeholder,
    error,
    labelColor,
    onChange,
    right,
    ...rest
  } = props;
  return (
    <Fragment>
      <FormLabel htmlFor={labelId} labelColor={labelColor}>
        {label}
      </FormLabel>
      <div style={{ position: "relative" }}>
        <FormInput
          type={type}
          id={labelId}
          placeholder={placeholder}
          autoComplete="off"
          onChange={onChange}
          {...rest}
        />
        {right && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(0, -50%)",
              right: "1rem",
            }}
          >
            {right}
          </span>
        )}
        {error && <Error>{error}</Error>}
      </div>
    </Fragment>
  );
};

export default CustomFormInput;
