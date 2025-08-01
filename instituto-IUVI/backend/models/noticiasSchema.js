import mongoose from 'mongoose';

const noticiasSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  imagemUrl: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String,
    required: true
  }
});

export default mongoose.model('Noticia', noticiasSchema);