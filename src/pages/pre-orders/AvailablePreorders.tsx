import React, { useState, useLayoutEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import CustomSelect from "src/utils/CustomSelect";
import useMediaQuery from "@mui/material/useMediaQuery";

import Tables from "components/table/Tables";
import Button from "@mui/material/Button";
import { preOrdersColumns } from "src/lib/dataset/tableData";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import IgnorePreOrder from "./modals/DeletePreOrder";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  validateEmail,
  capitalizeFirstLetters,
  inMailList,
  getProductSlug,
  addBrandWithApostrophe,
  domain,
} from "src/lib/helpers";
import useTitle from "src/hooks/useTitle";
import MessageBox from "src/components/messages/MessageBox";

const useStyles = makeStyles((theme) => ({
  container: {
    "&.MuiGrid-root": {
      padding: "1rem 2rem 5rem 2rem",

      [theme.breakpoints.only("xs")]: {
        padding: "5rem 1rem 5rem 1rem",
      },
    },
  },
  containerWrapper: {
    background: "#fff",
    padding: "2rem 3rem",
    borderRadius: 5,

    [theme.breakpoints.only("xs")]: {
      padding: "2rem 1rem",
    },
  },

  input: {
    fontSize: "1.6rem",
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.lighterGrey}`,
    padding: "1rem 1rem",
    width: "100%",

    "&:focus": {
      outline: "none",
    },
  },
  actionButton: {
    "&.MuiButton-root": {
      minWidth: 64,
      padding: "1rem 1.5rem",
      borderRadius: "2rem",
    },
  },
  iconButton: {
    "&.MuiIconButton-root": {
      background: theme.palette.error.main,
      maxWidth: 42,

      "&:hover": {
        background: theme.palette.error.light,
      },

      "&:active": {
        background: theme.palette.error.dark,
      },

      "& .MuiSvgIcon-root": {
        color: "#fff",
      },
    },
  },
  optionsTableData: {
    minWidth: 150,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "1rem",
  },
  orderStatus: {
    "&.MuiChip-root": {
      padding: ".5rem .5rem",
      textAlign: "center",
      fontWeight: 700,
      fontSize: "1.5rem",
    },
  },
}));

const initialState = {
  companyEmail: "",
  subject: "",
  message: "",
};

const AvailablePreOrders = () => {
  useTitle("Admin : Find all available pre-orders");
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [mailData, setMailData] = useState(initialState);
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [emailList, setEmailList] = useState([]);

  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openIgnorePreOrder, setOpenIgnorePreOrder] = useState(false);

  const { companyEmail, message, subject } = mailData;

  const {
    loadingPreorders,
    preOrdersUpdatedStock,
    singleUpdatedStock,
    filteredUpdatedStock,
  } = useSelector((state) => state.preOrders);

  const {
    getUpdatedStock,
    handleFilteredUpdatedStock,
    setSingleUpdatedStock,
    updatePreOrderMultiples,
    sendNotificationEmail,
  } = useActions();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // eslint-disable-next-line
  const debounceUpdatedPreOrderStock = useCallback(
    debounce(handleFilteredUpdatedStock, 500),
    []
  );

  const handleClickEmailButton = (stock) => {
    const { customerData, productData } = stock;
    setOpenSendEmail(true);
    setSingleUpdatedStock(stock);

    const singleProduct = productData[0];

    if (Array.isArray(customerData)) {
      const emails = customerData.map((customer) => ({
        key: uuidv4(),
        email: customer.companyEmail,
      }));

      setEmailList(emails);
    } else {
      const customerEmail = {
        key: uuidv4(),
        email: customerData.companyEmail,
      };

      setEmailList([customerEmail]);
    }

    let brandName = productData.length === 1 && singleProduct.brandName;

    setMailData((prev) => ({
      ...prev,
      subject: `Your pre-ordered ${productData.length === 1 ? brandName : ""} ${
        productData.length === 1 ? "item" : "items"
      } ${productData.length === 1 ? "is" : "are"} now available.`,
      message: `${
        Array.isArray(customerData)
          ? "Dear customer"
          : "Hello " + capitalizeFirstLetters(customerData.companyName)
      },%0A%0AWe are pleased to notify you that ${
        productData.length === 1
          ? `${addBrandWithApostrophe(
              singleProduct.brandName
            )} <a href=${domain}/products/${encodeURIComponent(
              getProductSlug(singleProduct)
            )}>${capitalizeFirstLetters(singleProduct.productName)} (UPC : ${
              singleProduct.productUPC
            })</a>`
          : productData.map(
              (product, index, self) =>
                `${addBrandWithApostrophe(product.brandName)}${
                  self.length - 1 === self.indexOf(product) ? " and " : " "
                }<a href=${domain}/products/${encodeURIComponent(
                  getProductSlug(product)
                )}>${capitalizeFirstLetters(product.productName)} (UPC : ${
                  product.productUPC
                })</a>`
            )
      } that you pre-ordered ${
        productData.length === 1 ? "is" : "are"
      } now available. You can now place an order for the ${
        productData.length === 1 ? "product" : "products"
      } at your convenience.%0A%0APlease note that ${
        productData.length === 1
          ? "this is a difficult item"
          : "these are difficult items"
      } to stock and may not be available much longer.%0A%0ARegards,%0ABrand Central Wholesale`,
    }));
  };

  const handleIgnoreNotification = async () => {
    const { id, customerData, productData } = singleUpdatedStock;
    if (productData.length > 1) {
      await updatePreOrderMultiples({
        productId: productData.map((product) => product._id),
        isNotified: true,
        addedBy: customerData.id,
        itemId: id,
      });
    } else {
      await updatePreOrderMultiples({
        productId: productData[0]._id,
        isNotified: true,
        addedBy: Array.isArray(customerData)
          ? customerData.map((customer) => customer.id)
          : [customerData.id],
        itemId: id,
      });
    }

    toast.warning("Pre-order item has been removed available pr-order stock", {
      position: "top-center",
      hideProgressBar: true,
    });

    setOpenIgnorePreOrder(false);
  };

  const handleOpenIgnoreModal = (stock) => {
    setSingleUpdatedStock(stock);
    setOpenIgnorePreOrder(true);
  };

  const handleCloseMessageBox = () => {
    setOpenSendEmail(false);
  };

  const handleAddToEmailList = (event) => {
    if (event.key === "Enter") {
      if (!validateEmail(companyEmail)) {
        setCompanyEmailError("Please enter a valid email");
        setTimeout(() => {
          setCompanyEmailError("");
        }, 5000);
      } else if (inMailList(emailList, companyEmail)) {
        setCompanyEmailError("Email already exist");
      } else {
        setEmailList([...emailList, { key: uuidv4(), email: companyEmail }]);
        setCompanyEmailError("");
      }
    }
  };

  const handleSearch = (event) => {
    setFilterText(event.target.value);
    debounceUpdatedPreOrderStock({
      text: event.target.value,
      updatedPreOrderData: preOrdersUpdatedStock,
    });

    setPage(0);
  };

  const handleSubmit = () => {
    const emails = emailList.map((list) => list.email);

    if (emails.length === 0) {
      setCompanyEmailError("Please enter recipient email address");
      return;
    }

    sendNotificationEmail({
      setOpen: setOpenSendEmail,
      stock: singleUpdatedStock,
      to: emails,
      subject,
      content: encodeURIComponent(message),
    });
  };

  useLayoutEffect(() => {
    if (preOrdersUpdatedStock.length > 0) {
      getUpdatedStock(preOrdersUpdatedStock);
    }

    // eslint-disable-next-line
  }, [preOrdersUpdatedStock]);

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Available Pre-orders
        </Typography>
      </Grid>
      <Grid item container className={classes.containerWrapper}>
        <Grid
          container
          direction={matchesSM ? "column" : "row"}
          rowSpacing={matchesSM ? 2 : matchesMD ? 3 : 0}
          alignItems="center"
          justifyContent={matchesMD ? "space-between" : undefined}
        >
          <Grid
            item
            style={{ marginRight: matchesSM ? 0 : matchesMD ? 0 : "20rem" }}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2">Show</Typography>
              </Grid>
              <Grid item style={{ marginRight: 5, marginLeft: 5 }}>
                <CustomSelect
                  style={{ width: "100%" }}
                  options={[10, 25, 50, 100]}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  hasLabel={false}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">entries</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            justifySelf="center"
            style={{ width: matchesSM ? "100%" : 350 }}
          >
            <input
              className={classes.input}
              placeholder="Search by Customer Name or Email..."
              value={filterText}
              onChange={handleSearch}
            />
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={preOrdersColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={filteredUpdatedStock.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingPreorders}
            notFoundText="No Updated Preorder found"
          >
            {!loadingPreorders &&
              filteredUpdatedStock
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((preorder, index) => {
                  const { customerData, productData } = preorder;
                  return (
                    // AvailablePreOrder Item
                  );
                })}
          </Tables>
        </Grid>
      </Grid>
      <MessageBox
        mailData={mailData}
        setMailData={setMailData}
        handleClose={handleCloseMessageBox}
        open={openSendEmail}
        setOpen={setOpenSendEmail}
        onSubmit={handleSubmit}
        handleAddToEmailList={handleAddToEmailList}
        companyEmailError={companyEmailError}
        setCompanyEmailError={setCompanyEmailError}
        emailList={emailList}
        setEmailList={setEmailList}
      />
      <IgnorePreOrder
        openDeletePreOrder={openIgnorePreOrder}
        setOpenDeletePreOrder={setOpenIgnorePreOrder}
        actionType="Ignore"
        clickAction={handleIgnoreNotification}
        productName={
          singleUpdatedStock?.productData?.length > 1
            ? "these products"
            : "this product"
        }
      />
    </Grid>
  );
};

export default AvailablePreOrders;
