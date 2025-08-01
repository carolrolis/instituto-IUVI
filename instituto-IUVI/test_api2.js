// test_api.js

import axios from 'axios';

// --- CONFIGURAÇÕES ---
// Altere a URL base se sua API estiver rodando em outro endereço ou porta
const BASE_URL = 'http://localhost:5000/api';


/**
 * Função para buscar os projetos pendentes usando um token de autenticação.
 * @param {string} token - O token JWT obtido no login.
 */
async function fetchApprovedProjects() {
  console.log('--- Passo 2: Buscando projetos aprovados.. ---');
  try {
    // Configuração da requisição, incluindo o cabeçalho de autorização

    const response = await axios.get(`${BASE_URL}/projetos/aprovados`);

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
  await fetchApprovedProjects();
}

// Inicia o fluxo de teste
runTestFlow();