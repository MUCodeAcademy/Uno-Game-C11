import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StateProvider from "./shared/context";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styled/themes/Theme";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorBoundary from "./components/Game/components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StateProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StateProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
