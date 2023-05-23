import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomSwitch from "src/utils/CustomSwitch";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Container = styled(Grid)({
  "&:not(:last-of-type)": {
    marginBottom: "3rem",
  },
});

type SocialLinkItemProp = {
  onSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  switchName: string;
  title: string;
  isActive: boolean;
  value: string;
  checked: boolean;
};

const SocialLinkItem = (props: SocialLinkItemProp) => {
  const {
    onSwitchChange,
    onInputChange,
    inputName,
    switchName,
    title,
    isActive,
    checked,
    value,
  } = props;

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      item
      container
      direction={matchesSM ? "column" : "row"}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Grid item sx={{ minWidth: matchesSM ? "none" : 150 }}>
        <Typography variant="h5" color="secondary">
          {title}
        </Typography>
      </Grid>
      <Grid item container={matchesSM}>
        <Grid container alignItems="center" justifyContent="space-evenly">
          <Grid item sx={{ width: matchesSM ? "80%" : 400 }}>
            <CustomFormInput
              type="text"
              onChange={onInputChange}
              name={inputName}
              value={value}
              placeholder={`Enter ${title} URL`}
            />
          </Grid>
          <Grid item>
            <CustomSwitch
              {...props}
              color="success"
              name={switchName}
              onChange={onSwitchChange}
              isActive={isActive}
              checked={checked}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SocialLinkItem;
