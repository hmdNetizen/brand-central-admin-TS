import React, { ElementType } from "react";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import {
  SubmitButton,
  CancelButton,
  StyledCircularProgress,
} from "src/utilityStyles/pagesUtilityStyles";
import CustomLabelSwitch from "src/utils/CustomLabelSwitch";
import CustomFormInput from "src/utils/CustomFormInput";
import { HighlightFormProps } from "./types";

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

const ProductHighlightForm = (props: HighlightFormProps) => {
  const theme = useTheme();
  return (
    <HighlightContainer
      item
      container
      direction="column"
      component="form"
      onSubmit={props.onSubmit}
    >
      <Grid item style={{ marginBottom: "2rem" }}>
        <CustomLabelSwitch
          label="Highlight in Featured"
          name="inFeatured"
          onChange={props.onChecked}
          checked={props.inFeatured}
          isActive={props.inFeatured}
          mainThemeColor={"#fff"}
          lightThemeColor={theme.palette.common.grey}
        />
      </Grid>
      <Grid item style={{ marginBottom: "2rem" }}>
        <CustomLabelSwitch
          label="Highlight in Best Sellers"
          name="inBestSellers"
          checked={props.inBestSellers}
          isActive={props.inBestSellers}
          onChange={props.onChecked}
          mainThemeColor={"#fff"}
          lightThemeColor={theme.palette.common.grey}
        />
      </Grid>
      <Grid item style={{ marginBottom: "2rem" }}>
        <CustomLabelSwitch
          label="Highlight in Popular"
          name="inPopular"
          checked={props.inPopular}
          isActive={props.inPopular}
          onChange={props.onChecked}
          mainThemeColor={"#fff"}
          lightThemeColor={theme.palette.common.grey}
        />
      </Grid>
      <Grid item container direction="column">
        <Grid item style={{ marginBottom: "2rem" }}>
          <CustomLabelSwitch
            label="Highlight in Weekly Offers"
            name="inWeeklyOffer"
            checked={props.inWeeklyOffer}
            isActive={props.inWeeklyOffer}
            onChange={props.onChecked}
            mainThemeColor={"#fff"}
            lightThemeColor={theme.palette.common.grey}
          />
        </Grid>
        {props.inWeeklyOffer && (
          <Grid item container direction="column">
            <Grid item container columnGap={3} rowSpacing={2} sx={{ mb: 2 }}>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="New Price Code 1"
                  labelId="newPriceCodeOne"
                  name="newPriceCodeOne"
                  value={props.newPriceCodeOne}
                  placeholder="Enter Price Code 1"
                  onChange={props.onInputChange}
                  error={props.priceCode1Error}
                />
              </Grid>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="New Price Code 2"
                  labelId="newPriceCodeTwo"
                  name="newPriceCodeTwo"
                  value={props.newPriceCodeTwo}
                  placeholder="Enter Price Code 2"
                  onChange={props.onInputChange}
                  error={props.priceCode2Error}
                />
              </Grid>
            </Grid>
            <Grid item container columnGap={3} rowSpacing={2} mb={2}>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="New Price Code 3"
                  labelId="newPriceCodeThree"
                  name="newPriceCodeThree"
                  value={props.newPriceCodeThree}
                  placeholder="Enter Price Code 3"
                  onChange={props.onInputChange}
                  error={props.priceCode3Error}
                />
              </Grid>
              <Grid item sm xs={12}>
                <CustomFormInput
                  type="number"
                  label="New Price Code 4"
                  labelId="newPriceCodeFour"
                  name="newPriceCodeFour"
                  value={props.newPriceCodeFour}
                  placeholder="Enter Price Code 4"
                  onChange={props.onInputChange}
                  error={props.priceCode4Error}
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
                  value={props.minimumQuantity}
                  placeholder="Enter Minmimum Quantity"
                  onChange={props.onInputChange}
                  error={props.minQuantityError}
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
          <CancelButton onClick={props.onClose}>Cancel</CancelButton>
        </Grid>
        <Grid item>
          <SubmitButton
            type="submit"
            variant="contained"
            disableRipple
            color="secondary"
            disabled={props.loading}
          >
            {props.loading && (
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
