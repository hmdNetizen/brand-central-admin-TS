export type SentEmailReturnedPayload = {
  _id: string;
  subject: string;
  content: string;
  to: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type ReceivedEmailReturnedPayload = {
  _id: string;
  fullName: string;
  emailAddress: string;
  messageSubject: string;
  messageBody: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SentEmailTypes = {
  data: {
    data: SentEmailReturnedPayload[];
    total: number;
  };
};

export type ReceivedEmailTypes = {
  data: {
    data: ReceivedEmailReturnedPayload[];
  };
};

export type SendEmailToCustomerType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  to: string | string[];
  subject: string;
  content: string;
};

export type MessagesPayloadResponse = {
  _id: string;
  fullName?: string;
  emails: string[] | string;
  subject: string;
  body: string;
  isRead?: boolean;
  createdAt: string;
};

export type initStateTypes = {
  loading: boolean;
  loadingMessageAction: boolean;
  sentMessages: MessagesPayloadResponse[];
  receivedMessages: MessagesPayloadResponse[];
  singleEmail: MessagesPayloadResponse | null;
  total: number;
  emailSuccess: string;
  error: null | string;
};
