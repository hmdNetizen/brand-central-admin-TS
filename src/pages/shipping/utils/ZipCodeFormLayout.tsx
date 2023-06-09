import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDialog from "src/utils/ShowDialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import {
  ContentContainer,
  ErrorsList,
  ErrorMsg,
} from "src/utilityStyles/pagesUtilityStyles";
import ZipCodeForm from "./ZipCodeForm";
import { ZipCodeFormLayoutProps } from "../types";

const ZipCodeFormLayout = (props: ZipCodeFormLayoutProps) => {
  const { openZipCode, setOpenZipCode, zipCode, setZipCode, isEdit } = props;

  const theme = useTheme();

  const { addShippingZipCodes, updateShippingZipCodes, clearZipCodeError } =
    useActions();

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  const [zipCodeError, setZipCodeError] = useState("");

  const error = useTypedSelector((state) => state.shipping.error);
  const singleZipCode = useTypedSelector(
    (state) => state.shipping.singleZipCode
  );
  const loadingZipCodeAction = useTypedSelector(
    (state) => state.shipping.loadingZipCodeAction
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setZipCode(event.target.value);

    switch (name) {
      case "zipCode":
        if (!value) {
          setZipCodeError("Please enter zip code");
        } else {
          setZipCodeError("");
        }
        break;
      default:
        setZipCodeError("");
    }
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    if (!zipCode.trim()) {
      setZipCodeError("Please enter zip code");
      return;
    }

    if (zipCodeError) return;

    if (isEdit) {
      updateShippingZipCodes({
        setOpenZipCode,
        setZipCode,
        zipId: singleZipCode?._id!,
        zipCode,
      });
    } else {
      addShippingZipCodes({
        setOpenZipCode,
        setZipCode,
        zipCode,
      });
    }
  };

  const handleClose = () => {
    setZipCodeError("");
    clearZipCodeError();
    setZipCode("");
    setOpenZipCode(false);
  };

  return (
    <ShowDialog
      openModal={openZipCode}
      handleClose={handleClose}
      width={matchesXS ? "95%" : matchesSM ? "85%" : 800}
    >
      <ContentContainer container direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            p: "1rem 2rem",
            background: "#f7f7f7",
          }}
        >
          <Grid item alignSelf="center">
            <Typography
              variant="h4"
              style={{ marginBottom: 0 }}
              color="secondary"
            >
              {isEdit ? "Edit Zip Code" : "Add New Zip Code"}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {!loadingZipCodeAction && error && (
          <ErrorsList item component="ul">
            <ErrorMsg variant="body1" component="li" color="error">
              {error}
            </ErrorMsg>
          </ErrorsList>
        )}
        <ZipCodeForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          onChange={handleChange}
          zipCode={zipCode}
          loadingZipCodeAction={loadingZipCodeAction}
          zipCodeError={zipCodeError}
          isEdit={isEdit}
        />
      </ContentContainer>
    </ShowDialog>
  );
};

export default ZipCodeFormLayout;
