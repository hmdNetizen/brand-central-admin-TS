import React, { Fragment, useEffect } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import NotificationItem from "./NotificationItem";
import NotificationItemMobile from "./NotificationItemMobile";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { HeadingWrapper } from "./styles";

type NotificationProps = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  productCode: string;
  setProductCode: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};

const Notification = (props: NotificationProps) => {
  const theme = useTheme();
  const {
    showNotification,
    setShowNotification,
    productCode,
    setProductCode,
    onClose,
  } = props;

  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const loadingPreOrderAction = useTypedSelector(
    (state) => state.preOrders.loadingPreOrderAction
  );
  const preOrdersUpdatedStock = useTypedSelector(
    (state) => state.preOrders.preOrdersUpdatedStock
  );

  useEffect(() => {
    if (preOrdersUpdatedStock.length === 0) {
      setShowNotification(false);
    }
  }, [preOrdersUpdatedStock]);

  useEffect(() => {
    if (!loadingPreOrderAction) {
      setProductCode("");
    }

    // eslint-disable-next-line
  }, [loadingPreOrderAction]);

  return (
    <Fragment>
      <HeadingWrapper item container justifyContent="space-between">
        <Typography variant="body1" color="#fff">
          Available Stock Notification
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon style={{ color: "#fff" }} />
        </IconButton>
      </HeadingWrapper>
      {preOrdersUpdatedStock.map((stock) => (
        <Fragment key={stock.id}>
          {matchesSM ? (
            <NotificationItemMobile
              stock={stock}
              productCode={productCode}
              setProductCode={setProductCode}
            />
          ) : (
            <NotificationItem
              stock={stock}
              productCode={productCode}
              setProductCode={setProductCode}
            />
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Notification;
