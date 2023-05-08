import Grid from "@mui/material/Grid";
import CustomDatePicker from "src/utils/CustomDatePicker";
import CustomTextArea from "src/utils/CustomTextArea";
import CustomFormInput from "src/utils/CustomFormInput";
import {
  StyledFormContainer,
  StyledChip,
  StyledCircularProgress,
  CancelButton,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";
import CustomSelect from "src/utils/CustomSelect";
import React from "react";
import { FormContainerProps } from "../types";
import CustomCheckbox from "src/utils/CustomCheckbox";

const FormContainer = (props: FormContainerProps) => {
  const {
    onSubmit,
    couponCode,
    couponCodeError,
    isEdit,
    onChange,
    onClick,
    onSelectChange,
    couponType,
    couponTypeError,
    couponQuantity,
    amountOff,
    percentageOff,
    amountOffError,
    percentageOffError,
    couponQuantityError,
    couponUsageQuantity,
    couponUsageQuantityError,
    usePerCustomer,
    usesPerCustomerError,
    usageQuantity,
    customerUsageQuantityError,
    endDate,
    startDate,
    endDateError,
    startDateError,
    minimumPurchaseAmount,
    minAmountChecked,
    setMinPurchaseAmountError,
    setMinAmountChecked,
    couponDescription,
    couponDescriptionError,
    minPurchaseAmountError,
    onClose,
    loadingRequestAction,
    onEndDate,
    onStartDate,
  } = props;

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setMinPurchaseAmountError("");
    }
    setMinAmountChecked(event.target.checked);
  };

  return (
    <StyledFormContainer
      item
      container
      direction="column"
      component="form"
      onSubmit={onSubmit}
    >
      <Grid item container justifyContent="center" direction="column" mb={3}>
        <Grid item xs={12}>
          <CustomFormInput
            type="text"
            label="Coupon Code"
            labelId="couponCode"
            name="couponCode"
            value={couponCode}
            placeholder="Enter Coupon Code"
            onChange={onChange}
            error={couponCodeError}
            autoComplete="off"
            disabled={isEdit}
          />
        </Grid>
        {!isEdit && (
          <StyledChip
            label="Auto Generate Coupon"
            variant="outlined"
            onClick={onClick}
          />
        )}
      </Grid>
      <Grid item container mb={3} columnGap={3}>
        <Grid item xs={12} sm>
          <CustomSelect
            options={["discount by amount", "discount by percentage"]}
            name="couponType"
            value={couponType}
            onChange={onSelectChange}
            label="Coupon Type"
            placeholder="Select Coupon Type"
            errorMessage={couponTypeError}
          />
        </Grid>
        {couponType && (
          <Grid item sm xs={12}>
            <CustomFormInput
              type="number"
              label={
                couponType === "discount by amount"
                  ? "Amount Off ($)"
                  : "Percentage Off (%)"
              }
              labelId={
                couponType === "discount by amount"
                  ? "amountOff"
                  : "percentageOff"
              }
              name={
                couponType === "discount by amount"
                  ? "amountOff"
                  : "percentageOff"
              }
              value={
                couponType === "discount by amount" ? amountOff : percentageOff
              }
              placeholder={
                couponType === "discount by amount"
                  ? "Enter Price Off"
                  : "Enter Percentage Off"
              }
              onChange={onChange}
              autoComplete="off"
              error={
                couponType === "discount by amount"
                  ? amountOffError
                  : percentageOffError
              }
            />
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "2rem" }}
        columnGap={3}
        rowSpacing={2}
      >
        <Grid item xs={12} sm>
          <CustomSelect
            options={["unlimited", "limited"]}
            name="couponQuantity"
            value={couponQuantity}
            onChange={onSelectChange}
            label="Coupon Quantity"
            placeholder="Select Coupon Quantity"
            errorMessage={couponQuantityError}
          />
        </Grid>
        {couponQuantity === "limited" && (
          <Grid item sm xs={12}>
            <CustomFormInput
              type="number"
              label="Set Coupon Quantity"
              labelId="couponUsageQuantity"
              name="couponUsageQuantity"
              value={couponUsageQuantity}
              placeholder="Enter number of usage per Counpon"
              onChange={onChange}
              autoComplete="off"
              error={couponUsageQuantityError}
            />
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "2rem" }}
        columnGap={4}
        rowSpacing={2}
      >
        <Grid item xs={12} sm>
          <CustomSelect
            options={["unlimited", "limited"]}
            name="usePerCustomer"
            value={usePerCustomer}
            onChange={onSelectChange}
            label="Uses Per Customer"
            placeholder="Select Uses Per Customer"
            errorMessage={usesPerCustomerError}
          />
        </Grid>
        {usePerCustomer === "limited" && (
          <Grid item sm xs={12}>
            <CustomFormInput
              type="number"
              label="Set Usage Quantity"
              labelId="customerUsageQuantity"
              name="customerUsageQuantity"
              value={usageQuantity}
              placeholder="Enter number of usage per Customer"
              onChange={onChange}
              autoComplete="off"
              error={customerUsageQuantityError}
            />
          </Grid>
        )}
      </Grid>
      <Grid item container columnGap={3} rowSpacing={4} mb={3}>
        <Grid item sm xs={12}>
          <CustomDatePicker
            name="startDate"
            value={startDate}
            onDateChange={onStartDate}
            label="Start Date"
            error={startDateError}
          />
        </Grid>
        <Grid item sm xs={12}>
          <CustomDatePicker
            name="endDate"
            value={endDate}
            onDateChange={onEndDate}
            label="End Date"
            error={endDateError}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        columnGap={3}
        rowSpacing={2}
        mb={2}
      >
        <Grid item sm xs={12}>
          <CustomCheckbox
            description="Set Minimum Purchase Amount"
            label="Set Minimum Purchase Amount"
            id="purchaseAmount"
            checked={minAmountChecked}
            onChange={handleCheck}
          />
        </Grid>
        {minAmountChecked && (
          <Grid item sm xs={12}>
            <CustomFormInput
              type="number"
              label=""
              name="minPurchaseAmount"
              value={minimumPurchaseAmount}
              placeholder="Enter Minimum Purchase Amount"
              onChange={onChange}
              autoComplete="off"
              error={minPurchaseAmountError}
            />
          </Grid>
        )}
      </Grid>
      <Grid item container>
        <CustomTextArea
          label="Coupon Description"
          name="couponDescription"
          value={couponDescription}
          onChange={onChange}
          id="couponDescription"
          error={couponDescriptionError}
        />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
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
            disabled={loadingRequestAction}
          >
            {loadingRequestAction && (
              <StyledCircularProgress style={{ height: 25, width: 25 }} />
            )}{" "}
            {isEdit ? "Update Coupon" : "Add Coupon"}
          </SubmitButton>
        </Grid>
      </Grid>
    </StyledFormContainer>
  );
};

export default FormContainer;
