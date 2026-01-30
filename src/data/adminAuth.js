/**
 * Admin authentication. Users are managed in adminUsersStore; login checks against that list.
 * Session is stored in sessionStorage (cleared when browser tab closes).
 */

import { checkAdminCredentials as checkUsers } from "./adminUsersStore";

const ADMIN_SESSION_KEY = "mohit_admin_session";

// Default seeded user (username / password) — can also add more via Admin → Users
export const DEFAULT_ADMIN_USERNAME = "Kp9mX2n";
export const DEFAULT_ADMIN_PASSWORD = "wL4vN7q";

export function checkAdminCredentials(username, password) {
  return checkUsers(username, password);
}

export function setAdminLoggedIn() {
  try {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    return true;
  } catch (e) {
    return false;
  }
}

export function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch (e) {
    return false;
  }
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    return true;
  } catch (e) {
    return false;
  }
}
