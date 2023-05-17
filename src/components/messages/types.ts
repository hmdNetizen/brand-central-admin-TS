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