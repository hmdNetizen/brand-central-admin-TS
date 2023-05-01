import debounce from "lodash.debounce";
import { useState, useEffect, useCallback } from "react";
import { useActions } from "src/hooks/useActions";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import BrandPageLayout from "./BrandPageLayout";

const DeactivatedBrands = () => {
  useTitle("Admin : List of all Deactivated Brands");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddBrand, setOpenAddBrand] = useState(false);
  const [openEditBrand, setOpenEditBrand] = useState(false);
  const [openDeleteBrand, setOpenDeleteBrand] = useState(false);

  const brands = useTypedSelector((state) => state.brands.brands);

  const { getDeactivatedBrands, getSearchedDeactivatedBrands } = useActions();

  const debounceFilteredBrands = useCallback(
    debounce(getSearchedDeactivatedBrands, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredBrands({
      page: page + 1,
      limit: rowsPerPage,
      searchTerm: event.target.value,
    });
  };

  useEffect(() => {
    if (!filterText) {
      getDeactivatedBrands({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getSearchedDeactivatedBrands({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: filterText,
      });
    }
  }, [filterText, page, rowsPerPage]);

  return (
    <BrandPageLayout
      brands={brands.filter((brand) => !brand.isActivated)}
      filterText={filterText}
      page={page}
      rowsPerPage={rowsPerPage}
      setOpenAddBrand={setOpenAddBrand}
      setOpenDeleteBrand={setOpenDeleteBrand}
      setOpenEditBrand={setOpenEditBrand}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      openAddBrand={openAddBrand}
      openEditBrand={openEditBrand}
      openDeleteBrand={openDeleteBrand}
      isDeactivatedPage={true}
      onSearch={handleSearch}
    />
  );
};

export default DeactivatedBrands;
