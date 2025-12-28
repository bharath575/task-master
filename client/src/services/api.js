import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
});

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data)
};

export const tasksAPI = {
    getAll: () => api.get('/tasks'),
    create: (data) => api.post('/tasks', data),
    update: (id, data) => api.put(`/tasks/${id}`, data),
    delete: (id) => api.delete(`/tasks/${id}`)
};

export default api;