export type ZipCodeReturnedPayload = {
  _id: string;
  zipCode: string;
};

export type initStateType = {
  loading: boolean;
  zipCodes: ZipCodeReturnedPayload[];
  singleZipCode: ZipCodeReturnedPayload | null;
  error: null | string;
};
