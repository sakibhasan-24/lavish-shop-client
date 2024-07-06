import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function Private({ children }) {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}
