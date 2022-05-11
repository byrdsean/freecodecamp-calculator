import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Calculator from "./Calculator/Calculator";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
