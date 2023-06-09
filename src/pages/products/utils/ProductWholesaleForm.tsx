import React from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CustomFormInput from "src/utils/CustomFormInput";
import { WholesaleTypes } from "src/services/products/ProductTypes";

type ProductWholesaleFormProps = {
  wholesaleForm: WholesaleTypes[];
  setWholesaleForm: React.Dispatch<React.SetStateAction<WholesaleTypes[]>>;
  wholesaleQuantityError: string;
  setWholesaleQuantityError: React.Dispatch<React.SetStateAction<string>>;
  wholesalePercentageDiscountError: string;
  setWholesalePercentageDiscountError: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const ProductWholesaleForm = (props: ProductWholesaleFormProps) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const {
    wholesaleForm,
    setWholesaleForm,
    wholesaleQuantityError,
    setWholesaleQuantityError,
    wholesalePercentageDiscountError,
    setWholesalePercentageDiscountError,
  } = props;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = event.target;

    if (!wholesaleForm[index!].quantity) {
      setWholesaleQuantityError("Pleanse enter wholesale quantity");
      return;
    }

    if (!wholesaleForm[index!].percentage) {
      setWholesalePercentageDiscountError(
        "Please enter percentage off for wholesale"
      );
      return;
    }

    setWholesaleForm((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[index!] = {
        ...updatedForms[index!],
        [name]: value,
      };
      return updatedForms;
    });

    setWholesaleQuantityError("");
    setWholesalePercentageDiscountError("");
  };

  return (
    <Grid item container justifyContent="center" style={{ marginTop: "2rem" }}>
      {wholesaleForm.map((wholesale, index) => (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          columnGap={3}
          rowGap={2}
          key={wholesale._id}
        >
          <Grid item sm container={matchesXS}>
            <CustomFormInput
              type="number"
              label=""
              labelId=""
              name="quantity"
              value={wholesale.quantity}
              placeholder="Enter Quantity"
              onChange={(event) => handleChange(event, index)}
              error={wholesaleQuantityError}
            />
          </Grid>
          <Grid item sm container={matchesXS}>
            <CustomFormInput
              type="number"
              label=""
              labelId=""
              name="percentage"
              value={wholesale.percentage}
              placeholder="Enter Discount Percentage"
              onChange={(event) => handleChange(event, index)}
              error={wholesalePercentageDiscountError}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductWholesaleForm;
