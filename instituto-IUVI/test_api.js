import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testProjectUpload() {
    try {
        const formData = new FormData();
        
        // Adiciona uma imagem de teste
        const imagePath = path.join(__dirname, 'test-image.jpg');
        formData.append('imagem', fs.createReadStream(imagePath));
        
        // Adiciona os dados do projeto
        formData.append('titulo', 'Projeto Teste Automatizado 5');
        formData.append('categoria', 'Ensino');
        formData.append('coordenador', 'Prof. Teste');
        formData.append('link', 'https://teste.com');
        formData.append('descricao', 'Descrição do projeto de teste automatizado');
        formData.append('email', 'teste@teste.com');

        const response = await axios.post('http://localhost:5000/api/projetos', formData, {
            headers: formData.getHeaders()
        });

        console.log('Sucesso!');
        console.log('Status:', response.status);
        console.log('Dados:', response.data);
    } catch (error) {
        console.error('Erro:');
        console.error('Status:', error.response?.status);
        console.error('Mensagem:', error.response?.data || error.message);
    }
}

testProjectUpload();