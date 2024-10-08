import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <App />
      </Provider>{" "}
    </SnackbarProvider>
  </React.StrictMode>
);
