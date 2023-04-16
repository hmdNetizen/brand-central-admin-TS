import React from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const StyledSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<SwitchProps & { isActive: boolean }>(({ theme, isActive }) => ({
  "& .MuiSwitch-track": {
    background: isActive
      ? theme.palette.success.light
      : theme.palette.error.light,
  },

  "& .MuiSwitch-switchBase": {
    color: isActive ? theme.palette.success.light : theme.palette.error.light,
  },
}));

type CustomSwitchProps = {
  labelText: string;
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
};

const CustomSwitch = (props: CustomSwitchProps) => {
  const { labelText, color, isActive, ...rest } = props;
  //   const label = { inputProps: { "aria-label": labelText } };
  return <StyledSwitch isActive={isActive} {...rest} color={color} />;
};

CustomSwitch.defaultProps = {
  color: "success",
};

export default CustomSwitch;
