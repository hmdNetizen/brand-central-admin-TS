import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { StyledIconButton } from "./styles/FileUploadLayoutStyles";
import FileUploadBox from "./FileUploadBox";

type FileUploadLayoutProps = {
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  setCategoryImageError: React.Dispatch<React.SetStateAction<string>>;
  onRemoveImage: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUploadLayout = (props: FileUploadLayoutProps) => {
  const {
    onImageChange,
    onRemoveImage,
    selectedFile,
    setCategoryImageError,
    setSelectedFile,
  } = props;
  return (
    <Grid item container justifyContent="center">
      <Grid item style={{ width: 200 }}>
        <FileUploadBox
          iconSize="5rem"
          setImageError={setCategoryImageError}
          errorMessage="Add an image for this category"
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </Grid>
      {selectedFile && (
        <Grid
          item
          container
          justifyContent="center"
          columnGap={1}
          sx={{ mt: 1 }}
        >
          <StyledIconButton onClick={onRemoveImage}>
            <DeleteSharpIcon />
          </StyledIconButton>
          <label htmlFor="add-category-photo">
            <input
              accept="image/*"
              id="add-category-photo"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={onImageChange}
            />
            <Button
              variant="contained"
              component="span"
              style={{ width: 120 }}
              color="secondary"
            >
              Change
            </Button>
          </label>
        </Grid>
      )}
    </Grid>
  );
};

export default FileUploadLayout;
