import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { nanoid } from "@reduxjs/toolkit";

import CustomFormInput from "src/utils/CustomFormInput";
import { ProductSizeFormProps } from "./types";

const ProductSizeForm = (props: ProductSizeFormProps) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const {
    setProductSizeForm,
    sizeNameError,
    productSizeForm,
    sizePriceError,
    sizeQuantityError,
  } = props;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ): void => {
    const { name, value } = event.target;
    setProductSizeForm((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[index!] = {
        ...updatedForms[index!],
        [name]: value,
      };
      return updatedForms;
    });
  };

  const handleAddNewProductSize = () => {
    setProductSizeForm((prevForms) => [
      ...prevForms,
      { quantity: "", price: "", name: "", _id: nanoid() },
    ]);
  };

  const handleRemoveForm = (id: string) => {
    if (productSizeForm.length === 1) return;
    const newProductSize = productSizeForm.filter(
      (productSize) => productSize._id !== id
    );

    setProductSizeForm(newProductSize);
  };

  return (
    <Grid item container justifyContent="center" style={{ marginTop: "2rem" }}>
      {productSizeForm.map((productSize, index) => (
        <Grid
          item
          container
          //   alignItems="center"
          justifyContent="center"
          columnGap={3}
          rowGap={2}
          sx={{ mb: 2 }}
          direction={matchesXS ? "column" : "row"}
          key={productSize._id}
        >
          <Grid item container={matchesXS}>
            <CustomFormInput
              type="text"
              label="Size Name"
              labelId="sizeName"
              name="name"
              value={productSize.name}
              placeholder="eg. S,M,L,XL,XXL,3XL,4XL"
              onChange={(event) => handleChange(event, index)}
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
              value={productSize.quantity}
              placeholder="Number of quantity of this size"
              onChange={(event) => handleChange(event, index)}
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
              value={productSize.price}
              placeholder="Added to the base price"
              onChange={(event) => handleChange(event, index)}
              error={sizePriceError}
            />
          </Grid>
          <Grid item alignSelf="end">
            <IconButton onClick={() => handleRemoveForm(productSize._id)}>
              <CloseIcon color="error" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddNewProductSize}
        >
          Add a new size
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductSizeForm;
