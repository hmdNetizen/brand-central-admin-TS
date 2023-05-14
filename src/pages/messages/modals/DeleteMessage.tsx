import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteMessageProps = {
  isReceivedMessage: boolean;
  openDeleteMessage: boolean;
  setOpenDeleteMessage: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteMessage = (props: DeleteMessageProps) => {
  const { isReceivedMessage, openDeleteMessage, setOpenDeleteMessage } = props;
  const loadingMessageAction = useTypedSelector(
    (state) => state.messages.loadingMessageAction
  );
  const singleMessage = useTypedSelector(
    (state) => state.messages.singleMessage
  );

  const { deleteSentMessage, deleteReceivedMessage } = useActions();

  const handleDeleMessage = () => {
    if (isReceivedMessage) {
      deleteReceivedMessage({
        messageId: singleMessage?._id!,
        setOpenDeleteMessage,
      });
    } else {
      deleteSentMessage({
        messageId: singleMessage?._id!,
        setOpenDeleteMessage,
      });
    }
  };
  return (
    <ActionModal
      actionType="Delete"
      loading={loadingMessageAction}
      openAction={openDeleteMessage}
      setOpenAction={setOpenDeleteMessage}
      handleAction={handleDeleMessage}
      data={singleMessage?.subject!}
    />
  );
};

export default DeleteMessage;
