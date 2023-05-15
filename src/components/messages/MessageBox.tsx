import React, { useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import { validateEmail } from "src/lib/helpers";
import MessageForm from "./MessageForm";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { EmailList, MailDataTypes } from "./types";

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: 500,
  position: "absolute",
  bottom: 5,
  right: 5,
  padding: "1rem",

  [theme.breakpoints.only("xs")]: {
    width: "100%",
    right: 0,
    bottom: 0,
  },
}));

type MessageBoxProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mailData: MailDataTypes;
  setMailData: React.Dispatch<React.SetStateAction<MailDataTypes>>;
  emailList: EmailList[];
  companyEmailError: string;
  setCompanyEmailError: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onAddEmailToList: () => void;
  onSubmit: (event: React.FormEvent<Element>) => void;
};

const MessageBox = (props: MessageBoxProps) => {
  const {
    open,
    setOpen,
    mailData,
    setMailData,
    emailList,
    companyEmailError,
    setCompanyEmailError,
    onClose,
    onAddEmailToList,
    onSubmit,
  } = props;
  const theme = useTheme();

  const loadingMessageAction = useTypedSelector(
    (state) => state.messages.loadingMessageAction
  );

  const { companyEmail, subject, message } = mailData;

  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMailData((prev) => ({ ...prev, companyEmail: event.target.value }));
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
        } else if (!validateEmail(value)) {
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

  return (
    <Modal
      open={open}
      onClose={onClose}
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
              Send Message
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
        <MessageForm
          companyEmail={companyEmail}
          emailList={emailList}
          message={message}
          subject={subject}
          onAddEmailToList={onAddEmailToList}
          onChange={handleChange}
          onSubmit={onSubmit}
          loadingMessageAction={loadingMessageAction}
          companyEmailError={companyEmailError}
          messageError={messageError}
          subjectError={subjectError}
          onEmailChange={handleEmailChange}
        />
      </StyledBox>
    </Modal>
  );
};

export default MessageBox;
