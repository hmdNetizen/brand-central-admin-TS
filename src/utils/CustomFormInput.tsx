import React, { Fragment } from "react";
import { FormInput, FormLabel, Error } from "./styles/CustomFormInputStyles";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelId?: string;
  label?: string;
  type: string;
  placeholder: string;
  error?: string;
  labelColor?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
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
    ...rest
  } = props;
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
        onChange={onChange}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};

export default CustomFormInput;
