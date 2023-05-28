import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { useSelector } from "react-redux";

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  fontSize: "3rem",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.error.main,
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  textTransform: "none",
  padding: "1rem 3rem",
  borderRadius: "3rem",
  fontSize: "1.6rem",
  fontWeight: 400,

  "&:hover": {
    background: theme.palette.secondary.light,
  },

  "&:active": {
    background: theme.palette.secondary.dark,
  },
}));

const PhotoGallery = ({ setOpenProductGallery }) => {
  const { uploadedFiles } = useSelector((state) => state.common);

  const { addPhotosToGallery, removePhotoFromGallery } = useActions();

  const handlePhotoUploads = (event) => {
    const files = event.target.files;

    if (!files) return;

    addPhotosToGallery({
      files,
    });
  };

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1 }}
      >
        <Grid item>
          <Typography variant="h4">Image Gallery</Typography>
        </Grid>
        <Grid item>
          <CloseIcon
            size="small"
            className={classes.closeIcon}
            onClick={() => setOpenProductGallery(false)}
          />
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
              onChange={handlePhotoUploads}
            />
            <Button
              startIcon={<FileUploadIcon />}
              disableRipple
              className={classes.modalButton}
              variant="contained"
              component="span"
            >
              Upload File
            </Button>
          </label>
        </Grid>
        <Grid item sx={{ mb: "1rem" }}>
          <Button
            variant="contained"
            startIcon={<DoneAllIcon />}
            disableRipple
            className={classes.modalButton}
            onClick={() => setOpenProductGallery(false)}
          >
            Done
          </Button>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="body2">
            You can upload multiple Images.
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid item sx={{ p: 2 }}>
        <Grid
          container
          sx={{ flexWrap: "wrap" }}
          justifyContent="space-around"
          rowGap={2}
        >
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((upload, index) => (
              <Grid
                item
                key={index}
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
                  size="large"
                  style={{
                    position: "absolute",
                    right: -10,
                    top: -10,
                    cursor: "pointer",
                  }}
                  onClick={() => removePhotoFromGallery(index)}
                />
                <img
                  src={upload.url || upload}
                  alt="Gallery"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Grid>
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
