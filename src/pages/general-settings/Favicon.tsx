import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles, useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useActions } from "src/hooks/useActions";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import useTitle from "src/hooks/useTitle";
import { SubmitButton } from "src/utilityStyles/pagesUtilityStyles";
import { Container } from "src/components/common/styles/PageContainerStyles";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const ContentWrapper = styled(Grid)({
  minHeight: "85vh",
  background: "#fff",
});

const FaviconWrapper = styled(Grid)<{ component: React.ElementType }>({
  width: 200,
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  padding: "2rem",
});

const Input = styled("input")({
  display: "none",
});

const initialState = {
  favicon: "",
};

const Favicon = () => {
  useTitle("Admin : General Settings | Favicon");
  const theme = useTheme();

  const [faviconData, setFaviconData] = useState<{ favicon: File | string }>(
    initialState
  );
  const [preview, setPreview] = useState<string | undefined>();
  const { favicon } = faviconData;

  const loadingSettingsAction = useTypedSelector(
    (state) => state.settings.loadingSettingsAction
  );
  const siteData = useTypedSelector((state) => state.settings.siteData);

  const { updateFavicon } = useActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setFaviconData((prev) => ({
        ...prev,
        favicon: "",
      }));
      return;
    }

    setFaviconData((prev) => ({
      ...prev,
      favicon: event.target.files?.[0]!,
    }));
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    updateFavicon({
      file: favicon,
    });
  };

  const handleLoadingAction = () => {
    return !loadingSettingsAction;
  };

  useEffect(() => {
    if (siteData) {
      const newInitialState = { ...initialState };

      if (siteData.favicon) {
        newInitialState.favicon = siteData.favicon;
      }

      setFaviconData(newInitialState);
    }
  }, [siteData]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!favicon || typeof favicon === "string") {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(favicon);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [favicon]);

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Favicon
        </Typography>
      </Grid>
      <ContentWrapper item container direction="column" alignItems="center">
        <Grid item pb={4} pt={2}>
          <Typography variant="h4">Current Favicon</Typography>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center">
          <FaviconWrapper item component="form" onSubmit={handleSubmit}>
            <Grid item container direction="column" alignItems="center">
              <Grid item sx={{ mb: 2 }}>
                <img
                  src={typeof favicon === "string" ? favicon : preview}
                  alt="favicon"
                  style={{ minWidth: 20, maxWidth: 50 }}
                />
              </Grid>
              <Grid item sx={{ mb: 2 }}>
                <label htmlFor="favicon">
                  <Input
                    accept="image/*"
                    id="favicon"
                    type="file"
                    onChange={handleChange}
                    name="favicon"
                  />
                  <Button variant="contained" component="span">
                    Change
                  </Button>
                </label>
              </Grid>
              <Grid item container justifyContent="center">
                <SubmitButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Save
                </SubmitButton>
              </Grid>
            </Grid>
          </FaviconWrapper>
        </Grid>
      </ContentWrapper>
      <CustomLoadingDialog
        loading={loadingSettingsAction}
        handleLoading={handleLoadingAction}
      />
    </Container>
  );
};

export default Favicon;
