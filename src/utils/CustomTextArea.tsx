import React, { Fragment } from "react";
import { StyledTextArea, Label, Error } from "./styles/CustomTextAreaStyles";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error: string;
  label: string;
  id?: string;
}

const CustomTextArea = (props: TextAreaProps) => {
  const { error, label, id, ...rest } = props;

  return (
    <Fragment>
      <Label htmlFor={id}>{label}</Label>
      <StyledTextArea {...rest}></StyledTextArea>
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};

export default CustomTextArea;
