// src/apiClient.ts

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include if your API uses cookies for authentication
});

// Add a request interceptor if you need to attach tokens
apiClient.interceptors.request.use(
    config => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    error => Promise.reject(error)
);

export default apiClient;