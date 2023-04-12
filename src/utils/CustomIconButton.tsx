import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  StyledButton,
  StyledCircularProgress,
} from "./styles/CustomButtonIconStyles";

type BackgroundTypes = {
  main: string;
  light: string;
  dark: string;
};

export interface CustomIconButtonProps extends ButtonProps {
  borderRadius: number;
  background: BackgroundTypes;
  minWidth: number | string;
  className?: string;
  title: string;
  loading?: string;
}

const CustomIconButton = (props: CustomIconButtonProps) => {
  const {
    title,
    background,
    borderRadius,
    loading,
    minWidth,
    className,
    ...rest
  } = props;

  return (
    <StyledButton
      variant="contained"
      disableRipple
      className={`${className}`}
      background={background}
      borderRadius={borderRadius}
      minWidth={minWidth}
      {...rest}
    >
      {loading && <StyledCircularProgress style={{ height: 25, width: 25 }} />}{" "}
      {title}
    </StyledButton>
  );
};

CustomIconButton.defaultProps = {
  borderRadius: 5,
  minWidth: 120,
};

export default CustomIconButton;
