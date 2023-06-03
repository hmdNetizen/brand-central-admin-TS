import React, { useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { StyledCircularProgress } from "src/utilityStyles/pagesUtilityStyles";
import { useActions } from "src/hooks/useActions";

type GalleryItemProps = {
  item: PhotoGalleryTypes;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  id: string;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
  loading: boolean;
};

const GalleryItem = (props: GalleryItemProps) => {
  const { item, onRemove, id, setGalleryItemId, galleryItemId, loading } =
    props;

  const loadingUpload = true;
  const { addPhotosToGallery } = useActions();

  const handleClick = () => {
    setGalleryItemId(id);
    addPhotosToGallery({ file: item.file! });
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
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          style={{ minWidth: 100 }}
        >
          {loading && galleryItemId === item.id ? (
            <StyledCircularProgress
              style={{ width: 15, height: 15, margin: "0 auto" }}
            />
          ) : (
            "Click to upload"
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

export default GalleryItem;
