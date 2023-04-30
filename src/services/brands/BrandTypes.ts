import React from "react";

export type BrandReturnedPayload = {
  isFeatured: boolean;
  _id: string;
  name: string;
  icon: string;
  slug: string;
  isActivated: boolean;
  description: string;
};

export type ResponsePayloadType<T> = {
  data: {
    total: number;
    data: T[];
  };
};

export type SingleResponsePayloadType = {
  data: BrandReturnedPayload;
};

export type BrandData = {
  name: string;
  slug: string;
};

export type BrandRequestPayload = {
  name: string;
  slug: string;
  icon: string;
  setBrandData: React.Dispatch<React.SetStateAction<BrandData>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File | string;
};

export type initStateType = {
  loadingBrands: boolean;
  loadingBrandActivation: boolean;
  loadingBrandAction: boolean;
  brands: BrandReturnedPayload[];
  total: number;
  error: string | null;
  singleBrand: BrandReturnedPayload | null;
};
