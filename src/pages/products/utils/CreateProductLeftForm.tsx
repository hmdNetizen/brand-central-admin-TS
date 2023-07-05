import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material";

import CustomFormInput from "src/utils/CustomFormInput";
import CustomSelect from "src/utils/CustomSelect";
import CustomCheckbox from "src/utils/CustomCheckbox";
import CustomTextArea from "src/utils/CustomTextArea";
import {
  SubmitButton,
  StyledCircularProgress,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import ProductSizeForm from "./ProductSizeForm";
import { ProductLeftFormProps } from "./types";
import ProductWholesaleForm from "./ProductWholesaleForm";
import { productMeasurements, shippingCategoryList } from "src/lib/helpers";
import {
  Content,
  SuccessMessage,
  SuccessWrapper,
} from "./CreateProduct.Styles";

const CreateProductLeftForm = (props: ProductLeftFormProps) => {
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const categories = useTypedSelector((state) => state.categories.categories);
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const brands = useTypedSelector((state) => state.brands.brandsList);

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const SelectEvent = event as React.ChangeEvent<HTMLInputElement>;
    props.onChange(SelectEvent);

    const newSubCategories = [...subCategories].filter((subCategory) =>
      subCategory.category
        .toLowerCase()
        .includes(SelectEvent.target.value.toLowerCase())
    );

    props.setFilteredSubCategory(newSubCategories);
  };

  return (
    <Content item style={{ flex: 4 }}>
      <Grid container direction="column" rowSpacing={2}>
        {props.productSuccessMessage && (
          <Grid item container justifyContent="center">
            <SuccessWrapper item>
              <SuccessMessage variant="body1">
                {props.productSuccessMessage}
              </SuccessMessage>
            </SuccessWrapper>
          </Grid>
        )}
        {!props.loading && props.error && (
          <ErrorsList item component="ul" hasBullet>
            {props.error.map((err) => (
              <ErrorMsg
                variant="body1"
                component="li"
                color="error"
                key={err.param}
              >
                {err.msg}
              </ErrorMsg>
            ))}
          </ErrorsList>
        )}
        <Grid item>
          <CustomFormInput
            type="text"
            label="Product Name"
            labelId="productName"
            name="productName"
            value={props.productName}
            placeholder="Enter Product Name"
            onChange={props.onChange}
            error={props.productNameError}
          />
        </Grid>
        <Grid item>
          <CustomFormInput
            type="text"
            label="Product UPC"
            labelId="productUPC"
            name="productUPC"
            value={props.productUPC}
            placeholder="Enter Unique Product Code"
            onChange={props.onChange}
            error={props.productUPCError}
          />
        </Grid>
        <Grid item>
          <CustomFormInput
            type="text"
            label="Units of Measurement"
            labelId="units"
            name="units"
            value={props.units}
            placeholder="CS, EA, BX, DZ, PK etc..."
            onChange={props.onChange}
            error={props.unitsError}
          />
        </Grid>
        <Grid item>
          <CustomFormInput
            type="text"
            label="Item Code"
            labelId="itemCode"
            name="itemCode"
            value={props.itemCode}
            placeholder="AIRCO16"
            onChange={props.onChange}
            error={props.itemCodeError}
          />
        </Grid>
        <Grid item>
          <CustomSelect
            options={categories.map(({ categoryName }) => categoryName)}
            name="category"
            value={props.category}
            onChange={handleCategoryChange}
            label="Category"
            placeholder="Select Category"
            errorMessage={props.categoryError}
          />
        </Grid>
        <Grid item>
          <CustomSelect
            options={props.filteredSubCategory.map(({ name }) => name)}
            name="subCategory"
            value={props.subCategory}
            onChange={props.onSelectChange}
            label="Sub Category"
            placeholder="Select Sub Category"
            errorMessage={props.subCategoryError}
            disabled={!props.category}
          />
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <CustomSelect
              options={brands.map((brand) => brand.name)}
              name="productBrand"
              value={props.productBrand}
              onChange={props.onSelectChange}
              label="Brand"
              placeholder="Select Brand"
              errorMessage={props.productBrandError}
            />
          </Grid>
          {props.productBrand === "Others" && (
            <Grid item style={{ marginTop: "2rem", width: 250 }}>
              <CustomFormInput
                type="text"
                label=""
                labelId=""
                name="customBrandName"
                value={props.customBrandName}
                placeholder="Enter Brand Name"
                onChange={props.onChange}
                error={props.customBrandNameError}
              />
            </Grid>
          )}
        </Grid>
        <Grid item container direction="column">
          <CustomCheckbox
            name="shippingTimeChecked"
            label="Allow Estimated Shipping Time"
            id="shippingTime"
            description="Allow Estimated Shipping Time"
            checked={props.shippingTimeChecked}
            onChange={props.onChecked}
          />
          {props.shippingTimeChecked && (
            <Grid item style={{ marginTop: "2rem" }}>
              <CustomFormInput
                type="text"
                label="Product Estimated Shipping Time*"
                labelId="shippingTime"
                name="shippingTime"
                value={props.shippingTime}
                placeholder="Estimated Shipping Time"
                onChange={props.onChange}
                error={props.shippingTimeError}
              />
            </Grid>
          )}
        </Grid>

        <Grid item container direction="column">
          <CustomCheckbox
            name="sizesChecked"
            label="Allow Product Sizes"
            id="sizesChecked"
            description="Allow Product Sizes"
            checked={props.sizesChecked}
            onChange={props.onChecked}
          />
          {props.sizesChecked && (
            <ProductSizeForm
              sizeNameError={props.sizeNameError}
              sizePriceError={props.sizePriceError}
              sizeQuantityError={props.sizeQuantityError}
              productSizeForm={props.productSizeForm}
              setProductSizeForm={props.setProductSizeForm}
            />
            // <Grid
            //   item
            //   container
            //   style={{ marginTop: "2rem" }}
            //   alignItems="center"
            //   justifyContent="center"
            //   columnGap={3}
            //   rowGap={2}
            // >
            //   <Grid item>
            //     <CustomFormInput
            //       type="text"
            //       label="Size Name"
            //       labelId="sizeName"
            //       name="sizeName"
            //       value={sizeName}
            //       placeholder="eg. S,M,L,XL,XXL,3XL,4XL"
            //       onChange={props.onChange}
            //       error={sizeNameError}
            //     />
            //   </Grid>
            //   <Grid item style={{ maxWidth: 200 }}>
            //     <CustomFormInput
            //       type="number"
            //       label="Size Qty:"
            //       labelId="sizeQuantity"
            //       name="sizeQuantity"
            //       value={sizeQuantity}
            //       placeholder="Number of quantity of this size"
            //       onChange={props.onChange}
            //       error={sizeQuantityError}
            //     />
            //   </Grid>
            //   <Grid item style={{ maxWidth: 200 }}>
            //     <CustomFormInput
            //       type="number"
            //       label="Size Price"
            //       labelId="sizePrice"
            //       name="sizePrice"
            //       value={sizePrice}
            //       placeholder="Added to the base price"
            //       onChange={props.onChange}
            //       error={sizePriceError}
            //     />
            //   </Grid>
            // </Grid>
          )}
        </Grid>
        <Grid item container direction="column">
          <CustomCheckbox
            name="wholesaleChecked"
            label="Allow Product Wholesale"
            id="wholesaleChecked"
            description="Allow Product Wholesale"
            checked={props.wholesaleChecked}
            onChange={props.onChecked}
          />
          {props.wholesaleChecked && (
            // <Grid
            //   item
            //   container
            //   style={{ marginTop: "2rem" }}
            //   alignItems="center"
            //   justifyContent="center"
            //   columnGap={3}
            //   rowGap={2}
            // >
            //   <Grid item md>
            //     <CustomFormInput
            //       type="number"
            //       label=""
            //       labelId=""
            //       name="wholesaleQuantity"
            //       value={wholesaleQuantity}
            //       placeholder="Enter Quantity"
            //       onChange={props.onChange}
            //       error={wholesaleQuantityError}
            //     />
            //   </Grid>
            //   <Grid item md>
            //     <CustomFormInput
            //       type="number"
            //       label=""
            //       labelId=""
            //       name="wholesaleDiscountPercentage"
            //       value={wholesaleDiscountPercentage}
            //       placeholder="Enter Discount Percentage"
            //       onChange={props.onChange}
            //       // error={wholesaleDiscountPercentageError}
            //     />
            //   </Grid>
            // </Grid>
            <ProductWholesaleForm
              wholesaleForm={props.wholesaleForm}
              setWholesaleForm={props.setWholesaleForm}
              wholesaleQuantityError={props.wholesaleQuantityError}
              setWholesaleQuantityError={props.setWholesaleQuantityError}
              wholesalePercentageDiscountError={
                props.wholesalePercentageDiscountError
              }
              setWholesalePercentageDiscountError={
                props.setWholesalePercentageDiscountError
              }
            />
          )}
        </Grid>
        <Grid item>
          <CustomFormInput
            type="number"
            label="Product Stock"
            labelId="productStock"
            name="productStock"
            value={props.productStock}
            placeholder="E.g 20"
            onChange={props.onChange}
            error={props.productStockError}
          />
        </Grid>
      </Grid>
      <Grid item container direction="column" style={{ marginTop: "2rem" }}>
        <Grid item>
          <CustomCheckbox
            name="isThresholdActive"
            label="isThresholdActive"
            id="isThresholdActive"
            description="Set Max Quantity Threshold"
            checked={props.isThresholdActive}
            onChange={(event) => {
              props.onChecked(event);
              props.setMaximumQuantityError("");
            }}
          />
          {props.isThresholdActive && (
            <Grid item style={{ marginTop: "1rem" }}>
              <CustomFormInput
                type="number"
                label="Maximum Quantity"
                labelId="maximumQuantity"
                name="maximumQuantity"
                value={props.maximumQuantity}
                placeholder="E.g 20"
                onChange={props.onChange}
                error={props.maximumQuantityError}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: "2rem" }}>
        <CustomSelect
          options={shippingCategoryList}
          name="shippingCategory"
          value={props.shippingCategory}
          onChange={props.onSelectChange}
          label="Shipping Category"
          placeholder="Select Shipping Category"
        />
      </Grid>
      <Grid item container direction="column" style={{ marginTop: "2rem" }}>
        <CustomCheckbox
          name="measurementChecked"
          label="Allow Product Measurement"
          id="productMeasurement"
          description="Allow Product Measurement"
          checked={props.measurementChecked}
          onChange={props.onChecked}
        />
        {props.measurementChecked && (
          <Grid item container direction="column">
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="body1">Product Measurement</Typography>
              </Grid>
              <Grid item>
                <CustomSelect
                  options={productMeasurements}
                  name="productMeasurement"
                  value={props.productMeasurement}
                  onChange={props.onSelectChange}
                  label=""
                  placeholder="Choose Measurement"
                  errorMessage={props.productMeasurementError}
                />
              </Grid>
            </Grid>
            {props.productMeasurement === "Custom" && (
              <Grid item style={{ width: 250 }}>
                <CustomFormInput
                  type="number"
                  label=""
                  labelId=""
                  name="customMeasurement"
                  value={props.customMeasurement}
                  placeholder="Enter Unit"
                  onChange={props.onChange}
                  error={props.customMeasurementError}
                />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      <Grid item style={{ marginTop: "2rem" }}>
        <CustomTextArea
          label="Product Description"
          id="productDescription"
          name="productDescription"
          onChange={props.onChange}
          value={props.productDescription}
        />
      </Grid>
      {!matchesSM && (
        <Grid
          item
          container
          justifyContent="center"
          style={{ marginTop: "5rem" }}
        >
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
            Create Product
          </SubmitButton>
        </Grid>
      )}
    </Content>
  );
};

export default CreateProductLeftForm;
