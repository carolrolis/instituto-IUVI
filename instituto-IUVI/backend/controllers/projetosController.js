import Projeto from '../models/projetoSchema.js';
import Admin from '../models/Admin.js';

export const criarProjeto = async (req, res) => {
  try {
    const { titulo, categoria, coordenador, link, descricao, email } = req.body;
    const file = req.file;

    if (!titulo || !categoria || !coordenador || !link || !descricao || !email || !file) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Salva o caminho da imagem local
    const imagemUrl = `/uploads/${file.filename}`;

    const novoProjeto = new Projeto({
      titulo,
      categoria,
      coordenador,
      link,
      descricao,
      email,
      imagemUrl,
      status: 'pendente',
      dataCriacao: new Date()
    });

    await novoProjeto.save();

    res.status(201).json({
      message: 'Projeto cadastrado com sucesso!',
      projetoId: novoProjeto._id,
      imagemUrl
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ error: 'Erro ao criar projeto.' });
  }
};

export const getProjetosAprovados = async (req, res) => {
  try {
    const projetos = await Projeto.find({ status: 'aprovado' }).sort({ dataCriacao: -1 });
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projetos aprovados.' });
  }
};

export const getProjetosPendentes = async (req, res) => {
  try {
    const projetos = await Projeto.find({ status: 'pendente' }).sort({ dataCriacao: -1 });
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar projetos pendentes.' });
  }
};

export const deletarProjeto = async (req, res) => {
  try {
    const { id } = req.params; // Assume que o ID do projeto será passado como um parâmetro na URL

    const projetoDeletado = await Projeto.findByIdAndDelete(id);

    if (!projetoDeletado) {
      return res.status(404).json({ error: 'Projeto não encontrado.' });
    }

    res.status(200).json({ message: 'Projeto excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ error: 'Erro ao deletar projeto.' });
  }
};

export const atualizarStatusProjeto = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'aprovado' ou 'reprovado'

    if (!['aprovado', 'reprovado', 'pendente'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido.' });
    }

    await Projeto.findByIdAndUpdate(id, { status });

    res.status(200).json({ message: 'Status do projeto atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status do projeto.' });
  }
};

