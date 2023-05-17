import React from "react";
import { useTheme } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import Moment from "react-moment";
import { MessagesPayloadResponse } from "src/services/messages/MessageTypes";
import {
  OptionsTableData,
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { useActions } from "src/hooks/useActions";
import { v4 as uuidv4 } from "uuid";
import { EmailList, MailDataTypes } from "./types";
import { constructContent } from "src/lib/helpers";

type MessageItemProps = {
  setOpenDeleteEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
  message: MessagesPayloadResponse;
  setEmailList: React.Dispatch<React.SetStateAction<EmailList[]>>;
  setMailData: React.Dispatch<React.SetStateAction<MailDataTypes>>;
};

const MessageItem = (props: MessageItemProps) => {
  const theme = useTheme();
  const {
    message,
    setOpenDeleteEmail,
    setOpenSendEmail,
    setEmailList,
    setMailData,
  } = props;

  const { setCurrentMessage } = useActions();

  const handleDeleteEmail = () => {
    setOpenDeleteEmail(true);
    setCurrentMessage(message);
  };

  const handleOpenEmailBox = () => {
    setOpenSendEmail(true);
    setCurrentMessage(message);

    if (Array.isArray(message.emails)) {
      const emails = message.emails.map((mail) => ({
        key: uuidv4(),
        email: mail,
      }));

      setEmailList(emails);
    } else {
      const customerEmail = {
        key: uuidv4(),
        email: message.emails,
      };

      setEmailList([customerEmail]);
    }

    setMailData((prev) => ({
      ...prev,
      subject: `${
        message.subject.startsWith("Re:")
          ? message.subject
          : `Re: ${message.subject}`
      }`,
      message: `Hello `,
    }));
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ minWidth: 150 }}>
        {Array.isArray(message.emails)
          ? message.emails.map((m) => <p key={m}>{m}</p>)
          : message.emails}
      </TableCell>
      <TableCell style={{ minWidth: 200 }}>{message.subject}</TableCell>
      <TableCell style={{ minWidth: 300 }}>
        {constructContent(message.body)}
      </TableCell>
      <TableCell style={{ minWidth: 100 }} align="center">
        <Moment fromNow>{message.createdAt}</Moment>
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<MailSharpIcon />}
            background={theme.palette.secondary}
            title="Send"
            onClick={handleOpenEmailBox}
          />
          <StyledIconButton onClick={handleDeleteEmail}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default MessageItem;
