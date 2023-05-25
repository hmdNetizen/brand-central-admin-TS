import React, { useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import { IoIosCloudUpload } from "react-icons/io";
import Typography from "@mui/material/Typography";
import { read, utils } from "xlsx";
import {
  capitalizeFirstLetters,
  constructBrandName,
  constructSubCategory,
} from "src/lib/helpers";
import CustomLinearProgressBar from "src/utils/CustomLinearProgress";
import { useActions } from "src/hooks/useActions";
import { ProductsBulkUpdatePayload } from "src/services/products/ProductTypes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  Container,
  Input,
  ProgressTextWrapper,
  getColor,
} from "./styles.inventory";

function StyledDropzone() {
  // eslint-disable-next-line
  const [fileName, setFileName] = useState<File | string>("");

  const uploadedFiles = useTypedSelector(
    (state) => state.products.uploadedFiles
  );
  const updatedInventory = useTypedSelector(
    (state) => state.products.updatedInventory
  );

  const { updateInventoryProducts } = useActions();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      },
      noClick: true,
      onDrop: async (files) => {
        setFileName(files[0]?.name);
        const data = await files[0].arrayBuffer();
        //     /* data is an ArrayBuffer */
        const workbook = await read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = utils.sheet_to_json(worksheet);
        const result = jsonData as ProductsBulkUpdatePayload[];
        const newProducts = [...result]
          .filter((data) => data["Item Code"])
          .map((product) => ({
            productName: product["Size"],
            category: capitalizeFirstLetters(product["Category"]),
            productDescription: product["Description"],
            brandName: capitalizeFirstLetters(constructBrandName(product)),
            itemCode: product["Item Code"],
            units: product["UM"],
            productType: "Physical",
            productUPC: product["UPC"],
            subCategory: capitalizeFirstLetters(constructSubCategory(product)),
            productStock: product["Stock"],
            priceCode1: product["Price Code 1"],
            priceCode2: product["Price Code 2"],
            priceCode3: product["Price Code 3"],
            priceCode4: product["Price Code 4"],
            SRP: product["MSRP"],
            // shippingCategory: product["shipping category"] ? product["shipping category"].toLowerCase(),
          }));

        updateInventoryProducts({
          products: newProducts,
        });
      },
    });

  return (
    <div className="container" style={{ width: "100%", minHeight: 300 }}>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <Typography variant="body1" align="center" color="secondary">
          Drag 'n' drop some files here, or click the button below to select
          files
        </Typography>
        <label htmlFor="icon-button-file">
          <Input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="icon-button-file"
            type="file"
            {...getInputProps()}
          />
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <IoIosCloudUpload size="3.5rem" />
          </IconButton>
        </label>
      </Container>
      {(uploadedFiles || updatedInventory) && (
        <ProgressTextWrapper>
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              color: "#1a90ff",
            }}
          >
            {uploadedFiles ? uploadedFiles : updatedInventory}
          </Typography>
        </ProgressTextWrapper>
      )}
      <CustomLinearProgressBar />
    </div>
  );
}

export default StyledDropzone;
