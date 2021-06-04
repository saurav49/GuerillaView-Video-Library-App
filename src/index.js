import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "./context/useTheme";
import { DataProvider } from "./context/dataContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </ThemeProvider>
  </StrictMode>,
  rootElement
);
