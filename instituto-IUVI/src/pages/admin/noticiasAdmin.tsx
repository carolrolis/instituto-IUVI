import React, { useState, useEffect } from 'react';
import apiClient, { getImageUrl } from '../../api/apiClient';
import AdminLayout from '../../components/admin/AdminLayout';

// --- Componente do Formulário (Modal) ---
interface FormularioNoticiaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
}

const FormularioNoticia: React.FC<FormularioNoticiaProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagem) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('link', link);
    formData.append('imagem', imagem);

    onSubmit(formData);
    setTitulo('');
    setDescricao('');
    setLink('');
    setImagem(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Cadastrar Nova Notícia</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-600">Título</label>
            <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-600" required />
          </div>
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-600">Descrição</label>
            <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-600" required />
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-600">Link</label>
            <input type="url" id="link" placeholder="https://exemplo.com" value={link} onChange={(e) => setLink(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-gray-600" required />
          </div>
          <div>
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-600">Imagem</label>
            <input type="file" id="imagem" accept="image/*" onChange={(e) => setImagem(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" required />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Notícia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Interface para a Notícia
interface Noticia {
  _id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  dataCriacao: string;
  link: string;
}

const NoticiasAdminPage = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNoticias = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Noticia[]>('/noticias');
      setNoticias(response.data);
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
      setError("Não foi possível carregar as notícias.");
      setNoticias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Você tem certeza que deseja excluir ${selectedIds.length} item(s)?`)) {
      try {
        await Promise.all(selectedIds.map(id => apiClient.delete(`/admin/noticias/${id}`)));
        setSelectedIds([]);
        fetchNoticias();
      } catch (err) {
        console.error("Erro ao deletar notícias:", err);
        alert("Ocorreu um erro ao excluir as notícias.");
      }
    }
  };

  const handleCreateNoticia = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/admin/noticias', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsFormOpen(false);
      fetchNoticias();
    } catch (err) {
      console.error("Erro ao criar notícia:", err);
      alert("Ocorreu um erro ao cadastrar a notícia.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <>
      <AdminLayout title="Notícias e Eventos">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-gray-700">Todas as notícias e eventos</h2>
          <button onClick={() => setIsFormOpen(true)} className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm">
            Cadastre uma notícia/evento
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          {/* ADICIONADO 'table-fixed' AQUI */}
          <table className="min-w-full text-sm align-top table-fixed">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 w-8 font-semibold text-gray-600"></th>
                <th className="p-3 font-semibold text-gray-600">Título</th>
                <th className="p-3 font-semibold text-gray-600">Descrição</th>
                <th className="p-3 font-semibold text-gray-600">Link</th>
                <th className="p-3 font-semibold text-gray-600">Data</th>
                <th className="p-3 font-semibold text-gray-600">Imagem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={6} className="text-center p-4 text-gray-500">Carregando...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="text-center p-4 text-red-500">{error}</td></tr>
              ) : (
                noticias.map(noticia => (
                  <tr key={noticia._id} className={`hover:bg-gray-50 ${selectedIds.includes(noticia._id) ? 'bg-purple-50' : ''}`}>
                    <td className="p-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" checked={selectedIds.includes(noticia._id)} onChange={() => handleSelect(noticia._id)} />
                    </td>
                    <td className="p-3 font-medium text-gray-800 break-words">{noticia.titulo}</td>
                    {/* ADICIONADO 'break-words' AQUI */}
                    <td className="p-3 text-gray-600 max-w-md break-words">{noticia.descricao}</td>
                    <td className="p-3">
                      <a href={noticia.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline truncate block max-w-xs" title={noticia.link}>
                        {noticia.link}
                      </a>
                    </td>
                    <td className="p-3 text-gray-600 whitespace-nowrap">{formatDate(noticia.dataCriacao)}</td>
                    <td className="p-3">
                      <a href={getImageUrl(noticia.imagemUrl)} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        Ver Imagem
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedIds.length > 0 && (
          <div className="mt-4 flex gap-2">
            <span className="text-sm text-gray-700 self-center pr-4">{selectedIds.length} selecionado(s)</span>
            <button onClick={handleDelete} className="border border-red-500 text-red-500 py-1 px-3 rounded-md text-xs hover:bg-red-50">
              Excluir
            </button>
          </div>
        )}
      </AdminLayout>

      <FormularioNoticia 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateNoticia}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default NoticiasAdminPage;