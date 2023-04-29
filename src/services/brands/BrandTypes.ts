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

export type initStateType = {
  loadingBrands: boolean;
  brands: BrandReturnedPayload[];
  error: string | null;
  singleBrand: BrandReturnedPayload | null;
};
