/**
 * Admin users store (localStorage). Add/remove users; login checks against this list.
 * Passwords stored encoded (not plain text in storage).
 */

const ADMIN_USERS_KEY = "mohit_admin_users";

function encodePassword(password) {
  try {
    return btoa(encodeURIComponent(String(password)));
  } catch (e) {
    return "";
  }
}

function decodeAndCompare(inputPassword, storedEncoded) {
  try {
    const decoded = decodeURIComponent(atob(storedEncoded));
    return decoded === String(inputPassword);
  } catch (e) {
    return false;
  }
}

const DEFAULT_USERS = [
  { id: "default-1", username: "Kp9mX2n", passwordEnc: encodePassword("wL4vN7q") },
];

function getStored() {
  try {
    const raw = localStorage.getItem(ADMIN_USERS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function setStored(list) {
  try {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
}

export function getAdminUsers() {
  const list = getStored();
  if (Array.isArray(list) && list.length > 0) return list;
  setStored(DEFAULT_USERS);
  return DEFAULT_USERS;
}

export function addAdminUser(username, password) {
  const u = String(username).trim();
  const p = String(password);
  if (!u) return { ok: false, error: "Username is required." };
  if (!p) return { ok: false, error: "Password is required." };
  if (p.length < 4) return { ok: false, error: "Password must be at least 4 characters." };
  const list = getAdminUsers();
  if (list.some((x) => x.username.toLowerCase() === u.toLowerCase())) {
    return { ok: false, error: "Username already exists." };
  }
  const id = "user-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
  list.push({ id, username: u, passwordEnc: encodePassword(p) });
  setStored(list);
  return { ok: true };
}

export function deleteAdminUser(id) {
  const list = getAdminUsers();
  if (list.length <= 1) return { ok: false, error: "Cannot remove the last user." };
  const next = list.filter((x) => x.id !== id);
  if (next.length === list.length) return { ok: false, error: "User not found." };
  setStored(next);
  return { ok: true };
}

export function checkAdminCredentials(username, password) {
  const list = getAdminUsers();
  const u = String(username).trim();
  const user = list.find((x) => x.username === u);
  if (!user) return false;
  return decodeAndCompare(password, user.passwordEnc);
}
