import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import SocialLinkItem from "src/components/general-settings/SocialLinkItem";
import { useActions } from "src/hooks/useActions";
import useTitle from "src/hooks/useTitle";
import { Container } from "src/components/common/styles/PageContainerStyles";
import { SocialLinksPropTypes } from "src/services/settings/SettingsTypes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  SubmitButton,
  StyledCircularProgress,
} from "src/utilityStyles/pagesUtilityStyles";
import SocialLinkItemList from "src/components/general-settings/SocialLinkItemList";

const ContentWrapper = styled(Grid)<{ component: React.ElementType }>(
  ({ theme }) => ({
    background: "#fff",
    minHeight: "80vh",
    padding: "5rem 2rem",

    [theme.breakpoints.only("xs")]: {
      padding: "5rem 1rem",
    },
  })
);

const initialState = {
  faceBookLink: {
    link: "",
    isActive: false,
  },
  twitterLink: {
    link: "",
    isActive: false,
  },
  linkedInLink: {
    link: "",
    isActive: false,
  },
  googlePlusLink: {
    link: "",
    isActive: false,
  },
  instagramLink: {
    link: "",
    isActive: false,
  },
};

const SocialLinks = () => {
  useTitle("Admin : General Settings | Social Media");
  const theme = useTheme();

  const loadingSettingsAction = useTypedSelector(
    (state) => state.settings.loadingSettingsAction
  );
  const siteData = useTypedSelector((state) => state.settings.siteData);
  const [socialLinkData, setSocialLinkData] =
    useState<SocialLinksPropTypes>(initialState);

  const {
    faceBookLink,
    googlePlusLink,
    linkedInLink,
    twitterLink,
    instagramLink,
  } = socialLinkData;

  const { updateSocialLinks } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSocialLinkData((prev) => ({
      ...prev,
      [name]: {
        // @ts-ignore
        ...prev[name],
        link: value,
      },
    }));
  };

  const handleSwitchToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;

    setSocialLinkData((prev) => ({
      ...prev,
      [name]: {
        // @ts-ignore
        ...prev[name],
        isActive: checked,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    updateSocialLinks({
      faceBookLink: {
        link: faceBookLink.link,
        isActive: faceBookLink.isActive,
      },
      googlePlusLink: {
        link: googlePlusLink.link,
        isActive: googlePlusLink.isActive,
      },
      linkedInLink: {
        link: linkedInLink.link,
        isActive: linkedInLink.isActive,
      },
      twitterLink: {
        link: twitterLink.link,
        isActive: twitterLink.isActive,
      },
      instagramLink: {
        link: instagramLink.link,
        isActive: instagramLink.isActive,
      },
    });
  };

  useEffect(() => {
    if (siteData) {
      const newSocialLinkData = { ...initialState };

      for (let key in siteData) {
        if (key in newSocialLinkData) {
          newSocialLinkData[key as keyof SocialLinksPropTypes] =
            siteData[key as keyof SocialLinksPropTypes];
        }
      }

      setSocialLinkData(newSocialLinkData);
    }
  }, [siteData]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Social Media
        </Typography>
      </Grid>
      <ContentWrapper
        item
        container
        direction="column"
        component="form"
        onSubmit={handleSubmit}
      >
        <SocialLinkItemList
          faceBookLink={faceBookLink}
          googlePlusLink={googlePlusLink}
          instagramLink={instagramLink}
          linkedInLink={linkedInLink}
          twitterLink={twitterLink}
          onChange={handleChange}
          onSwitchToggle={handleSwitchToggle}
        />
        <Grid item container justifyContent="center" mt={4}>
          <SubmitButton
            type="submit"
            variant="contained"
            disableRipple
            color="secondary"
            disabled={loadingSettingsAction}
          >
            {loadingSettingsAction && (
              <StyledCircularProgress style={{ height: 25, width: 25 }} />
            )}{" "}
            Save
          </SubmitButton>
        </Grid>
      </ContentWrapper>
    </Container>
  );
};

export default SocialLinks;
