import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "./ShowDialog";

const ErrorDialog = ({ error }: { error: string }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <ShowDialog openModal={open} handleClose={handleClick}>
      <Grid container>
        <Typography variant="h4">{error}</Typography>
      </Grid>
    </ShowDialog>
  );
};

export default ErrorDialog;
