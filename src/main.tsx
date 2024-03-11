import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Crypto from "./pages/Crypto.tsx";
import Trending from "./pages/Trending.tsx";
import Saved from "./pages/Saved.tsx";
import CryptoDetails from "./components/CryptoDetails.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
        children: [
          {
            path: "coinId",
            element: <CryptoDetails />,
          },
        ],
      },
      {
        path: "/trending",
        element: <Trending />,
      },
      { path: "/saved", element: <Saved /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
