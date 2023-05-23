import React, { Fragment } from "react";
import SocialLinkItem from "./SocialLinkItem";
import { SocialLinkTypes } from "src/services/settings/SettingsTypes";

type SocialLinkListProps = {
  faceBookLink: SocialLinkTypes;
  instagramLink: SocialLinkTypes;
  twitterLink: SocialLinkTypes;
  googlePlusLink: SocialLinkTypes;
  linkedInLink: SocialLinkTypes;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SocialLinkItemList = (props: SocialLinkListProps) => {
  const {
    faceBookLink,
    googlePlusLink,
    instagramLink,
    linkedInLink,
    twitterLink,
    onChange,
    onSwitchToggle,
  } = props;
  return (
    <Fragment>
      <SocialLinkItem
        inputName="faceBookLink"
        switchName="faceBookLink"
        value={faceBookLink.link}
        onInputChange={onChange}
        title="Facebook"
        checked={faceBookLink.isActive}
        onSwitchChange={onSwitchToggle}
        isActive={faceBookLink.isActive}
      />

      <SocialLinkItem
        inputName="instagramLink"
        switchName="instagramLink"
        value={instagramLink.link}
        onInputChange={onChange}
        title="Instagram"
        checked={instagramLink.isActive}
        onSwitchChange={onSwitchToggle}
        isActive={instagramLink.isActive}
      />

      <SocialLinkItem
        inputName="twitterLink"
        switchName="twitterLink"
        value={twitterLink.link}
        onInputChange={onChange}
        title="Twitter"
        onSwitchChange={onSwitchToggle}
        checked={twitterLink.isActive}
        isActive={twitterLink.isActive}
      />

      <SocialLinkItem
        inputName="linkedInLink"
        switchName="linkedInLink"
        value={linkedInLink.link}
        onInputChange={onChange}
        title="LinkedIn"
        checked={linkedInLink.isActive}
        onSwitchChange={onSwitchToggle}
        isActive={linkedInLink.isActive}
      />

      <SocialLinkItem
        inputName="googlePlusLink"
        switchName="googlePlusLink"
        value={googlePlusLink.link}
        onInputChange={onChange}
        title="Google Plus"
        checked={googlePlusLink.isActive}
        onSwitchChange={onSwitchToggle}
        isActive={googlePlusLink.isActive}
      />
    </Fragment>
  );
};

export default SocialLinkItemList;
