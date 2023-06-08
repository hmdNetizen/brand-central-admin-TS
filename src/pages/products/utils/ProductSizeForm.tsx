import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ProductSizeTypes } from "src/services/products/ProductTypes";
import CustomFormInput from "src/utils/CustomFormInput";

type ProductSizeFormProps = {
  productSize: ProductSizeTypes;
  onProductSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sizeNameError: string;
  sizeQuantityError: string;
  sizePriceError: string;
};

const ProductSizeForm = (props: ProductSizeFormProps) => {
  const theme = useTheme();
  const {
    onProductSizeChange,
    sizeNameError,
    productSize,
    sizePriceError,
    sizeQuantityError,
  } = props;
  const { name, price, quantity } = productSize;

  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
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
          onChange={onProductSizeChange}
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
          onChange={onProductSizeChange}
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
          onChange={onProductSizeChange}
          error={sizePriceError}
        />
      </Grid>
    </Grid>
  );
};

export default ProductSizeForm;
