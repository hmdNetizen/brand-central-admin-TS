export type SocialLinkTypes = {
  link: string;
  isActive: boolean;
};

export type GeneralSettingTypes = {
  faceBookLink: SocialLinkTypes;
  twitterLink: SocialLinkTypes;
  linkedInLink: SocialLinkTypes;
  instagramLink: SocialLinkTypes;
  headerLogo: string;
  invoiceLogo: string;
  footerLogo: string;
  favicon: string;
};

export type initStateTypes = {
  loading: boolean;
  loadingSettingsAction: boolean;
  siteData: GeneralSettingTypes | null;
  error: null | string;
};
