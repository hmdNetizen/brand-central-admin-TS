import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { couponColumn } from "src/lib/dataset/tableData";
//   import AddNewCoupon from "./modals/AddNewCoupon";
//   import EditCoupon from "./modals/EditCoupon";
//   import DeleteCoupon from "./modals/DeleteCoupon";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import CouponItem from "src/components/coupon/CouponItem";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import PageHeadingWithActionButton from "src/components/common/PageHeadingWithActionButton";

const Coupons = () => {
  useTitle("Admin : Coupon");
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddCoupon, setOpenAddCoupon] = useState(false);
  //   eslint-disable-next-line
  const [openEditCoupon, setOpenEditCoupon] = useState(false);
  //   eslint-disable-next-line
  const [openDeleteCoupon, setOpenDeleteCoupon] = useState(false);

  const loading = useTypedSelector((state) => state.coupon.loading);
  const loadingCouponActivation = useTypedSelector(
    (state) => state.coupon.loadingCouponActivation
  );
  const coupons = useTypedSelector((state) => state.coupon.coupons);

  const { getAllCoupons } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // eslint-disable-next-line
  // const debounceFilteredCoupon = useCallback(
  //   debounce(handleFilteredCoupons, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    // debounceFilteredCoupon(event.target.value);

    setPage(0);
  };

  const handleLoadingCouponAction = () => {
    return !loadingCouponActivation;
  };

  useEffect(() => {
    getAllCoupons();

    // eslint-disable-next-line
  }, []);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Coupons
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingWithActionButton
          filterText={filterText}
          handleSearch={handleSearch}
          rowsPerPage={rowsPerPage}
          setOpen={setOpenAddCoupon}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          buttonTitle="Add New Coupon"
          isDeactivatedPage={false}
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={couponColumn}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={coupons.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Coupon Found"
          >
            {!loading &&
              coupons.length > 0 &&
              coupons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coupon, index) => {
                  return (
                    <CouponItem
                      key={coupon._id}
                      coupon={coupon}
                      index={index}
                      setOpenDeleteCoupon={setOpenDeleteCoupon}
                      setOpenEditCoupon={setOpenEditCoupon}
                    />
                  );
                })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <AddNewCoupon
        openAddCoupon={openAddCoupon}
        setOpenAddCoupon={setOpenAddCoupon}
      /> */}
      {/* <EditCoupon
        openEditCoupon={openEditCoupon}
        setOpenEditCoupon={setOpenEditCoupon}
      /> */}
      {/* <DeleteCoupon
        openDeleteCoupon={openDeleteCoupon}
        setOpenDeleteCoupon={setOpenDeleteCoupon}
      /> */}
      <CustomLoadingDialog
        loading={loadingCouponActivation}
        handleLoading={handleLoadingCouponAction}
      />
    </Container>
  );
};

export default Coupons;
