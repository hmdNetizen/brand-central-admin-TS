import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { CircularCardProps } from "../types";

type CircleProps = Pick<CircularCardProps, "cardBorderColor">;

export const Container = styled(Grid)({
  height: 300,
  background: "#fff",
  borderRadius: 5,
  padding: "2rem",
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  cursor: "pointer",
  transition: "transform .25s ease-in-out",

  "&:hover": {
    transform: "scale(1.02)",
  },
});

export const Circle = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "cardBorderColor",
})<CircleProps>(({ cardBorderColor }) => ({
  height: 150,
  width: 150,
  borderRadius: "50%",
  border: `12px solid ${cardBorderColor}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2rem",
}));
