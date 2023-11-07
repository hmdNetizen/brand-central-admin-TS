import React, { useEffect } from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import SalespersonOrderInvoicePageLayout from "./SalespersonOrderInvoicePageLayout";

const PrintSalespersonOrderInvoice = () => {
  const loadingSingleOrder = useTypedSelector(
    (state) => state.salespersonOrders.loadingSingleOrder
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!loadingSingleOrder) {
      timer = setTimeout(() => {
        window.print();
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, []);

  return <SalespersonOrderInvoicePageLayout />;
};

export default PrintSalespersonOrderInvoice;
