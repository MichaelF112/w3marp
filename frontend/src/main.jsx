import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./context/ModalContext";
import { ItemDetailProvider } from "./context/ItemDetailContext";
import { WalletProvider } from "./context/WalletContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <WalletProvider>
        <ItemDetailProvider>
          <Router>
            <App />
          </Router>
        </ItemDetailProvider>
      </WalletProvider>
    </ModalProvider>
  </StrictMode>
);
