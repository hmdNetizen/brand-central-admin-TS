import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { ContentContainer } from "src/utilityStyles/pagesUtilityStyles";
import ShowDialog from "src/utils/ShowDialog";
import ModalHeading from "src/components/common/ModalHeading";
import SalespersonCustomerFormContainer from "src/components/salespersons/customers/utils/FormContainer";
import { SelectChangeEvent } from "@mui/material";
import { useActions } from "src/hooks/useActions";
import { validateEmail } from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type CreateSalespersonCustomerProps = {
  openAddSalespersonCustomer: boolean;
  setOpenAddSalespersonCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

type ErrorsTypes = {
  companyNameError?: string;
  companyEmailError?: string;
  phoneNumberError?: string;
  contactNameError?: string;
  priceCodeError?: string;
  initialsError?: string;
  addressError?: string;
  customerCodeError?: string;
};

const CreateSalespersonCustomer = (props: CreateSalespersonCustomerProps) => {
  const { openAddSalespersonCustomer, setOpenAddSalespersonCustomer } = props;
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [salespersonId, setSalespersonId] = useState("");

  const [customerInformation, setCustomerInformation] = useState({
    companyName: "",
    customerCode: "",
    companyEmail: "",
    address: "",
    phoneNumber: "",
    contactName: "",
    priceCode: "",
    initials: "",
  });

  const [customerInfoErrors, setCustomerInfoErrors] = useState<ErrorsTypes>({
    addressError: "",
    companyEmailError: "",
    companyNameError: "",
    contactNameError: "",
    customerCodeError: "",
    initialsError: "",
    phoneNumberError: "",
    priceCodeError: "",
  });

  const salespeople = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );

  const { createNewSalespersonCustomer } = useActions();

  const {
    address,
    companyName,
    contactName,
    companyEmail,
    customerCode,
    initials,
    phoneNumber,
    priceCode,
  } = customerInformation;

  const validateInput = () => {
    const errors: ErrorsTypes = {};

    if (!companyName.trim())
      errors.companyNameError = "Company Name is required";

    if (!customerCode.trim())
      errors.customerCodeError = "Enter customer identification code";

    if (!validateEmail(companyEmail))
      errors.companyEmailError = "Enter a valid email address";

    if (!address.trim())
      errors.addressError = "Enter an address for this customer";

    if (!priceCode.trim())
      errors.priceCodeError = "Please select a price code for this customer";

    if (!initials.trim())
      errors.initialsError = "Please select a sales rep's initial";

    setCustomerInfoErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerInformation((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (value: string) => {
    setCustomerInformation((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectEvent = event as React.ChangeEvent<HTMLInputElement>;
    const { name, value } = selectEvent.target;

    setCustomerInformation((prev) => ({ ...prev, [name]: value }));

    if (name === "initials") {
      const salesperson = salespeople.filter(
        (salesperson) => salesperson.initials === value
      );

      setSalespersonId(salesperson[0]._id);
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!validateInput()) {
      return;
    }

    createNewSalespersonCustomer({
      setOpen: setOpenAddSalespersonCustomer,
      address,
      companyEmail,
      companyName,
      contactName,
      customerCode,
      phoneNumber,
      priceCode: priceCode.split(" ").join(""),
      referrer: salespersonId,
    });
  };

  return (
    <ShowDialog
      openModal={openAddSalespersonCustomer}
      handleClose={() => setOpenAddSalespersonCustomer(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <ModalHeading
          title="Add a Sales Rep's customer"
          setOpen={setOpenAddSalespersonCustomer}
        />
        <SalespersonCustomerFormContainer
          address={address}
          companyEmail={companyEmail}
          companyName={companyName}
          contactName={contactName}
          customerCode={customerCode}
          initials={initials}
          phoneNumber={phoneNumber}
          priceCode={priceCode}
          addressError={customerInfoErrors.addressError}
          companyNameError={customerInfoErrors.companyNameError}
          priceCodeError={customerInfoErrors.priceCodeError}
          customerCodeError={customerInfoErrors.customerCodeError}
          initialsError={customerInfoErrors.initialsError}
          companyEmailError={customerInfoErrors.companyEmailError}
          contactNameError={customerInfoErrors.contactNameError}
          phoneNumberError={customerInfoErrors.phoneNumberError}
          onSubmit={handleSubmit}
          onChange={handleChange}
          buttonTitle="Create Customer"
          onSelectChange={handleSelectChange}
          onChangePhoneNumber={handlePhoneNumberChange}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default CreateSalespersonCustomer;
