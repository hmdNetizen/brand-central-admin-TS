import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import ShowDialog from "src/utils/ShowDialog";
import {
  ContentContainer,
  ErrorMsg,
  ErrorsList,
} from "src/utilityStyles/pagesUtilityStyles";
import ModalHeading from "src/components/common/ModalHeading";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import FormContainer from "src/components/salespersons/utils/FormContainer";
import { salespersonInfoErrorProps, SalespersonInfoProps } from "../types";
import { SalespersonReturnedPayload } from "src/services/salespersons/SalesPersonTypes";
import { validateEmail } from "src/lib/helpers";
import { useActions } from "src/hooks/useActions";

type EditSalespersonProps = {
  openEditSalesperson: boolean;
  setOpenEditSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
};

type SalespersonPayloadExcerpt = Omit<
  SalespersonReturnedPayload,
  "_id" | "isActive" | "profileImage" | "createdAt"
>;

const initialSalespersonInformation = {
  fullName: "",
  email: "",
  initials: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const EditSalesperson = (props: EditSalespersonProps) => {
  const theme = useTheme();
  const { openEditSalesperson, setOpenEditSalesperson } = props;

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [salespersonInformation, setSalespersonInformation] =
    useState<SalespersonInfoProps>(initialSalespersonInformation);

  const [errors, setErrors] = useState<salespersonInfoErrorProps>({});
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [preview, setPreview] = useState<string | undefined>();

  const { fullName, email, initials, phoneNumber, password, confirmPassword } =
    salespersonInformation;

  const loadingRequestAction = useTypedSelector(
    (state) => state.salesPersons.loadingRequestAction
  );
  const error = useTypedSelector((state) => state.salesPersons.error);
  const singleSalesperson = useTypedSelector(
    (state) => state.salesPersons.singleSalesperson
  );

  const { updateSalesperson } = useActions();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSalespersonInformation((prev) => ({ ...prev, [name]: value }));
  };

  const validation = () => {
    const errorsList: salespersonInfoErrorProps = {};

    if (!fullName.trim()) errorsList.fullNameError = "Full name is required";

    if (!initials.trim())
      errorsList.initialsError = "Initials of sales rep is required";

    if (!email.trim()) errorsList.emailError = "Email address is required";

    if (!validateEmail(email))
      errorsList.emailError = "Please enter a valid email address";

    setErrors(errorsList);

    return Object.keys(errorsList).length === 0;
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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!validation()) {
      return;
    }

    updateSalesperson({
      setOpenEditSalesperson,
      setSelectedFile,
      email,
      fullName,
      id: singleSalesperson?._id!,
      initials,
      phoneNumber,
      profileImage: selectedFile,
    });
  };

  useEffect(() => {
    if (singleSalesperson) {
      const newSalespersonInformation = { ...initialSalespersonInformation };

      for (const key in newSalespersonInformation) {
        if (key in singleSalesperson) {
          newSalespersonInformation[key as keyof SalespersonPayloadExcerpt] =
            singleSalesperson[key as keyof SalespersonPayloadExcerpt];
        }

        if (singleSalesperson.profileImage) {
          setPreview(singleSalesperson.profileImage);
        } else {
          setPreview("");
        }
      }
      setSalespersonInformation(newSalespersonInformation);
    }

    // eslint-disable-next-line
  }, [singleSalesperson]);

  return (
    <ShowDialog
      openModal={openEditSalesperson}
      handleClose={() => setOpenEditSalesperson(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <ModalHeading
          setOpen={setOpenEditSalesperson}
          title="Edit Sales person"
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
          buttonTitle="Update Sales Person"
          onChangePhoneNumber={handlePhoneNumberChange}
          preview={preview}
          setPreview={setPreview}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
          isEdit={true}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default EditSalesperson;
