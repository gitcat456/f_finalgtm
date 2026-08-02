import { authService } from './authService';

const API_BASE = 'http://localhost:5000/api/events';

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

export const eventService = {
  /**
   * Get all events, with optional status query parameter ('upcoming', 'ongoing', 'past').
   */
  async getAllEvents(status = null) {
    const url = status ? `${API_BASE}?status=${encodeURIComponent(status)}` : API_BASE;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch events');
    return data.data.events;
  },

  /**
   * Get single event by ID.
   */
  async getEventById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch event');
    return data.data.event;
  },

  /**
   * Create a new event using FormData or JSON.
   * @param {FormData|object} payload
   */
  async createEvent(payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create event');
    return data.data.event;
  },

  /**
   * Update existing event.
   * @param {string} id
   * @param {FormData|object} payload
   */
  async updateEvent(id, payload) {
    const isFormData = payload instanceof FormData;
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getHeaders(isFormData),
      credentials: 'include',
      body: isFormData ? payload : JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update event');
    return data.data.event;
  },

  /**
   * Delete an event by ID.
   * @param {string} id
   */
  async deleteEvent(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete event');
    return data;
  },

  /**
   * Toggle the isPosted flag on an event.
   * @param {string} id
   * @param {boolean} isPosted
   */
  async togglePost(id, isPosted) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getHeaders(false),
      credentials: 'include',
      body: JSON.stringify({ isPosted }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update event');
    return data.data.event;
  },
};
