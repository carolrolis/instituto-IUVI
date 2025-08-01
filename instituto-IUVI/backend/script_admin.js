import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js'; // Ajuste o caminho para seu modelo Admin
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI; // Sua string de conexão do .env

const seedAdmin = async () => {
  try {
    // 1. Conectar ao banco de dados
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado para o seed.');

    // 2. Verificar se já existe um admin para não criar duplicatas
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Usuário admin já existe. Nenhum novo usuário foi criado.');
      return; // Interrompe o script se o admin já foi criado
    }

    // 3. Definir as credenciais do primeiro admin
    const username = 'admin';
    const password = 'admin'; // Use uma senha forte aqui

    // 4. Gerar o hash da senha (MUITO IMPORTANTE)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 5. Criar e salvar o novo admin
    const admin = new Admin({
      username: username,
      password: passwordHash,
    });

    await admin.save();
    console.log('Usuário admin criado com sucesso!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password} (anote e guarde em local seguro)`);

  } catch (error) {
    console.error('Erro ao criar o usuário admin:', error);
  } finally {
    // 6. Desconectar do banco de dados
    await mongoose.disconnect();
    console.log('MongoDB desconectado.');
  }
};

// Executar a função
seedAdmin();