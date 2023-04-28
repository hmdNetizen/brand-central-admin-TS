import React from "react";

export type CategoryReturnedPayload = {
  _id: string;
  categoryName: string;
  categorySlug: string;
  setIcon: string;
  isActivate: boolean;
};

export type ReturnedPayloadType<T> = {
  data: T[];
};

export type ReturnPaginationPayloadType<T> = {
  data: {
    total: number;
    data: T[];
  };
};

export type ReturnedSinglePayloadType<T> = {
  data: T;
};

export type SubCategoryReturnedPayload = {
  _id: string;
  category: string;
  name: string;
  categorySlug: string;
  isActivate: boolean;
};

export type RequestPayloadType<T> = T;

export interface CategoryData {
  categoryName: string;
  categorySlug: string;
}

export interface CategoryDataExcerpt extends CategoryData {
  setIcon?: string;
}

export interface SubCategoryData {
  category: string;
  name: string;
  categorySlug: string;
}

export interface BrandCategoryData {
  category: string;
  subCategory: string;
  name: string;
  categorySlug: string;
}

export interface CategoryRequestPayload extends CategoryData {
  setCategoryData: React.Dispatch<React.SetStateAction<CategoryData>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIcon: string;
  file: File | string;
}

export interface SubCategoryRequestPayload extends SubCategoryData {
  setSubCategoryData: React.Dispatch<React.SetStateAction<SubCategoryData>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BrandCategoryRequestPayload extends BrandCategoryData {
  setBrandCategoryData: React.Dispatch<React.SetStateAction<BrandCategoryData>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// This is for edit category api request
export interface CategoryRequestNewPayload extends CategoryRequestPayload {
  categoryId: string;
}

// This is for edit subcategory api request
export interface SubCategoryRequestNewPayload
  extends SubCategoryRequestPayload {
  subCategoryId: string;
}

export interface BrandsCategoryReturnedPayload {
  _id: string;
  category: string;
  subCategory: string;
  name: string;
  categorySlug: string;
  isActivate: boolean;
}

export type initStateType = {
  loading: boolean;
  loadingActivation: boolean;
  loadingRequestAction: boolean;
  total: number;
  categories: CategoryReturnedPayload[];
  subCategories: SubCategoryReturnedPayload[];
  brandCategories: BrandsCategoryReturnedPayload[];
  singleCategory: CategoryReturnedPayload | null;
  singleSubCategory: SubCategoryReturnedPayload | null;
  singleBrandCategory: BrandsCategoryReturnedPayload | null;
  error: null | string;
};
