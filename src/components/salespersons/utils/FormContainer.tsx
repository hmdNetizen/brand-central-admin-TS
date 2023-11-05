import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

import {
  StyledCircularProgress,
  StyledFormContainer,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";
import CustomFormInput from "src/utils/CustomFormInput";
import { SalespersonInfoProps } from "src/pages/salespersons/types";
import CustomOutlinedInput from "src/utils/CustomOutlinedInput";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type SalespersonFormContainerProps = {
  onSubmit: (event: React.FormEvent<HTMLInputElement | HTMLDivElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullNameError: string | undefined;
  phoneNumberError: string | undefined;
  salespersonInformation: SalespersonInfoProps;
  initialsError: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;
  confirmPasswordError: string | undefined;
  buttonTitle: string;
};

const FormContainer = (props: SalespersonFormContainerProps) => {
  const {
    fullNameError,
    onChange,
    onSubmit,
    salespersonInformation,
    initialsError,
    emailError,
    phoneNumberError,
    passwordError,
    confirmPasswordError,
    buttonTitle,
  } = props;
  const { fullName, email, phoneNumber, initials, password, confirmPassword } =
    salespersonInformation;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const loadingRequestAction = useTypedSelector(
    (state) => state.salesPersons.loadingRequestAction
  );

  const showPassword = false;
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <StyledFormContainer
      item
      container
      direction="column"
      component="form"
      onSubmit={onSubmit}
    >
      <Grid
        item
        container
        justifyContent="center"
        style={{ marginBottom: "2rem" }}
        columnGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="Full Name"
            labelId="fullName"
            name="fullName"
            value={fullName}
            placeholder="Enter Sales Rep's Name"
            onChange={onChange}
            error={fullNameError}
            autoComplete="off"
          />
        </Grid>
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="Initials"
            labelId="initials"
            name="initials"
            value={initials}
            placeholder="Enter Sales Reps Initials"
            onChange={onChange}
            error={initialsError}
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        style={{ marginBottom: "2rem" }}
        columnGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="Email"
            labelId="email"
            name="email"
            value={email}
            placeholder="Enter Sales Rep's Email"
            onChange={onChange}
            error={emailError}
            autoComplete="off"
          />
        </Grid>
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="Phone Number"
            labelId="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Enter Sales Reps PhoneNumber"
            onChange={onChange}
            error={phoneNumberError}
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        style={{ marginBottom: "2rem" }}
        columnGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="password"
            label="Password"
            labelId="password"
            name="password"
            value={password}
            placeholder="Enter Sales Rep's Password"
            onChange={onChange}
            error={passwordError}
            autoComplete="off"
          />
          {/* <CustomOutlinedInput
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            formControlWidth={matchesXS ? "100%" : matchesSM ? 400 : 500}
            value={password}
            onChange={onChange}
            label="Password"
            labelId="password"
            errorMessage={passwordError!}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClick}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          /> */}
        </Grid>
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="password"
            label="Confirm Password"
            labelId="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter Sales Reps ConfirmPassword"
            onChange={onChange}
            error={confirmPasswordError}
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <SubmitButton
          type="submit"
          variant="contained"
          disableRipple
          color="secondary"
          disabled={loadingRequestAction}
        >
          {loadingRequestAction && (
            <StyledCircularProgress style={{ height: 25, width: 25 }} />
          )}{" "}
          {buttonTitle}
        </SubmitButton>
      </Grid>
    </StyledFormContainer>
  );
};

export default FormContainer;
