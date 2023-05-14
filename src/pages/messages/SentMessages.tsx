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

  const { getAllSentMessages } = useActions();

  //   eslint-disable-next-line
  // const debounceFilteredCompletedOrders = useCallback(
  //   debounce(handleFilteredEmailData, 500),
  //   []
  // );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);

    //   debounceFilteredCompletedOrders({
    //     emailData: sentEmails,
    //     text: event.target.value,
    //   });

    setPage(0);
  };

  useEffect(() => {
    getAllSentMessages({
      page: page + 1,
      limit: rowsPerPage,
    });
  }, [page, rowsPerPage]);

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
