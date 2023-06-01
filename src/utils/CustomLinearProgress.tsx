import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { useTypedSelector } from "src/hooks/useTypedSelector";

interface LinearProgressPropTypes extends LinearProgressProps {
  updatedInventory: string;
}

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "updatedInventory",
})<LinearProgressPropTypes>(({ theme, updatedInventory }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    backgroundColor:
      updatedInventory === "Update Completed"
        ? theme.palette.success.main
        : "#308fe8",
  },
}));

const CustomLinearProgressBar = () => {
  const uploadPercentage = useTypedSelector(
    (state) => state.common.uploadPercentage
  );
  const updatedInventory = useTypedSelector(
    (state) => state.products.updatedInventory
  );

  return (
    <Box
      sx={{
        display: uploadPercentage !== 0 ? "flex" : "none",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress
          variant="determinate"
          value={uploadPercentage}
          updatedInventory={updatedInventory}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${uploadPercentage}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CustomLinearProgressBar;
