export type FormContainerProps = {
  onSubmit: (event: React.FormEvent<HTMLInputElement | HTMLDivElement>) => void;
  categoryName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categoryNameError: string;
  categorySlug: string;
  categorySlugError: string;
  setCategoryImageError: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  onRemoveImage: () => void;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadingRequestAction: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  buttonTitle: string;
};
