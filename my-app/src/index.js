import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import FontWrapper from "./FontWrapper";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider } from "@clerk/clerk-react";

// ---- env + flags ----
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const CLERK_FRONTEND_API = process.env.REACT_APP_CLERK_FRONTEND_API;
const isProduction = process.env.NODE_ENV === "production";

// ---- log if key missing (avoid crash) ----
if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk publishable key (REACT_APP_CLERK_PUBLISHABLE_KEY). Rendering without ClerkProvider.");
}

// ---- (optional) unregister any existing service workers safely ----
// Keep this OUTSIDE React/JSX to avoid parser issues.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations?.().then((registrations) => {
    registrations.forEach((reg) => reg.unregister());
  }).catch(() => {
    // ignore if API not available
  });
}

// ---- small helper to conditionally wrap with Clerk ----
const AppTree = () => {
  const appUi = (
    <FontWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FontWrapper>
  );

  // If publishable key exists, use ClerkProvider; else render app directly
  return PUBLISHABLE_KEY ? (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      {...(isProduction && CLERK_FRONTEND_API ? { frontendApi: CLERK_FRONTEND_API } : {})}
    >
      {appUi}
    </ClerkProvider>
  ) : (
    appUi
  );
};

// ---- mount ----
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppTree />
  </React.StrictMode>
);

// ---- web vitals (optional) ----
reportWebVitals();
