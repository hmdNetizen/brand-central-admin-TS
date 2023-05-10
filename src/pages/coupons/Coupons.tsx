import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { useActions } from "src/hooks/useActions";
import { couponColumn } from "src/lib/dataset/tableData";
import AddNewCoupon from "./modals/AddCoupon";
import EditCoupon from "./modals/EditCoupon";
import DeleteCoupon from "./modals/DeleteCoupon";
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [openAddCoupon, setOpenAddCoupon] = useState(false);
  const [openEditCoupon, setOpenEditCoupon] = useState(false);
  const [openDeleteCoupon, setOpenDeleteCoupon] = useState(false);

  const loading = useTypedSelector((state) => state.coupon.loading);
  const loadingCouponActivation = useTypedSelector(
    (state) => state.coupon.loadingCouponActivation
  );
  const coupons = useTypedSelector((state) => state.coupon.coupons);
  const total = useTypedSelector((state) => state.coupon.total);

  const { getAllCoupons, getSearchedCoupon } = useActions();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const debounceFilteredCoupon = useCallback(
    debounce(getSearchedCoupon, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceFilteredCoupon({
      page: page + 1,
      limit: rowsPerPage,
      searchTerm: event.target.value,
    });
  };

  const handleLoadingCouponAction = () => {
    return !loadingCouponActivation;
  };

  useEffect(() => {
    if (!filterText) {
      getAllCoupons({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      getSearchedCoupon({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: filterText,
      });
    }
  }, [filterText, page, rowsPerPage]);

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
            total={total}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Coupon Found"
          >
            {!loading &&
              coupons.length > 0 &&
              coupons.map((coupon, index) => {
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
      <AddNewCoupon
        openAddCoupon={openAddCoupon}
        setOpenAddCoupon={setOpenAddCoupon}
      />
      <EditCoupon
        openEditCoupon={openEditCoupon}
        setOpenEditCoupon={setOpenEditCoupon}
      />
      <DeleteCoupon
        openDeleteCoupon={openDeleteCoupon}
        setOpenDeleteCoupon={setOpenDeleteCoupon}
      />
      <CustomLoadingDialog
        loading={loadingCouponActivation}
        handleLoading={handleLoadingCouponAction}
      />
    </Container>
  );
};

export default Coupons;
