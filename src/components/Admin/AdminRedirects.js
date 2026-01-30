import React, { useState, useEffect } from "react";
import { getRedirects, addRedirect, deleteRedirect } from "../../data/redirectStore";

const EMPTY_FORM = { from: "", to: "" };

function AdminRedirects() {
  const [redirects, setRedirects] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    setRedirects(getRedirects());
  }, []);

  const load = () => setRedirects(getRedirects());

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = (form.from || "").trim();
    const to = (form.to || "").trim();
    if (!from || !to) {
      showMsg("From and To are required.");
      return;
    }
    addRedirect({ from, to });
    setForm(EMPTY_FORM);
    load();
    showMsg("Redirect added. Apply client-side on this app; for true 301 on deploy use vercel.json or _redirects.");
  };

  const handleDelete = (id) => {
    deleteRedirect(id);
    load();
    showMsg("Redirect removed.");
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">301 Redirects</h1>
      <p className="admin-page-subtitle">
        Add redirects: when someone visits the &quot;From&quot; path, they are sent to &quot;To&quot; (path or full URL). Applied client-side here; for true HTTP 301 on deploy, use <code>vercel.json</code> or <code>public/_redirects</code>.
      </p>

      {message && (
        <div className="admin-message admin-message-success">{message}</div>
      )}

      <div className="admin-card">
        <h2 className="admin-card-title">Add redirect</h2>
        <form onSubmit={handleSubmit}>
          <label className="admin-form-label">From (path to redirect from)</label>
          <input
            type="text"
            className="admin-form-control"
            value={form.from}
            onChange={(e) => setForm((p) => ({ ...p, from: e.target.value }))}
            placeholder="/old-page or /blog/post/old-slug"
          />
          <label className="admin-form-label">To (path or full URL)</label>
          <input
            type="text"
            className="admin-form-control"
            value={form.to}
            onChange={(e) => setForm((p) => ({ ...p, to: e.target.value }))}
            placeholder="/new-page or https://example.com"
          />
          <button type="submit" className="admin-btn-primary">
            Add redirect
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Redirect list ({redirects.length})</h2>
        {redirects.length === 0 ? (
          <p className="text-muted mb-0">No redirects. Add one above.</p>
        ) : (
          <div className="admin-projects-list">
            {redirects.map((r) => (
              <div key={r.id} className="admin-project-row">
                <div className="admin-project-info">
                  <strong>{r.from}</strong>
                  <span className="admin-project-desc-preview">→ {r.to}</span>
                </div>
                <div className="admin-project-actions">
                  <button
                    type="button"
                    className="admin-btn-danger admin-btn-sm"
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRedirects;
