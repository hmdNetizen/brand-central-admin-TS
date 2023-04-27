import { SelectChangeEvent } from "@mui/material";
import { CategoryReturnedPayload } from "src/services/categories/CategoryTypes";

export type FormContainerProps = {
  name: string;
  onSubmit: (event: React.FormEvent<HTMLInputElement | HTMLDivElement>) => void;
  categories: CategoryReturnedPayload[];
  onSelect: (event: SelectChangeEvent<unknown>) => void;
  category: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadingRequestAction: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categorySlug: string;
  subCategorySlugError: string;
  categoryNameError: string;
  subCategoryNameError: string;
  onClick: () => void;
};
