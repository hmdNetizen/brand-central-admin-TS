import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

type NewItemImagePreviewProps = {
  selectedFile: File | string;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Image = styled("img")(({ theme }) => ({
  height: 180,

  [theme.breakpoints.down("md")]: {
    maxWidth: 200,
  },
}));

const NewItemImagePreview = (props: NewItemImagePreviewProps) => {
  const { selectedFile, preview, setPreview } = props;

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile || typeof selectedFile === "string") {
      // setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Grid item container justifyContent="center">
      <Image src={preview} alt="Category image preview" />
    </Grid>
  );
};

export default NewItemImagePreview;
