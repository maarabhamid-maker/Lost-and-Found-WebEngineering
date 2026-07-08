// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://maarab.fwh.is/lostfound';

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};