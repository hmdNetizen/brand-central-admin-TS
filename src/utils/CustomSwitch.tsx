import React from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const StyledSwitch = styled(Switch, {
  shouldForwardProp: (prop) =>
    prop !== "isActive" &&
    prop !== "lightThemeColor" &&
    prop !== "mainThemeColor",
})<
  SwitchProps & {
    isActive: boolean;
    mainThemeColor?: string;
    lightThemeColor?: string;
  }
>(({ theme, isActive, lightThemeColor, mainThemeColor }) => ({
  "& .MuiSwitch-track": {
    background: isActive ? theme.palette.success.light : lightThemeColor,
  },

  "& .MuiSwitch-switchBase": {
    color: isActive ? theme.palette.success.light : mainThemeColor,
  },
}));

interface CustomSwitchProps extends SwitchProps {
  color:
    | "error"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | undefined;
  isActive: boolean;
}

const CustomSwitch = (props: CustomSwitchProps) => {
  const { color, isActive, ...rest } = props;
  //   const label = { inputProps: { "aria-label": labelText } };
  return <StyledSwitch isActive={isActive} {...rest} color={color} />;
};

CustomSwitch.defaultProps = {
  color: "success",
  lightThemeColor: "#ff385d",
  mainThemeColor: "#FF385C",
};

export default CustomSwitch;
