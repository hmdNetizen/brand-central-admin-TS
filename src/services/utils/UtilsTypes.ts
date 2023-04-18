type SentEmailReturnedPayload = {
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
  };
};

export type ReceivedEmailTypes = {
  data: ReceivedEmailReturnedPayload[];
};

export type SendEmailToCustomerType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  to: string | string[];
  subject: string;
  content: string;
};

export type initStateTypes = {
  loadingEmails: boolean;
  loadingSentEmails: boolean;
  loadingEmailAction: boolean;
  sentEmails: SentEmailReturnedPayload[];
  receivedEmails: ReceivedEmailReturnedPayload[];
  filteredSentEmails: SentEmailReturnedPayload[];
  filteredReceivedEmails: ReceivedEmailReturnedPayload[];
  singleEmail: SentEmailReturnedPayload | ReceivedEmailReturnedPayload | null;
  currentPage: number;
  emailSuccess: string;
  error: null | string;
};
