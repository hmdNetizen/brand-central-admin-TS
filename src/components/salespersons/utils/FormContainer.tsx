import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
import PhoneNumberInput from "src/utils/PhoneNumberInput";
import { CountryData } from "react-phone-input-2";
import FileUploadLayout from "src/components/uploads/FileUploadLayout";

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
  onChangePhoneNumber: (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  onRemoveImage: () => void;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
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
    onChangePhoneNumber,
    onImageChange,
    onRemoveImage,
    preview,
    selectedFile,
    setPreview,
    setSelectedFile,
  } = props;
  const { fullName, email, phoneNumber, initials, password, confirmPassword } =
    salespersonInformation;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [showPassword, setShowPassword] = useState(false);

  const loadingRequestAction = useTypedSelector(
    (state) => state.salesPersons.loadingRequestAction
  );

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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
            placeholder="Enter Sales Rep's Initials"
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
          <PhoneNumberInput
            name="phoneNumber"
            value={phoneNumber}
            label="Phone Number"
            labelId="phoneNumber"
            placeholder="Enter Phone Number"
            onChange={onChangePhoneNumber}
            error={phoneNumberError!}
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
            type={showPassword ? "text" : "password"}
            label="Password"
            labelId="password"
            name="password"
            value={password}
            placeholder="Enter Sales Rep's Password"
            onChange={onChange}
            error={passwordError}
            autoComplete="off"
            right={
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </Grid>
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            labelId="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter Sales Reps ConfirmPassword"
            onChange={onChange}
            error={confirmPasswordError}
            autoComplete="off"
            right={
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </Grid>
      </Grid>
      <Grid item container mb={5}>
        <FileUploadLayout
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          preview={preview}
          setPreview={setPreview}
        />
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
