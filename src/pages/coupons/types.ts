import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";

export type FormContainerProps = {
  onSubmit: (event: React.FormEvent<HTMLInputElement | HTMLDivElement>) => void;
  couponCode: string;
  couponCodeError: string;
  isEdit?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick: () => void;
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
  couponType: string;
  couponTypeError: string;
  couponQuantity: string;
  amountOff: string;
  percentageOff: string | number;
  amountOffError: string;
  percentageOffError: string;
  couponQuantityError: string;
  couponUsageQuantity: string;
  couponUsageQuantityError: string;
  usePerCustomer: string;
  usesPerCustomerError: string;
  usageQuantity: number /* The number of times a customer can use a coupon if usePerCustomer is limited (default to 1) */;
  customerUsageQuantityError: string;
  startDateError: string;
  endDateError: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  minimumPurchaseAmount: string;
  minAmountChecked: boolean;
  setMinPurchaseAmountError: React.Dispatch<React.SetStateAction<string>>;
  setMinAmountChecked: React.Dispatch<React.SetStateAction<boolean>>;
  minPurchaseAmountError: string;
  couponDescription: string;
  couponDescriptionError: string;
  onClose: () => void;
  loadingRequestAction: boolean;
  onStartDate: (newValue: Dayjs | null) => void;
  onEndDate: (newValue: Dayjs | null) => void;
};

export type CouponDataPropTypes = {
  couponCode: string;
  couponType: string;
  couponUsageQuantity: string;
  usePerCustomer: string;
  usageQuantity: number;
  couponDescription: string;
  minimumPurchaseAmount: string;
  percentageOff: string;
  amountOff: string;
  couponQuantity: string;
};

export type DateData = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

export type CouponFieldsLayoutProps = {
  openCoupon: boolean;
  setOpenCoupon: React.Dispatch<React.SetStateAction<boolean>>;
  dateData: DateData;
  setDateData: React.Dispatch<React.SetStateAction<DateData>>;
  minAmountChecked: boolean;
  setMinAmountChecked: React.Dispatch<React.SetStateAction<boolean>>;
  couponData: CouponDataPropTypes;
  setCouponData: React.Dispatch<React.SetStateAction<CouponDataPropTypes>>;
  isEdit?: boolean;
};
