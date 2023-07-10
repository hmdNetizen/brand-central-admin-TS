import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tables from "src/components/table/Tables";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { capitalizeFirstLetters } from "src/lib/helpers";
import placeholderImg from "src/assets/images/not-found-img.png";
import { DashboardProductType } from "src/services/products/ProductTypes";
import { TableHeaderColumnTypes } from "src/lib/dataset/tableDataTypes";

const ProductImage = styled("img")({
  width: 50,
  height: 50,
  maxWidth: 100,
  maxHeight: 100,
});

type CustomProductsTableProps = {
  heading: string;
  notFoundText: string;
  dataset: DashboardProductType[];
  loading: boolean;
  headerColumns: TableHeaderColumnTypes[];
  hasPagination?: boolean;
};

const CustomProductTable = (props: CustomProductsTableProps) => {
  const {
    heading,
    notFoundText,
    dataset,
    loading,
    headerColumns,
    hasPagination,
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
          hasPagination={hasPagination}
          notFoundText={notFoundText}
        >
          {dataset.length > 0 &&
            dataset
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: DashboardProductType) => {
                const {
                  _id,
                  productName,
                  featuredImage,
                  category,
                  subCategory,
                  productType,
                  priceCode3,
                  hasImage,
                } = product;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
                    <TableCell>
                      <ProductImage
                        src={hasImage ? featuredImage : placeholderImg}
                        alt={`${productName}`}
                      />
                    </TableCell>
                    <TableCell style={{ minWidth: 250 }}>
                      {productName}
                    </TableCell>
                    <TableCell style={{ minWidth: 200 }}>
                      <Typography variant="body1" style={{ fontWeight: 600 }}>
                        {category.toUpperCase()}
                      </Typography>
                      <Typography variant="body2">
                        {capitalizeFirstLetters(subCategory)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {productType ? productType : "Physical"}
                    </TableCell>
                    <TableCell>${Number(priceCode3).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
        </Tables>
      </Grid>
    </Grid>
  );
};

CustomProductTable.defaultProps = {
  hasPagination: true,
};

export default CustomProductTable;
