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
import { SalespersonInfoProps } from "../types";

type salespersonInfoErrorProps = {
  fullNameError?: string;
  initialsError?: string;
  emailError?: string;
  phoneNumberError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
};

type CreateSalespersonProps = {
  openAddSalesperson: boolean;
  setOpenAddSalesperson: React.Dispatch<React.SetStateAction<boolean>>;
};

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

  const [fullNameError, setFullNameError] = useState("");

  const { fullName } = salespersonInformation;

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    console.log("Submitted");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSalespersonInformation((prev) => ({ ...prev, [name]: value }));
  };

  const loadingRequestAction = useTypedSelector(
    (state) => state.salesPersons.loadingRequestAction
  );
  const error = useTypedSelector((state) => state.salesPersons.error);

  return (
    <ShowDialog
      openModal={openAddSalesperson}
      handleClose={() => setOpenAddSalesperson(false)}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
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
          <Grid item alignSelf="center">
            <Typography
              variant="h4"
              style={{ marginBottom: 0 }}
              color="secondary"
            >
              Add New Sales Representative
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                setOpenAddSalesperson(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
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
          buttonTitle="Create Salesperson"
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default CreateSalesperson;
