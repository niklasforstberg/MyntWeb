import axios from 'axios';
import i18n from '../i18n';
import { getToken, clearToken } from '../auth/authUtils';

const api = axios.create({
  baseURL: '/api',
});

// Add language to requests
api.interceptors.request.use((config) => {
  // Add auth token
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add language parameter for specific endpoints
  if (config.url?.includes('/asset-types')) {
    config.params = {
      ...config.params,
      lang: i18n.language,
    };
  }
  
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Authentication error detected, clearing token');
      clearToken();
      // Redirect to login if we're not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const assetTypesService = {
  getAssetTypes: () => api.get('/asset-types'),
  createAssetType: (data: any) => api.post('/asset-types', data),
};

export default api; 