import React, { ImgHTMLAttributes } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "src/utils/CustomCircularProgress";
import { styled } from "@mui/material/styles";
import { SelectedFileType } from "../ImagePreview";

interface ImageWrapperProps extends GridProps {
  selectedFile: SelectedFileType;
  imagePreview: string | undefined;
}

export const ImageWrapper = styled(Grid, {
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

export const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

export const StyledCameraIcon = styled(PhotoCamera, {
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

export const StyledProgressBar = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 5,
});

export const Input = styled("input")({
  display: "none",
});
