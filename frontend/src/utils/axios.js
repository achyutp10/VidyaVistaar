import axios from 'axios';
import { API_BASE_URL } from './constants';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const setAuthHeader = (token) => {
  apiInstance.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
};

export default apiInstance;
