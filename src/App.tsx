import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import PagesRoutes from "./routes/Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PagesRoutes />
    </ThemeProvider>
  );
}

export default App;
