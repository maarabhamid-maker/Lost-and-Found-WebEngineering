// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};