import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import MailOutlinedIcon from "@mui/icons-material/MailOutline";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { useActions } from "src/hooks/useActions";
import MessageBox from "src/components/messages/MessageBox";
import {
  validateEmail,
  inMailList,
  getProductSlug,
  capitalizeFirstLetters,
  addBrandWithApostrophe,
  domain,
} from "src/lib/helpers";
import {
  Container,
  CompanyName,
  EmailButton,
  IgnoreButton,
  ProductImage,
} from "./styles";
import { NotificationItemProps } from "./types";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { EmailList, MailDataTypes } from "../messages/types";

const initialState = {
  companyEmail: "",
  subject: "",
  message: "",
};

const NotificationItemMobile = (props: NotificationItemProps) => {
  const { stock, setProductCode, productCode, setShowNotification } = props;
  const { customerData, productData } = stock;

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesXXS = useMediaQuery("(max-width: 450px)");

  const loadingPreOrderAction = useTypedSelector(
    (state) => state.preOrders.loadingPreOrderAction
  );

  const preOrdersUpdatedStock = useTypedSelector(
    (state) => state.preOrders.preOrdersUpdatedStock
  );

  const [mailData, setMailData] = useState<MailDataTypes>(initialState);
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [emailList, setEmailList] = useState<EmailList[]>([]);

  const { companyEmail, message, subject } = mailData;

  const {
    setSingleUpdatedStock,
    sendNotificationEmail,
    updatePreOrderMultiples,
  } = useActions();

  const singleProduct = productData[0];

  const handleClickEmailButton = () => {
    setMessageBoxOpen(true);
    setSingleUpdatedStock(stock);

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

  const handleCloseMessageBox = () => {
    setMessageBoxOpen(false);
  };

  const handleAddToEmailList = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (!validateEmail(companyEmail)) {
        setCompanyEmailError("Please enter a valid email");
      } else if (inMailList(emailList, companyEmail)) {
        setCompanyEmailError("Email already exist");
      } else {
        setEmailList([...emailList, { key: uuidv4(), email: companyEmail }]);
        setCompanyEmailError("");
      }

      setTimeout(() => setCompanyEmailError(""), 5000);
    }
  };

  const handleIgnoreNotification = async () => {
    setProductCode(stock.id);
    if (productData.length > 1) {
      await updatePreOrderMultiples({
        productId: productData.map((product) => product._id),
        isNotified: true,
        addedBy: Array.isArray(customerData)
          ? customerData.map((customer) => customer.id)
          : [customerData.id],
        itemId: stock.id,
      });
    } else {
      await updatePreOrderMultiples({
        productId: productData[0]._id,
        isNotified: true,
        addedBy: Array.isArray(customerData)
          ? customerData.map((customer) => customer.id)
          : [customerData.id],
        itemId: stock.id,
      });
    }

    if (preOrdersUpdatedStock.length === 0) {
      setShowNotification(false);
    }

    toast.warning("Pre-order item has been removed from notification", {
      position: "top-center",
      hideProgressBar: true,
    });

    setProductCode("");
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    const emails = emailList.map((list) => list.email);
    sendNotificationEmail({
      setOpen: setMessageBoxOpen,
      stock,
      to: emails,
      subject,
      content: encodeURIComponent(message),
    });
  };

  return (
    <Fragment>
      <Container container columnSpacing={1}>
        {/* Column 1 */}
        <Grid item xs={3}>
          <Grid container direction="column">
            {productData.map((product) => {
              const { _id, productName, featuredImage, brandName, itemCode } =
                product;

              return (
                <Fragment key={_id}>
                  <Grid item>
                    <ProductImage src={featuredImage} alt={productName} />
                  </Grid>
                  <Grid item pl={1}>
                    <Typography variant="body2" color="secondary">
                      {itemCode}
                    </Typography>
                  </Grid>
                  <Grid item pl={1}>
                    <Typography variant="body2">{brandName}</Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
        {/* Column 2 */}
        <Grid item xs={9}>
          <Grid
            container
            direction="column"
            justifyContent={productData.length > 1 ? "space-between" : "center"}
            style={{ minHeight: "100%" }}
            pt={2}
          >
            {productData.map((product) => {
              const { productName, _id } = product;
              return (
                <Grid item container direction="column" pb={2} key={_id}>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: 600,
                      fontSize: "1.45rem",
                      fontFamily: "Nunito",
                    }}
                  >
                    {productName}
                  </Typography>
                </Grid>
              );
            })}
            <Grid item container direction="column">
              {Array.isArray(customerData) ? (
                customerData.map((customer) => {
                  const { id, companyName, companyEmail } = customer;

                  return (
                    <Grid item container direction="column" key={id} pb={1}>
                      <Grid item>
                        <CompanyName variant="body2">{companyName}</CompanyName>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            hyphens: "auto",
                            maxWidth: matchesXXS ? 250 : "none",
                          }}
                        >
                          {companyEmail}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })
              ) : (
                <Fragment>
                  <Grid item>
                    <CompanyName variant="body2">
                      {customerData.companyName}
                    </CompanyName>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                        maxWidth: matchesXXS ? 250 : "none",
                      }}
                    >
                      {customerData.companyEmail}
                    </Typography>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9} mt={matchesXS ? 5 : 3}>
          <Grid container alignItems="center" columnSpacing={2}>
            <Grid item>
              <IgnoreButton
                variant="contained"
                color="warning"
                onClick={handleIgnoreNotification}
              >
                {loadingPreOrderAction && productCode === stock.id ? (
                  <CircularProgress
                    style={{ height: 20, width: 20, color: "#fff" }}
                  />
                ) : (
                  "Ignore"
                )}
              </IgnoreButton>
            </Grid>
            <Grid item>
              <EmailButton
                variant="contained"
                color="secondary"
                startIcon={<MailOutlinedIcon />}
                onClick={handleClickEmailButton}
              >
                Send Email
              </EmailButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <MessageBox
        mailData={mailData}
        setMailData={setMailData}
        messageError={messageError}
        setMessageError={setMessageError}
        subjectError={subjectError}
        setSubjectError={setSubjectError}
        onClose={handleCloseMessageBox}
        open={messageBoxOpen}
        setOpen={setMessageBoxOpen}
        onSubmit={handleSubmit}
        onAddEmailToList={handleAddToEmailList}
        companyEmailError={companyEmailError}
        setCompanyEmailError={setCompanyEmailError}
        emailList={emailList}
      />
    </Fragment>
  );
};

export default NotificationItemMobile;
