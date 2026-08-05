import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://fitness-uofd.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Inject JWT token automatically on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitness_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error interceptor: auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fitness_token');
      localStorage.removeItem('fitness_user');
    }
    return Promise.reject(error);
  }
);

export default api;
