import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Solicitar from "./routes/Solicitar/Solicitar.jsx";
import Opcoes from "./routes/Opcoes/Opcoes.jsx";
import Historico from "./routes/Historico/Historico.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Solicitar />,
      },
      {
        path: "/solicitar",
        element: <Solicitar />,
      },
      {
        path: "/opcoes",
        element: <Opcoes />,
      },
      {
        path: "/historico",
        element: <Historico />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
