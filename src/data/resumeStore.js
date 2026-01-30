/**
 * Resume entries editable from /admin/resumes. Stored in localStorage.
 * Resume page uses primary resume URL for Download / View.
 */

const RESUME_STORAGE_KEY = "mohit_portfolio_resumes";

function getStored() {
  try {
    const raw = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function setStored(list) {
  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
}

/** Get all resumes (primary first) */
export function getResumes() {
  const list = getStored();
  const primary = list.find((r) => r.isPrimary);
  const others = list.filter((r) => !r.isPrimary);
  return primary ? [primary, ...others] : list;
}

/** Get the URL of the primary resume, or null if none */
export function getPrimaryResumeUrl() {
  const list = getStored();
  const primary = list.find((r) => r.isPrimary);
  if (primary && primary.url) return primary.url;
  if (list.length > 0 && list[0].url) return list[0].url;
  return null;
}

/** Add a new resume */
export function addResume(resume) {
  const list = getStored();
  const isFirst = list.length === 0;
  const newResume = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    title: (resume.title || "Resume").trim(),
    url: (resume.url || "").trim(),
    date: (resume.date || "").trim(),
    isPrimary: isFirst || !!resume.isPrimary,
  };
  if (newResume.isPrimary) {
    list.forEach((r) => { r.isPrimary = false; });
  }
  list.push(newResume);
  setStored(list);
  return newResume;
}

/** Delete a resume by id */
export function deleteResume(id) {
  const list = getStored().filter((r) => r.id !== id);
  const hadPrimary = getStored().find((r) => r.id === id)?.isPrimary;
  if (hadPrimary && list.length > 0) list[0].isPrimary = true;
  setStored(list);
  return list;
}

/** Set one resume as primary */
export function setPrimaryResume(id) {
  const list = getStored();
  list.forEach((r) => { r.isPrimary = r.id === id; });
  setStored(list);
  return list;
}

/** Update a resume by id */
export function updateResume(id, data) {
  const list = getStored();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data };
  if (data.isPrimary) {
    list.forEach((r, i) => { r.isPrimary = i === idx; });
  }
  setStored(list);
  return list[idx];
}

export { RESUME_STORAGE_KEY };
