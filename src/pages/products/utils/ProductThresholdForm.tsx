import React from "react";
import Grid from "@mui/material/Grid";
import CustomCheckbox from "src/utils/CustomCheckbox";
import CustomFormInput from "src/utils/CustomFormInput";
import { ThresholdDataType } from "./types";

type ProductThresholdProps = {
  thresholdData: ThresholdDataType;
  setThresholdData: React.Dispatch<React.SetStateAction<ThresholdDataType>>;
  maximumQuantityError: string;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
};

const ProductThresholdForm = (props: ProductThresholdProps) => {
  const {
    maximumQuantityError,
    setMaximumQuantityError,
    setThresholdData,
    thresholdData: { threshold },
  } = props;

  const { isThresholdActive, maximumQuantity } = threshold;

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThresholdData((prev) => ({
      ...prev,
      threshold: {
        ...prev.threshold,
        isThresholdActive: event.target.checked,
      },
    }));

    setMaximumQuantityError("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThresholdData((prev) => ({
      ...prev,
      threshold: {
        ...prev.threshold,
        maximumQuantity: Number(event.target.value),
      },
    }));
  };

  return (
    <Grid item container direction="column" style={{ marginTop: "1rem" }}>
      <Grid item>
        <CustomCheckbox
          name="isThresholdActive"
          label="isThresholdActive"
          id="isThresholdActive"
          description="Set Max Quantity Threshold"
          checked={isThresholdActive}
          onChange={handleChecked}
        />
        {isThresholdActive && (
          <Grid item style={{ marginTop: "1rem" }}>
            <CustomFormInput
              type="number"
              label="Maximum Quantity"
              labelId="maximumQuantity"
              name="maximumQuantity"
              value={maximumQuantity.toString()}
              placeholder="E.g 20"
              onChange={handleChange}
              error={maximumQuantityError}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductThresholdForm;
