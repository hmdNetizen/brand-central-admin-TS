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
  percentageOff: string;
  amountOffError: string;
  percentageOffError: string;
  couponQuantityError: string;
  couponUsageQuantity: string;
  couponUsageQuantityError: string;
  usePerCustomer: string;
  usesPerCustomerError: string;
  customerUsageQuantity: number;
  customerUsageQuantityError: string;
  startDateError: string;
  endDateError: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  minPurchaseAmount: string;
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
