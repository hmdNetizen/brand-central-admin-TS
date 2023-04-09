import Grid from "@mui/material/Grid";
import spinner from "assets/gif/loading-screen.gif";

const Spinner = ({ loaderHeight }: { loaderHeight: string | number }) => {
  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: loaderHeight,
        background: "#fff",
      }}
    >
      <img src={spinner} alt="loading spinner" style={{ width: 150 }} />
    </Grid>
  );
};

export default Spinner;
