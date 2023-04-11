import React from "react";
import CustomProductsTable from "src/components/products/CustomProductsTable";
import { dashboardProductColumns } from "src/lib/dataset/tableData";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const DashboardPopularProducts = () => {
  const loadingPopularProducts = useTypedSelector(
    (state) => state.products.loadingPopularProducts
  );
  const popularProducts = useTypedSelector(
    (state) => state.products.popularProducts
  );

  return (
    <CustomProductsTable
      heading="Popular Product(s)"
      notFoundText="Product(s) Not Found"
      dataset={popularProducts}
      loading={loadingPopularProducts}
      headerColumns={dashboardProductColumns}
      hasPagination={false}
    />
  );
};

export default DashboardPopularProducts;
