import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { ContentContainer } from "src/utilityStyles/pagesUtilityStyles";
import ShowDialog from "src/utils/ShowDialog";
import ModalHeading from "src/components/common/ModalHeading";
import SalespersonCustomerFormContainer from "src/components/salespersons/customers/utils/FormContainer";

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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    console.log("Submitted");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerInformation((prev) => ({ ...prev, [name]: value }));
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
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default CreateSalespersonCustomer;
