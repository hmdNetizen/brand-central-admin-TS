import React, { useState, useEffect, useCallback } from "react";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";

import ProductPageLayout from "src/components/products/ProductPageLayout";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const FeaturedProducts = () => {
  useTitle("Admin : Find all featured products");
  const {
    getProductVariants,
    getAllCategories,
    getAllSubcategories,
    fetchAllBrands,
    getSearchedProducts,
  } = useActions();

  const paginatedProducts = useTypedSelector(
    (state) => state.products.paginatedProducts
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(false);
  const [openProductGallery, setOpenProductGallery] = useState(false);

  const debounceSearchedProducts = useCallback(
    debounce(getSearchedProducts, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceSearchedProducts({
      searchTerm: event.target.value,
      limit: rowsPerPage,
      page: page + 1,
      variant: "featured",
    });
  };

  useEffect(() => {
    if (!filterText) {
      getProductVariants({
        page: page + 1,
        limit: rowsPerPage,
        variant: "featured",
      });
    }
  }, [rowsPerPage, page, filterText]);

  // useEffect(() => {
  //   if (filterText) {
  //     debounceSearchedProducts({
  //       searchTerm: filterText,
  //       limit: rowsPerPage,
  //       page: page + 1,
  //       variant: "featured",
  //     });
  //   }
  // }, [filterText, page]);

  useEffect(() => {
    getAllCategories();
    getAllSubcategories();
    fetchAllBrands();
  }, []);

  return (
    <ProductPageLayout
      title="Featured Products"
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
      productDataset={paginatedProducts}
    />
  );
};

export default FeaturedProducts;
