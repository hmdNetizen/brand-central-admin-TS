import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { messagesColumns } from "src/lib/dataset/tableData";
import DeleteMessage from "../modals/DeleteMessage";
// import ReplyEmail from "./modals/ReplyEmail";
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

  const [openDeleteMessage, setOpenDeleteMessage] = useState(false);
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [mailData, setMailData] = useState<MailDataTypes>(initialState);
  const [emailList, setEmailList] = useState<EmailList[]>([]);

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

  const handleAddEmailToList = () => {};

  const handleSubmit = (event: React.FormEvent<Element>) => {};

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
        onAddEmailToList={handleAddEmailToList}
        onSubmit={handleSubmit}
      />
      {/* <ReplyEmail
        open={openSendEmail}
        setOpen={setOpenSendEmail}
        isReceivedMessage={isReceivedMessage}
      /> */}
    </Container>
  );
};

export default MessagePagesLayout;
