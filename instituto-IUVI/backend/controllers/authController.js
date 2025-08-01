// controllers/authController.js

import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'; // Garante que as variáveis de ambiente (.env) sejam carregadas

const SECRET = process.env.JWT_SECRET;

// (Opcional, mas recomendado) Uma função para registrar o admin com senha hasheada
export const registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    
    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: passwordHash });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registrado com sucesso!' });
};


// SUA FUNÇÃO DE LOGIN CORRIGIDA
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Encontre o admin pelo username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 2. Compare a senha enviada com o hash salvo no banco
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 3. Se as credenciais estiverem corretas, GERE O TOKEN JWT
    const payload = {
      adminId: admin._id,
      username: admin.username
    };

    const token = jwt.sign(
      payload,
      SECRET,
      { expiresIn: '8h' } // Token válido por 8 horas
    );

    // 4. Retorne o token para o cliente
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token: token // O front-end precisa receber e salvar isso!
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno.' });
  }
};