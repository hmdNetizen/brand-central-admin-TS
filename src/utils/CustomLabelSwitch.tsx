import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomSwitch from "./CustomSwitch";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SwitchProps } from "@mui/material";

interface LabelSwitchProps extends SwitchProps {
  isActive: boolean;
  label: string;
  mainThemeColor: string;
  lightThemeColor: string;
}

const CustomLabelSwitch = (props: LabelSwitchProps) => {
  const { label, isActive, mainThemeColor, lightThemeColor, ...rest } = props;
  const matchesXXS = useMediaQuery("(max-width: 340px)");
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography
          variant="body1"
          style={{
            fontWeight: 600,
            fontSize: matchesXXS ? "1.4rem" : "1.7rem",
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <CustomSwitch
          isActive={isActive}
          mainThemeColor={mainThemeColor}
          lightThemeColor={lightThemeColor}
          {...rest}
        />
      </Grid>
    </Grid>
  );
};

export default CustomLabelSwitch;
