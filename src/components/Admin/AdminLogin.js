import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { checkAdminCredentials, setAdminLoggedIn } from "../../data/adminAuth";
import "./admin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("Enter username.");
      return;
    }
    if (!password) {
      setError("Enter password.");
      return;
    }
    if (!checkAdminCredentials(username.trim(), password)) {
      setError("Invalid username or password.");
      return;
    }
    setAdminLoggedIn();
    navigate(redirectTo.startsWith("/admin") ? redirectTo : "/admin/dashboard", { replace: true });
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">Sign in to manage your portfolio.</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}
          <label className="admin-form-label">Username</label>
          <input
            type="text"
            className="admin-form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            autoFocus
          />
          <label className="admin-form-label">Password</label>
          <input
            type="password"
            className="admin-form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
          <button type="submit" className="admin-btn-primary admin-login-btn">
            Sign in
          </button>
        </form>
        <Link to="/" className="admin-back-portfolio admin-login-back">
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
