import CustomProductsTable from "src/components/products/CustomProductsTable";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { dashboardProductColumns } from "src/lib/dataset/tableData";

const RecentProducts = () => {
  const recentProducts = useTypedSelector(
    (state) => state.products.recentProducts
  );
  const loadingRecentProducts = useTypedSelector(
    (state) => state.products.loadingRecentProducts
  );
  return (
    <CustomProductsTable
      heading="Recent Product(s)"
      notFoundText="Product(s) Not Found"
      dataset={recentProducts}
      loading={loadingRecentProducts}
      headerColumns={dashboardProductColumns}
      hasPagination={false}
    />
  );
};

export default RecentProducts;
