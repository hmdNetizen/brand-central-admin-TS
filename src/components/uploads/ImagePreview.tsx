import React, { ImgHTMLAttributes, useEffect, useState } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useActions } from "src/hooks/useActions";
import { useSelector } from "react-redux";
import CircularProgress from "src/utils/CustomCircularProgress";

type SelectedFileType = File | null;

interface ImageWrapperProps extends GridProps {
  selectedFile: SelectedFileType;
  imagePreview: string | undefined;
}

const ImageWrapper = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== "selectedFile" && prop !== "imagePreview",
})<ImageWrapperProps>(({ theme, selectedFile, imagePreview }) => ({
  width: 150,
  height: 150,
  padding: "1rem",
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  position: "relative",

  "&:hover": {
    "& .MuiSvgIcon-root": {
      opacity: 1,
    },
  },

  "& .MuiIconButton-root": {
    positon: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    display: selectedFile ? "none" : "inline-flex",
  },

  "& .MuiButton-root": {
    positon: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    bottom: 5,
    width: "100%",
    zIndex: 1,
    display: imagePreview ? "inline-flex" : "none",
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

const StyledCameraIcon = styled(PhotoCamera, {
  shouldForwardProp: (prop) => prop !== "imagePreview",
})<{ imagePreview: string | undefined }>(({ theme, imagePreview }) => ({
  fontSize: "4rem",
  color: theme.palette.secondary.light,
  transition: "all .25s ease-in-out",
  opacity: imagePreview ? 0.5 : 1,

  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const StyledProgressBar = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 5,
});

const Input = styled("input")({
  display: "none",
});

const initialState = null;

const ImagePreview = (props) => {
  const { dataValue } = props;
  // IMAGE PREVIEW STATES
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] = useState<SelectedFileType | null>(
    initialState
  );

  const { uploadingFile, uploadPercentage } = useSelector(
    (state) => state.common
  );

  const { uploadFile } = useActions();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImagePreview(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (dataValue) {
      let newSelectedFile = initialState;
      if (dataValue.profileImage) {
        newSelectedFile = dataValue.profileImage;
      }

      setSelectedFile(newSelectedFile);
    }
  }, [dataValue]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile || typeof selectedFile === "string") {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    console.log({ objectURL: objectUrl });

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadFile({
      file: selectedFile,
    });
  };

  return (
    <ImageWrapper item selectedFile={selectedFile} imagePreview={imagePreview}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={onSelectFile}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <StyledCameraIcon imagePreview={imagePreview} />
        </IconButton>
      </label>
      {(uploadingFile && uploadPercentage) > 0 && (
        <StyledProgressBar value={uploadPercentage} />
      )}
      <Image
        src={typeof selectedFile === "string" ? selectedFile : imagePreview}
        alt="preview"
      />

      <Button
        variant="contained"
        component="span"
        color="secondary"
        onClick={handleUpload}
      >
        Click to upload
      </Button>
    </ImageWrapper>
  );
};

export default ImagePreview;
