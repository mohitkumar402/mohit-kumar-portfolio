import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminLoggedIn } from "../../data/adminAuth";

function AdminAuthGuard() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) {
    if (isAdminLoggedIn()) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Outlet />;
  }

  if (!isAdminLoggedIn()) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/admin/login?redirect=${redirect}`} replace />;
  }

  return <Outlet />;
}

export default AdminAuthGuard;
