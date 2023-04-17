import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface CustomProgressProps extends CircularProgressProps {
  boxClassName?: string;
  value: number;
}

const CustomCircularProgress = (props: CustomProgressProps) => {
  const { boxClassName } = props;
  return (
    <Box
      sx={{ position: "relative", display: "inline-flex" }}
      className={boxClassName}
    >
      <CircularProgress variant="determinate" {...props} />
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
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          style={{ fontSize: "1.25rem" }}
        >
          {`${props.value}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomCircularProgress;
