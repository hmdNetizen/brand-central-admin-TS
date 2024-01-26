import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SelectChangeEvent } from "@mui/material";

import ShowDialog from "src/utils/ShowDialog";
import { ContentContainer } from "src/utilityStyles/pagesUtilityStyles";
import ModalHeading from "src/components/common/ModalHeading";
import SalespersonCustomerFormContainer from "src/components/salespersons/customers/utils/FormContainer";
import { validateEmail } from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { SalespersonCustomerResponsePayload } from "src/services/salespersons/customers/types";
import { useActions } from "src/hooks/useActions";
import { SalespersonCustomerInfoProps } from "../../types";

type EditSalespersonCustomerProps = {
  openEditSalespersonCustomer: boolean;
  setOpenEditSalespersonCustomer: React.Dispatch<React.SetStateAction<boolean>>;
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
  balanceError?: string;
};

type SalespersonCustomerExcerpt = Omit<
  SalespersonCustomerResponsePayload,
  "id" | "createdAt"
>;

const initialContactInformation = {
  companyName: "",
  customerCode: "",
  companyEmail: "",
  address: "",
  phoneNumber: "",
  contactName: "",
  priceCode: "",
  initials: "",
  balance: "",
};

const EditSalespersonCustomer = (props: EditSalespersonCustomerProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const { openEditSalespersonCustomer, setOpenEditSalespersonCustomer } = props;

  const [customerInformation, setCustomerInformation] =
    useState<SalespersonCustomerInfoProps>(initialContactInformation);
  const [salespersonId, setSalespersonId] = useState("");

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

  const singleSalespersonCustomer = useTypedSelector(
    (state) => state.salespersonCustomers.singleSalespersonCustomer
  );
  const salespeople = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );

  const { updateSalespersonCustomer } = useActions();

  const {
    address,
    companyName,
    contactName,
    companyEmail,
    customerCode,
    initials,
    phoneNumber,
    priceCode,
    balance,
  } = customerInformation;

  const validateInput = () => {
    const errors: ErrorsTypes = {};

    if (!companyName.trim())
      errors.companyNameError = "Company Name is required";

    if (!customerCode.trim())
      errors.customerCodeError = "Enter customer identification code";

    if (companyEmail && !validateEmail(companyEmail))
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

  const handlePhoneNumberChange = (value: string) => {
    setCustomerInformation((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!validateInput()) {
      return;
    }

    // console.log({
    //   customerId: singleSalespersonCustomer?.id!,
    //   setOpen: setOpenEditSalespersonCustomer,
    //   address,
    //   companyEmail,
    //   companyName,
    //   contactName,
    //   customerCode,
    //   phoneNumber,
    //   priceCode: priceCode.split(" ").join(""),
    //   referrer: salespersonId,
    // });

    updateSalespersonCustomer({
      customerId: singleSalespersonCustomer?.id!,
      setOpen: setOpenEditSalespersonCustomer,
      address,
      companyEmail,
      companyName,
      contactName,
      customerCode,
      phoneNumber,
      priceCode: priceCode.split(" ").join(""),
      referrer: salespersonId,
      balance,
    });
  };

  useEffect(() => {
    if (singleSalespersonCustomer) {
      const newInitialsCustomerInformation = { ...initialContactInformation };

      for (const key in newInitialsCustomerInformation) {
        if (key in singleSalespersonCustomer) {
          // @ts-expect-error
          newInitialsCustomerInformation[
            key as keyof SalespersonCustomerExcerpt
          ] =
            singleSalespersonCustomer[key as keyof SalespersonCustomerExcerpt];
        }

        setCustomerInformation(newInitialsCustomerInformation);
      }

      const transformedPriceCode = singleSalespersonCustomer.priceCode
        .replace(/([a-z])([0-9])/i, "$1 $2")
        .toLowerCase();

      setCustomerInformation((prev) => ({
        ...prev,
        priceCode: transformedPriceCode,
        initials: singleSalespersonCustomer.referrer.initials,
        balance: singleSalespersonCustomer.balance.toString(),
      }));

      // setCustomerInformation((prev) => ({
      //   ...prev,
      //   initials: singleSalespersonCustomer.referrer.initials,
      // }));
    }
  }, [singleSalespersonCustomer]);

  useEffect(() => {
    if (initials) {
      const salesperson = salespeople.filter(
        (salesperson) => salesperson.initials === initials
      );

      setSalespersonId(salesperson[0]._id);
    }
  }, [initials]);

  return (
    <ShowDialog
      openModal={openEditSalespersonCustomer}
      handleClose={() => setOpenEditSalespersonCustomer(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <ModalHeading
          title="Edit Sales Rep's customer"
          setOpen={setOpenEditSalespersonCustomer}
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
          buttonTitle="Update Customer"
          onSelectChange={handleSelectChange}
          onChangePhoneNumber={handlePhoneNumberChange}
          balance={balance}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default EditSalespersonCustomer;
