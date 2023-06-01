import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useActions } from "src/hooks/useActions";
import GalleryItem from "./GalleryItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { StyledButton, StyledCloseIcon } from "./styles";
import { PhotoGalleryTypes } from "src/services/products/ProductTypes";

type PhotoGalleryProps = {
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  previews: PhotoGalleryTypes[];
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
};

const PhotoGallery = (props: PhotoGalleryProps) => {
  const { setOpenProductGallery, previews, selectedFile, setSelectedFile } =
    props;
  const singleProduct = useTypedSelector(
    (state) => state.products.singleProduct
  );

  const { addPhotosToGallery } = useActions();

  // const handlePhotoUploads = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (!file) return;

  //   addPhotosToGallery({
  //     file,
  //   });
  // };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (!file && !selectedFile) {
      return;
    }

    setSelectedFile(file!);
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
            Done
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
          justifyContent="space-around"
          rowGap={2}
        >
          {previews.map((item) => (
            <GalleryItem key={item.id} image={item} />
          ))}
          {/* {singleProduct?.productGalleryImages.length! > 0 ? (
            singleProduct?.productGalleryImages.map((item) => (
              <GalleryItem image={item} preview={preview} />
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
          )} */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhotoGallery;
