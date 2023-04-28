import { SelectChangeEvent } from "@mui/material";
import {
  CategoryReturnedPayload,
  SubCategoryReturnedPayload,
} from "src/services/categories/CategoryTypes";

export type FormContainerProps = {
  name: string;
  onSubmit: (event: React.FormEvent<HTMLInputElement | HTMLDivElement>) => void;
  categories: CategoryReturnedPayload[];
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
  onSelect: (event: SelectChangeEvent<unknown>) => void;
  filterListSubCategory: SubCategoryReturnedPayload[];
  category: string;
  subCategory: string;
  categoryNameError: string;
  subCategoryError: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brandNameError: string;
  categorySlug: string;
  brandSlugError: string;
  loadingRequestAction: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
