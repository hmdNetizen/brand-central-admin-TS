import React, { useState, useEffect, useCallback } from "react";
import { useActions } from "src/hooks/useActions";

import AddBrand from "./modals/AddBrand";
//   import EditBrand from "./modals/EditBrand";
//   import DeleteBrand from "./modals/DeleteBrand";
import debounce from "lodash.debounce";
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

  const { getAllBrands } = useActions();

  //   eslint-disable-next-line
  // const debounceFilteredBrands = useCallback(
  //   debounce(handleFilteredBrandsData, 500),
  //   []
  // );

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <BrandPageLayout
      brands={brands}
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
    />
  );
};

export default Brands;
