import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import GalleryItem from "./GalleryItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { StyledButton, StyledCloseIcon } from "./styles";
import { PhotoGalleryProps } from "./types";

const PhotoGallery = (props: PhotoGalleryProps) => {
  const {
    setOpenProductGallery,
    previews,
    selectedFile,
    setSelectedFile,
    setPreviews,
    setGalleryItemId,
    galleryItemId,
  } = props;

  const uploadingImage = useTypedSelector(
    (state) => state.products.uploadingImage
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (!file && !selectedFile) {
      return;
    }

    setSelectedFile(file!);
  };

  const handleRemove = (id: string) => {
    const newPreviews = previews.filter((preview) => preview.id !== id);
    setPreviews(newPreviews);
  };

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1 }}
      >
        <Grid item>
          <Typography variant="h4">Image Gallery</Typography>
        </Grid>
        <Grid item>
          <StyledCloseIcon onClick={() => setOpenProductGallery(false)} />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        item
        container
        justifyContent="center"
        columnSpacing={3}
        rowSpacing={2}
        sx={{ pt: 2, pb: 1, px: 1 }}
      >
        <Grid item>
          <label htmlFor="add-photos-to-gallery">
            <input
              accept="image/*"
              id="add-photos-to-gallery"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <StyledButton
              startIcon={<FileUploadIcon />}
              disableRipple
              variant="contained"
              component="span"
            >
              Upload File
            </StyledButton>
          </label>
        </Grid>
        <Grid item sx={{ mb: "1rem" }}>
          <StyledButton
            variant="contained"
            startIcon={<DoneAllIcon />}
            disableRipple
            onClick={() => setOpenProductGallery(false)}
          >
            Save
          </StyledButton>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="body2">
            You can upload multiple Images.
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid item sx={{ p: 2 }} style={{ paddingBottom: "5rem" }}>
        <Grid
          container
          sx={{ flexWrap: "wrap" }}
          justifyContent="center"
          columnGap={2}
          rowGap={2}
        >
          {previews.length > 0 ? (
            previews.map((item) => (
              <GalleryItem
                key={item.id}
                item={item}
                onRemove={() => handleRemove(item.id)}
                id={item.id}
                setGalleryItemId={setGalleryItemId}
                galleryItemId={galleryItemId}
                loading={uploadingImage}
                previews={previews}
                setPreviews={setPreviews}
              />
            ))
          ) : (
            <Grid item>
              <Typography
                variant="h3"
                style={{ fontSize: "1.85rem" }}
                alignItems="center"
              >
                There are no photos in the gallery
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhotoGallery;
