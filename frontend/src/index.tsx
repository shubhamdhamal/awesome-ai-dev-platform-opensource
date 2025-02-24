import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import "./prototypes";
import {ToastContainer} from "react-toastify";
import "@xyflow/react/dist/style.css";

if (!window.APP_SETTINGS.hostname.endsWith("/")) {
  window.APP_SETTINGS.hostname += "/";
}

const ele = document.getElementById("root");

if (ele) {
  const root = ReactDOM.createRoot(ele);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
      <ToastContainer style={{zIndex: Number.MAX_SAFE_INTEGER}} />
    </React.StrictMode>
  );
}
