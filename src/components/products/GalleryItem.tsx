import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { useActions } from "src/hooks/useActions";

type GalleryItemProps = {
  image: PhotoGalleryTypes;
  preview: string | undefined;
};

const GalleryItem = (props: GalleryItemProps) => {
  const { image, preview } = props;

  const { removePhotoFromGallery } = useActions();

  const handleRemoveFromGallery = useCallback(() => {
    removePhotoFromGallery({ id: image.id });
  }, [image.id]);

  return (
    <Grid
      item
      style={{
        width: 150,
        height: 150,
        position: "relative",
        border: "1px solid #f4f4f4",
        borderRadius: 5,
        padding: 5,
      }}
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
        src={preview}
        alt="Gallery"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Grid>
  );
};

export default GalleryItem;
