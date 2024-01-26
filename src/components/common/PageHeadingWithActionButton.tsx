import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CustomSelect from "src/utils/CustomSelect";
import CustomIconButton from "src/utils/CustomIconButton";
import { SelectChangeEvent } from "@mui/material";
import { Input } from "./styles/PageHeadingActionsStyles";

type PageHeadingActionProps = {
  rowsPerPage: number;
  filterText: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonTitle: string;
  isDeactivatedPage?: boolean;
  placeholderText?: string;
};

const PageHeadingWithActionButton = (props: PageHeadingActionProps) => {
  const theme = useTheme();
  const {
    filterText,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    handleSearch,
    setOpen,
    buttonTitle,
    isDeactivatedPage,
    placeholderText,
  } = props;

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const handleSelectRowsPerPage = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ): void => {
    const selectEvent = event as SelectChangeEvent<HTMLInputElement>;
    setRowsPerPage(+selectEvent.target.value);
    setPage(0);
  };

  return (
    <Grid
      container
      direction={matchesSM ? "column" : "row"}
      justifyContent={matchesMD ? "space-around" : "space-between"}
      rowSpacing={matchesSM ? 2 : matchesMD ? 3 : 0}
      alignItems="center"
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="body2">Show</Typography>
          </Grid>
          <Grid item style={{ marginRight: 5, marginLeft: 5 }}>
            <CustomSelect
              style={{ width: "100%" }}
              options={[10, 25, 50, 100]}
              value={rowsPerPage.toString()}
              onChange={handleSelectRowsPerPage}
              hasLabel={false}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2">entries</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: matchesSM ? "100%" : 350 }}>
        <Input
          placeholder={placeholderText}
          value={filterText}
          onChange={handleSearch}
        />
      </Grid>
      {!isDeactivatedPage ? (
        <Grid item style={{ width: matchesXS ? "100%" : "auto" }}>
          <CustomIconButton
            title={buttonTitle}
            background={theme.palette.secondary}
            startIcon={<AddIcon />}
            borderRadius={0}
            style={{ width: "100%" }}
            onClick={() => {
              setOpen(true);
            }}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default PageHeadingWithActionButton;
