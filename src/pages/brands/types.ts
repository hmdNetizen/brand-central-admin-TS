import { BrandReturnedPayload } from "src/services/brands/BrandTypes";

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

export type PageLayoutProps = {
  filterText: string;
  rowsPerPage: number;
  setOpenAddBrand: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  brands: BrandReturnedPayload[];
  setOpenDeleteBrand: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditBrand: React.Dispatch<React.SetStateAction<boolean>>;
  openAddBrand: boolean;
  openEditBrand: boolean;
  openDeleteBrand: boolean;
  isDeactivatedPage: boolean;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
