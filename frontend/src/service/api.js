// frontend/src/services/api.js
import axios from 'axios';

// Crie uma instância do Axios para o seu backend
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // A URL base do seu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token JWT em todas as requisições (se existir)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Supondo que você armazene o token no localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;