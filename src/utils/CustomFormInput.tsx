import React, { Fragment } from "react";
import { FormInput, FormLabel, Error } from "./styles/CustomFormInputStyles";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelId?: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  labelColor?: string;
}

const CustomFormInput = (props: FormInputProps) => {
  const { labelId, label, type, placeholder, error, labelColor, ...rest } =
    props;
  return (
    <Fragment>
      <FormLabel htmlFor={labelId} labelColor={labelColor}>
        {label}
      </FormLabel>
      <FormInput
        type={type}
        id={labelId}
        placeholder={placeholder}
        autoComplete="off"
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};

export default CustomFormInput;
