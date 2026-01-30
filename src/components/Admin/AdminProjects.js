import React, { useState, useEffect, useRef } from "react";
import { getPortfolioProjects, setPortfolioProjects } from "../../data/portfolioAdminStore";

const EMPTY_PROJECT = { title: "", description: "", imgPath: "", ghLink: "", demoLink: "" };

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const projectsRef = useRef(projects);
  projectsRef.current = projects;

  useEffect(() => {
    setProjects(getPortfolioProjects());
  }, []);

  const saveToStore = (list) => {
    setPortfolioProjects(list);
    setProjects(list);
  };

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAdd = () => {
    setEditingIndex(null);
    setForm(EMPTY_PROJECT);
  };

  const handleEdit = (e, index) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const list = projectsRef.current;
    const proj = list[index];
    if (!proj) return;
    setEditingIndex(index);
    setForm({
      title: proj.title || "",
      description: proj.description || "",
      imgPath: proj.imgPath || "",
      ghLink: proj.ghLink || "",
      demoLink: proj.demoLink || "",
    });
  };

  const handleDelete = (e, index) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (!window.confirm("Remove this project from the portfolio?")) return;
    setProjects((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setPortfolioProjects(next);
      return next;
    });
    setEditingIndex((prev) => {
      if (prev === index) return null;
      if (prev != null && prev > index) return prev - 1;
      return prev;
    });
    if (editingIndex === index) setForm(EMPTY_PROJECT);
    showMsg("Project removed.");
  };

  const handleSaveOne = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showMsg("Title is required.");
      return;
    }
    const next = [...projects];
    const row = {
      title: form.title.trim(),
      description: (form.description || "").trim(),
      imgPath: (form.imgPath || "").trim(),
      ghLink: (form.ghLink || "").trim(),
      demoLink: (form.demoLink || "").trim(),
    };
    if (editingIndex != null) {
      next[editingIndex] = row;
      showMsg("Project updated.");
    } else {
      next.push(row);
      showMsg("Project added.");
    }
    setPortfolioProjects(next);
    setProjects(next);
    setEditingIndex(null);
    setForm(EMPTY_PROJECT);
  };

  const handleReorder = (e, fromIndex, direction) => {
    e.preventDefault();
    e.stopPropagation();
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= projects.length) return;
    const next = [...projects];
    [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
    setPortfolioProjects(next);
    setProjects(next);
    if (editingIndex === fromIndex) setEditingIndex(toIndex);
    else if (editingIndex === toIndex) setEditingIndex(fromIndex);
    showMsg("Order updated.");
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Projects</h1>
      <p className="admin-page-subtitle">
        Add, edit, or remove projects. Changes appear on the main portfolio Projects page.
      </p>

      {message && (
        <div className={`admin-message admin-message-success`}>{message}</div>
      )}

      <div className="admin-card">
        <h2 className="admin-card-title">
          {editingIndex != null ? "Edit project" : "Add project"}
        </h2>
        <form onSubmit={handleSaveOne}>
          <label className="admin-form-label">Title *</label>
          <input
            type="text"
            className="admin-form-control"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Project name"
            required
          />
          <label className="admin-form-label">Description</label>
          <textarea
            className="admin-form-control"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Short description"
          />
          <label className="admin-form-label">Image URL</label>
          <input
            type="url"
            className="admin-form-control"
            value={form.imgPath}
            onChange={(e) => setForm((p) => ({ ...p, imgPath: e.target.value }))}
            placeholder="https://..."
          />
          <label className="admin-form-label">GitHub link</label>
          <input
            type="url"
            className="admin-form-control"
            value={form.ghLink}
            onChange={(e) => setForm((p) => ({ ...p, ghLink: e.target.value }))}
            placeholder="https://github.com/..."
          />
          <label className="admin-form-label">Demo / Live link</label>
          <input
            type="url"
            className="admin-form-control"
            value={form.demoLink}
            onChange={(e) => setForm((p) => ({ ...p, demoLink: e.target.value }))}
            placeholder="https://..."
          />
          <div className="d-flex gap-2">
            <button type="submit" className="admin-btn-primary">
              {editingIndex != null ? "Update" : "Add"} project
            </button>
            {editingIndex != null && (
              <button type="button" className="admin-btn-secondary" onClick={() => { setEditingIndex(null); setForm(EMPTY_PROJECT); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">All projects ({projects.length})</h2>
        <div className="admin-projects-list">
          {projects.map((proj, i) => (
            <div key={i} className="admin-project-row">
              <div className="admin-project-info">
                <strong>{proj.title || "(No title)"}</strong>
                <span className="admin-project-desc-preview">{proj.description?.slice(0, 60)}…</span>
              </div>
              <div className="admin-project-actions">
                <button type="button" className="admin-btn-secondary admin-btn-sm" onClick={(ev) => handleEdit(ev, i)}>Edit</button>
                <button type="button" className="admin-btn-danger admin-btn-sm" onClick={(ev) => handleDelete(ev, i)}>Delete</button>
                <span className="admin-project-reorder">
                  <button type="button" className="admin-btn-secondary admin-btn-sm" onClick={(ev) => handleReorder(ev, i, -1)} disabled={i === 0}>↑</button>
                  <button type="button" className="admin-btn-secondary admin-btn-sm" onClick={(ev) => handleReorder(ev, i, 1)} disabled={i === projects.length - 1}>↓</button>
                </span>
              </div>
            </div>
          ))}
        </div>
        {projects.length === 0 && <p className="text-muted mb-0">No projects yet. Add one above.</p>}
      </div>
    </div>
  );
}

export default AdminProjects;
