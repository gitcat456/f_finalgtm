import { authService } from './authService';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ffinalgtm-production.up.railway.app/api';
const API_BASE = `${BASE_URL}/clergy`;

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

export const clergyService = {
  /**
   * Get all clergy members.
   */
  async getAllClergy() {
    const res = await fetch(API_BASE);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch clergy members');
    return data.data.clergy;
  },

  /**
   * Get single clergy member by ID.
   */
  async getClergyById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch clergy member');
    return data.data.clergyMember;
  },

  /**
   * Create a new clergy member using FormData or JSON.
   * @param {FormData|object} payload
   */
  async createClergy(payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create clergy member');
    return data.data.clergyMember;
  },

  /**
   * Update existing clergy member.
   * @param {string} id
   * @param {FormData|object} payload
   */
  async updateClergy(id, payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update clergy member');
    return data.data.clergyMember;
  },

  /**
   * Delete a clergy member by ID.
   * @param {string} id
   */
  async deleteClergy(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete clergy member');
    return data;
  },
};
