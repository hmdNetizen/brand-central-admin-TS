import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

type PropsType = {
  message: string;
};

const EmptyNotification = ({ message }: PropsType) => {
  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: 120 }}
      px={2}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{ fontSize: "1.5rem", maxWidth: 200, lineHeight: 1.5 }}
      >
        {message}
      </Typography>
    </Grid>
  );
};

EmptyNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyNotification;
