import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tables from "src/components/table/Tables";
import { TableHeaderColumnTypes } from "src/lib/dataset/tableDataTypes";
import {
  RecentOrdersReturnedPayload,
  OrderExcerptDataTypes,
} from "src/services/orders/OrderTypes";
import { CustomerExcerptDataTypes } from "src/services/customers/CustomerTypes";

type CustomInfoTableProps = {
  heading: string;
  dataset:
    | RecentOrdersReturnedPayload[]
    | OrderExcerptDataTypes[]
    | CustomerExcerptDataTypes[];
  headerColumns: TableHeaderColumnTypes[];
  notFoundText: string;
  children: React.ReactNode;
  loading: boolean;
};

const CustomInfoTable = (props: CustomInfoTableProps) => {
  const { heading, dataset, headerColumns, notFoundText, children, loading } =
    props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "1rem" }}>
        <Typography
          variant="h4"
          style={{ fontSize: "1.85rem", fontWeight: 700 }}
        >
          {heading}
        </Typography>
      </Grid>
      <Grid item container>
        <Tables
          headerColumns={headerColumns}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          total={dataset.length}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          loading={loading}
          hasPagination={false}
          notFoundText={notFoundText}
          loaderHeight="350px"
        >
          {children}
        </Tables>
      </Grid>
    </Grid>
  );
};

export default CustomInfoTable;
