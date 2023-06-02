import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

type GalleryItemProps = {
  item: PhotoGalleryTypes;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  id: string;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
};

const GalleryItem = (props: GalleryItemProps) => {
  const { item, onRemove, id, setGalleryItemId, galleryItemId } = props;

  const handleMouseOver = () => {
    setGalleryItemId(id);
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
      onMouseOver={handleMouseOver}
    >
      <Grid
        item
        container
        style={{ width: "100%", height: "100%", padding: "0.5rem" }}
        justifyContent="center"
      >
        <IconButton
          onClick={(event) => onRemove(event, id)}
          style={{
            position: "absolute",
            right: -10,
            top: -10,
            cursor: "pointer",
          }}
        >
          <CancelSharpIcon color="error" />
        </IconButton>

        <img
          src={item.url}
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
