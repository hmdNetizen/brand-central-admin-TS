import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ProductSizeTypes } from "src/services/products/ProductTypes";
import CustomFormInput from "src/utils/CustomFormInput";

type ProductSizeFormProps = {
  productSizeForm: ProductSizeTypes[];
  sizeNameError: string;
  sizeQuantityError: string;
  sizePriceError: string;
  setProductSizeForm: React.Dispatch<React.SetStateAction<ProductSizeTypes[]>>;
};

const ProductSizeForm = (props: ProductSizeFormProps) => {
  const theme = useTheme();
  const {
    setProductSizeForm,
    sizeNameError,
    productSizeForm,
    sizePriceError,
    sizeQuantityError,
  } = props;

  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

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

  return (
    <Grid item container justifyContent="center" style={{ marginTop: "2rem" }}>
      {productSizeForm.map((productSize) => (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          columnGap={3}
          rowGap={2}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              error={sizePriceError}
            />
          </Grid>
        </Grid>
      ))}

      <Grid item>
        <Button>Add a new size</Button>
      </Grid>
    </Grid>
  );
};

export default ProductSizeForm;
