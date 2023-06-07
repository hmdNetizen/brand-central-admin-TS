import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import { StyledCircularProgress } from "src/utilityStyles/pagesUtilityStyles";
import { useActions } from "src/hooks/useActions";
import { GalleryItemProps } from "./types";

const GalleryItem = (props: GalleryItemProps) => {
  const theme = useTheme();
  const {
    item,
    onRemove,
    id,
    setGalleryItemId,
    galleryItemId,
    loading,
    previews,
    setPreviews,
  } = props;

  const { addPhotosToGallery } = useActions();

  const handleClick = () => {
    setGalleryItemId(id);
    addPhotosToGallery({ file: item.file!, previews, setPreviews });
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
            top: -15,
            cursor: "pointer",
            zIndex: 9,
          }}
        >
          <CancelSharpIcon color="error" />
        </IconButton>
        <Grid
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "1rem",
          }}
        >
          <img
            src={item.url}
            alt="Gallery"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          />
          {item.isUploaded && (
            <span
              style={{
                background: theme.palette.success.main,
                padding: ".2rem .5rem",
                borderRadius: 5,
                position: "absolute",
                color: "#fff",
                bottom: 0,
                right: 0,
              }}
            >
              Uploaded
            </span>
          )}
        </Grid>
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
