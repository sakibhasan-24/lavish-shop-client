import React from "react";
import Navbar from "./components/navbar/Navbar";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-1 my-6">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
