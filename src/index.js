import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

// ----------- Practive -----------
// import App from "./practice/App-lifting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
