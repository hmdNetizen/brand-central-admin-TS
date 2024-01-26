import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  ErrorMsg,
  ErrorsList,
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
  balance: string;
  companyNameError: string | undefined;
  customerCodeError: string | undefined;
  companyEmailError?: string;
  phoneNumberError?: string;
  balanceError?: string;
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

  const errors = useTypedSelector((state) => state.salespersonCustomers.errors);
  const error = useTypedSelector((state) => state.salespersonCustomers.error);

  const loadingSalespersonCustomerAction = useTypedSelector(
    (state) => state.salespersonCustomers.loadingSalespersonCustomerAction
  );

  const salespeopleInitials = salespeople.map(
    (salesperson) => salesperson.initials
  );

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
    balance,
    onChange,
    companyNameError,
    customerCodeError,
    companyEmailError,
    phoneNumberError,
    addressError,
    contactNameError,
    balanceError,
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
      {!loadingSalespersonCustomerAction && error && (
        <ErrorsList item component="ul">
          <ErrorMsg variant="body1" component="li" color="error">
            {error}
          </ErrorMsg>
        </ErrorsList>
      )}

      {!loadingSalespersonCustomerAction && errors.length > 0 && (
        <ErrorsList item component="ul" hasBullet>
          {errors.map((err) => (
            <ErrorMsg
              variant="body1"
              component="li"
              color="error"
              key={err.param}
            >
              {err.msg}
            </ErrorMsg>
          ))}
        </ErrorsList>
      )}
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
            label="Company Name"
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
            label="Company Email"
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
            label="Company Address"
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
          <CustomSelect
            options={[
              "pricecode 1",
              "pricecode 2",
              "pricecode 3",
              "pricecode 4",
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
            type="number"
            label="Balance ($)"
            labelId="balance"
            name="balance"
            value={balance}
            placeholder="Enter Company's Account Balance"
            onChange={onChange}
            error={balanceError}
            autoComplete="off"
          />
        </Grid>
        <Grid
          item
          style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
          md={5.5}
        >
          {/* <CustomFormInput
            type="text"
            label="Contact Person"
            labelId="contactName"
            name="contactName"
            value={contactName}
            placeholder="Enter Contact Person Name"
            onChange={onChange}
            error={contactNameError}
            autoComplete="off"
          /> */}
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <SubmitButton
          type="submit"
          variant="contained"
          disableRipple
          color="secondary"
          disabled={loadingSalespersonCustomerAction}
        >
          {loadingSalespersonCustomerAction && (
            <StyledCircularProgress style={{ height: 25, width: 25 }} />
          )}{" "}
          {buttonTitle}
        </SubmitButton>
      </Grid>
    </StyledFormContainer>
  );
};

export default SalespersonCustomerFormContainer;
