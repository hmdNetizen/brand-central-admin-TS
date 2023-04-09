import React from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link, LinkProps } from "react-router-dom";

interface ContainerProps extends GridProps {
  primaryColor: string;
  secondaryColor: string;
}

type IconWrapperProps = Pick<ContainerProps, "primaryColor">;

const Container = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== "primaryColor" && prop !== "secondaryColor",
})<ContainerProps>(({ primaryColor, secondaryColor }) => ({
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  padding: "2rem",
  borderRadius: 5,
  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
  position: "relative",
  overflow: "hidden",
  color: "#fff",
  cursor: "pointer",
  transition: "transform .25s ease-in-out",

  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const StyledButton = styled(Button)<
  ButtonProps & { component: React.ElementType; to: LinkProps["to"] }
>(({ theme }) => ({
  minWidth: 100,
  textTransform: "none",
  borderRadius: 20,
  background: "#fff",
  color: theme.palette.primary.main,
  fontSize: "1.4rem",
  position: "relative",
  zIndex: 9,

  "&:hover": {
    background: "#fff",
  },
}));

const IconWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "primaryColor",
})<IconWrapperProps>(({ theme, primaryColor }) => ({
  minWidth: 150,
  background: primaryColor,
  height: 300,
  display: "flex",
  paddingLeft: "2rem",
  paddingTop: "2rem",
  alignItems: "center",
  position: "absolute",
  right: "-3rem",
  transform: "rotate(20deg)",

  [theme.breakpoints.only("lg")]: {
    right: "-5rem",
  },
}));

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
