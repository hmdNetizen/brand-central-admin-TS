import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import EmailCustomer from "../orders/modals/EmailCustomerOrder";
import DeletePreOrder from "./modals/DeletePreOrder";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import { SelectChangeEvent } from "@mui/material";
import { preOrdersColumns } from "src/lib/dataset/tableData";
import PreOrderItem from "src/components/pre-orders/PreOrderItem";

const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

const ContainerWrapper = styled(Grid)(({ theme }) => ({
  background: "#fff",
  padding: "2rem 3rem",
  borderRadius: 5,

  [theme.breakpoints.only("xs")]: {
    padding: "2rem 1rem",
  },
}));

const PreOrders = () => {
  useTitle("Admin : Find all pre-orders");
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openDeletePreOrder, setOpenDeletePreOrder] = useState(false);

  const loadingPreOrders = useTypedSelector(
    (state) => state.preOrders.loadingPreOrders
  );
  const preOrders = useTypedSelector((state) => state.preOrders.preOrders);
  const singlePreOrder = useTypedSelector(
    (state) => state.preOrders.singlePreOrder
  );
  const filteredPreOrders = useTypedSelector(
    (state) => state.preOrders.filteredPreOrders
  );

  const { getAllPreOrders, getPreOrderData, handleFilteredPreOrdersData } =
    useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectRowsPerPage = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ): void => {
    const selectEvent = event as SelectChangeEvent<HTMLInputElement>;
    setRowsPerPage(+selectEvent.target.value);
    setPage(0);
  };

  // eslint-disable-next-line
  const debouncePreOrder = useCallback(
    debounce(handleFilteredPreOrdersData, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    debouncePreOrder({
      text: event.target.value,
      preOrderData: preOrders,
    });

    setPage(0);
  };

  useEffect(() => {
    getAllPreOrders();

    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (preOrders.length > 0) {
      getPreOrderData(preOrders);
    }

    // eslint-disable-next-line
  }, [preOrders]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Preorders
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingActions
          filterText={filterText}
          onChange={handleSearch}
          rowsPerPage={rowsPerPage.toString()}
          handleSelectRowsPerPage={handleSelectRowsPerPage}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={preOrdersColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={filteredPreOrders.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingPreOrders}
            notFoundText="No Order found"
          >
            {!loadingPreOrders &&
              filteredPreOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((preOrder) => {
                  return (
                    <PreOrderItem
                      key={preOrder._id}
                      preOrder={preOrder}
                      setOpenDeletePreOrder={setOpenDeletePreOrder}
                      setOpenSendEmail={setOpenSendEmail}
                    />
                  );
                })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <EmailCustomer
        isPreOrder={true}
        open={openSendEmail}
        setOpen={setOpenSendEmail}
      />
      <DeletePreOrder
        openDeletePreOrder={openDeletePreOrder}
        setOpenDeletePreOrder={setOpenDeletePreOrder}
        productName={singlePreOrder?.productName!}
        isClickAction={false}
      />
    </Container>
  );
};

export default PreOrders;
