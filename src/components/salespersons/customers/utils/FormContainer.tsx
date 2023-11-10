import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  StyledCircularProgress,
  StyledFormContainer,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomSelect from "src/utils/CustomSelect";
import { SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import PhoneNumberInput from "src/utils/PhoneNumberInput";
import { CountryData } from "react-phone-input-2";

type SalespersonCustomerFormContainerProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement | HTMLDivElement>) => void;
  companyName: string;
  customerCode: string;
  address: string;
  phoneNumber: string;
  contactName: string;
  companyEmail: string;
  priceCode: string;
  initials: string;
  companyNameError: string | undefined;
  customerCodeError: string | undefined;
  companyEmailError?: string;
  phoneNumberError?: string;
  addressError: string | undefined;
  contactNameError?: string;
  priceCodeError: string | undefined;
  initialsError: string | undefined;
  buttonTitle: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
  onChangePhoneNumber: (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
};

const SalespersonCustomerFormContainer = (
  props: SalespersonCustomerFormContainerProps
) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const salespeople = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );

  const salespeopleInitials = salespeople.map(
    (salesperson) => salesperson.initials
  );

  const loadingRequestAction = false;

  const {
    onSubmit,
    address,
    companyEmail,
    companyName,
    contactName,
    customerCode,
    initials,
    phoneNumber,
    priceCode,
    onChange,
    companyNameError,
    customerCodeError,
    companyEmailError,
    phoneNumberError,
    addressError,
    contactNameError,
    priceCodeError,
    initialsError,
    buttonTitle,
    onSelectChange,
    onChangePhoneNumber,
  } = props;
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
        rowGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="company Name"
            labelId="companyName"
            name="companyName"
            value={companyName}
            placeholder="Enter Company Name"
            onChange={onChange}
            error={companyNameError}
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
            label="Company Code"
            labelId="customerCode"
            name="customerCode"
            value={customerCode}
            placeholder="Enter company code"
            onChange={onChange}
            error={customerCodeError}
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
        rowGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="company Email"
            labelId="companyEmail"
            name="companyEmail"
            value={companyEmail}
            placeholder="Enter Company Email"
            onChange={onChange}
            error={companyEmailError}
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
        rowGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          <CustomFormInput
            type="text"
            label="company Address"
            labelId="address"
            name="address"
            value={address}
            placeholder="Enter Company Address"
            onChange={onChange}
            error={addressError}
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
            label="Contact Person"
            labelId="contactName"
            name="contactName"
            value={contactName}
            placeholder="Enter Contact Person Name"
            onChange={onChange}
            error={contactNameError}
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
        rowGap="2rem"
      >
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          {/* <CustomFormInput
            type="text"
            label="Price Code"
            labelId="priceCode"
            name="priceCode"
            value={priceCode}
            placeholder="Enter Price Code"
            onChange={onChange}
            error={priceCodeError}
            autoComplete="off"
          /> */}
          <CustomSelect
            options={[
              "priceCode 1",
              "priceCode 2",
              "priceCode 3",
              "priceCode 4",
            ]}
            name="priceCode"
            value={priceCode}
            onChange={onSelectChange}
            label="Price Code"
            placeholder="Select a Price Code"
            errorMessage={priceCodeError}
          />
        </Grid>
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          {/* <CustomFormInput
            type="text"
            label="Sales Rep's Initials"
            labelId="initials"
            name="initials"
            value={initials}
            placeholder="Enter Sales Rep's Initials"
            onChange={onChange}
            error={initialsError}
            autoComplete="off"
          /> */}
          <CustomSelect
            options={salespeopleInitials}
            name="initials"
            value={initials}
            onChange={onSelectChange}
            label="Sales Rep's Initials"
            placeholder="Select a Sales Rep's Initials"
            errorMessage={initialsError}
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

export default SalespersonCustomerFormContainer;
