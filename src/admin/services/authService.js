const API_BASE = 'http://localhost:5000/api';

/**
 * Admin auth service — handles login, logout, token management.
 * Tokens are stored in localStorage; the backend also sets httpOnly cookies.
 */

let verifyPromise = null;

export const authService = {
  /**
   * Login with username/password.
   * @returns {{ token: string, user: { id: string, username: string, role: string } }}
   */
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Persist token and user info
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));

    return data;
  },

  /**
   * Logout — clear local storage and call backend logout.
   */
  async logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
    } catch {
      // Swallow — we're logging out regardless
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  /**
   * Get the currently stored token.
   */
  getToken() {
    return localStorage.getItem('adminToken');
  },

  /**
   * Get the currently stored user object.
   */
  getUser() {
    try {
      const raw = localStorage.getItem('adminUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if a token exists (does NOT validate expiry on the client).
   */
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  },

  /**
   * Verify the stored token against the backend. Deduplicates concurrent in-flight requests.
   * @returns {object|null} user object or null if invalid
   */
  async verifyToken() {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;

    if (verifyPromise) {
      return verifyPromise;
    }

    verifyPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!res.ok) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          return null;
        }

        const data = await res.json();
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        return data.user;
      } catch {
        return null;
      } finally {
        verifyPromise = null;
      }
    })();

    return verifyPromise;
  },
};
