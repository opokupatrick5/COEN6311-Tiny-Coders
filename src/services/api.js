import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Set your base URL here
  timeout: 10000, // Set timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});

// Add request interceptor to add authentication token or perform other actions before request is sent
api.interceptors.request.use(
  (config) => {
    // You can add custom headers, authentication token, etc., here if needed
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add response interceptor to handle responses globally
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle error responses
    return Promise.reject(error);
  }
);

export default api;