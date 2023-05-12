import React from "react";
import { useTheme } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import Moment from "react-moment";
import {
  SentEmailReturnedPayload,
  ReceivedEmailReturnedPayload,
} from "src/services/messages/MessageTypes";
import {
  OptionsTableData,
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { useActions } from "src/hooks/useActions";

type MessageItemProps = {
  isReceivedMessage: boolean;
  setOpenDeleteEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
  sentMessage?: SentEmailReturnedPayload;
  receivedMessage?: ReceivedEmailReturnedPayload;
};

const constructContent = (content: string) => {
  return content.replace(/%0A/g, "\n");
};

const MessageItem = (props: MessageItemProps) => {
  const theme = useTheme();
  const {
    sentMessage,
    receivedMessage,
    isReceivedMessage,
    setOpenDeleteEmail,
    setOpenSendEmail,
  } = props;

  const { setCurrentEmail } = useActions();

  const handleDeleteEmail = () => {
    setOpenDeleteEmail(true);

    if (!receivedMessage) {
      setCurrentEmail(sentMessage);
      return;
    }

    setCurrentEmail(receivedMessage);
  };

  const handleOpenEmailBox = () => {
    setOpenSendEmail(true);

    if (!receivedMessage) {
      setCurrentEmail(sentMessage);
      return;
    }

    setCurrentEmail(receivedMessage);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell style={{ minWidth: 150 }}>
        {!isReceivedMessage
          ? sentMessage?.to.map((mail) => <p key={mail}>{mail}</p>)
          : receivedMessage?.emailAddress}
      </TableCell>
      <TableCell style={{ minWidth: 200 }}>
        {!isReceivedMessage
          ? sentMessage?.subject
          : receivedMessage?.messageSubject}
      </TableCell>
      <TableCell style={{ minWidth: 300 }}>
        {!isReceivedMessage
          ? constructContent(sentMessage?.content!)
          : receivedMessage?.messageBody}
      </TableCell>
      <TableCell style={{ minWidth: 100 }} align="center">
        <Moment fromNow>
          {!receivedMessage
            ? sentMessage?.createdAt
            : receivedMessage?.createdAt}
        </Moment>
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
