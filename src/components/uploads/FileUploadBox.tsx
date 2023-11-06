import React from "react";
import Grid from "@mui/material/Grid";
import FileUpload from "./FileUpload";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import CustomCircularProgress from "src/utils/CustomCircularProgress";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import NewItemImagePreview from "./NewItemImagePreview";
import { GridProps } from "@mui/system";

const UploadWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "width",
})<GridProps & { width?: string | number }>(({ theme, width }) => ({
  background: "#f4f4f4",
  height: 200,
  width: width ? width : 200,
  position: "relative",

  [theme.breakpoints.down("md")]: {
    maxWidth: 200,
  },
}));

type FileUploadBoxProps = {
  setImageError?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  iconSize: string | number;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  width?: number | string;
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
    width,
  } = props;

  return (
    <UploadWrapper
      item
      container
      justifyContent="center"
      alignItems="center"
      width={width}
    >
      {selectedFile || preview ? (
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
