import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

type FileUploadProps = {
  setImageError?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  iconSize: string | number;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
};

const FileUpload = (props: FileUploadProps) => {
  const {
    setImageError,
    iconSize,
    errorMessage,
    selectedFile,
    setSelectedFile,
  } = props;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (!file && !selectedFile) {
      if (setImageError) {
        setImageError(errorMessage);
      }
      return;
    }

    setSelectedFile(file!);
    if (setImageError) {
      setImageError("");
    }
  };

  return (
    <label htmlFor="upload-product-image">
      <Input
        accept="image/*"
        id="upload-product-image"
        type="file"
        onChange={handleFileUpload}
      />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera style={{ fontSize: iconSize }} color="secondary" />
      </IconButton>
    </label>
  );
};

FileUpload.defaultProps = {
  iconSize: "10rem",
};

export default FileUpload;
