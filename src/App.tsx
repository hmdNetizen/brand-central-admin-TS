import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";

import PagesRoutes from "./routes/Routes";
import ScrollToView from "./utils/ScrollToView";
import { useActions } from "./hooks/useActions";

import "react-toastify/dist/ReactToastify.css";
import { useTypedSelector } from "./hooks/useTypedSelector";

function App() {
  const { showAvailableStockForPreOrders } = useActions();

  const allProducts = useTypedSelector((state) => state.products.allProducts);
  const preOrders = useTypedSelector((state) => state.preOrders.preOrders);

  useEffect(() => {
    if (allProducts.length > 0 && preOrders.length > 0) {
      showAvailableStockForPreOrders({
        productData: allProducts,
      });
    }

    // eslint-disable-next-line
  }, [allProducts, preOrders]);

  return (
    <ThemeProvider theme={theme}>
      <ScrollToView>
        <ToastContainer newestOnTop style={{ fontSize: "1.5rem" }} />
      </ScrollToView>
      <PagesRoutes />
    </ThemeProvider>
  );
}

export default App;
