import React, { useState, useEffect, useCallback } from "react";
import MessagesPageLayout from "./utils/MessagesPageLayout";
import { useActions } from "src/hooks/useActions";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const ReceivedMessages = () => {
  useTitle("Admin : Messages | Received Messages");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  const loading = useTypedSelector((state) => state.messages.loading);
  const receivedMessages = useTypedSelector(
    (state) => state.messages.receivedMessages
  );

  const { getAllReceivedMessages } = useActions();

  // const debounceFilteredReceivedEmail = useCallback(
  //   debounce(handleFilterReceivedEmail, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    //   debounceFilteredReceivedEmail(event.target.value);
  };

  useEffect(() => {
    getAllReceivedMessages();
  }, []);

  return (
    <MessagesPageLayout
      filterText={filterText}
      loading={loading}
      messages={receivedMessages}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      onChange={handleSearch}
      page={page}
      setPage={setPage}
      title="Received Messages"
    />
  );
};

export default ReceivedMessages;
