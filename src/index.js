/**
 * Entry point of the React application.
 * Renders the App component inside a BrowserRouter.
 * Uses React.StrictMode for enhanced error handling during development.
 * Sends web vitals data to Vercel Analytics.
 * @module index
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { BrowserRouter } from "react-router-dom";

import "fomantic-ui/dist/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(sendToVercelAnalytics);
