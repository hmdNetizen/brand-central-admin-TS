import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { useTheme, styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import { Content, StyledButton } from "./CreateProduct.Styles";
import CustomFormInput from "src/utils/CustomFormInput";
import {
  StyledCircularProgress,
  SubmitButton,
} from "src/utilityStyles/pagesUtilityStyles";
import FileUploadLayout from "src/components/uploads/FileUploadLayout";

type ProductRightFormProps = {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenGallery: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  priceCode1: number;
  priceCode1Error: string;
  priceCode2: number;
  priceCode2Error: string;
  priceCode3: number;
  priceCode3Error: string;
  priceCode4: number;
  priceCode4Error: string;
  srpPrice: number;
  SRPError: string;
  loading: boolean;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  imagePreview: string | undefined;
  setImagePreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  setProductImageError: React.Dispatch<React.SetStateAction<string>>;
};

const CreateProductRightForm = (props: ProductRightFormProps) => {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

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

  return (
    <Content item style={{ flex: 2 }}>
      <Grid container direction="column">
        <Grid item>
          <Typography
            variant="h3"
            style={{ fontSize: matchesXS ? "1.65rem" : "2rem" }}
          >
            Product Image *
          </Typography>
        </Grid>
        {/* <Grid
          item
          container
          justifyContent={matchesSM ? "center" : "flex-start"}
          style={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          <FileUploadBox setProductImageError={setProductImageError} />
          {productImageError && (
            <small className={classes.uploadError}>{productImageError}</small>
          )}
        </Grid> */}
        <FileUploadLayout
          onImageChange={handleChangeProductImage}
          onRemoveImage={handleRemoveProductImage}
          selectedFile={props.selectedFile}
          setImageError={props.setProductImageError}
          setSelectedFile={props.setSelectedFile}
          preview={props.imagePreview}
          setPreview={props.setImagePreview}
        />
        {/* {props.productImageError && <small>{props.productImageError}</small>} */}
        <Grid
          item
          style={{
            marginTop: matchesSM ? "2rem" : "1rem",
            marginBottom: "1rem",
          }}
          container
          justifyContent={matchesSM ? "center" : "flex-start"}
        >
          <Typography variant="body2">Product Gallery Images </Typography>
        </Grid>
        <Grid
          item
          style={{ marginBottom: "2rem" }}
          container
          justifyContent={matchesSM ? "center" : "flex-start"}
        >
          <StyledButton
            startIcon={<AddIcon />}
            variant="contained"
            disableRipple
            onClick={() => props.setOpenGallery(true)}
          >
            Add More Photos
          </StyledButton>
        </Grid>
        {/* {uploadedFiles.length > 0 && (
          <Grid item container flexWrap sx={{ mb: 1 }} columnGap={2}>
            {uploadedFiles.map((upload) => (
              <Grid item style={{ height: 50, width: 50 }} key={upload.url}>
                <img
                  src={upload.url}
                  alt="Thumbnail"
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
        )} */}
        <Grid item style={{ marginBottom: "2rem" }}>
          <CustomFormInput
            type="number"
            label="Price Code 1"
            labelId="priceCode1"
            name="priceCode1"
            value={props.priceCode1}
            placeholder="e.g 20"
            onChange={props.onChange}
            error={props.priceCode1Error}
          />
        </Grid>
        <Grid item style={{ marginBottom: "2rem" }}>
          <CustomFormInput
            type="number"
            label="Price Code 2"
            labelId="priceCode2"
            name="priceCode2"
            value={props.priceCode2}
            placeholder="e.g 20"
            onChange={props.onChange}
            error={props.priceCode2Error}
          />
        </Grid>
        <Grid item style={{ marginBottom: "2rem" }}>
          <CustomFormInput
            type="number"
            label="Price Code 3"
            labelId="priceCode3"
            name="priceCode3"
            value={props.priceCode3}
            placeholder="e.g 20"
            onChange={props.onChange}
            error={props.priceCode3Error}
          />
        </Grid>
        <Grid item style={{ marginBottom: "2rem" }}>
          <CustomFormInput
            type="number"
            label="Price Code 4"
            labelId="priceCode4"
            name="priceCode4"
            value={props.priceCode4}
            placeholder="e.g 20"
            onChange={props.onChange}
            error={props.priceCode4Error}
          />
        </Grid>
        <Grid item>
          <CustomFormInput
            type="number"
            label="SRP"
            labelId="srp"
            name="srpPrice"
            value={props.srpPrice}
            placeholder="e.g 20"
            onChange={props.onChange}
            error={props.SRPError}
          />
        </Grid>
        {matchesSM && (
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
      </Grid>
    </Content>
  );
};

export default CreateProductRightForm;
