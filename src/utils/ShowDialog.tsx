import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";

interface StyledDialogProps extends DialogProps {
  height?: number | string;
  width?: number | string;
}

const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height",
})<StyledDialogProps>(({ theme, height, width }) => ({
  "& .MuiPaper-root": {
    width: width,
    margin: 0,
    minHeight: height ? height : "auto",
    maxWidth: "none",

    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
}));

type ShowDialogProps = {
  openModal: boolean;
  handleClose: () => void;
  height?: number | string;
  width?: number | string;
  children: React.ReactNode;
};

const ShowDialog = (prop: ShowDialogProps) => {
  const { openModal, handleClose, height, width, children } = prop;
  return (
    <StyledDialog
      open={openModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      height={height}
      width={width}
    >
      {children}
    </StyledDialog>
  );
};

ShowDialog.defaultProps = {
  width: 400,
};

export default ShowDialog;
