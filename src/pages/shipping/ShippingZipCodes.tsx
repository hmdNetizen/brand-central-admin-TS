import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
// import AddZipCode from "./modals/AddZipCode";
// import EditZipCode from "./modals/EditZipCode";
// import DeleteZipCode from "./modals/DeleteZipCode";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import ShippingItem from "src/components/shipping/ShippingItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { zipCodeColumns } from "src/lib/dataset/tableData";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";

const ShippingZipCodes = () => {
  useTitle("Admin : Find all shipping zip codes");
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddZipCode, setOpenAddZipCode] = useState(false);
  const [openEditZipCode, setOpenEditZipCode] = useState(false);
  const [openDeleteZipCode, setOpenDeleteZipCode] = useState(false);

  const loading = useTypedSelector((state) => state.shipping.loading);
  const zipCodes = useTypedSelector((state) => state.shipping.zipCodes);
  const total = useTypedSelector((state) => state.shipping.total);

  const { getShippingZipCodes, getSearchedZipCodes } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const debounceSearchedZipCodes = useCallback(
    debounce(getSearchedZipCodes, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceSearchedZipCodes({
      page: page + 1,
      limit: rowsPerPage,
      searchTerm: event.target.value,
    });
  };

  useEffect(() => {
    if (!filterText.length) {
      getShippingZipCodes({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      debounceSearchedZipCodes({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: filterText,
      });
    }
  }, [page, rowsPerPage, filterText]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Shipping Zip Codes
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          buttonTitle="Add New Zip code"
          filterText={filterText}
          handleSearch={handleSearch}
          rowsPerPage={rowsPerPage}
          setOpen={setOpenAddZipCode}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />

        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={zipCodeColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={total}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Zip Code Found"
          >
            {!loading &&
              zipCodes.map((zip, index) => {
                return (
                  <ShippingItem
                    key={zip._id}
                    zipCode={zip}
                    index={index}
                    setOpenDeleteZipCode={setOpenDeleteZipCode}
                    setOpenEditZipCode={setOpenEditZipCode}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <AddZipCode
        openAddZipCode={openAddZipCode}
        setOpenAddZipCode={setOpenAddZipCode}
      /> */}
      {/* <EditZipCode
        openEditZipCode={openEditZipCode}
        setOpenEditZipCode={setOpenEditZipCode}
      /> */}
      {/* <DeleteZipCode
        openDeleteZipCode={openDeleteZipCode}
        setOpenDeleteZipCode={setOpenDeleteZipCode}
      /> */}
    </Container>
  );
};

export default ShippingZipCodes;
