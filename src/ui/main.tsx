import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import AppLayout from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLayout />
  </StrictMode>
);
