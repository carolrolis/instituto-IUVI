// controllers/noticiasController.js
import Noticia from '../models/noticiasSchema.js'; // Import the new Noticia model

// GET - Get all news (no authentication)
export const getNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.find().sort({ dataCriacao: -1 });
    res.status(200).json(noticias);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({ error: 'Erro ao buscar notícias.' });
  }
};

// POST - Create a new news item (authentication required)
export const criarNoticia = async (req, res) => {
  try {
    const { titulo, descricao, link } = req.body;
    const file = req.file; // Assuming multer handles image upload

    if (!titulo || !descricao || !link || !file) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: título, descrição, link e imagem.' });
    }

    // Save the local image path
    const imagemUrl = `/uploads/${file.filename}`;

    const novaNoticia = new Noticia({
      titulo,
      descricao,
      imagemUrl,
      link,
      dataCriacao: new Date(),
    });

    await novaNoticia.save();

    res.status(201).json({
      message: 'Notícia criada com sucesso!',
      noticiaId: novaNoticia._id,
      imagemUrl,
    });
  } catch (error) {
    console.error('Erro ao criar notícia:', error);
    res.status(500).json({ error: 'Erro ao criar notícia.' });
  }
};

// DELETE - Delete a news item (authentication required)
export const deletarNoticia = async (req, res) => {
  try {
    const { id } = req.params; // Get the news ID from the URL parameters

    const noticiaDeletada = await Noticia.findByIdAndDelete(id);

    if (!noticiaDeletada) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }

    res.status(200).json({ message: 'Notícia excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar notícia:', error);
    res.status(500).json({ error: 'Erro ao deletar notícia.' });
  }
};