import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const AdminProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
