import React, { useState, useCallback, useEffect } from "react";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";
import SalesPersonsPageLayout from "./utils/SalesPersonsPageLayout";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const Salespersons = () => {
  useTitle("Admin : List of all salespeople");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  const salespeople = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );

  const [openAddSalesperson, setOpenAddSalesperson] = useState(false);
  const [openEditSalesperson, setOpenEditSalesperson] = useState(false);
  const [openDeleteSalesperson, setOpenDeleteSalesperson] = useState(false);

  const { getAllSalespersons, getSearchedSalespeople } = useActions();

  const debounceFilteredSalespersons = useCallback(
    debounce(getSearchedSalespeople, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredSalespersons({
      searchQuery: event.target.value.trim(),
      page: page + 1,
      limit: rowsPerPage,
      isActive: true,
    });
  };

  useEffect(() => {
    if (filterText) {
      debounceFilteredSalespersons({
        searchQuery: filterText.trim(),
        page: page + 1,
        limit: rowsPerPage,
        isActive: true,
      });
    } else {
      getAllSalespersons({
        isActive: true,
        page: page + 1,
        limit: rowsPerPage,
      });
    }
  }, [filterText, page, rowsPerPage]);

  return (
    <SalesPersonsPageLayout
      title="Sales Representatives"
      filterText={filterText}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      openDeleteSalesperson={openDeleteSalesperson}
      setOpenDeleteSalesperson={setOpenDeleteSalesperson}
      openEditSalesperson={openEditSalesperson}
      setOpenEditSalesperson={setOpenEditSalesperson}
      salesPersonsDataset={salespeople.filter(
        (salesperson) => salesperson.isActive
      )}
      onChange={handleSearch}
      openAddSalesperson={openAddSalesperson}
      setOpenAddSalesperson={setOpenAddSalesperson}
    />
  );
};

export default Salespersons;
