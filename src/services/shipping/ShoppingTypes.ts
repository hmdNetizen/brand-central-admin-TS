export type ZipCodeReturnedPayload = {
  _id: string;
  zipCode: string;
};

export type ZipCodeReturnedPayloadTypes = {
  data: {
    data: ZipCodeReturnedPayload[];
    total: number;
  };
};

export type initStateType = {
  loading: boolean;
  loadingZipCodeAction: boolean;
  zipCodes: ZipCodeReturnedPayload[];
  total: number;
  singleZipCode: ZipCodeReturnedPayload | null;
  error: null | string;
};
