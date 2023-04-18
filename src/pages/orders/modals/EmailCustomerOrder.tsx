import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import CustomFormInput from "src/utils/CustomFormInput";
import CustomTextArea from "src/utils/CustomTextArea";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  FormContainer,
  StyledBox,
  StyledButton,
  StyledCircularProgress,
} from "./styles/EmailCustomerOrderStyles";

type initialStateProps = {
  companyEmail: string;
  subject: string;
  message: string;
};

const initialState = {
  companyEmail: "",
  subject: "",
  message: "",
};

type EmailCustomerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPreOrder: boolean;
};

const EmailCustomer = (props: EmailCustomerProps) => {
  const { open, setOpen, isPreOrder } = props;
  const theme = useTheme();

  const singleCustomer = useTypedSelector(
    (state) => state.customers.singleCustomer
  );
  const singleOrder = useTypedSelector((state) => state.orders.singleOrder);
  const loadingEmailAction = useTypedSelector(
    (state) => state.utils.loadingEmailAction
  );

  const [mailData, setMailData] = useState<initialStateProps>(initialState);
  const [subjectError, setSubjectError] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const { companyEmail, message, subject } = mailData;

  const { sendEmailToCustomer, getSingleCustomer } = useActions();

  const handleClose = () => setOpen(false);

  const handleSendEmail = (
    event: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!companyEmail && !subject && !message) {
      setCompanyEmailError("Email is required");
      setSubjectError("Subject is required");
      setMessageError("Message is required");
      return;
    }

    if (!companyEmail) {
      setCompanyEmailError("Email is required");
      return;
    }

    if (!subject) {
      setSubjectError("Subject is required");
      return;
    }

    if (!message) {
      setMessageError("Message is required");
      return;
    }

    if (companyEmailError || subjectError || messageError) {
      return;
    }

    sendEmailToCustomer({
      setOpen,
      to: companyEmail,
      subject,
      content: encodeURIComponent(message),
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMailData({ ...mailData, [name]: value });

    switch (name) {
      case "companyEmail":
        if (!value.trim()) {
          setCompanyEmailError("Email is required");
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setCompanyEmailError("Please enter a valid email");
        } else {
          setCompanyEmailError("");
        }
        break;
      case "subject":
        if (!value.trim()) {
          setSubjectError("Subject is required");
        } else {
          setSubjectError("");
        }
        break;
      case "message":
        if (!value.trim()) {
          setMessageError("Message is required");
        } else {
          setMessageError("");
        }
        break;
      default:
        setCompanyEmailError("");
    }
  };

  useEffect(() => {
    if (singleOrder && !isPreOrder) {
      const newMailData = { ...initialState };

      if (singleOrder.ordersCustomer.email) {
        newMailData["companyEmail"] = singleOrder.ordersCustomer.email;
        setMailData(newMailData);
      }

      if (singleOrder.orderStatus === "completed") {
        newMailData["subject"] = `Order #${singleOrder.orderId} Completed`;
        setMailData(newMailData);
      }

      if (singleOrder.orderStatus === "declined") {
        newMailData["subject"] = `Order #${singleOrder.orderId} Declined`;
        setMailData(newMailData);
      }

      if (singleCustomer) {
        if (singleOrder.orderStatus === "completed") {
          newMailData[
            "message"
          ] = `Hi ${singleCustomer.companyName}, \n\nYour order with the number # ${singleOrder.orderId} worth $${singleOrder.orderPaymentAmount} has been completed. Thank you for shopping with us. \n \n Regards, \n Brand Central`;

          setMailData(newMailData);
        }

        if (singleOrder.orderStatus === "declined") {
          newMailData[
            "message"
          ] = `Hi ${singleCustomer.companyName}, \n\nYour order with the number # ${singleOrder.orderId} worth $${singleOrder.orderPaymentAmount} has been declined. If you think this action was done in error. Please send us a mail and we will reply as soon as we can. \n\nThank you for shopping with us. \n\n Regards, \n Brand Central`;

          setMailData(newMailData);
        }
      }
    }
  }, [singleOrder, singleCustomer, isPreOrder]);

  useEffect(() => {
    if (singleOrder) {
      getSingleCustomer(singleOrder.ordersCustomer.id);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-Send-message"
      aria-describedby="modal-send-message-to-customer"
    >
      <StyledBox>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: theme.palette.secondary.dark,
            color: "#fff",
          }}
        >
          <Grid item>
            <Typography variant="h4" style={{ marginBottom: 0 }}>
              Send Email
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
        <FormContainer
          item
          container
          direction="column"
          component="form"
          onSubmit={handleSendEmail}
        >
          <Grid item container style={{ marginBottom: "2rem" }}>
            <CustomFormInput
              name="companyEmail"
              type="text"
              placeholder="Enter customer email"
              label=""
              value={companyEmail}
              onChange={handleChange}
              error={companyEmailError}
            />
          </Grid>
          <Grid item container style={{ marginBottom: "2rem" }}>
            <CustomFormInput
              type="text"
              name="subject"
              placeholder="Subject"
              label=""
              value={subject}
              onChange={handleChange}
              error={subjectError}
            />
          </Grid>
          <Grid item container style={{ marginBottom: "2rem" }}>
            <CustomTextArea
              label=""
              name="message"
              placeholder="Enter your message"
              value={message}
              onChange={handleChange}
              error={messageError}
            />
          </Grid>
          <Grid item container>
            <StyledButton
              type="submit"
              variant="contained"
              color="secondary"
              disableRipple
              disabled={loadingEmailAction}
            >
              {loadingEmailAction && (
                <StyledCircularProgress style={{ height: 25, width: 25 }} />
              )}{" "}
              Send Message
            </StyledButton>
          </Grid>
        </FormContainer>
      </StyledBox>
    </Modal>
  );
};

EmailCustomer.defaultProps = {
  isPreOrder: false,
};

export default EmailCustomer;
