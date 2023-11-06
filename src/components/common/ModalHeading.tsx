import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type ModalHeadingProps = {
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalHeading = ({ setOpen, title }: ModalHeadingProps) => {
  return (
    <Grid
      item
      container
      justifyContent="space-between"
      sx={{
        p: "1rem 2rem",
        background: "#f7f7f7",
      }}
    >
      <Grid item alignSelf="center">
        <Typography variant="h4" style={{ marginBottom: 0 }} color="secondary">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ModalHeading;
