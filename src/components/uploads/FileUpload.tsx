import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Input = styled("input")({
  display: "none",
});

type FileUploadProps = {
  setImageError: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  iconSize: string | number;
};

const FileUpload = (props: FileUploadProps) => {
  const { setImageError, iconSize, errorMessage } = props;
  const { uploadFile } = useActions();
  const uploadedFile = useTypedSelector((state) => state.common.uploadedFile);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (!file && uploadedFile === null) {
      setImageError(errorMessage);
      return;
    }

    uploadFile({
      file: file!,
    });

    setImageError(errorMessage);
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
