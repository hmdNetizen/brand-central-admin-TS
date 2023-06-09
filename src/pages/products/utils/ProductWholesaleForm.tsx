import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import CustomFormInput from "src/utils/CustomFormInput";
import { WholesaleDataType } from "./types";

type ProductWholesaleFormProps = {
  wholesaleForm: WholesaleDataType;
  setWholesaleForm: React.Dispatch<React.SetStateAction<WholesaleDataType>>;
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

    setWholesaleForm((prevForm) => {
      const updatedForms = [...prevForm.productWholesale];
      updatedForms[index!] = {
        ...updatedForms[index!],
        [name]: value,
      };
      return { productWholesale: updatedForms };
    });

    // setWholesaleForm((prevForms) => {
    //   const updatedForms = [...prevForms.productWholesale];

    //   updatedForms[index!] = {
    //     ...updatedForms[index!],
    //     [name]: value,
    //   };
    //   return updatedForms;
    // });

    setWholesaleQuantityError("");
    setWholesalePercentageDiscountError("");
  };

  const handleRemoveForm = (id: string) => {
    if (wholesaleForm.productWholesale.length === 1) return;

    const newWholesaleForm = wholesaleForm.productWholesale.filter(
      (wholesale) => wholesale._id !== id
    );

    setWholesaleForm({ productWholesale: newWholesaleForm });
  };

  const handleAddNewProductSize = () => {
    const lastWholesaleForm =
      wholesaleForm.productWholesale[wholesaleForm.productWholesale.length - 1];

    if (!lastWholesaleForm.quantity) {
      setWholesaleQuantityError("Pleanse enter wholesale quantity");
      return;
    }
    setWholesaleQuantityError("");

    if (!lastWholesaleForm.percentage) {
      setWholesalePercentageDiscountError(
        "Please enter percentage off for wholesale"
      );
      return;
    }
    setWholesalePercentageDiscountError("");

    setWholesaleForm((prevForms) => ({
      productWholesale: [
        ...prevForms.productWholesale,
        { percentage: Number(""), quantity: Number(""), _id: nanoid() },
      ],
    }));

    // setWholesaleForm((prevForms) => [
    //   ...prevForms,
    //   { percentage: "", quantity: "", _id: nanoid() },
    // ]);
  };

  return (
    <Grid item container justifyContent="center" style={{ marginTop: "2rem" }}>
      {wholesaleForm.productWholesale.map((wholesale, index) => (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          columnGap={3}
          rowGap={2}
          key={wholesale._id}
          mb={2}
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
          <Grid item>
            <IconButton onClick={() => handleRemoveForm(wholesale?._id!)}>
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
          Add new wholesale data
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductWholesaleForm;
