import React from "react";
import Grid from "@mui/material/Grid";
import FileUpload from "./FileUpload";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CustomCircularProgress from "src/utils/CustomCircularProgress";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import NewItemImagePreview from "./NewItemImagePreview";

const UploadWrapper = styled(Grid)(({ theme }) => ({
  background: "#f4f4f4",
  height: 200,
  width: 200,
  position: "relative",

  [theme.breakpoints.down("md")]: {
    maxWidth: 200,
  },
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

type FileUploadBoxProps = {
  setImageError: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  iconSize: string | number;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const FileUploadBox = (props: FileUploadBoxProps) => {
  const {
    setImageError,
    iconSize,
    errorMessage,
    selectedFile,
    setSelectedFile,
    preview,
    setPreview,
  } = props;

  return (
    <UploadWrapper item container justifyContent="center" alignItems="center">
      {/* {uploadingFile || (uploadPercentage > 0 && uploadPercentage < 100) ? (
        <CustomCircularProgress value={uploadPercentage} />
      ) : uploadedFile && uploadedFile.url ? (
        <StyledImage src={uploadedFile.url} alt="" />
      ) : (
      )} */}
      {selectedFile ? (
        <NewItemImagePreview
          selectedFile={selectedFile}
          preview={preview}
          setPreview={setPreview}
        />
      ) : (
        <FileUpload
          setImageError={setImageError}
          iconSize={iconSize}
          errorMessage={errorMessage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      )}
    </UploadWrapper>
  );
};

export default FileUploadBox;
