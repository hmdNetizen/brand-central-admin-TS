import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import LogoBoxDisplay from "src/components/general-settings/LogoBoxDisplay";
import { useActions } from "src/hooks/useActions";
import CustomLoadingDialog from "src/utils/CustomLoadingDialog";
import useTitle from "src/hooks/useTitle";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const ContentWrapper = styled(Grid)({
  boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  minHeight: "85vh",
  background: "#fff",
  padding: "5rem 2rem",
});

const Container = styled(Grid)(({ theme }) => ({
  padding: "1rem 2rem 5rem 2rem",

  [theme.breakpoints.only("xs")]: {
    padding: "5rem 1rem 5rem 1rem",
  },
}));

type initStateTypes = {
  selectedFileHeader: File | string;
  selectedFileInvoice: File | string;
};

const initialState = {
  selectedFileHeader: "",
  selectedFileInvoice: "",
};

const Logo = () => {
  useTitle("Admin : General Settings | Logo");
  const theme = useTheme();

  const [selectedDataset, setSelectedDataset] =
    useState<initStateTypes>(initialState);

  const [headerPreview, setHeaderPreview] = useState<undefined | string>();
  const [invoicePreview, setInvoicePreview] = useState<undefined | string>();

  const loadingSettingsAction = useTypedSelector(
    (state) => state.settings.loadingSettingsAction
  );
  const siteData = useTypedSelector((state) => state.settings.siteData);

  const { selectedFileHeader, selectedFileInvoice } = selectedDataset;

  const { updateHeaderLogo, updateInvoiceLogo } = useActions();

  const handleLogoAction = () => {
    return !loadingSettingsAction;
  };

  useEffect(() => {
    if (siteData) {
      const newInitialState = { ...initialState };

      if (siteData.headerLogo) {
        newInitialState.selectedFileHeader = siteData.headerLogo;
      }

      if (siteData.invoiceLogo) {
        newInitialState.selectedFileInvoice = siteData.invoiceLogo;
      }

      setSelectedDataset(newInitialState);
    }
  }, [siteData]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    let objectUrl: string;

    if (!selectedFileHeader || typeof selectedFileHeader === "string") {
      setHeaderPreview(undefined);
      return;
    } else {
      objectUrl = URL.createObjectURL(selectedFileHeader);
      setHeaderPreview(objectUrl);
    }

    if (!selectedFileInvoice || typeof selectedFileInvoice === "string") {
      setInvoicePreview(undefined);
      return;
    } else {
      objectUrl = URL.createObjectURL(selectedFileInvoice);
      setInvoicePreview(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFileHeader, selectedFileInvoice, siteData]);

  const handleHeaderLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedDataset((prev) => ({
        ...prev,
        selectedFileHeader: "",
      }));
      return;
    }

    setSelectedDataset((prev) => ({
      ...prev,
      selectedFileHeader: event.target?.files?.[0]!,
    }));
  };

  const handleInvoiceLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedDataset((prev) => ({
        ...prev,
        selectedFileInvoice: "",
      }));
      return;
    }

    setSelectedDataset((prev) => ({
      ...prev,
      selectedFileInvoice: event.target.files?.[0]!,
    }));
  };

  const handleHeaderLogoSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    updateHeaderLogo({
      file: selectedFileHeader,
    });
  };

  const handleInvoiceLogoSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    updateInvoiceLogo({
      file: selectedFileInvoice,
    });
  };

  return (
    <Container container direction="column">
      <Grid item container pb={2}>
        <Typography variant="h3" color={theme.palette.secondary.dark}>
          Website Logo
        </Typography>
      </Grid>
      <ContentWrapper item container justifyContent="space-evenly">
        <LogoBoxDisplay
          title="Header Logo"
          onChange={handleHeaderLogoChange}
          selectedFile={selectedFileHeader}
          preview={headerPreview}
          onSubmit={handleHeaderLogoSubmit}
          name="selectedFileHeader"
          inputId="selectedFileHeader"
        />
        <LogoBoxDisplay
          title="Invoice Logo"
          onChange={handleInvoiceLogoChange}
          selectedFile={selectedFileInvoice}
          preview={invoicePreview}
          onSubmit={handleInvoiceLogoSubmit}
          name="selectedFileInvoice"
          inputId="selectedFileInvoice"
        />
      </ContentWrapper>
      <CustomLoadingDialog
        loading={loadingSettingsAction}
        handleLoading={handleLogoAction}
      />
    </Container>
  );
};

export default Logo;
