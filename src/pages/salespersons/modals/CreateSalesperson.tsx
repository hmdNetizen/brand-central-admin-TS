import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import ShowDialog from "src/utils/ShowDialog";
import {
  ContentContainer,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import FormContainer from "src/components/salespersons/utils/FormContainer";
import {
  CreateSalespersonProps,
  salespersonInfoErrorProps,
  SalespersonInfoProps,
} from "../types";
import { useActions } from "src/hooks/useActions";
import ModalHeading from "src/components/common/ModalHeading";

const CreateSalesperson = ({
  openAddSalesperson,
  setOpenAddSalesperson,
}: CreateSalespersonProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [salespersonInformation, setSalespersonInformation] =
    useState<SalespersonInfoProps>({
      fullName: "",
      email: "",
      initials: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });

  const [errors, setErrors] = useState<salespersonInfoErrorProps>({});
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [preview, setPreview] = useState<string | undefined>();

  const { fullName, email, initials, phoneNumber, password, confirmPassword } =
    salespersonInformation;

  const loadingRequestAction = useTypedSelector(
    (state) => state.salesPersons.loadingRequestAction
  );
  const error = useTypedSelector((state) => state.salesPersons.error);

  const { addNewSalesperson } = useActions();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    addNewSalesperson({
      setOpenAddSalesperson,
      email,
      fullName,
      initials,
      phoneNumber,
      profileImage: selectedFile,
      password,
      confirmPassword,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSalespersonInformation((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (value: string) => {
    setSalespersonInformation((prev) => ({
      ...prev,
      phoneNumber: value,
    }));

    // if (!value || value === "1") {
    //   setCompanyPhoneNumberError("Please enter company's phone number");
    // } else if (
    //   !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
    // ) {
    //   setCompanyPhoneNumberError("Please input correct phone number");
    // } else {
    //   setCompanyPhoneNumberError("");
    // }
  };

  const handleRemoveImage = () => {
    setSelectedFile("");
  };

  return (
    <ShowDialog
      openModal={openAddSalesperson}
      handleClose={() => setOpenAddSalesperson(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        {/* Heading goes here */}
        <ModalHeading
          title="Add a New Salesperson"
          setOpen={setOpenAddSalesperson}
        />
        {!loadingRequestAction && error && (
          <ErrorsList item component="ul">
            <ErrorMsg variant="body1" component="li" color="error">
              {error}
            </ErrorMsg>
          </ErrorsList>
        )}
        <FormContainer
          fullNameError={errors.fullNameError}
          onChange={handleChange}
          onSubmit={handleSubmit}
          salespersonInformation={salespersonInformation}
          initialsError={errors.initialsError}
          emailError={errors.emailError}
          phoneNumberError={errors.phoneNumberError}
          passwordError={errors.passwordError}
          confirmPasswordError={errors.confirmPasswordError}
          buttonTitle="Create a Salesperson"
          onChangePhoneNumber={handlePhoneNumberChange}
          preview={preview}
          setPreview={setPreview}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default CreateSalesperson;
