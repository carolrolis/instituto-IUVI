import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { LoginResponse } from '../../api/apiClient.ts';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await apiClient.post<LoginResponse>('/admin/login', {username: login, password: senha});
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/projetos');
    } catch (err) {
      setError('Login ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="text-sm font-bold text-gray-600 block">Login</label>
            <input 
              id="login-email" 
              type="text" 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              className="w-full p-2 mt-1 border rounded-md focus:border-purple-400 text-gray-600 focus:ring-1 focus:ring-purple-400" 
              required 
            />
          </div>
          <div>
            <label htmlFor="login-password"  className="text-sm font-bold text-gray-600 block">Senha</label>
            <input 
              id="login-password"
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:border-purple-400 text-gray-600 focus:ring-1 focus:ring-purple-400" 
              required 
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;