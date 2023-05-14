import React, { useState, useEffect, useCallback } from "react";
import MessagesPageLayout from "./utils/MessagesPageLayout";
import { useActions } from "src/hooks/useActions";
import debounce from "lodash.debounce";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const SentMessages = () => {
  useTitle("Admin : Messages | Sent Messages");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");

  const loading = useTypedSelector((state) => state.messages.loading);
  const sendMessages = useTypedSelector((state) => state.messages.sentMessages);

  const { getAllSentMessages, getSearchedSentMessages } = useActions();

  const debounceSearchedMessages = useCallback(
    debounce(getSearchedSentMessages, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterText(event.target.value);

    if (event.target.value.length) {
      debounceSearchedMessages({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: event.target.value,
      });
    }
  };

  useEffect(() => {
    if (!filterText.length) {
      getAllSentMessages({
        page: page + 1,
        limit: rowsPerPage,
      });
    } else {
      debounceSearchedMessages({
        page: page + 1,
        limit: rowsPerPage,
        searchTerm: filterText,
      });
    }
  }, [filterText, page, rowsPerPage]);

  return (
    <MessagesPageLayout
      filterText={filterText}
      loading={loading}
      messages={sendMessages}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      onChange={handleSearch}
      page={page}
      setPage={setPage}
      title="Sent Messages"
    />
  );
};

export default SentMessages;
