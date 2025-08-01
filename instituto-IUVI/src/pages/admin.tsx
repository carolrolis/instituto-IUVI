import axios from 'axios';

// Crie uma interface para a resposta de login, se desejar
interface LoginResponse {
  token: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Confira a porta do seu backend
});

// Interceptador para adicionar o token de autenticação em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Garante que o header de autorização seja adicionado corretamente
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
export type { LoginResponse };