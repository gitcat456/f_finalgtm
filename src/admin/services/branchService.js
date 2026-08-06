import { authService } from './authService';

const API_BASE = 'https://ffinalgtm-production.up.railway.app/api/branches';

const getHeaders = (isFormData = false) => {
  const token = authService.getToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const branchService = {
  /**
   * Get all branches.
   */
  async getAllBranches() {
    const res = await fetch(API_BASE);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch branches');
    return data.data.branches;
  },

  /**
   * Get single branch by ID.
   */
  async getBranchById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch branch');
    return data.data.branch;
  },

  /**
   * Create a new branch using FormData or JSON.
   * @param {FormData|object} payload
   */
  async createBranch(payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create branch');
    return data.data.branch;
  },

  /**
   * Update existing branch.
   * @param {string} id
   * @param {FormData|object} payload
   */
  async updateBranch(id, payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update branch');
    return data.data.branch;
  },

  /**
   * Delete a branch by ID.
   * @param {string} id
   */
  async deleteBranch(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete branch');
    return data;
  },
};
