import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
  baseURL: '/api',
});

// Add language to requests
api.interceptors.request.use((config) => {
  // Add auth token
  const token = localStorage.getItem('token');
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

export const assetTypesService = {
  getAssetTypes: () => api.get('/asset-types'),
  createAssetType: (data: any) => api.post('/asset-types', data),
};

export default api; 