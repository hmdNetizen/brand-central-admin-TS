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

  const { getAllReceivedMessages, getSearchedReceivedMessages } = useActions();

  const debounceSearchedReceivedEmail = useCallback(
    debounce(getSearchedReceivedMessages, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    debounceSearchedReceivedEmail({
      page: page + 1,
      limit: rowsPerPage,
      searchTerm: event.target.value,
    });
  };

  useEffect(() => {
    if (!filterText) {
      getAllReceivedMessages({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      debounceSearchedReceivedEmail({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: filterText,
      });
    }
  }, [page, rowsPerPage, filterText]);

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
      isReceivedMessage={true}
    />
  );
};

export default ReceivedMessages;
