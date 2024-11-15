import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import { DrawerProvider } from "./context/drawer/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DrawerProvider>
      <Provider store={store}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              padding: "16px",
              color: "#343A40",
            },
          }}
        />

        <App />
      </Provider>
    </DrawerProvider>
  </StrictMode>
);
