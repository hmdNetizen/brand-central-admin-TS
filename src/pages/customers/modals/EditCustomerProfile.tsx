import React, { useState, useEffect } from "react";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomSelect from "src/utils/CustomSelect";
import { countryList } from "src/lib/dataset/countriesList";
import PhoneNumberInput from "src/utils/PhoneNumberInput";
import { useActions } from "src/hooks/useActions";
import ImagePreview from "src/components/uploads/ImagePreview";
import {
  ContactInitialStateType,
  CustomerProfileExcerpt,
  EditCustomerProps,
} from "../types";
import { SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  ContentContainer,
  FormContainer,
  StyledCircularProgress,
  SubmitButton,
  CancelButton,
} from "../styles/EditCustomerProfileStyles";

const initialState = {
  companyName: "",
  companyEmail: "",
  companyPhoneNumber: "",
  businessType: "",
  paymentMethod: "",
  priceCode: "",
  taxID: "",
  primaryContactName: "",
  primaryContactEmail: "",
  primaryContactRole: "",
  primaryContactPhoneNumber: "",
};

const contactInitialState = {
  city: "",
  state: "",
  address: "",
  country: "United States",
  postalCode: "",
};

const roles = ["Administrator", "Buyer", "Manager", "Owner", "Others"];

const EditCustomerProfile = (props: EditCustomerProps) => {
  const { openEditCustomer, setOpenEditCustomer, customerProfileData } = props;
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [customerData, setCustomerData] =
    useState<CustomerProfileExcerpt>(initialState);
  const [businessContact, setBusinessContact] =
    useState<ContactInitialStateType>(contactInitialState);
  const [customPrimaryContactRole, setCustomPrimaryContactRole] = useState("");

  // ERROR HANDLING STATES
  const [companyNameError, setCompanyNameError] = useState("");
  // const [companyEmailError, setCompanyEmailError] = useState("");
  const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState("");
  // const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  // const [stateError, setStateError] = useState("");
  // const [postalCodeError, setPostalCodeError] = useState("");
  const [taxIdError, setTaxIdError] = useState("");
  const [priceCodeError, setPriceCodeError] = useState("");
  const [primaryContactNameError, setPrimaryContactNameError] = useState("");
  const [primaryContactEmailError, setPrimaryContactEmailError] = useState("");

  const [primaryContactPhoneNumberError, setPrimaryContactPhoneNumberError] =
    useState("");
  const [primaryContactRoleError, setPrimaryContactRoleError] = useState("");
  const [customPrimaryContactRoleError, setCustomPrimaryContactRoleError] =
    useState("");

  const {
    companyName,
    companyEmail,
    companyPhoneNumber,
    businessType,
    paymentMethod,
    priceCode,
    taxID,
    primaryContactName,
    primaryContactEmail,
    primaryContactRole,
    primaryContactPhoneNumber,
  } = customerData;

  const { city, state, address, country, postalCode } = businessContact;

  const updatingCustomer = useTypedSelector(
    (state) => state.customers.updatingCustomer
  );
  const singleCustomer = useTypedSelector(
    (state) => state.customers.singleCustomer
  );
  const uploadedFile = useTypedSelector((state) => state.common.uploadedFile);

  const { updateCustomerProfile } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });

    switch (name) {
      case "companyName":
        if (!value.trim()) {
          setCompanyNameError("Please enter your company name");
        } else {
          setCompanyNameError("");
        }
        break;
      case "companyTaxId":
        if (!value.trim()) {
          setTaxIdError("Please enter your company's VAT / TAX ID");
        } else {
          setTaxIdError("");
        }
        break;

      case "primaryContactName":
        if (!value.trim()) {
          setPrimaryContactNameError("Primary Contact Name is required");
        } else {
          setPrimaryContactNameError("");
        }
        break;

      case "primaryContactEmail":
        if (!value) {
          setPrimaryContactEmailError("");
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setPrimaryContactEmailError("Please enter a valid email");
        } else {
          setPrimaryContactEmailError("");
        }
        break;
      default:
        setCompanyNameError("");
        setCompanyPhoneNumberError("");
        setTaxIdError("");
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectEvent = event as SelectChangeEvent<HTMLInputElement>;

    const { name, value } = selectEvent.target;

    setCustomerData({
      ...customerData,
      [name]: value,
    });

    switch (name) {
      case "priceCode":
        if (!value) {
          setPriceCodeError("Select a price code");
        } else {
          setPriceCodeError("");
        }

        break;
      default:
        setPriceCodeError("");
        setCustomPrimaryContactRoleError("");
    }
  };

  const handleCustomContactRole = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCustomPrimaryContactRole(event.target.value);

    if (primaryContactRole === "Others" && !event.target.value) {
      setCustomPrimaryContactRoleError("Please enter contact role");
    } else {
      setCustomPrimaryContactRoleError("");
    }
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBusinessContact({
      ...businessContact,
      [name]: value,
    });

    switch (name) {
      case "city":
        if (!value.trim()) {
          setCityError("Location city is required");
        } else {
          setCityError("");
        }
        break;
      default:
        setCityError("");
    }
  };

  const handleCompanyPhoneNumber = (value: string) => {
    setCustomerData({
      ...customerData,
      companyPhoneNumber: value,
    });

    if (!value || value === "1") {
      setCompanyPhoneNumberError("Please enter company's phone number");
    } else if (
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
    ) {
      setCompanyPhoneNumberError("Please input correct phone number");
    } else {
      setCompanyPhoneNumberError("");
    }
  };

  const handlePrimaryContactPhoneNumber = (value: string) => {
    setCustomerData({
      ...customerData,
      primaryContactPhoneNumber: value,
    });

    if (!value) {
      setPrimaryContactPhoneNumberError("");
    } else if (value === "1") {
      setPrimaryContactPhoneNumberError("Please input correct phone number");
    } else if (
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
    ) {
      setPrimaryContactPhoneNumberError("Please input correct phone number");
    } else {
      setPrimaryContactPhoneNumberError("");
    }
  };

  const handleUpdateProduct = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (
      !companyName &&
      !companyPhoneNumber &&
      !city &&
      !priceCode &&
      !state &&
      !taxID &&
      !primaryContactName &&
      !primaryContactRole
    ) {
      setCompanyNameError("Company name is required");
      setCompanyPhoneNumberError("Company Phone number is required");
      setPriceCodeError("Select a price code");
      setCityError("Location city is required");
      setTaxIdError("Tax ID is required");
      setPrimaryContactNameError("Contact Name is required");
      setPrimaryContactRoleError("Contact role is required");
      return;
    }

    if (!companyName) {
      setCompanyNameError("Company name is required");
      return;
    }

    if (!companyPhoneNumber) {
      setCompanyPhoneNumberError("Company Phone number is required");
      return;
    }

    if (!city) {
      setCityError("Location city is required");
      return;
    }

    if (!priceCode) {
      setPriceCodeError("PriceCode is required");
      return;
    }

    if (!taxID) {
      setTaxIdError("Tax ID is required");
      return;
    }

    if (!primaryContactName) {
      setPrimaryContactNameError("Primary Contact Name is required");
      return;
    }

    if (!primaryContactRole) {
      setPrimaryContactRoleError("Contact role is required");
      return;
    }

    if (primaryContactRole === "Others" && !customPrimaryContactRole) {
      setCustomPrimaryContactRoleError("Please enter contact role");
      return;
    }

    if (
      companyNameError ||
      companyPhoneNumberError ||
      cityError ||
      taxIdError ||
      priceCodeError ||
      primaryContactNameError ||
      primaryContactRoleError
    ) {
      return;
    }

    updateCustomerProfile({
      customerId: singleCustomer?._id!,
      setOpenEditCustomer,
      companyName,
      companyEmail,
      companyPhoneNumber,
      priceCode,
      city,
      state,
      address,
      country,
      postalCode,
      paymentMethod,
      businessType,
      taxID,
      primaryContactRole:
        primaryContactRole === "Others"
          ? customPrimaryContactRole
          : primaryContactRole,
      primaryContactName,
      primaryContactPhoneNumber,
      primaryContactEmail,
      profileImage: uploadedFile ? uploadedFile.url : "",
    });
  };

  useEffect(() => {
    if (customerProfileData) {
      const newCustomerData = { ...initialState };
      const newBusinessContact = { ...contactInitialState };

      for (const key in customerProfileData) {
        if (key in newCustomerData) {
          // @ts-ignore
          newCustomerData[key as keyof CustomerProfileExcerpt] =
            customerProfileData[key as keyof CustomerProfileExcerpt];

          if (
            key === "primaryContactRole" &&
            roles.indexOf(customerProfileData.primaryContactRole) === -1
          ) {
            newCustomerData[key] = "Others";
            setCustomPrimaryContactRole(
              customerProfileData["primaryContactRole"]
            );
          }

          if (customerProfileData.primaryContactEmail === null) {
            newCustomerData["primaryContactEmail"] = "";
          }

          if (customerProfileData.primaryContactPhoneNumber === null) {
            newCustomerData["primaryContactPhoneNumber"] = "";
          }

          setCustomerData(newCustomerData);
        }
      }

      for (const key in customerProfileData?.businesContact) {
        if (key in newBusinessContact) {
          newBusinessContact[key as keyof ContactInitialStateType] =
            customerProfileData?.businesContact[
              key as keyof ContactInitialStateType
            ];
        }
      }

      setBusinessContact(newBusinessContact);
    }
  }, [customerProfileData]);

  return (
    <ShowDialog
      openModal={openEditCustomer}
      handleClose={() => setOpenEditCustomer(false)}
      width={matchesXS ? "100%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item>
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Edit Customer
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpenEditCustomer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <FormContainer
          item
          container
          direction="column"
          component="form"
          onSubmit={handleUpdateProduct}
        >
          <Grid
            item
            container
            justifyContent="center"
            style={{ marginTop: "2rem" }}
          >
            <ImagePreview dataValue={singleCustomer!} />
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="Company Name"
                labelId="companyName"
                name="companyName"
                value={companyName}
                placeholder="Enter Company Name"
                onChange={handleChange}
                error={companyNameError}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="Company Email"
                labelId="companyEmail"
                name="companyEmail"
                value={companyEmail}
                placeholder="Enter Company Email"
                onChange={handleChange}
                disabled
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              {/* <PhoneNumberInput
                name="companyPhoneNumber"
                value={companyPhoneNumber}
                label="Company Phone Number"
                labelId="companyPhoneNumber"
                placeholder="Enter Company Phone Number"
                onChange={handleCompanyPhoneNumber}
                error={companyPhoneNumberError}
                labelColor={theme.palette.secondary.main}
              /> */}
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="Company Address"
                labelId="address"
                name="address"
                value={address}
                placeholder="Enter Company Address"
                onChange={handleContactChange}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="state"
                labelId="state"
                name="state"
                value={state}
                placeholder="Enter State"
                onChange={handleContactChange}
                // error={stateError}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="City"
                labelId="city"
                name="city"
                value={city}
                placeholder="Enter City"
                onChange={handleContactChange}
                error={cityError}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="number"
                label="Zip Code"
                labelId="postalCode"
                name="postalCode"
                value={postalCode}
                placeholder="Enter Zip Code"
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomSelect
                label="Country"
                placeholder="Select Country"
                options={countryList}
                value={country}
                name="country"
                onChange={handleSelectChange}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <CustomSelect
                label="Business Type"
                options={["store", "pharmacy", "supermarket", "wholesaler"]}
                name="businessType"
                value={businessType}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomSelect
                label="Service Type"
                name="paymentMethod"
                options={["cash & carry", "delivery"]}
                value={paymentMethod}
                onChange={handleSelectChange}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="number"
                label="Tax ID"
                labelId="taxID"
                name="taxID"
                value={taxID}
                placeholder="Enter Tax ID"
                onChange={handleChange}
                error={taxIdError}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomSelect
                label="Price Code"
                options={[
                  "priceCode1",
                  "priceCode2",
                  "priceCode3",
                  "priceCode4",
                ]}
                name="priceCode"
                value={priceCode}
                onChange={handleSelectChange}
                errorMessage={priceCodeError}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="Primary Contact Name"
                labelId="primaryContactName"
                name="primaryContactName"
                value={primaryContactName}
                placeholder="Enter Primary Contact Name"
                onChange={handleChange}
                error={primaryContactNameError}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomFormInput
                type="text"
                label="Primary Contact Email"
                labelId="primaryContactEmail"
                name="primaryContactEmail"
                value={primaryContactEmail}
                placeholder="Enter Primary Contact Name"
                onChange={handleChange}
                error={primaryContactEmailError}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            columnGap={3}
            rowGap={2}
            sx={{ mb: 2 }}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item sx={{ flex: 1 }}>
              <PhoneNumberInput
                name="primaryContactPhoneNumber"
                value={primaryContactPhoneNumber}
                label="Primary Contact Phone Number"
                labelId="primaryContactPhoneNumber"
                placeholder="Enter Primary Contact Phone Number"
                onChange={handlePrimaryContactPhoneNumber}
                error={primaryContactPhoneNumberError}
              />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <CustomSelect
                label="Primary Contact Role"
                placeholder="Select a role"
                options={roles}
                name="primaryContactRole"
                value={primaryContactRole}
                onChange={handleSelectChange}
              />
              {primaryContactRole === "Others" && (
                <CustomFormInput
                  type="text"
                  label=""
                  labelId="customPrimaryContactRole"
                  name="customPrimaryContactRole"
                  value={customPrimaryContactRole}
                  placeholder="Enter Contact Role"
                  onChange={handleCustomContactRole}
                  error={customPrimaryContactRoleError}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={1}
            style={{ marginTop: "5rem" }}
          >
            <Grid item>
              <CancelButton onClick={() => setOpenEditCustomer(false)}>
                Cancel
              </CancelButton>
            </Grid>
            <Grid item>
              <SubmitButton
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                disabled={updatingCustomer}
              >
                {updatingCustomer && (
                  <StyledCircularProgress style={{ height: 25, width: 25 }} />
                )}{" "}
                Save
              </SubmitButton>
            </Grid>
          </Grid>
        </FormContainer>
      </ContentContainer>
      {/* <Typography variant="h2">Edit Customer</Typography> */}
    </ShowDialog>
  );
};

export default EditCustomerProfile;
