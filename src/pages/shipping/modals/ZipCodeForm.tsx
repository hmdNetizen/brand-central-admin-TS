import React from "react";
import Grid from "@mui/material/Grid";
import CustomFormInput from "src/utils/CustomFormInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  StyledFormContainer,
  StyledCircularProgress,
  CancelButton,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";

type ZipCodeFormProps = {
  onSubmit: (event: React.FormEvent<Element>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  zipCode: string;
  isEdit?: boolean;
  zipCodeError: string;
  loadingZipCodeAction: boolean;
};

const ZipCodeForm = (props: ZipCodeFormProps) => {
  const {
    zipCode,
    isEdit,
    onChange,
    onSubmit,
    loadingZipCodeAction,
    onClose,
    zipCodeError,
  } = props;

  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

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
            onChange={onChange}
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
          <CancelButton onClick={onClose}>Cancel</CancelButton>
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
  );
};

export default ZipCodeForm;
