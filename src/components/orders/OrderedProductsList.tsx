import React, { useState } from "react";
import { orderedProductsColumn } from "src/lib/dataset/tableData";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tables from "src/components/table/Tables";
import OrderedProductsItem from "./OrderedProductsItem";

import { OrderReturnedPayload } from "src/services/orders/OrderTypes";
import { SalespersonOrderResponsePayload } from "src/services/salespersons/orders/types";

type OrderProductListProps = {
  loading: boolean;
  singleOrder: OrderReturnedPayload | SalespersonOrderResponsePayload;
};

const OrderedProductsList = (props: OrderProductListProps) => {
  const {
    loading,
    singleOrder: { ordersProducts },
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container direction="column" style={{ paddingTop: "5rem" }}>
      <Grid item style={{ marginBottom: "1rem" }}>
        <Typography
          variant="h4"
          color="secondary"
          style={{ fontSize: "1.9rem", fontWeight: 600 }}
        >
          Product(s) Ordered
        </Typography>
      </Grid>
      <Grid item container direction="column">
        <Tables
          headerColumns={orderedProductsColumn}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          total={ordersProducts.length}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          loading={loading}
          hasPagination={true}
          notFoundText="No Product(s) found"
          hasShadow={false}
        >
          {ordersProducts.length > 0 &&
            ordersProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => {
                if (typeof order.product !== "string") {
                  return (
                    <OrderedProductsItem key={order.product.id} order={order} />
                  );
                } else {
                  return null;
                }
              })}
        </Tables>
      </Grid>
    </Grid>
  );
};

export default OrderedProductsList;
