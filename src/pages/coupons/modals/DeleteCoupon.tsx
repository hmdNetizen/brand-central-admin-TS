import React from "react";
import ActionModal from "src/utils/ActionModal";
import { useActions } from "src/hooks/useActions";
import { useSelector } from "react-redux";
import { useTypedSelector } from "src/hooks/useTypedSelector";

type DeleteCouponProps = {
  openDeleteCoupon: boolean;
  setOpenDeleteCoupon: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteCoupon = (props: DeleteCouponProps) => {
  const { openDeleteCoupon, setOpenDeleteCoupon } = props;

  const loadingRequestAction = useTypedSelector(
    (state) => state.coupon.loadingRequestAction
  );
  const singleCoupon = useTypedSelector((state) => state.coupon.singleCoupon);

  const { deleteCoupon } = useActions();

  const handleDeleteCoupon = () => {
    deleteCoupon({
      couponId: singleCoupon?._id!,
      setOpenDeleteCoupon,
    });
  };
  return (
    <ActionModal
      actionType="Delete"
      loading={loadingRequestAction}
      openAction={openDeleteCoupon}
      setOpenAction={setOpenDeleteCoupon}
      handleAction={handleDeleteCoupon}
      data={singleCoupon?.couponCode!}
    />
  );
};

export default DeleteCoupon;
