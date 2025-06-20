import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from 'react'
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./context/shopContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
