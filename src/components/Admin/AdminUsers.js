import React, { useState, useEffect } from "react";
import { getAdminUsers, addAdminUser, deleteAdminUser } from "../../data/adminUsersStore";
import "./admin.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = () => setUsers(getAdminUsers());

  useEffect(() => {
    load();
  }, []);

  const showMsg = (text) => {
    setMessage(text);
    setError("");
    setTimeout(() => setMessage(""), 3000);
  };

  const showErr = (text) => {
    setError(text);
    setMessage("");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setError("");
    const result = addAdminUser(username.trim(), password);
    if (result.ok) {
      setUsername("");
      setPassword("");
      load();
      showMsg("User added. They can now log in with that username and password.");
    } else {
      showErr(result.error || "Failed to add user.");
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Remove this user? They will no longer be able to log in.")) return;
    const result = deleteAdminUser(id);
    if (result.ok) {
      load();
      showMsg("User removed.");
    } else {
      showErr(result.error || "Failed to remove user.");
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Users / Login auth</h1>
      <p className="admin-page-subtitle">
        Add or remove admin users. Each user can log in with their username and password.
      </p>

      {(message || error) && (
        <div className={error ? "admin-message admin-message-error" : "admin-message admin-message-success"}>
          {error || message}
        </div>
      )}

      <div className="admin-card">
        <h2 className="admin-card-title">Add user</h2>
        <form onSubmit={handleAddUser}>
          <label className="admin-form-label">Username</label>
          <input
            type="text"
            className="admin-form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="off"
          />
          <label className="admin-form-label">Password</label>
          <input
            type="password"
            className="admin-form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 4 characters"
            autoComplete="new-password"
          />
          <button type="submit" className="admin-btn-primary">
            Add user
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Admin users ({users.length})</h2>
        <div className="admin-projects-list">
          {users.map((u) => (
            <div key={u.id} className="admin-project-row">
              <div className="admin-project-info">
                <strong>{u.username}</strong>
                <span className="admin-project-desc-preview">Can log in to admin</span>
              </div>
              <div className="admin-project-actions">
                <button
                  type="button"
                  className="admin-btn-danger admin-btn-sm"
                  onClick={(ev) => handleDelete(ev, u.id)}
                  disabled={users.length <= 1}
                  title={users.length <= 1 ? "Keep at least one user" : "Remove user"}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {users.length <= 1 && (
          <p className="text-muted mb-0 mt-2 small">You must keep at least one user to log in.</p>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
