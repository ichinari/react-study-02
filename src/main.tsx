import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { rooter } from "@rooter/index";
import { RouterProvider } from "react-router-dom";
import "./css/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={rooter} />
  </StrictMode>
);
