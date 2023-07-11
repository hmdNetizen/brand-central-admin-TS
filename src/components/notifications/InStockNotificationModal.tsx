import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import ShowDialog from "src/utils/ShowDialog";
import Notifications from "./Notifications";

type NotificationModalProps = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const InStockNotificationModal = (props: NotificationModalProps) => {
  const { showNotification, setShowNotification } = props;
  const theme = useTheme();
  const matchesMDX = useMediaQuery("(max-width: 1100px)");
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const [productCode, setProductCode] = useState("");

  const handleClose = () => {
    sessionStorage.setItem("hidePreOrderNotification", JSON.stringify(true));

    setProductCode("");
    setShowNotification(false);
  };

  return (
    <ShowDialog
      openModal={showNotification}
      width={matchesSM ? "80%" : matchesMDX ? 900 : 950}
      handleClose={handleClose}
    >
      <Grid container direction="column">
        <Notifications
          setShowNotification={setShowNotification}
          productCode={productCode}
          setProductCode={setProductCode}
          onClose={handleClose}
        />
      </Grid>
    </ShowDialog>
  );
};

export default InStockNotificationModal;
