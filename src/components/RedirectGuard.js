import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getRedirectForPath } from "../data/redirectStore";

/**
 * If current path matches an admin-configured redirect, perform 301-style redirect (replace).
 * Internal paths use React Router Navigate; external URLs use window.location.replace.
 */
function RedirectGuard({ children }) {
  const location = useLocation();
  const redirect = getRedirectForPath(location.pathname);

  useEffect(() => {
    if (redirect && redirect.to.startsWith("http")) {
      window.location.replace(redirect.to);
    }
  }, [redirect]);

  if (!redirect) return children;
  if (redirect.to.startsWith("http")) return null; // effect will replace
  return <Navigate to={redirect.to} replace />;
}

export default RedirectGuard;
