import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import ShowDialog from "src/utils/ShowDialog";
import Notifications from "./Notifications";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type NotificationModalProps = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const InStockNotificationModal = (props: NotificationModalProps) => {
  const { showNotification, setShowNotification } = props;
  const theme = useTheme();
  const matchesMDX = useMediaQuery("(max-width: 1100px)");
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const accessToken = useTypedSelector((state) => state.auth.accessToken);
  const preOrdersUpdatedStock = useTypedSelector(
    (state) => state.preOrders.preOrdersUpdatedStock
  );

  const [productCode, setProductCode] = useState("");

  const handleClose = () => {
    sessionStorage.setItem("hidePreOrderNotification", JSON.stringify(true));

    setProductCode("");
    setShowNotification(false);
  };

  useEffect(() => {
    const isNotified = sessionStorage.getItem("hidePreOrderNotification");

    let timeout: NodeJS.Timeout;

    if (
      !isNotified &&
      accessToken &&
      !showNotification &&
      preOrdersUpdatedStock.length > 0
    ) {
      timeout = setTimeout(() => {
        setShowNotification(true);
      }, 30000);
    }

    return () => clearTimeout(timeout);
  }, [showNotification, preOrdersUpdatedStock, accessToken]);

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
          showNotification={showNotification}
        />
      </Grid>
    </ShowDialog>
  );
};

export default InStockNotificationModal;
