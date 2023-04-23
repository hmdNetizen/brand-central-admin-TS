import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

type NewItemImagePreviewProps = {
  selectedFile: File | string;
};

const Image = styled("img")(({ theme }) => ({
  height: 200,

  [theme.breakpoints.down("md")]: {
    maxWidth: 200,
  },
}));

const NewItemImagePreview = (props: NewItemImagePreviewProps) => {
  const { selectedFile } = props;
  const [preview, setPreview] = useState<string | undefined>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile || typeof selectedFile === "string") {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Grid item container>
      <Image src={preview} alt="Category image preview" />
    </Grid>
  );
};

export default NewItemImagePreview;
