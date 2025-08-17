import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import FontWrapper from "./FontWrapper";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk publishable key (REACT_APP_CLERK_PUBLISHABLE_KEY).");
  
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} frontendApi="clerk.parentingautismtogether.in">
      <FontWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FontWrapper>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
