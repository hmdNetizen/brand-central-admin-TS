import { useEffect } from "react";
import OrderInvoicePageDisplay from "./OrderInvoicePageDisplay";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const PrintOrderInvoice = () => {
  const loadingSingleOrder = useTypedSelector(
    (state) => state.orders.loadingSingleOrder
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!loadingSingleOrder) {
      timer = setTimeout(() => {
        window.print();
      }, 3000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  return <OrderInvoicePageDisplay />;
};

export default PrintOrderInvoice;
