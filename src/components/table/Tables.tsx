import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import TableHeader from "./TableHead";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Spinner from "src/utils/Spinner";
import { styled } from "@mui/material/styles";
import { TableHeaderColumnTypes } from "src/lib/dataset/tableDataTypes";
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

type TableProps = {
  headerColumns: TableHeaderColumnTypes[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  total: number;
  loading: boolean;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  hasPagination: boolean;
  notFoundText: string;
  loaderHeight: string | number;
  notFoundHeight: string | number;
  hasShadow: boolean;
};

const Tables = (props: TableProps) => {
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

Tables.propTypes = {
  headerColumns: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  total: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func,
  setPage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  notFoundText: PropTypes.string,
};

Tables.defaultProps = {
  hasPagination: true,
  loaderHeight: "80vh",
  notFoundHeight: "80vh",
  hasShadow: true,
};

export default Tables;
