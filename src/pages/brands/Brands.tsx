import React, { useState, useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import BrandPageLayout from "./BrandPageLayout";

const Brands = () => {
  useTitle("Admin : List of all brands");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddBrand, setOpenAddBrand] = useState(false);
  const [openEditBrand, setOpenEditBrand] = useState(false);
  const [openDeleteBrand, setOpenDeleteBrand] = useState(false);

  const loadingBrands = useTypedSelector((state) => state.brands.loadingBrands);
  const brands = useTypedSelector((state) => state.brands.brands);
  const total = useTypedSelector((state) => state.brands.total);

  const { getAllBrands, getSearchedBrands } = useActions();

  useEffect(() => {
    if (!filterText) {
      getAllBrands({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getSearchedBrands({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: filterText,
      });
    }
  }, [filterText, page, rowsPerPage]);

  return (
    <BrandPageLayout
      brands={brands.filter((brand) => brand.isActivated)}
      filterText={filterText}
      page={page}
      rowsPerPage={rowsPerPage}
      setFilterText={setFilterText}
      setOpenAddBrand={setOpenAddBrand}
      setOpenDeleteBrand={setOpenDeleteBrand}
      setOpenEditBrand={setOpenEditBrand}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      openAddBrand={openAddBrand}
      openEditBrand={openEditBrand}
    />
  );
};

export default Brands;
