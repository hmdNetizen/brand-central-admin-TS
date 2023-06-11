import React, { ChangeEvent, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomSelect from "src/utils/CustomSelect";
import {
  capitalizeFirstLetters,
  productMeasurements,
  shippingCategoryList,
} from "src/lib/helpers";
import CustomCheckbox from "src/utils/CustomCheckbox";
import CustomTextArea from "src/utils/CustomTextArea";
import {
  StyledCircularProgress,
  CancelButton,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";
import { SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import FileUploadLayout from "src/components/uploads/FileUploadLayout";
import GalleryItem from "src/components/products/GalleryItem";
import { ProductFormProps } from "./types";
import ProductSizeForm from "./ProductSizeForm";
import ProductWholesaleForm from "./ProductWholesaleForm";

const AddMoreButton = styled(SubmitButton)({
  borderRadius: 5,
});

const EditProductForm = (props: ProductFormProps) => {
  const theme = useTheme();

  //   MEDIA QUERIES
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const categories = useTypedSelector((state) => state.categories.categories);
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const brandsList = useTypedSelector((state) => state.brands.brandsList);

  const handleFilter = (value: string) => {
    const newSubCategories = [...subCategories].filter((subCategory) =>
      subCategory.category.toLowerCase().includes(value.toLowerCase())
    );

    props.setFilteredSubCategory(newSubCategories);
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectEvent = event as ChangeEvent<HTMLInputElement>;

    props.onSelectChange(event);
    handleFilter(selectEvent.target.value);
  };

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    props.setSelectedFile(file);
  };

  const handleRemoveProductImage = () => {
    props.setSelectedFile("");
    props.setImagePreview(undefined);
  };

  const handleRemove = (id: string) => {
    const newPreviews = props.previews.filter((preview) => preview.id !== id);
    props.setPreviews(newPreviews);
  };

  return (
    <Grid
      item
      container
      direction="column"
      component="form"
      style={{ padding: "2rem", paddingBottom: "3rem" }}
      onSubmit={props.onSubmit}
    >
      <Grid
        item
        container
        columnGap={3}
        rowGap={2}
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="text"
            label="Product Name"
            labelId="productName"
            name="productName"
            value={props.productName}
            placeholder="Enter Product Name"
            onChange={props.onInputChange}
            error={props.productNameError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="text"
            label="Product UPC"
            labelId="productUPC"
            name="productUPC"
            value={props.productUPC}
            placeholder="Enter Unique Product Code"
            onChange={props.onInputChange}
            error={props.productUPCError}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnGap={3}
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
        rowGap={2}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="text"
            label="Units of Measurement"
            labelId="units"
            name="units"
            value={props.units}
            placeholder="CS, EA, BX, DZ, PK etc..."
            onChange={props.onInputChange}
            error={props.unitsError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="text"
            label="Item Code"
            labelId="itemCode"
            name="itemCode"
            value={props.itemCode}
            placeholder="AIRCO16"
            onChange={props.onInputChange}
            error={props.itemCodeError}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnGap={3}
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
        rowGap={2}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomSelect
            options={categories.map(({ categoryName }) =>
              categoryName.toLowerCase()
            )}
            name="category"
            onChange={handleSelectChange}
            label="Category"
            placeholder="Select Category"
            value={props.category}
            errorMessage={props.categoryError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomSelect
            options={props.filteredSubCategory.map(({ name }) =>
              name.toLowerCase()
            )}
            name="subCategory"
            value={props.subCategory}
            onChange={props.onSelectChange}
            label="Sub Category"
            placeholder="Select Sub Category"
            errorMessage={props.subCategoryError}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
        rowGap={2}
        columnGap={3}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomSelect
            options={brandsList.map((brand) =>
              capitalizeFirstLetters(brand.name)
            )}
            name="brandName"
            value={props.brandName}
            onChange={props.onSelectChange}
            label="Brand"
            placeholder="Select Brand"
            errorMessage={props.brandNameError}
          />
        </Grid>
        {props.brandName === "Others" && (
          <Grid item sx={{ flex: 1, mt: matchesXS ? 0 : "2rem" }}>
            <CustomFormInput
              type="text"
              label=""
              labelId=""
              name="customBrandName"
              value={props.customBrandName}
              placeholder="Enter Brand Name"
              onChange={props.onInputChange}
              autoFocus={props.brandName === "Others"}
            />
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        columnGap={3}
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
        rowGap={2}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Price Code 1"
            labelId="priceCode1"
            name="priceCode1"
            value={props.priceCode1}
            placeholder="e.g 20"
            onChange={props.onInputChange}
            error={props.priceCode1Error}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Price Code 2"
            labelId="priceCode2"
            name="priceCode2"
            value={props.priceCode2}
            placeholder="e.g 20"
            onChange={props.onInputChange}
            error={props.priceCode2Error}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnGap={3}
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
        rowGap={2}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Price Code 3"
            labelId="priceCode3"
            name="priceCode3"
            value={props.priceCode3}
            placeholder="e.g 20"
            onChange={props.onInputChange}
            error={props.priceCode3Error}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Price Code 4"
            labelId="priceCode4"
            name="priceCode4"
            value={props.priceCode4}
            placeholder="e.g 20"
            onChange={props.onInputChange}
            error={props.priceCode4Error}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        columnGap={3}
        sx={{ mb: 2 }}
        direction={matchesXS ? "column" : "row"}
        rowGap={2}
      >
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Product Stock"
            labelId="productStock"
            name="productStock"
            value={props.productStock}
            placeholder="e.g 20"
            onChange={props.onInputChange}
            error={props.productStockError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="SRP"
            labelId="SRP"
            name="SRP"
            value={props.SRP}
            placeholder="e.g 20"
            onChange={props.onInputChange}
            error={props.SRPError}
          />
        </Grid>
        <Grid item container style={{ marginTop: "1rem" }}>
          <CustomSelect
            options={shippingCategoryList}
            name="shippingCategory"
            value={props.shippingCategory}
            onChange={props.onSelectChange}
            label="Shipping Category"
            placeholder="Select Shipping Category"
          />
        </Grid>
        <Grid item container direction="column" style={{ marginTop: "1rem" }}>
          <Grid item>
            <CustomCheckbox
              name="isThresholdActive"
              label="isThresholdActive"
              id="isThresholdActive"
              description="Set Max Quantity Threshold"
              checked={props.isThresholdActive}
              onChange={(event) => {
                props.onCheck(event);
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
                  onChange={props.onInputChange}
                  error={props.maximumQuantityError}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: "1rem" }}>
          <CustomTextArea
            label="Product Description"
            id="productDescription"
            name="productDescription"
            onChange={props.onInputChange}
            value={props.productDescription}
          />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" sx={{ mt: 2 }}>
        <Typography
          variant="h3"
          style={{ fontSize: matchesXS ? "1.65rem" : "2rem" }}
        >
          Product Image *
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        style={{
          marginTop: "2rem",
          marginBottom: "1rem",
          maxWidth: 300,
          maxHeight: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <FileUploadLayout
          onImageChange={handleChangeProductImage}
          onRemoveImage={handleRemoveProductImage}
          selectedFile={props.selectedFile}
          setImageError={props.setProductImageError}
          setSelectedFile={props.setSelectedFile}
          preview={props.imagePreview}
          setPreview={props.setImagePreview}
        />
        {props.productImageError && <small>{props.productImageError}</small>}
      </Grid>
      <Grid
        item
        style={{
          marginTop: matchesSM ? "2rem" : "1rem",
          marginBottom: "1rem",
        }}
        container
        justifyContent="center"
      >
        <Typography variant="body2">Product Gallery Images </Typography>
      </Grid>
      <Grid
        item
        style={{ marginBottom: "2rem" }}
        container
        justifyContent="center"
      >
        <AddMoreButton
          startIcon={<AddIcon />}
          variant="contained"
          disableRipple
          onClick={() => props.setOpenProductGallery(true)}
        >
          Add More Photos
        </AddMoreButton>
      </Grid>
      {props.previews.length > 0 && (
        <Grid
          item
          container
          flexWrap="wrap"
          sx={{ mb: 2 }}
          columnGap={2}
          rowGap={2}
          justifyContent="center"
        >
          {props.previews.map((previewItem) => (
            <GalleryItem
              key={previewItem.id}
              item={previewItem}
              onRemove={() => handleRemove(previewItem.id)}
              id={previewItem.id}
              setGalleryItemId={props.setGalleryItemId}
              galleryItemId={props.galleryItemId}
              loading={props.uploadingImage}
              previews={props.previews}
              setPreviews={props.setPreviews}
            />
          ))}
        </Grid>
      )}

      <Grid item container direction="column" sx={{ mb: 2 }}>
        <CustomCheckbox
          name="allowProductSizes"
          label="Allow Product Sizes"
          id="allowProductSizes"
          description="Allow Product Sizes"
          checked={props.allowProductSizes}
          onChange={props.onCheck}
        />
        {props.allowProductSizes && (
          <ProductSizeForm
            sizeNameError={props.sizeNameError}
            sizePriceError={props.sizePriceError}
            sizeQuantityError={props.sizeQuantityError}
            productSizeForm={props.productSizeForm}
            setProductSizeForm={props.setProductSizeForm}
          />
        )}
      </Grid>
      <Grid item container direction="column" sx={{ mb: 2 }}>
        <CustomCheckbox
          name="allowProductWholesale"
          label="Allow Product Wholesale"
          id="allowProductWholesale"
          description="Allow Product Wholesale"
          checked={props.allowProductWholesale}
          onChange={props.onCheck}
        />
        {props.allowProductWholesale && (
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
      <Grid item container direction="column">
        <CustomCheckbox
          name="allowMeasurement"
          label="Allow Product Measurement"
          id="allowMeasurement"
          description="Allow Product Measurement"
          checked={props.allowMeasurement}
          onChange={props.onCheck}
        />
        {props.allowMeasurement && (
          <Grid item container direction="column" style={{ marginTop: "1rem" }}>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="body1">Product Measurement</Typography>
              </Grid>
              <Grid item container={matchesXS}>
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
              <Grid
                item
                style={{
                  width: matchesXS ? "100%" : 250,
                  marginTop: matchesXS ? "1rem" : 0,
                }}
              >
                <CustomFormInput
                  type="number"
                  label=""
                  labelId=""
                  name="customMeasurement"
                  value={props.customMeasurement}
                  placeholder="Enter Unit"
                  onChange={props.onInputChange}
                  error={props.customMeasurementError}
                />
              </Grid>
            )}
          </Grid>
        )}
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
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
              disabled={props.loadingProductAction}
            >
              {props.loadingProductAction && <StyledCircularProgress />} Update
              Product
            </SubmitButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProductForm;
