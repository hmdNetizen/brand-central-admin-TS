import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tables from "src/components/table/Tables";
import { messagesColumns } from "src/lib/dataset/tableData";
// import DeleteEmail from "./modals/DeleteEmail";
// import ReplyEmail from "./modals/ReplyEmail";
import MessageItem from "src/components/messages/MessageItem";
import { MessagesPayloadResponse } from "src/services/messages/MessageTypes";
import {
  Container,
  ContainerWrapper,
} from "src/components/common/styles/PageContainerStyles";
import PageHeadingActions from "src/components/common/PageHeadingActions";
import { SelectChangeEvent } from "@mui/material";

type PageLayoutProps = {
  title: string;
  filterText: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  messages: MessagesPayloadResponse[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
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
  } = props;
  const theme = useTheme();

  const [openDeleteEmail, setOpenDeleteEmail] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);

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
        />
        <Grid item container style={{ marginTop: "5rem" }}>
          <Tables
            headerColumns={messagesColumns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            total={messages.length}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
            notFoundText="No Message(s) found"
          >
            {!loading &&
              messages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((message) => {
                  return (
                    <MessageItem
                      key={message._id}
                      message={message}
                      setOpenDeleteEmail={setOpenDeleteEmail}
                      setOpenSendEmail={setOpenSendEmail}
                    />
                  );
                })}
          </Tables>
        </Grid>
      </ContainerWrapper>
      {/* <DeleteEmail
        openDeleteEmail={openDeleteEmail}
        setOpenDeleteEmail={setOpenDeleteEmail}
        isReceivedMessage={isReceivedMessage}
      /> */}
      {/* <ReplyEmail
        open={openSendEmail}
        setOpen={setOpenSendEmail}
        isReceivedMessage={isReceivedMessage}
      /> */}
    </Container>
  );
};

export default MessagePagesLayout;
