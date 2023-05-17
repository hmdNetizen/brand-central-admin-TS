import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { messagesColumns } from "src/lib/dataset/tableData";
import DeleteMessage from "../modals/DeleteMessage";
import MessageItem from "src/components/messages/MessageItem";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import { SelectChangeEvent } from "@mui/material";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { PageLayoutProps } from "./types";
import MessageBox from "src/components/messages/MessageBox";
import { EmailList, MailDataTypes } from "src/components/messages/types";
import { inMailList, validateEmail } from "src/lib/helpers";
import { v4 as uuidv4 } from "uuid";
import { useActions } from "src/hooks/useActions";

const initialState = {
  companyEmail: "",
  subject: "",
  message: "",
};

const MessagePagesLayout = (props: PageLayoutProps) => {
  const {
    title,
    filterText,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    messages,
    onChange,
    loading,
    isReceivedMessage,
  } = props;
  const theme = useTheme();

  const { sendEmailToCustomer } = useActions();

  const [openDeleteMessage, setOpenDeleteMessage] = useState(false);
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [mailData, setMailData] = useState<MailDataTypes>(initialState);
  const [emailList, setEmailList] = useState<EmailList[]>([]);

  const { companyEmail, message, subject } = mailData;

  const total = useTypedSelector((state) => state.messages.total);

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

  const handleClose = () => {
    setCompanyEmailError("");
  };

  const handleAddToEmailList = (event: React.KeyboardEvent<Element>) => {
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

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    if (emailList.length === 0) {
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

    const emails = emailList.map((list) => list.email);

    sendEmailToCustomer({
      setOpen: setOpenSendMessage,
      to: emails,
      subject,
      content: encodeURIComponent(message),
    });
  };

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          {title}
        </Typography>
      </Grid>
      <ContainerWrapper item container>
        <PageHeadingActions
          filterText={filterText}
          onChange={onChange}
          rowsPerPage={rowsPerPage.toString()}
          handleSelectRowsPerPage={handleSelectRowsPerPage}
          placeholderText="Search by email, subject or content"
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={messagesColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={total}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Message(s) found"
          >
            {!loading &&
              messages.map((message) => {
                return (
                  <MessageItem
                    key={message._id}
                    message={message}
                    setOpenDeleteEmail={setOpenDeleteMessage}
                    setOpenSendEmail={setOpenSendMessage}
                    setEmailList={setEmailList}
                    setMailData={setMailData}
                  />
                );
              })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      <DeleteMessage
        openDeleteMessage={openDeleteMessage}
        setOpenDeleteMessage={setOpenDeleteMessage}
        isReceivedMessage={isReceivedMessage!}
      />
      <MessageBox
        open={openSendMessage}
        setOpen={setOpenSendMessage}
        companyEmailError={companyEmailError}
        setCompanyEmailError={setCompanyEmailError}
        emailList={emailList}
        mailData={mailData}
        setMailData={setMailData}
        onClose={handleClose}
        onAddEmailToList={handleAddToEmailList}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default MessagePagesLayout;
