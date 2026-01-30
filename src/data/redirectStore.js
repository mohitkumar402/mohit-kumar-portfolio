/**
 * 301-style redirects editable from /admin/redirects. Stored in localStorage.
 * App applies these client-side (replace); for true 301 on deploy use vercel.json / _redirects.
 */

const REDIRECT_STORAGE_KEY = "mohit_portfolio_redirects";

function getStored() {
  try {
    const raw = localStorage.getItem(REDIRECT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function setStored(list) {
  try {
    localStorage.setItem(REDIRECT_STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
}

/** Get all redirects */
export function getRedirects() {
  return getStored();
}

/** Add a redirect: { from, to } — from and to are paths or full URLs */
export function addRedirect(redirect) {
  const list = getStored();
  const from = (redirect.from || "").trim().replace(/^\//, "") || "";
  const to = (redirect.to || "").trim();
  if (!from || !to) return null;
  const newRedirect = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    from: from.startsWith("/") ? from : "/" + from,
    to,
  };
  list.push(newRedirect);
  setStored(list);
  return newRedirect;
}

/** Delete by id */
export function deleteRedirect(id) {
  const list = getStored().filter((r) => r.id !== id);
  setStored(list);
  return list;
}

/** Find redirect for current path (exact match on from) */
export function getRedirectForPath(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  const list = getStored();
  const fromNorm = path === "/" ? "/" : path;
  return list.find((r) => {
    const rFrom = r.from.replace(/\/$/, "") || "/";
    return rFrom === fromNorm;
  }) || null;
}

export { REDIRECT_STORAGE_KEY };
