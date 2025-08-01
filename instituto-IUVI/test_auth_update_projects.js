// test_update.js

import axios from 'axios';

// --- CONFIGURAÇÕES ---
const BASE_URL = 'http://localhost:5000/api';
const credentials = {
  username: 'admin',
  password: 'admin' // Sua senha de admin
};
// --------------------


/**
 * Função para fazer login (reutilizada do script anterior).
 */
async function loginAndGetToken() {
  console.log('--- Passo 1: Autenticando para obter o token...');
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
    const token = response.data.token;
    if (!token) throw new Error('Token não retornado no login.');
    console.log('Autenticação bem-sucedida.\n');
    return token;
  } catch (error) {
    console.error('Falha no login. Verifique as credenciais e se a API está rodando.');
    return null;
  }
}

/**
 * Função para buscar o ID do primeiro projeto pendente encontrado.
 * @param {string} token - O token JWT.
 */
async function getFirstPendingProjectId(token) {
  console.log('--- Passo 2: Buscando um projeto pendente para obter um ID de teste...');
  try {
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    const response = await axios.get(`${BASE_URL}/admin/projetos/pendentes`, config);
    
    const projects = response.data;
    if (!projects || projects.length === 0) {
      console.log('Nenhum projeto pendente encontrado. Crie um novo projeto para poder testar.');
      return null;
    }

    // Pega o ID do primeiro projeto da lista
    const projectId = projects[0]._id;
    console.log(`ID do projeto encontrado para o teste: ${projectId}\n`);
    return projectId;

  } catch (error) {
    console.error('Não foi possível buscar projetos pendentes.');
    return null;
  }
}

/**
 * Função principal para testar a atualização do status do projeto.
 * @param {string} token - O token JWT.
 * @param {string} projectId - O ID do projeto a ser atualizado.
 */
async function testUpdateProjectStatus(token, projectId) {
  console.log(`--- Passo 3: Tentando atualizar o status do projeto [${projectId}]...`);
  
  // Você pode alterar para 'reprovado' para testar o outro caso
  const newStatus = 'aprovado'; 
  
  try {
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    const body = { status: newStatus };

    // A requisição agora é do tipo PUT
    const response = await axios.put(`${BASE_URL}/admin/projetos/${projectId}/status`, body, config);

    console.log('🎉 Sucesso! A API respondeu:');
    console.log('Status da resposta:', response.status);
    console.log('Mensagem:', response.data.message);

  } catch (error) {
    console.error('Falha ao tentar atualizar o status do projeto!');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Dados:', error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
  }
}

/**
 * Função principal que orquestra todo o fluxo.
 */
async function runUpdateTestFlow() {
  const token = await loginAndGetToken();
  if (!token) {
    console.log('Teste interrompido. Não foi possível obter o token.');
    return;
  }

  const projectIdToUpdate = await getFirstPendingProjectId(token);
  if (!projectIdToUpdate) {
    console.log('Teste interrompido. Nenhum ID de projeto pendente foi encontrado.');
    return;
  }

  //await testUpdateProjectStatus(token, projectIdToUpdate);
  await testUpdateProjectStatus(token, "688a2991a5b5e68a01c069cf");
}

// Inicia o fluxo de teste
runUpdateTestFlow();