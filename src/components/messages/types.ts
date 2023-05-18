export type EmailList = {
  key: string;
  email: string;
};

export type MessageFormProps = {
  onSubmit: (event: React.FormEvent<Element>) => void;
  emailList: EmailList[];
  onAddEmailToList: (event: React.KeyboardEvent<Element>) => void;
  companyEmailError: string;
  companyEmail: string;
  subject: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  subjectError: string;
  message: string;
  messageError: string;
  loadingSendMessage: boolean;
};

export type MailDataTypes = {
  companyEmail: string;
  subject: string;
  message: string;
};

export type MessageBoxProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mailData: MailDataTypes;
  setMailData: React.Dispatch<React.SetStateAction<MailDataTypes>>;
  emailList: EmailList[];
  companyEmailError: string;
  setCompanyEmailError: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onAddEmailToList: (event: React.KeyboardEvent<Element>) => void;
  onSubmit: (event: React.FormEvent<Element>) => void;
  subjectError: string;
  setSubjectError: React.Dispatch<React.SetStateAction<string>>;
  messageError: string;
  setMessageError: React.Dispatch<React.SetStateAction<string>>;
};
