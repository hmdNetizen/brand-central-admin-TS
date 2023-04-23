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

export type CategoryData = {
  categoryName: string;
  categorySlug: string;
};

export type CategoryRequestPayload = {
  setCategoryData: React.Dispatch<React.SetStateAction<CategoryData>>;
  setOpenAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  categoryName: string;
  categorySlug: string;
  setIcon: string;
  file: File | string;
};

export type initStateType = {
  loading: boolean;
  loadingActivation: boolean;
  loadingRequestAction: boolean;
  categories: CategoryReturnedPayload[];
  subCategories: SubCategoryReturnedPayload[];
  singleCategory: CategoryReturnedPayload | null;
  error: null | string;
};
