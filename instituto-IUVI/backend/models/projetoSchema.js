import mongoose from 'mongoose';

const projetoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Ensino', 'Pesquisa', 'Extensão']
  },
  coordenador: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imagemUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'aprovado', 'reprovado'],
    default: 'pendente'
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Projeto', projetoSchema);