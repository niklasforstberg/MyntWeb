import axios from 'axios';
import { getToken } from '../auth/authUtils';

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

export const createAsset = async (assetData: {
  name: string;
  description?: string;
  financialGroupId?: number;
  assetTypeId?: number;
}) => {
  const response = await axiosInstance.post('/api/assets', assetData);
  return response.data;
};

export default axiosInstance; 