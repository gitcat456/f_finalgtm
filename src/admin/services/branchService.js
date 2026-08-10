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
   * Get branches with pagination, search, and filtering options.
   * @param {{ page?: number, limit?: number, search?: string, isPosted?: boolean }} params
   */
  async getAllBranches(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.page !== undefined) searchParams.append('page', params.page);
    if (params.limit !== undefined) searchParams.append('limit', params.limit);
    if (params.search) searchParams.append('search', params.search);
    if (params.isPosted !== undefined) searchParams.append('isPosted', params.isPosted);

    const queryString = searchParams.toString();
    const url = queryString ? `${API_BASE}?${queryString}` : API_BASE;

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch branches');

    return {
      branches: data.data.branches || [],
      total: data.total ?? data.data.branches?.length ?? 0,
      page: data.page ?? 1,
      totalPages: data.totalPages ?? 1,
      limit: data.limit ?? 6,
    };
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
