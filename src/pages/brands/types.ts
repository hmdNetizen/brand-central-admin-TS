export type FormContainerProps = {
  name: string;
  slug: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement | HTMLDivElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brandNameError: string;
  brandSlugError: string;
  onClick: () => void;
  loadingBrands: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  setBrandImageError: React.Dispatch<React.SetStateAction<string>>;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  buttonTitle: string;
};
