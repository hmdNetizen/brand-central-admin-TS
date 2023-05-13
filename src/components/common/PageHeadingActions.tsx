import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Input } from "./styles/PageHeadingActionsStyles";
import CustomSelect from "src/utils/CustomSelect";
import { useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material";

type PageHeadingTypes = {
  rowsPerPage: string;
  handleSelectRowsPerPage: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => void;
  filterText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText?: string;
};

const PageHeadingActions = (props: PageHeadingTypes) => {
  const {
    rowsPerPage,
    filterText,
    handleSelectRowsPerPage,
    onChange,
    placeholderText,
  } = props;
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      direction={matchesSM ? "column" : "row"}
      rowSpacing={matchesSM ? 2 : matchesMD ? 3 : 0}
      alignItems="center"
      justifyContent={matchesMD ? "space-between" : undefined}
    >
      <Grid
        item
        style={{ marginRight: matchesSM ? 0 : matchesMD ? 0 : "20rem" }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="body2">Show</Typography>
          </Grid>
          <Grid item style={{ marginRight: 5, marginLeft: 5 }}>
            <CustomSelect
              style={{ width: "100%" }}
              options={[10, 25, 50, 100]}
              value={rowsPerPage}
              onChange={handleSelectRowsPerPage}
              hasLabel={false}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2">entries</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        justifySelf="center"
        style={{ width: matchesSM ? "100%" : 350 }}
      >
        <Input
          placeholder={placeholderText}
          value={filterText}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

PageHeadingActions.defaultProps = {
  placeholderText: "Search...",
};

export default PageHeadingActions;
