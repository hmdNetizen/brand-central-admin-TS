import React from "react";
import Grid from "@mui/material/Grid";
import CustomCheckbox from "src/utils/CustomCheckbox";
import CustomFormInput from "src/utils/CustomFormInput";

type ThresholdType = {
  isThresholdActive: boolean;
  maximumQuantity: string | number;
};

type ProductThresholdProps = {
  threshold: ThresholdType;
  setThreshold: React.Dispatch<React.SetStateAction<ThresholdType>>;
  maximumQuantityError: string;
  setMaximumQuantityError: React.Dispatch<React.SetStateAction<string>>;
};

const ProductThresholdForm = (props: ProductThresholdProps) => {
  const {
    threshold: { isThresholdActive, maximumQuantity },
    setThreshold,
    maximumQuantityError,
    setMaximumQuantityError,
  } = props;

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold((prev) => ({
      ...prev,
      isThresholdActive: event.target.checked,
    }));

    setMaximumQuantityError("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold((prev) => ({
      ...prev,
      maximumQuantity: event.target.value,
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
              value={maximumQuantity}
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
