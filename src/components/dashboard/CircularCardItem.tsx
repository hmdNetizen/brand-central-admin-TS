import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CircularCardProps } from "./types";
import { Container, Circle } from "./styles/DashCircularCardStyles";

const CircularCardItem = (props: CircularCardProps) => {
  const { cardBorderColor, description, heading, numberCount } = props;
  return (
    <Container
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Circle item cardBorderColor={cardBorderColor}>
        <Typography variant="h2">{numberCount}</Typography>
      </Circle>
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="body1">{heading}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            style={{ fontWeight: 400, fontSize: "1.2rem" }}
          >
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CircularCardItem;
