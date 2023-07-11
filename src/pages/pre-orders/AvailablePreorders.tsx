import React, { useState, useLayoutEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tables from "src/components/table/Tables";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { preOrdersColumns } from "src/lib/dataset/tableData";
import { useActions } from "src/hooks/useActions";
import IgnorePreOrder from "./modals/DeletePreOrder";
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
import AvailablePreOrderItem from "src/components/pre-orders/AvailablePreOrderItem";
import { UpdateStockType } from "src/services/pre-orders/PreOrderTypes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import {
  ContainerWrapper,
  Container,
} from "src/components/common/styles/PageContainerStyles";

const initialState = {
  companyEmail: "",
  subject: "",
  message: "",
};

type EmailListType = {
  key: string;
  email: string;
};

const AvailablePreOrders = () => {
  useTitle("Admin : Find all available pre-orders");
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [mailData, setMailData] = useState(initialState);
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [emailList, setEmailList] = useState<EmailListType[]>([]);

  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openIgnorePreOrder, setOpenIgnorePreOrder] = useState(false);

  const { companyEmail, message, subject } = mailData;

  const loadingPreOrders = useTypedSelector(
    (state) => state.preOrders.loadingPreOrders
  );
  const preOrdersUpdatedStock = useTypedSelector(
    (state) => state.preOrders.preOrdersUpdatedStock
  );
  const singleUpdatedStock = useTypedSelector(
    (state) => state.preOrders.singleUpdatedStock
  );
  const filteredUpdatedStock = useTypedSelector(
    (state) => state.preOrders.filteredUpdatedStock
  );

  const {
    getUpdatedStock,
    handleFilteredUpdatedStock,
    setSingleUpdatedStock,
    updatePreOrderMultiples,
    sendNotificationEmail,
  } = useActions();

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
  const debounceUpdatedPreOrderStock = useCallback(
    debounce(handleFilteredUpdatedStock, 500),
    []
  );

  const handleClickEmailButton = (stock: UpdateStockType) => {
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
              getProductSlug(singleProduct)!
            )}>${capitalizeFirstLetters(singleProduct.productName)} (UPC : ${
              singleProduct.productUPC
            })</a>`
          : productData.map(
              (product, index, self) =>
                `${addBrandWithApostrophe(product.brandName)}${
                  self.length - 1 === self.indexOf(product) ? " and " : " "
                }<a href=${domain}/products/${encodeURIComponent(
                  getProductSlug(product)!
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
    const { id, customerData, productData } = singleUpdatedStock!;
    if (productData.length > 1) {
      await updatePreOrderMultiples({
        productId: productData.map((product) => product._id),
        isNotified: true,
        addedBy: Array.isArray(customerData)
          ? customerData.map((customer) => customer.id)
          : [customerData.id],
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

  const handleOpenIgnoreModal = (stock: UpdateStockType) => {
    setSingleUpdatedStock(stock);
    setOpenIgnorePreOrder(true);
  };

  const handleCloseMessageBox = () => {
    setOpenSendEmail(false);
  };

  const handleAddToEmailList = (event: React.KeyboardEvent) => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      stock: singleUpdatedStock!,
      to: emails,
      subject,
      content: encodeURIComponent(message),
    });
  };

  useLayoutEffect(() => {
    if (preOrdersUpdatedStock.length > 0) {
      getUpdatedStock(preOrdersUpdatedStock);
    }
  }, [preOrdersUpdatedStock]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Available Pre-orders
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
            total={filteredUpdatedStock.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loadingPreOrders}
            notFoundText="No Updated Preorder found"
          >
            {!loadingPreOrders &&
              filteredUpdatedStock
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((preorder) => {
                  return (
                    <AvailablePreOrderItem
                      preOrderItem={preorder}
                      onClickEmailButton={() =>
                        handleClickEmailButton(preorder)
                      }
                      onClickIgnoreButton={() =>
                        handleOpenIgnoreModal(preorder)
                      }
                      key={preorder.id}
                    />
                  );
                })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <MessageBox
        mailData={mailData}
        setMailData={setMailData}
        onClose={handleCloseMessageBox}
        open={openSendEmail}
        setOpen={setOpenSendEmail}
        onSubmit={handleSubmit}
        onAddEmailToList={handleAddToEmailList}
        companyEmailError={companyEmailError}
        setCompanyEmailError={setCompanyEmailError}
        emailList={emailList}
        messageError={messageError}
        setMessageError={setMessageError}
        subjectError={subjectError}
        setSubjectError={setSubjectError}
      />
      <IgnorePreOrder
        openDeletePreOrder={openIgnorePreOrder}
        setOpenDeletePreOrder={setOpenIgnorePreOrder}
        actionType="Ignore"
        clickAction={handleIgnoreNotification}
        productName={
          singleUpdatedStock?.productData?.length! > 1
            ? "these products"
            : "this product"
        }
        isClickAction={true}
      />
    </Container>
  );
};

export default AvailablePreOrders;
