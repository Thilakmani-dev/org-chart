import React from "react";
import ReactDOM from "react-dom/client";
import { createServer } from "miragejs";

import ORG_DATA from "./OrgDB.json";

import App from "./App.jsx";
import "./index.css";

createServer({
  routes() {
    (this.namespace = "org"),
      this.get("/api/employees", () => {
        return ORG_DATA;
      });
    this.get("/api/org", () => {
      return ORG_DATA;
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
