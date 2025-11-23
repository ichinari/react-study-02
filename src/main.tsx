import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/index.css";
import List from "./page/List.tsx";
import Create from "./page/Create.tsx";

const rooter = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={rooter} />
  </StrictMode>
);
