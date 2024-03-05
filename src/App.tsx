import { ThemeProvider } from "@emotion/react";
import "./App.css";
import RoutesPage from "./routes/routing_config/RoutesPage";
import { theme } from "./theme/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RoutesPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
