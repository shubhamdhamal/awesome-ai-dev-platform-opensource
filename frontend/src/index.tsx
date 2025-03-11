import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import "./prototypes";
import { ToastContainer } from "react-toastify";
import "@xyflow/react/dist/style.css";
import { Buffer } from "buffer";
import web3AuthContextConfig from "./web3AuthContext";
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";

if (!window.APP_SETTINGS.hostname.endsWith("/")) {
  window.APP_SETTINGS.hostname += "/";
}

if (!window.Buffer) {
  window.Buffer = Buffer;
}

const ele = document.getElementById("root");

if (ele) {
  const root = ReactDOM.createRoot(ele);

  root.render(
    <React.StrictMode>
      <Web3AuthProvider config={web3AuthContextConfig}>
      <RouterProvider router={router} />
      <ToastContainer style={{ zIndex: Number.MAX_SAFE_INTEGER }} />
      </Web3AuthProvider>
    </React.StrictMode>
  );
}
