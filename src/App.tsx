import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";

import PagesRoutes from "./routes/Routes";
import ScrollToView from "./utils/ScrollToView";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";

import "react-toastify/dist/ReactToastify.css";
import InStockNotificationModal from "./components/notifications/InStockNotificationModal";

function App() {
  const { showAvailableStockForPreOrders } = useActions();

  const allProducts = useTypedSelector((state) => state.products.allProducts);
  const preOrders = useTypedSelector((state) => state.preOrders.preOrders);

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (allProducts.length > 0 && preOrders.length > 0) {
      showAvailableStockForPreOrders({
        productData: allProducts,
        preOrderData: preOrders,
      });
    }
  }, [allProducts, preOrders]);

  return (
    <ThemeProvider theme={theme}>
      <ScrollToView>
        <ToastContainer newestOnTop style={{ fontSize: "1.5rem" }} />
        <PagesRoutes />
        <InStockNotificationModal
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      </ScrollToView>
    </ThemeProvider>
  );
}

export default App;
