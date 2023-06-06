import {
  PhotoGalleryTypes,
  ProductTypes,
} from "src/services/products/ProductTypes";

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

export type GalleryItemProps = {
  item: PhotoGalleryTypes;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  id: string;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
  loading: boolean;
  previews: PhotoGalleryTypes[];
  setPreviews: React.Dispatch<React.SetStateAction<PhotoGalleryTypes[]>>;
};

export type PhotoGalleryProps = {
  setOpenProductGallery: React.Dispatch<React.SetStateAction<boolean>>;
  previews: PhotoGalleryTypes[];
  setPreviews: React.Dispatch<React.SetStateAction<PhotoGalleryTypes[]>>;
  selectedFile: File | string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | string>>;
  setGalleryItemId: React.Dispatch<React.SetStateAction<string>>;
  galleryItemId: string;
};
