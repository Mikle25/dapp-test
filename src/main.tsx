import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProviderContextProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderContextProvider>
      <App />
    </ProviderContextProvider>
  </React.StrictMode>
);
