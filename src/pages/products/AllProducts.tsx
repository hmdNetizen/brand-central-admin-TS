import React, { useState, useEffect, useCallback } from "react";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";

import ProductPageLayout from "src/components/products/ProductPageLayout";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Products = () => {
  useTitle("Admin : Find all products");
  const {
    getPaginatedProducts,
    getAllCategories,
    getAllSubcategories,
    fetchAllBrands,
  } = useActions();

  const products = useTypedSelector((state) => state.products.products);
  // const { currentPage } = useSelector((state) => state.utils);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(false);
  const [openProductGallery, setOpenProductGallery] = useState(false);

  // const debounceFilteredProducts = useCallback(
  //   debounce(fetchSearchedProducts, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    // debounceFilteredProducts({
    //   searchQuery: event.target.value,
    //   limit: rowsPerPage,
    //   page,
    // });
  };

  useEffect(() => {
    if (!filterText) {
      getPaginatedProducts({ page: page + 1, limit: rowsPerPage });
    }

    // eslint-disable-next-line
  }, [rowsPerPage, page, filterText]);

  // useEffect(() => {
  //   if (filterText) {
  //     debounceFilteredProducts({
  //       searchQuery: filterText,
  //       limit: rowsPerPage,
  //       page: page + 1,
  //     });
  //   }

  //   // eslint-disable-next-line
  // }, [filterText, page, rowsPerPage]);

  useEffect(() => {
    getAllCategories();
    getAllSubcategories();
    fetchAllBrands();
  }, []);

  return (
    <ProductPageLayout
      title="Products"
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      filterText={filterText}
      openDeleteProduct={openDeleteProduct}
      setOpenDeleteProduct={setOpenDeleteProduct}
      openEditProduct={openEditProduct}
      setOpenEditProduct={setOpenEditProduct}
      openHighlight={openHighlight}
      setOpenHighlight={setOpenHighlight}
      openProductGallery={openProductGallery}
      setOpenProductGallery={setOpenProductGallery}
      onChange={handleSearch}
      productDataset={products}
    />
  );
};

export default Products;
