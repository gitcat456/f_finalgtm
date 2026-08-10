import { authService } from './authService';

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://ffinalgtm-production.up.railway.app/api';

const API_BASE = `${BASE_URL}/analytics`;

const getHeaders = () => {
  const token = authService.getToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const analyticsService = {
  /**
   * Track a visit (Public endpoint, non-blocking)
   */
  async trackVisit(payload) {
    try {
      const res = await fetch(`${API_BASE}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch {
      // Quietly ignore analytics tracking failures so user navigation is never affected
      return null;
    }
  },

  /**
   * Get analytics dashboard stats (Protected endpoint)
   * @param {string} period '24h' | '7d' | '30d' | 'all'
   */
  async getAnalyticsStats(period = '7d') {
    const res = await fetch(`${API_BASE}/stats?period=${period}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch analytics data');
    }
    return data.data;
  },
};
