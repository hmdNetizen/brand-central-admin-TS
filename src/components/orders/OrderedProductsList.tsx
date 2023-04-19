import React, { useState } from "react";
import { orderedProductsColumn } from "src/lib/dataset/tableData";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tables from "components/table/Tables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { OrderReturnedPayload } from "src/services/orders/OrderTypes";

const ProductImage = styled("img")({
  width: 50,
  height: 50,
  maxWidth: 100,
  maxHeight: 100,
});

type OrderProductListProps = {
  loading: boolean;
  singleOrder: OrderReturnedPayload;
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
    <Grid container direction="column" style={{ paddingTop: "2rem" }}>
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
                  const {
                    product: { id, name, price, brandName, itemCode, image },
                    productQuantity,
                    productTotalCost,
                  } = order;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell>
                        <ProductImage src={image} alt={`${name} icon`} />
                      </TableCell>
                      <TableCell>{itemCode}</TableCell>
                      <TableCell>{brandName}</TableCell>
                      <TableCell style={{ minWidth: 250 }}>{name}</TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        <Typography variant="body1" style={{ fontWeight: 600 }}>
                          <span>Price: </span>${price}
                        </Typography>
                        <Typography variant="body2">
                          <span>Qty: </span> {productQuantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        ${productTotalCost?.toFixed(2)}
                      </TableCell>
                    </TableRow>
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
