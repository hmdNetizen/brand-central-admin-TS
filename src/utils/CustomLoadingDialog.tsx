import React from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import loader from "src/assets/gif/spinner.gif";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    background: "transparent",
    boxShadow: "none",
  },
});

type PropTypes = {
  loading: boolean;
  handleLoading: () => boolean;
};

const CustomLoadingDialog = ({ loading, handleLoading }: PropTypes) => {
  return (
    <StyledDialog
      open={loading}
      onClose={handleLoading}
      aria-labelledby="loading-dialog"
      aria-describedby="loading-dialog-description"
    >
      <img src={loader} alt="loading gif" />
    </StyledDialog>
  );
};

export default CustomLoadingDialog;
