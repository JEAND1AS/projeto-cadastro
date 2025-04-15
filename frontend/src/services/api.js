import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Porta do backend
});

export default api;
