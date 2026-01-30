import React, { useState, useEffect } from "react";
import { getResumes, addResume, deleteResume, setPrimaryResume, updateResume } from "../../data/resumeStore";

const EMPTY_FORM = { title: "", url: "", date: "" };
const MAX_DATA_URL_SIZE = 4 * 1024 * 1024; // ~4MB (localStorage limit ~5MB)

function AdminResumes() {
  const [resumes, setResumes] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // { name, dataUrl }

  const load = () => setResumes(getResumes());

  useEffect(() => {
    load();
  }, []);

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const getResumeUrl = () => (uploadedFile ? uploadedFile.dataUrl : form.url.trim());

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      showMsg("Please choose a PDF file.");
      return;
    }
    if (file.size > MAX_DATA_URL_SIZE) {
      showMsg("File is large; prefer a URL or a smaller PDF (under ~4MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile({ name: file.name, dataUrl: reader.result });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const clearUploadedFile = () => setUploadedFile(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = getResumeUrl();
    if (!url) {
      showMsg("Enter a PDF URL or upload a PDF file.");
      return;
    }
    if (editingId) {
      updateResume(editingId, {
        title: form.title.trim() || "Resume",
        url,
        date: form.date.trim(),
      });
      showMsg("Resume updated.");
      setEditingId(null);
    } else {
      addResume({
        title: form.title.trim() || "Resume",
        url,
        date: form.date.trim(),
      });
      showMsg("Resume added.");
    }
    setForm(EMPTY_FORM);
    setUploadedFile(null);
    load();
  };

  const handleEdit = (r) => {
    setEditingId(r.id);
    const isDataUrl = r.url && r.url.startsWith("data:");
    setForm({
      title: r.title,
      url: isDataUrl ? "" : (r.url || ""),
      date: r.date || "",
    });
    setUploadedFile(isDataUrl ? { name: "resume.pdf", dataUrl: r.url } : null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Remove this resume from the list?")) return;
    deleteResume(id);
    if (editingId === id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
      setUploadedFile(null);
    }
    load();
    showMsg("Resume removed.");
  };

  const handleSetPrimary = (id) => {
    setPrimaryResume(id);
    load();
    showMsg("Primary resume updated.");
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Resumes</h1>
      <p className="admin-page-subtitle">
        Add PDF resumes by URL or upload. The primary resume is used for the Download / View buttons on the Resume page.
      </p>

      {message && (
        <div className={`admin-message admin-message-success`}>{message}</div>
      )}

      <div className="admin-card">
        <h2 className="admin-card-title">
          {editingId ? "Edit resume" : "Add resume"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="admin-form-label">Title (e.g. Resume 2025)</label>
          <input
            type="text"
            className="admin-form-control"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Resume 2025"
          />
          <label className="admin-form-label">PDF URL or upload *</label>
          <input
            type="url"
            className="admin-form-control"
            value={form.url}
            onChange={(e) => { setForm((p) => ({ ...p, url: e.target.value })); setUploadedFile(null); }}
            placeholder="https://... or /path/to/resume.pdf"
            disabled={!!uploadedFile}
          />
          <div className="admin-resume-upload mt-2">
            <span className="admin-form-label d-block mb-1">Or upload PDF</span>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="admin-file-input"
            />
            {uploadedFile && (
              <div className="admin-uploaded-file mt-2">
                <span className="admin-uploaded-name">File selected: {uploadedFile.name}</span>
                <button type="button" className="admin-btn-clear-file" onClick={clearUploadedFile}>Clear</button>
              </div>
            )}
          </div>
          <label className="admin-form-label">Date / label (optional)</label>
          <input
            type="text"
            className="admin-form-control"
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            placeholder="e.g. Jan 2025"
          />
          <div className="d-flex gap-2">
            <button type="submit" className="admin-btn-primary">
              {editingId ? "Update" : "Add"} resume
            </button>
            {editingId && (
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => { setEditingId(null); setForm(EMPTY_FORM); }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Resume list ({resumes.length})</h2>
        {resumes.length === 0 ? (
          <p className="text-muted mb-0">No resumes added. Add one above. The main Resume page will use the default PDF until you add at least one.</p>
        ) : (
          <div className="admin-projects-list">
            {resumes.map((r) => (
              <div key={r.id} className="admin-project-row">
                <div className="admin-project-info">
                  <strong>
                    {r.title || "Resume"}
                    {r.isPrimary && <span className="admin-primary-badge">Primary</span>}
                  </strong>
                  <span className="admin-project-desc-preview">{r.url && r.url.startsWith("data:") ? "Uploaded PDF" : r.url}</span>
                </div>
                <div className="admin-project-actions">
                  {!r.isPrimary && (
                    <button
                      type="button"
                      className="admin-btn-secondary admin-btn-sm"
                      onClick={() => handleSetPrimary(r.id)}
                    >
                      Set primary
                    </button>
                  )}
                  <button
                    type="button"
                    className="admin-btn-secondary admin-btn-sm"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
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

export default AdminResumes;
