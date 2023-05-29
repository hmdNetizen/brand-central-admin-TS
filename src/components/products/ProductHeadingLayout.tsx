import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled } from "@mui/material/styles";
import CustomSelect from "src/utils/CustomSelect";
import CustomIconButton from "src/utils/CustomIconButton";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";

const Input = styled("input")(({ theme }) => ({
  fontSize: "1.6rem",
  borderRadius: 5,
  border: `1px solid ${theme.palette.common.lighterGrey}`,
  padding: "1rem 1rem",
  width: "100%",

  "&:focus": {
    outline: "none",
  },
}));

type ProductHeadingProps = {
  rowsPerPage: number;
  filterText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasAddProductButton?: boolean;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const ProductHeadingLayout = (props: ProductHeadingProps) => {
  const theme = useTheme();
  const {
    filterText,
    onChange,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    hasAddProductButton,
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
          placeholder="Search product by name..."
          value={filterText}
          onChange={onChange}
        />
      </Grid>
      {hasAddProductButton && (
        <Grid item style={{ width: matchesXS ? "100%" : "auto" }}>
          <CustomIconButton
            title="Add New Product"
            background={theme.palette.secondary}
            startIcon={<AddIcon />}
            borderRadius={0}
            style={{ width: "100%" }}
            component={Link}
            to="/dashboard/products/create"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ProductHeadingLayout;
