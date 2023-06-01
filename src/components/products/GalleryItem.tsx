import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { useActions } from "src/hooks/useActions";

type GalleryItemProps = {
  image: PhotoGalleryTypes;
};

const GalleryItem = (props: GalleryItemProps) => {
  const { image } = props;

  const { removePhotoFromGallery } = useActions();

  // const handleRemoveFromGallery = useCallback(() => {
  //   removePhotoFromGallery({ id: image.id });
  // }, [image.id]);
  const handleRemoveFromGallery = () => {
    console.log("Hello");
  };

  return (
    <Grid
      item
      style={{
        width: 150,
        height: 150,
        position: "relative",
        border: "1px solid #f4f4f4",
        borderRadius: 5,
      }}
    >
      <Grid
        item
        container
        style={{ width: "100%", height: "100%" }}
        justifyContent="center"
      >
        <CancelSharpIcon
          color="error"
          style={{
            position: "absolute",
            right: -10,
            top: -10,
            cursor: "pointer",
          }}
          onClick={handleRemoveFromGallery}
        />
        <img
          src={image.url}
          alt="Gallery"
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "1rem",
          }}
        />
        <Button variant="contained" color="secondary">
          Click to upload
        </Button>
      </Grid>
    </Grid>
  );
};

export default GalleryItem;
