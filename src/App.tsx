import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import PagesRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import ScrollToView from "./utils/ScrollToView";

import "react-toastify/dist/ReactToastify.css";

function App() {
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
