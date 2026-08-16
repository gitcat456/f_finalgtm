import { authService } from './authService';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ffinalgtm-production.up.railway.app/api';
const API_BASE = `${BASE_URL}/founders`;

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

export const founderService = {
  /**
   * Get all founders.
   */
  async getAllFounders() {
    const res = await fetch(API_BASE);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch founders');
    return data.data.founders;
  },

  /**
   * Get single founder by ID.
   */
  async getFounderById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch founder');
    return data.data.founder;
  },

  /**
   * Create a new founder using FormData or JSON.
   * @param {FormData|object} payload
   */
  async createFounder(payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create founder');
    return data.data.founder;
  },

  /**
   * Update existing founder.
   * @param {string} id
   * @param {FormData|object} payload
   */
  async updateFounder(id, payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update founder');
    return data.data.founder;
  },

  /**
   * Delete a founder by ID.
   * @param {string} id
   */
  async deleteFounder(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete founder');
    return data;
  },
};
