import { ProductTypes } from "src/services/products/ProductTypes";

export type ProductPageLayoutProps = {
  title: string;
  page: number;
  filterText: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  openDeleteProduct: boolean;
  setOpenDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openEditProduct: boolean;
  setOpenEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  openHighlight: boolean;
  setOpenHighlight: React.Dispatch<React.SetStateAction<boolean>>;
  openProductGallery: boolean;
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  hasAddProductButton?: boolean;
  productDataset: ProductTypes[];
};
