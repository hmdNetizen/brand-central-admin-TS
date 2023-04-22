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

export type SubCategoryReturnedPayload = {
  _id: string;
  category: string;
  name: string;
  categorySlug: string;
  isActivate: boolean;
};

export type initStateType = {
  loading: boolean;
  categories: CategoryReturnedPayload[];
  subCategories: SubCategoryReturnedPayload[];
  error: null | string;
};
