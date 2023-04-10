import React from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  Container,
  StyledButton,
  IconWrapper,
} from "./styles/RectangularCardItemStyles";

type RectangularCardItemProps = {
  primaryColor: string;
  secondaryColor: string;
  heading: string;
  numberCount: number;
  path: string;
  cardIcon: JSX.Element;
};

const RectangularCardItem = (props: RectangularCardItemProps) => {
  const { primaryColor, secondaryColor, path, numberCount, cardIcon, heading } =
    props;

  return (
    <Container
      container
      justifyContent="space-between"
      alignItems="center"
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <Grid item>
        <Grid container direction="column" rowSpacing={3}>
          <Grid item>
            <Typography
              variant="body1"
              color="#fff"
              style={{ fontSize: "1.8rem", position: "relative", zIndex: 9 }}
            >
              {heading}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" color="#fff">
              {numberCount}
            </Typography>
          </Grid>
          <Grid item>
            <StyledButton
              variant="contained"
              disableRipple
              component={Link}
              to={path}
            >
              View All
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
      <IconWrapper item primaryColor={primaryColor}>
        {cardIcon}
      </IconWrapper>
    </Container>
  );
};

export default RectangularCardItem;
