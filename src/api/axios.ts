import axios from 'axios';
import { getToken, clearToken } from '../auth/authUtils';

const API_BASE_URL = 'http://localhost:5069';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearToken();
      // Redirect to login if we're not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const register = async (email: string, password: string, role: string) => {
  const response = await axiosInstance.post('/api/auth/register', {
    email,
    password,
    role,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data;
};

export const getAssets = async () => {
  const response = await axiosInstance.get('/api/assets');
  return response.data;
};

export const getAssetsSummary = async () => {
  const response = await axiosInstance.get('/api/assets/summary');
  return response.data;
};

export const createAsset = async (assetData: {
  name: string;
  description?: string;
  financialGroupId?: number;
  assetTypeId?: number;
  currencyCode?: string;
  initialValue?: number;
}) => {
  console.log('Sending createAsset request:', assetData); // Debug log
  const response = await axiosInstance.post('/api/assets', assetData);
  console.log('createAsset response:', response.data); // Debug log
  return response.data;
};

export const updateAsset = async (id: number, assetData: {
  name?: string;
  description?: string;
  financialGroupId?: number;
  assetTypeId?: number;
  currencyCode?: string;
}) => {
  console.log('Sending updateAsset request:', { id, assetData }); // Debug log
  const response = await axiosInstance.put(`/api/assets/${id}`, assetData);
  console.log('updateAsset response:', response.data); // Debug log
  return response.data;
};

export const deleteAsset = async (id: number) => {
  console.log('Sending deleteAsset request:', id); // Debug log
  const response = await axiosInstance.delete(`/api/assets/${id}`);
  console.log('deleteAsset response:', response.data); // Debug log
  return response.data;
};

export const createAssetValue = async (assetValueData: {
  assetId: number;
  value: number;
  recordedAt: string;
}) => {
  console.log('Sending createAssetValue request:', assetValueData); // Debug log
  const response = await axiosInstance.post('/api/asset-values', assetValueData);
  console.log('createAssetValue response:', response.data); // Debug log
  return response.data;
};

export const updateAssetValue = async (assetId: number, value: number) => {
  console.log('Sending updateAssetValue request:', { assetId, value }); // Debug log
  const response = await axiosInstance.post('/api/asset-values', { 
    assetId,
    value,
    recordedAt: new Date().toISOString()
  });
  console.log('updateAssetValue response:', response.data); // Debug log
  return response.data;
};

export const getAssetValues = async (assetId?: number) => {
  const params = assetId ? { assetId } : {};
  const response = await axiosInstance.get('/api/asset-values', { params });
  return response.data;
};

export const getAssetTypes = async () => {
  const response = await axiosInstance.get('/api/asset-types');
  return response.data;
};

export const getCurrencies = async () => {
  const response = await axiosInstance.get('/api/currencies');
  return response.data;
};

export const getUserSettings = async () => {
  const response = await axiosInstance.get('/api/users/settings');
  return response.data;
};

export const updateUserSettings = async (settings: { preferredCurrency?: string }) => {
  const response = await axiosInstance.put('/api/users/settings', settings);
  return response.data;
};

export default axiosInstance; 