import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";
import TableHeader from "./TableHead";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Spinner from "src/utils/Spinner";
import { styled } from "@mui/material/styles";
import { TablePropsType } from "src/components/table/TablePropsType";
import React from "react";

const StyledTablePagination = styled(TablePagination)<
  TablePaginationProps & { component: React.ElementType }
>({
  "& .MuiTablePagination-select": {
    "&.MuiSelect-select": {
      minHeight: 0,
      fontSize: "1.2rem",
      padding: "0.6rem",
    },
    "&.MuiTablePagination-menuItem": {
      fontSize: "1.2rem !important",
    },
  },
});

const Tables = (props: TablePropsType) => {
  const {
    headerColumns,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    children,
    total,
    loading,
    handleChangeRowsPerPage,
    hasPagination,
    notFoundText,
    loaderHeight,
    notFoundHeight,
    hasShadow,
    ...rest
  } = props;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: hasShadow ? undefined : "none",
      }}
    >
      {loading ? (
        <Spinner loaderHeight={loaderHeight} />
      ) : !loading && total === 0 ? (
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: notFoundHeight }}
        >
          <Typography variant="body1">{notFoundText}</Typography>
        </Grid>
      ) : (
        <TableContainer {...rest}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ minHeight: "100%" }}
          >
            <TableHeader headerColumns={headerColumns} />

            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <h1>Total</h1> */}
      {hasPagination && (
        <StyledTablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Enteries per page"
          {...rest}
        />
      )}
    </Paper>
  );
};

Tables.defaultProps = {
  hasPagination: true,
  loaderHeight: "80vh",
  notFoundHeight: "80vh",
  hasShadow: true,
};

export default Tables;
