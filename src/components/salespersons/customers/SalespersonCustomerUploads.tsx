import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import { IoIosCloudUpload } from "react-icons/io";
import Typography from "@mui/material/Typography";
import { read, utils } from "xlsx";
import { capitalizeFirstLetters, getSalespersonId } from "src/lib/helpers";
import { useTheme } from "@mui/material/styles";
import CustomLinearProgressBar from "src/utils/CustomLinearProgress";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  Container,
  Input,
  ProgressTextWrapper,
} from "../../inventory/styles.inventory";
import { SalespersonCustomerBulkUpdatePayload } from "src/services/salespersons/customers/types";

function SalespersonCustomerUploads() {
  const theme = useTheme();
  const [fileName, setFileName] = useState<File | string>("");

  const uploadingCustomerStatus = useTypedSelector(
    (state) => state.salespersonCustomers.uploadingCustomerStatus
  );
  const uploadedCustomerStatus = useTypedSelector(
    (state) => state.salespersonCustomers.uploadedCustomerStatus
  );
  const salespeople = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );

  const { uploadSalespersonCustomers } = useActions();

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
        const result = jsonData as SalespersonCustomerBulkUpdatePayload[];
        const newSalespersonCustomers = [...result]
          .filter((data) => data["Slsprn"])
          .map((customer) => ({
            companyName: capitalizeFirstLetters(customer["Company Name"]),
            customerCode: customer["Customer:"],
            address: `${customer["Address:"]}, ${customer["City, State, Zip"]}`,
            phoneNumber: customer["Phone"].includes("blank")
              ? ""
              : `1${customer["Phone"].replace(/[\/-]/g, "")}`,
            referrer: getSalespersonId(salespeople, customer["Slsprn"]),
          }));

        uploadSalespersonCustomers(newSalespersonCustomers);
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
      {(uploadingCustomerStatus || uploadedCustomerStatus) && (
        <ProgressTextWrapper>
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              color:
                uploadedCustomerStatus ===
                "Sales Reps' customers have been updated"
                  ? theme.palette.success.main
                  : "#1a90ff",
            }}
          >
            {uploadingCustomerStatus
              ? uploadingCustomerStatus
              : uploadedCustomerStatus}
          </Typography>
        </ProgressTextWrapper>
      )}
      <CustomLinearProgressBar />
    </div>
  );
}

export default SalespersonCustomerUploads;
