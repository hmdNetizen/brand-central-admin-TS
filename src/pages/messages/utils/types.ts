import { MessagesPayloadResponse } from "src/services/messages/MessageTypes";

export type PageLayoutProps = {
  title: string;
  filterText: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  messages: MessagesPayloadResponse[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  isReceivedMessage: boolean;
};
