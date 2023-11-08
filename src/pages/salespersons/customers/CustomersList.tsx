import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";
import SalespeopleCustomers from "src/components/salespersons/customers/SalespeopleCustomers";
import { useActions } from "src/hooks/useActions";

const SalespersonCustomersList = () => {
  const theme = useTheme();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [openAddCustomer, setOpenAddCustomer] = useState(false);

  const { getSalespeopleCustomers } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);

    setFilterText(event.target.value);
  };

  useEffect(() => {
    getSalespeopleCustomers({
      limit: rowsPerPage,
      page: page + 1,
    });
  }, [rowsPerPage, page]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Sales Reps' Customers
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={handleChange}
          rowsPerPage={rowsPerPage}
          buttonTitle="Create a Sales Rep's customer"
          setOpen={setOpenAddCustomer}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          isDeactivatedPage={false}
          placeholderText="Search..."
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <SalespeopleCustomers />
        </Grid>
      </ContainerWrapper>
    </Container>
  );
};

export default SalespersonCustomersList;
