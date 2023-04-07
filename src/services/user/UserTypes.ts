export type UserAddressType = {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
};

export type UserProfileReturnedPayload = {
  businesContact: UserAddressType;
  referrer: {
    name: string;
    description: string;
  };
  _id: string;
  paymentMethod: string;
  businessType: string;
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;
  taxID: string;
  primaryContactName: string;
  primaryContactRole: string;
  primaryContactEmail: string;
  primaryContactPhoneNumber: string;
  createdAt: string;
  wishList: string[];
  isBlocked: boolean;
  priceCode: string;
  profileImage: string;
  merchantName: string;
  document: "";
};

export type AdminProfilePayload = Pick<
  UserProfileReturnedPayload,
  "companyName" | "profileImage" | "companyEmail" | "merchantName" | "_id"
>;

export type initAdminStateTypes = {
  loadingProfile: boolean;
  admin: null | AdminProfilePayload;
  uploadingFile: boolean;
  uploadPercentage: number;
  uploadedProfilePhoto: null | { url: string };
  updateSuccess: string;
  updatingAdmin: boolean;
  error: null | string;
};
