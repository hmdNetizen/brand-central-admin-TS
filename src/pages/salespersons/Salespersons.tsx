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

  const salesperson = useTypedSelector(
    (state) => state.salesPersons.salespersons
  );

  const [openEditSalesperson, setOpenEditSalesperson] = useState(false);
  const [openDeleteSalesperson, setOpenDeleteSalesperson] = useState(false);

  const { getAllSalespersons } = useActions();

  //   const { getAllCustomers, getSearchedCustomers } = useActions();

  //   const debounceFilteredCustomers = useCallback(
  //     debounce(getSearchedCustomers, 500),
  //     []
  //   );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    // debounceFilteredCustomers({
    //   searchTerm: event.target.value.trim(),
    //   page: page + 1,
    //   limit: rowsPerPage,
    // });
  };

  useEffect(() => {
    getAllSalespersons();
  }, []);

  //   useEffect(() => {
  //     if (!filterText) {
  //       getAllCustomers({
  //         limit: rowsPerPage,
  //         page: page + 1,
  //       });
  //     } else {
  //       getSearchedCustomers({
  //         searchTerm: filterText,
  //         page: page + 1,
  //         limit: rowsPerPage,
  //       });
  //     }
  //   }, [page, rowsPerPage]);

  return (
    <SalesPersonsPageLayout
      title="Salespersons"
      filterText={filterText}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      openDeleteSalesperson={openDeleteSalesperson}
      setOpenDeleteSalesperson={setOpenDeleteSalesperson}
      openEditSalesperson={openEditSalesperson}
      setOpenEditSalesperson={setOpenEditSalesperson}
      salesPersonsDataset={salesperson}
      onChange={handleSearch}
    />
  );
};

export default Salespersons;
