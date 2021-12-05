import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "./context/themeContext";
import { DataProvider } from "./context/dataContext";
import { AuthProvider } from "./context/authContext";
import { UserDataProvider } from "./context/userDataContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <DataProvider>
          <UserDataProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UserDataProvider>
        </DataProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
  rootElement
);
