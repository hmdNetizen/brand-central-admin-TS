import React, { Fragment, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useActions } from "src/hooks/useActions";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import MessageBox from "src/components/messages/MessageBox";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import {
  inMailList,
  getProductSlug,
  capitalizeFirstLetters,
  validateEmail,
  addBrandWithApostrophe,
  domain,
} from "src/lib/helpers";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { EmailList, MailDataTypes } from "../messages/types";
import { CompanyName, Container, EmailButton, IgnoreButton } from "./styles";
import { NotificationItemProps } from "./types";
import placeholderImage from "src/assets/images/not-found-img.png"

const initialState = {
  companyEmail: "",
  subject: "",
  message: "",
};

const NotificationItem = (props: NotificationItemProps) => {
  const theme = useTheme();
  const { stock, productCode, setProductCode } = props;
  const { customerData, productData } = stock;
  const loadingPreOrderAction = useTypedSelector(
    (state) => state.preOrders.loadingPreOrderAction
  );

  const [mailData, setMailData] = useState<MailDataTypes>(initialState);
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [emailList, setEmailList] = useState<EmailList[]>([]);

  const { companyEmail, subject, message } = mailData;

  const {
    setSingleUpdatedStock,
    updatePreOrderMultiples,
    sendNotificationEmail,
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
      },%0A%0AWe are pleased to notify you that${
        productData.length === 1
          ? ` ${addBrandWithApostrophe(
              singleProduct.brandName
            )} <a href=${domain}/products/${encodeURIComponent(
              getProductSlug(singleProduct)!
            )}>${capitalizeFirstLetters(singleProduct.productName)} (UPC : ${
              singleProduct.productUPC
            })</a>`
          : productData.map(
              (product, index, self) =>
                ` ${addBrandWithApostrophe(product.brandName)}${
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
    setProductCode(stock.id);
    if (productData.length > 1) {
      await updatePreOrderMultiples({
        productId: productData.map((product) => product._id),
        isNotified: true,
        addedBy: Array.isArray(customerData)
          ? customerData.map((customer) => customer.id)
          : customerData.id,
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

    toast.warning("Pre-order item has been removed from notification", {
      position: "top-center",
      hideProgressBar: true,
    });

    setProductCode("");
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

  const handleSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();

    const emails = emailList.map((list) => list.email);
    await sendNotificationEmail({
      setOpen: setMessageBoxOpen,
      stock,
      to: emails,
      subject,
      content: encodeURIComponent(message),
    });
  };

  useEffect(() => {
    if (!loadingPreOrderAction) {
      setProductCode("");
    }

    // eslint-disable-next-line
  }, [loadingPreOrderAction]);

  return (
    <Fragment>
      <Container container alignItems="center">
        <Grid item>
          {productData.map((product) => (
            <Grid container direction="column" key={product._id} mb={2}>
              <Grid item>
                <img
                  src={product.hasImage ? product.featuredImage : placeholderImage}
                  alt={product.productName}
                  style={{ width: 50 }}
                />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item style={{ maxWidth: 250 }}>
                    <Typography
                      variant="body2"
                      style={{ fontFamily: "Nunito", fontWeight: 600 }}
                    >
                      {product.productName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.secondary.light,
                        fontSize: "1.35rem",
                      }}
                    >
                      Item-code: {product.itemCode}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "1.25rem",
                      }}
                    >
                      UPC: {product.productUPC}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <Grid container direction="column" alignItems="center">
            {Array.isArray(customerData) ? (
              customerData.map((customer) => (
                <Grid container direction="column" key={customer.id} mb={1}>
                  <Grid item>
                    <CompanyName variant="body2" align="center">
                      {customer.companyName}
                    </CompanyName>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" align="center">
                      {customer.companyEmail}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Fragment key={customerData.id}>
                <Grid item>
                  <CompanyName variant="body2" align="center">
                    {customerData.companyName}
                  </CompanyName>
                </Grid>
                <Grid item>
                  <Typography variant="body2" align="center">
                    {customerData.companyEmail}
                  </Typography>
                </Grid>
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            columnSpacing={2}
          >
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
        onAddEmailToList={handleAddToEmailList}
        open={messageBoxOpen}
        setOpen={setMessageBoxOpen}
        onSubmit={handleSubmit}
        companyEmailError={companyEmailError}
        setCompanyEmailError={setCompanyEmailError}
        emailList={emailList}
      />
    </Fragment>
  );
};

export default NotificationItem;
