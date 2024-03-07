import React from "react";
import ReactDOM from "react-dom/client";
import { createServer } from "miragejs";

import EMPLOYEE_JSON from "./EmployeeDB.json";
import ORG_DATA from "./OrgDB.json";

import App from "./App.jsx";
import "./index.css";

createServer({
  routes() {
    (this.namespace = "org"),
      this.get("/api/employees", () => {
        return EMPLOYEE_JSON;
      });
    this.get("/api/org", () => {
      return ORG_DATA;
    });
    this.post("/api/org", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      console.log(attrs, schema);
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
