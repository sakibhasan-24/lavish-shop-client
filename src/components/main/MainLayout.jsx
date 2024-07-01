import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import Home from "../home/Home";

export default function MainLayout() {
  return (
    <div>
      <div>
        <Home />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
