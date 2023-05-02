import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  description: string;
  id: string;
  labelSize?: string;
  // inputProps: React.InputHTMLAttributes<HTMLInputElement> | undefined
}

const CustomCheckbox = (props: CustomCheckboxProps) => {
  const { label, description, id, labelSize, inputProps, ...rest } = props;
  return (
    <Grid container alignItems="center" columnSpacing={1}>
      <Grid item style={{ marginLeft: "-9px" }}>
        <Checkbox
          color="secondary"
          id={id}
          //   inputProps={inputProps}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
          {...rest}
        />
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          component="label"
          htmlFor={id}
          style={{
            cursor: "pointer",
            fontSize: labelSize ? labelSize : "1.6rem",
          }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CustomCheckbox;
