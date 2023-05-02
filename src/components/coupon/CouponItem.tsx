import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CustomSwitch from "src/utils/CustomSwitch";
import { useTheme } from "@mui/material/styles";
import Moment from "react-moment";
import { CouponReturnedPayload } from "src/services/coupon/CouponTypes";
import {
  OptionsTableData,
  ActionButton,
  StyledIconButton,
} from "src/components/common/styles/CommonPageStyles";
import { useActions } from "src/hooks/useActions";

type CouponItemProps = {
  coupon: CouponReturnedPayload;
  index: number;
  setOpenEditCoupon: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteCoupon: React.Dispatch<React.SetStateAction<boolean>>;
};

const CouponItem = (props: CouponItemProps) => {
  const theme = useTheme();
  const { coupon, index, setOpenDeleteCoupon, setOpenEditCoupon } = props;
  const { setCurrentCoupon, toggleCouponActivation } = useActions();

  const handleSwitchChange = () => {
    toggleCouponActivation({
      couponId: coupon._id,
      isActive: false,
    });
  };

  const handleEditCoupon = () => {
    setOpenEditCoupon(true);
    setCurrentCoupon(coupon);
  };

  const handleDeleteCoupon = () => {
    setOpenDeleteCoupon(true);
    setCurrentCoupon(coupon);
  };

  const {
    couponCode,
    couponDescription,
    startDate,
    endDate,
    couponType,
    priceOff,
    usageCount,
    isActive,
  } = coupon;
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{index + 1}</TableCell>
      <TableCell style={{ minWidth: 250 }}>{couponDescription}</TableCell>
      <TableCell align="center" style={{ minWidth: 150 }}>
        {couponCode}
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <Moment format="D MMM YYYY hh:mm:ss">{startDate}</Moment>
      </TableCell>
      <TableCell style={{ minWidth: 150 }}>
        <Moment format="D MMM YYYY hh:mm:ss">{endDate}</Moment>
      </TableCell>
      <TableCell align="center" style={{ minWidth: 150 }}>
        {couponType.toLowerCase() === "discount by amount" && <span>$</span>}
        {priceOff}
        {couponType.toLowerCase() === "discount by percentage" && (
          <span>%</span>
        )}
      </TableCell>
      <TableCell align="center" style={{ minWidth: 150 }}>
        {usageCount}
      </TableCell>
      <TableCell align="center">
        <CustomSwitch
          onChange={handleSwitchChange}
          checked={isActive}
          isActive={isActive}
        />
      </TableCell>
      <TableCell>
        <OptionsTableData>
          <ActionButton
            startIcon={<EditSharpIcon />}
            background={theme.palette.secondary}
            title="Edit"
            onClick={handleEditCoupon}
          />

          <StyledIconButton onClick={handleDeleteCoupon}>
            <DeleteSharpIcon />
          </StyledIconButton>
        </OptionsTableData>
      </TableCell>
    </TableRow>
  );
};

export default CouponItem;
