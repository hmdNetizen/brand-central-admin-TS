import React, { ChangeEvent, FormEvent } from "react";
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
import { SubCategoryReturnedPayload } from "src/services/categories/CategoryTypes";
import FileUploadLayout from "src/components/uploads/FileUploadLayout";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";
import GalleryItem from "src/components/products/GalleryItem";

const AddMoreButton = styled(SubmitButton)({
  borderRadius: 5,
});

type ProductFormProps = {
  onSubmit: (event: FormEvent<Element>) => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  productName: string;
  productNameError: string;
  units: string;
  unitError: string;
  productUPC: string;
  productUPCError: string;
  itemCode: string;
  itemCodeError: string;
  productStock: number;
  productStockError: string;
  category: string;
  categoryError: string;
  subCategory: string;
  subCategoryError: string;
  brandName: string;
  brandNameError: string;
  customBrandName: string;
  priceCode1: number;
  priceCode1Error: string;
  priceCode2: number;
  priceCode2Error: string;
  priceCode3: number;
  priceCode3Error: string;
  priceCode4: number;
  priceCode4Error: string;
  SRP: number;
  SRPError: string;
  shippingCategory: string;
  shippingCategoryError: string;
  isThresholdActive: boolean;
  maximumQuantity: number;
  maximumQuantityError: string;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  wholesaleQuantity: number;
  allowProductWholesale: boolean;
  allowProductSizes: boolean;
  productMeasurement: string;
  productMeasurementError: string;
  name: string;
  quantity: number;
  price: number;
  sizeQuantityError: string;
  sizeNameError: string;
  sizePriceError: string;
  wholesaleQuantityError: string;
  allowMeasurement: boolean;
  customMeasurement: string;
  customMeasurementError: string;
  wholesaleDiscountPercentage: number;
  productDescription: string;
  filteredSubCategory: SubCategoryReturnedPayload[];
  setFilteredSubCategory: React.Dispatch<
    React.SetStateAction<SubCategoryReturnedPayload[]>
  >;
  previews: PhotoGalleryTypes[];
  setPreviews: React.Dispatch<React.SetStateAction<PhotoGalleryTypes[]>>;
  imagePreview: string | undefined;
  setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  productImageError: string;
  setProductImageError: React.Dispatch<React.SetStateAction<string>>;
  uploadingImage: boolean;
  updatingProduct: boolean;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
};

const EditProductForm = (props: ProductFormProps) => {
  const theme = useTheme();
  const {
    onSubmit,
    onInputChange,
    onSelectChange,
    onCheck,
    onClose,
    setOpenProductGallery,
    setMaximumQuantityError,
    itemCode,
    itemCodeError,
    productName,
    productNameError,
    productStock,
    productStockError,
    productUPC,
    productUPCError,
    units,
    unitError,
    brandName,
    brandNameError,
    category,
    categoryError,
    subCategory,
    subCategoryError,
    customBrandName,
    priceCode1,
    priceCode2,
    priceCode3,
    priceCode4,
    SRP,
    SRPError,
    priceCode1Error,
    priceCode2Error,
    priceCode3Error,
    priceCode4Error,
    shippingCategory,
    shippingCategoryError,
    isThresholdActive,
    maximumQuantity,
    maximumQuantityError,
    wholesaleQuantity,
    allowProductWholesale,
    allowProductSizes,
    productMeasurement,
    productMeasurementError,
    name,
    quantity,
    price,
    sizeQuantityError,
    sizeNameError,
    sizePriceError,
    wholesaleQuantityError,
    allowMeasurement,
    customMeasurement,
    customMeasurementError,
    wholesaleDiscountPercentage,
    productDescription,
    filteredSubCategory,
    setFilteredSubCategory,
    imagePreview,
    setImagePreview,
    selectedFile,
    setSelectedFile,
    productImageError,
    setProductImageError,
    previews,
    setPreviews,
    updatingProduct,
    uploadingImage,
    galleryItemId,
    setGalleryItemId,
  } = props;

  //   MEDIA QUERIES
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const categories = useTypedSelector((state) => state.categories.categories);
  const subCategories = useTypedSelector(
    (state) => state.categories.subCategories
  );
  const brands = useTypedSelector((state) => state.brands.brands);

  const handleFilter = (value: string) => {
    const newSubCategories = [...subCategories].filter((subCategory) =>
      subCategory.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSubCategory(newSubCategories);
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectEvent = event as ChangeEvent<HTMLInputElement>;

    onSelectChange(event);
    handleFilter(selectEvent.target.value);
  };

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleRemoveProductImage = () => {
    setSelectedFile("");
    setImagePreview(undefined);
  };

  const handleRemove = (id: string) => {
    const newPreviews = previews.filter((preview) => preview.id !== id);
    setPreviews(newPreviews);
  };

  return (
    <Grid
      item
      container
      direction="column"
      component="form"
      style={{ paddingBottom: "3rem" }}
      onSubmit={onSubmit}
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
            value={productName}
            placeholder="Enter Product Name"
            onChange={props.onInputChange}
            error={productNameError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="text"
            label="Product UPC"
            labelId="productUPC"
            name="productUPC"
            value={productUPC}
            placeholder="Enter Unique Product Code"
            onChange={onInputChange}
            error={productUPCError}
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
            value={units}
            placeholder="CS, EA, BX, DZ, PK etc..."
            onChange={onInputChange}
            error={unitError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="text"
            label="Item Code"
            labelId="itemCode"
            name="itemCode"
            value={itemCode}
            placeholder="AIRCO16"
            onChange={onInputChange}
            error={itemCodeError}
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
            value={category}
            onChange={handleSelectChange}
            label="Category"
            placeholder="Select Category"
            errorMessage={categoryError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomSelect
            options={filteredSubCategory.map(({ name }) => name.toLowerCase())}
            name="subCategory"
            value={subCategory}
            onChange={onSelectChange}
            label="Sub Category"
            placeholder="Select Sub Category"
            errorMessage={subCategoryError}
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
            options={brands.map((brand) => capitalizeFirstLetters(brand.name))}
            name="brandName"
            value={brandName}
            onChange={onSelectChange}
            label="Brand"
            placeholder="Select Brand"
            errorMessage={brandNameError}
          />
        </Grid>
        {brandName === "Others" && (
          <Grid item sx={{ flex: 1, mt: matchesXS ? 0 : "2rem" }}>
            <CustomFormInput
              type="text"
              label=""
              labelId=""
              name="customBrandName"
              value={customBrandName}
              placeholder="Enter Brand Name"
              onChange={onInputChange}
              // error={customBrandNameError}
              autoFocus={brandName === "Others"}
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
            value={priceCode1}
            placeholder="e.g 20"
            onChange={onInputChange}
            error={priceCode1Error}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Price Code 2"
            labelId="priceCode2"
            name="priceCode2"
            value={priceCode2}
            placeholder="e.g 20"
            onChange={onInputChange}
            error={priceCode2Error}
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
            value={priceCode3}
            placeholder="e.g 20"
            onChange={onInputChange}
            error={priceCode3Error}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="Price Code 4"
            labelId="priceCode4"
            name="priceCode4"
            value={priceCode4}
            placeholder="e.g 20"
            onChange={onInputChange}
            error={priceCode4Error}
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
            value={productStock}
            placeholder="e.g 20"
            onChange={onInputChange}
            error={productStockError}
          />
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <CustomFormInput
            type="number"
            label="SRP"
            labelId="SRP"
            name="SRP"
            value={SRP}
            placeholder="e.g 20"
            onChange={onInputChange}
            error={SRPError}
          />
        </Grid>
        <Grid item container style={{ marginTop: "1rem" }}>
          <CustomSelect
            options={shippingCategoryList}
            name="shippingCategory"
            value={shippingCategory}
            onChange={onSelectChange}
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
              checked={isThresholdActive}
              onChange={(event) => {
                onCheck(event);
                setMaximumQuantityError("");
              }}
            />
            {isThresholdActive && (
              <Grid item style={{ marginTop: "1rem" }}>
                <CustomFormInput
                  type="number"
                  label="Maximum Quantity"
                  labelId="maximumQuantity"
                  name="maximumQuantity"
                  value={maximumQuantity}
                  placeholder="E.g 20"
                  onChange={onInputChange}
                  error={maximumQuantityError}
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
            onChange={onInputChange}
            value={productDescription}
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
          selectedFile={selectedFile}
          setImageError={setProductImageError}
          setSelectedFile={setSelectedFile}
          preview={imagePreview}
          setPreview={setImagePreview}
        />
        {productImageError && <small>{productImageError}</small>}
      </Grid>
      {/* {uploadedFile && (
        <Grid item container justifyContent="center">
          <label htmlFor="add-product-photo">
            <input
              accept="image/*"
              id="add-product-photo"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeProductImage}
            />
            <Button
              variant="contained"
              component="span"
              style={{ width: 120 }}
              color="secondary"
            >
              Change
            </Button>
          </label>
        </Grid>
      )} */}
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
          onClick={() => setOpenProductGallery(true)}
        >
          Add More Photos
        </AddMoreButton>
      </Grid>
      {previews.length > 0 && (
        <Grid
          item
          container
          flexWrap="wrap"
          sx={{ mb: 2 }}
          columnGap={2}
          rowGap={2}
          justifyContent="center"
        >
          {previews.map((previewItem) => (
            <GalleryItem
              key={previewItem.id}
              item={previewItem}
              onRemove={() => handleRemove(previewItem.id)}
              id={previewItem.id}
              setGalleryItemId={setGalleryItemId}
              galleryItemId={galleryItemId}
              loading={uploadingImage}
              previews={previews}
              setPreviews={setPreviews}
            />
            // <Grid
            //   item
            //   style={{
            //     height: 100,
            //     width: 100,
            //     border: "1px solid #f4f4f4",
            //     borderRadius: 5,
            //     padding: 5,
            //   }}
            //   sx={{ p: 1, position: "relative" }}
            //   key={preview.id}
            // >
            //   <CancelSharpIcon
            //     color="error"
            //     style={{
            //       position: "absolute",
            //       right: -10,
            //       top: -10,
            //       cursor: "pointer",
            //     }}
            //     onClick={() => removePhotoFromGallery(index)}
            //   />
            //   <img
            //     src={upload.url || upload}
            //     alt="Thumbnail"
            //     style={{ width: "100%", height: "100%" }}
            //   />
            // </Grid>
          ))}
        </Grid>
      )}

      <Grid item container direction="column" sx={{ mb: 2 }}>
        <CustomCheckbox
          name="allowProductSizes"
          label="Allow Product Sizes"
          id="allowProductSizes"
          description="Allow Product Sizes"
          checked={allowProductSizes}
          onChange={onCheck}
        />
        {allowProductSizes && (
          <Grid
            item
            container
            style={{ marginTop: "2rem" }}
            alignItems="center"
            justifyContent="center"
            columnGap={3}
            rowGap={2}
            direction={matchesXS ? "column" : "row"}
          >
            <Grid item container={matchesXS}>
              <CustomFormInput
                type="text"
                label="Size Name"
                labelId="sizeName"
                name="name"
                value={name}
                placeholder="eg. S,M,L,XL,XXL,3XL,4XL"
                onChange={onInputChange}
                error={sizeNameError}
              />
            </Grid>
            <Grid
              item
              container={matchesXS}
              style={{ maxWidth: matchesXS ? "none" : 200 }}
            >
              <CustomFormInput
                type="number"
                label="Size Qty:"
                labelId="sizeQuantity"
                name="quantity"
                value={quantity}
                placeholder="Number of quantity of this size"
                onChange={onInputChange}
                error={sizeQuantityError}
              />
            </Grid>
            <Grid
              item
              container={matchesXS}
              style={{ maxWidth: matchesXS ? "none" : 200 }}
            >
              <CustomFormInput
                type="number"
                label="Size Price"
                labelId="sizePrice"
                name="price"
                value={price}
                placeholder="Added to the base price"
                onChange={onInputChange}
                error={sizePriceError}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item container direction="column" sx={{ mb: 2 }}>
        <CustomCheckbox
          name="allowProductWholesale"
          label="Allow Product Wholesale"
          id="allowProductWholesale"
          description="Allow Product Wholesale"
          checked={allowProductWholesale}
          onChange={onCheck}
        />
        {allowProductWholesale && (
          <Grid
            item
            container
            style={{ marginTop: "2rem" }}
            alignItems="center"
            justifyContent="center"
            columnGap={3}
            rowGap={2}
          >
            <Grid item sm container={matchesXS}>
              <CustomFormInput
                type="number"
                label=""
                labelId=""
                name="wholesaleQuantity"
                value={wholesaleQuantity}
                placeholder="Enter Quantity"
                onChange={onInputChange}
                error={wholesaleQuantityError}
              />
            </Grid>
            <Grid item sm container={matchesXS}>
              <CustomFormInput
                type="number"
                label=""
                labelId=""
                name="wholesaleDiscountPercentage"
                value={wholesaleDiscountPercentage}
                placeholder="Enter Discount Percentage"
                onChange={onInputChange}
                // error={wholesaleDiscountPercentageError}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item container direction="column">
        <CustomCheckbox
          name="allowMeasurement"
          label="Allow Product Measurement"
          id="allowMeasurement"
          description="Allow Product Measurement"
          checked={allowMeasurement}
          onChange={onCheck}
        />
        {allowMeasurement && (
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
                  value={productMeasurement}
                  onChange={onSelectChange}
                  label=""
                  placeholder="Choose Measurement"
                  errorMessage={productMeasurementError}
                />
              </Grid>
            </Grid>
            {productMeasurement === "Custom" && (
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
                  value={customMeasurement}
                  placeholder="Enter Unit"
                  onChange={onInputChange}
                  error={customMeasurementError}
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
            <CancelButton onClick={onClose}>Cancel</CancelButton>
          </Grid>
          <Grid item>
            <SubmitButton
              type="submit"
              variant="contained"
              disableRipple
              color="secondary"
              disabled={updatingProduct}
            >
              {updatingProduct && <StyledCircularProgress />} Update Product
            </SubmitButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProductForm;
