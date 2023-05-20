export type ZipCodeFormProps = {
  onSubmit: (event: React.FormEvent<Element>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  zipCode: string;
  isEdit?: boolean;
  zipCodeError: string;
  loadingZipCodeAction: boolean;
};

export type ZipCodeFormLayoutProps = {
  openZipCode: boolean;
  setOpenZipCode: React.Dispatch<React.SetStateAction<boolean>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  isEdit?: boolean;
};
