import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

interface CustomProgressProps extends CircularProgressProps {
  boxClassName?: string;
  value: number;
}

const StyledBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 5,
});

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.success.dark,
}));

const PercentageText = styled(Typography)<{ component: React.ElementType }>(
  ({ theme }) => ({
    fontSize: "1.25rem",
    color: theme.palette.success.main,
  })
);

const CustomCircularProgress = (props: CustomProgressProps) => {
  return (
    <StyledBox>
      <StyledCircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PercentageText variant="caption" component="div" color="text.success">
          {`${props.value}%`}
        </PercentageText>
      </Box>
    </StyledBox>
  );
};

export default CustomCircularProgress;
