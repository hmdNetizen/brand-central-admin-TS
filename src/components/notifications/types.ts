import { UpdateStockType } from "src/services/pre-orders/PreOrderTypes";

export type NotificationItemProps = {
  stock: UpdateStockType;
  productCode: string;
  setProductCode: React.Dispatch<React.SetStateAction<string>>;
};
