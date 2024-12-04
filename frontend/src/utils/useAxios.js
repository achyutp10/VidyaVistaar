// import axios from 'axios';
// import { API_BASE_URL } from './constants';

// const useAxios = () => {
//   const axiosInstance = axios.create({
//     baseURL: API_BASE_URL, // Adjust to match backend base URL
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // Optional: Add interceptors for refreshing tokens if required
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response.status === 401) {
//         try {
//           const refreshToken = localStorage.getItem('refresh_token');
//           const response = await axios.post('/token/refresh/', { refresh: refreshToken });
//           localStorage.setItem('access_token', response.data.access);
//           error.config.headers['Authorization'] = `Bearer ${response.data.access}`;
//           return axiosInstance(error.config); // Retry the original request
//         } catch (refreshError) {
//           console.error('Token refresh failed:', refreshError);
//           localStorage.clear(); // Optionally clear tokens on failure
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxios;
import axios from 'axios';

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/', // Your API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Intercept requests to add Authorization token if available
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;

