// src/apiClient.ts

import axios from 'axios';
import { getCookie } from "../src/services/CookieService";

const csrftoken = getCookie('csrftoken');

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    },
    withCredentials: true, // Include if your API uses cookies for authentication
});

// Add a request interceptor if you need to attach tokens
apiClient.interceptors.request.use(
    // config => {
    //     const token = localStorage.getItem('csrftoken');
    //     if (token) {
    //       config.headers['X-CSRFToken'] = `${token}`;
    //     }
    //     return config;
    // },
    // error => Promise.reject(error)
);

export default apiClient;