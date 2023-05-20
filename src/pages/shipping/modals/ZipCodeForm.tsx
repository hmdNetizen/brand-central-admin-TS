import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import CustomFormInput from "src/utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  ContentContainer,
  StyledFormContainer,
  StyledCircularProgress,
  CancelButton,
  SubmitButton,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";

type ZipCodeFormProps = {
  openZipCode: boolean;
  setOpenZipCode: React.Dispatch<React.SetStateAction<boolean>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  isEdit?: boolean;
};

const ZipCodeForm = (props: ZipCodeFormProps) => {
  const { openZipCode, setOpenZipCode, zipCode, setZipCode, isEdit } = props;

  const theme = useTheme();

  const { addShippingZipCodes, updateShippingZipCodes } = useActions();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [zipCodeError, setZipCodeError] = useState("");

  const error = useTypedSelector((state) => state.shipping.error);
  const singleZipCode = useTypedSelector(
    (state) => state.shipping.singleZipCode
  );
  const loadingZipCodeAction = useTypedSelector(
    (state) => state.shipping.loadingZipCodeAction
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setZipCode(event.target.value);

    switch (name) {
      case "zipCode":
        if (!value) {
          setZipCodeError("Please enter zip code");
        } else {
          setZipCodeError("");
        }
        break;
      default:
        setZipCodeError("");
    }
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    if (!zipCode.trim()) {
      setZipCodeError("Please enter zip code");
      return;
    }

    if (zipCodeError) return;

    if (isEdit) {
      updateShippingZipCodes({
        setOpenZipCode,
        setZipCode,
        zipId: singleZipCode?._id!,
        zipCode,
      });
    } else {
      addShippingZipCodes({
        setOpenZipCode,
        setZipCode,
        zipCode,
      });
    }
  };

  const handleClose = () => {
    setZipCodeError("");
  };

  return (
    <ShowDialog
      openModal={openZipCode}
      handleClose={handleClose}
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
              {isEdit ? "Edit Zip Code" : "Add New Zip Code"}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingZipCodeAction && error && (
          <ErrorsList item component="ul">
            <ErrorMsg variant="body1" component="li" color="error">
              {error}
            </ErrorMsg>
          </ErrorsList>
        )}
        <StyledFormContainer
          item
          container
          direction="column"
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid
            item
            container
            justifyContent="center"
            style={{ marginBottom: "2rem" }}
          >
            <Grid
              item
              style={{ width: matchesXS ? "100%" : matchesSM ? 450 : 600 }}
            >
              <CustomFormInput
                type="text"
                label="Zip Code (required)"
                labelId="zipCode"
                name="zipCode"
                value={zipCode}
                placeholder="Enter zip code"
                onChange={handleChange}
                error={zipCodeError}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={1}
            rowSpacing={1}
            style={{ marginTop: "2rem" }}
          >
            <Grid item>
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
            </Grid>
            <Grid item>
              <SubmitButton
                type="submit"
                variant="contained"
                disableRipple
                color="secondary"
                disabled={loadingZipCodeAction}
              >
                {loadingZipCodeAction && (
                  <StyledCircularProgress style={{ height: 25, width: 25 }} />
                )}{" "}
                {isEdit ? "Update Zip Code" : "Add Zip Code"}
              </SubmitButton>
            </Grid>
          </Grid>
        </StyledFormContainer>
      </ContentContainer>
    </ShowDialog>
  );
};

export default ZipCodeForm;
