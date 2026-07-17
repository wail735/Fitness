import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
