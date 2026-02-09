import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7185/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🚀 Interceptor: This runs BEFORE every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;   