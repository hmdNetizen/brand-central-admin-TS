import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import PagesRoutes from "./routes/Routes";
import { useActions } from "./hooks/useActions";

function App() {
  const { getPaginatedProducts } = useActions();

  useEffect(() => {
    getPaginatedProducts({
      limit: 10,
      page: 1,
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <PagesRoutes />
    </ThemeProvider>
  );
}

export default App;
