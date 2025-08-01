// test_api.js

import axios from 'axios';

// --- CONFIGURAÇÕES ---
// Altere a URL base se sua API estiver rodando em outro endereço ou porta
const BASE_URL = 'http://localhost:5000/api';

// Credenciais do administrador para o login
const credentials = {
  username: 'admin',
  password: 'admin' // Use a senha que você definiu!
};
// --------------------


/**
 * Função para fazer login e retornar o token.
 */
async function loginAndGetToken() {
  console.log('--- Passo 1: Tentando fazer login... ---');
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, credentials);

    // Pega o token do corpo da resposta (axios já converte JSON para objeto)
    const token = response.data.token;

    if (!token) {
      // Se a resposta não tiver um token, algo deu errado.
      throw new Error('Token não encontrado na resposta do login.');
    }

    console.log('Login realizado com sucesso!');
    console.log('Token recebido com sucesso.\n');
    return token; // Retorna o token para o próximo passo

  } catch (error) {
    console.error('Falha no login!');
    // Exibe detalhes do erro, se disponíveis na resposta da API
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Dados:', error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
    return null; // Retorna nulo se o login falhar
  }
}

/**
 * Função para buscar os projetos pendentes usando um token de autenticação.
 * @param {string} token - O token JWT obtido no login.
 */
async function fetchPendingProjects(token) {
  console.log('--- Passo 2: Buscando projetos pendentes (rota protegida)... ---');
  try {
    // Configuração da requisição, incluindo o cabeçalho de autorização
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(`${BASE_URL}/admin/projetos/pendentes`, config);

    console.log('Acesso à rota protegida realizado com sucesso!');
    console.log('Status da resposta:', response.status);
    console.log('Projetos pendentes encontrados:');
    // Imprime os dados de forma legível
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('Falha ao acessar a rota protegida!');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Dados:', error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
  }
}

/**
 * Função principal que orquestra o fluxo de teste.
 */
async function runTestFlow() {
  // Primeiro, tenta obter o token
  const authToken = await loginAndGetToken();

  // Se o token foi obtido com sucesso, prossegue para o próximo passo
  if (authToken) {
    await fetchPendingProjects(authToken);
  } else {
    console.log('\nTeste interrompido porque o login falhou.');
  }
}

// Inicia o fluxo de teste
runTestFlow();