import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Signup from "./pages/signup.tsx";
import Home from "./pages/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup></Signup>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
