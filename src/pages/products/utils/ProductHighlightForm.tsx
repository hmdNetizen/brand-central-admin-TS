import React, { ElementType } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  SubmitButton,
  CancelButton,
  StyledCircularProgress,
} from "src/utilityStyles/pagesUtilityStyles";
import CustomLabelSwitch from "src/utils/CustomLabelSwitch";
import CustomFormInput from "src/utils/CustomFormInput";

const HighlightContainer = styled(Grid)<{ component: ElementType }>(
  ({ theme }) => ({
    padding: "1rem 5rem 2rem",

    [theme.breakpoints.down("md")]: {
      padding: "1rem 2rem 2rem",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "1rem 1rem 2rem",
    },
  })
);

type HighlightFormProps = {
  onSubmit: (event: React.FormEvent<Element>) => void;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  inFeatured: boolean;
  inPopular: boolean;
  inBestSellers: boolean;
  inWeeklyOffer: boolean;
  loading: boolean;
  newPriceCodeOne: number;
  newPriceCodeTwo: number;
  newPriceCodeThree: number;
  newPriceCodeFour: number;
  priceCode1Error: string;
  minimumQuantity: number;
  priceCode2Error: string;
  priceCode3Error: string;
  priceCode4Error: string;
  minQuantityError: string;
};

const ProductHighlightForm = (props: HighlightFormProps) => {
  const {
    onSubmit,
    onChecked,
    onInputChange,
    onClose,
    inFeatured,
    inBestSellers,
    inPopular,
    inWeeklyOffer,
    newPriceCodeOne,
    newPriceCodeTwo,
    newPriceCodeThree,
    newPriceCodeFour,
    minQuantityError,
    priceCode1Error,
    priceCode2Error,
    priceCode3Error,
    priceCode4Error,
    loading,
    minimumQuantity,
  } = props;
  return (
    <HighlightContainer
      item
      container
      direction="column"
      component="form"
      onSubmit={onSubmit}
    >
      <Grid item style={{ marginBottom: "2rem" }}>
        <CustomLabelSwitch
          label="Highlight in Featured"
          name="inFeatured"
          onChange={onChecked}
          checked={inFeatured}
          isActive={inFeatured}
        />
      </Grid>
      <Grid item style={{ marginBottom: "2rem" }}>
        <CustomLabelSwitch
          label="Highlight in Best Sellers"
          name="inBestSellers"
          checked={inBestSellers}
          isActive={inBestSellers}
          onChange={onChecked}
        />
      </Grid>
      <Grid item style={{ marginBottom: "2rem" }}>
        <CustomLabelSwitch
          label="Highlight in Popular"
          name="inPopular"
          checked={inPopular}
          isActive={inPopular}
          onChange={onChecked}
        />
      </Grid>
      <Grid item container direction="column">
        <Grid item style={{ marginBottom: "2rem" }}>
          <CustomLabelSwitch
            label="Highlight in Weekly Offers"
            name="inWeeklyOffer"
            checked={inWeeklyOffer}
            isActive={inWeeklyOffer}
            onChange={onChecked}
          />
        </Grid>
        {inWeeklyOffer && (
          <Grid item container direction="column">
            <Grid item container columnGap={3} rowSpacing={2} sx={{ mb: 2 }}>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="Price Code 1"
                  labelId="priceCode1"
                  name="priceCode1"
                  value={newPriceCodeOne}
                  placeholder="Enter Price Code 1"
                  onChange={onInputChange}
                  error={priceCode1Error}
                />
              </Grid>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="Price Code 2"
                  labelId="priceCode2"
                  name="priceCode2"
                  value={newPriceCodeTwo}
                  placeholder="Enter Price Code 2"
                  onChange={onInputChange}
                  error={priceCode2Error}
                />
              </Grid>
            </Grid>
            <Grid item container columnGap={3} rowSpacing={2} mb={2}>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="Price Code 3"
                  labelId="priceCode3"
                  name="priceCode3"
                  value={newPriceCodeThree}
                  placeholder="Enter Price Code 3"
                  onChange={onInputChange}
                  error={priceCode3Error}
                />
              </Grid>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="Price Code 4"
                  labelId="priceCode4"
                  name="priceCode4"
                  value={newPriceCodeFour}
                  placeholder="Enter Price Code 4"
                  onChange={onInputChange}
                  error={priceCode4Error}
                />
              </Grid>
            </Grid>
            <Grid item container columnGap={3} rowSpacing={2}>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="Minimum Quantity"
                  labelId="minimumQuantity"
                  name="minimumQuantity"
                  value={minimumQuantity}
                  placeholder="Enter Minmimum Quantity"
                  onChange={onInputChange}
                  error={minQuantityError}
                />
              </Grid>
              <Grid item sm xs={12}></Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        columnSpacing={1}
        style={{ marginTop: "5rem" }}
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
            disabled={loading}
          >
            {loading && (
              <StyledCircularProgress style={{ height: 25, width: 25 }} />
            )}{" "}
            Submit
          </SubmitButton>
        </Grid>
      </Grid>
    </HighlightContainer>
  );
};

export default ProductHighlightForm;
