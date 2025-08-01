import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import AdminLayout from '../../components/admin/AdminLayout';
import FormularioProjeto from '../../components/formularioProjeto';
import { getImageUrl } from '../../api/apiClient';

// Interface atualizada para espelhar o schema do Mongoose
interface Projeto {
  _id: string;
  titulo: string;
  categoria: 'Ensino' | 'Pesquisa' | 'Extensão';
  coordenador: string;
  link: string;
  descricao: string;
  email: string;
  imagemUrl: string;
  status: 'pendente' | 'aprovado' | 'reprovado';
  dataCriacao: string; // Usar string para a data que vem da API
}

const ProjetosAdminPage = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [activeTab, setActiveTab] = useState<'pendentes' | 'aprovados'>('pendentes');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Estado para controlar a visibilidade do formulário
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 3. Funções para abrir e fechar o formulário
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const fetchProjetos = async () => {
    setLoading(true);
    const endpoint = activeTab === 'pendentes' ? '/admin/projetos/pendentes' : '/projetos/aprovados';
    try {
      const response = await apiClient.get<Projeto[]>(endpoint);
      setProjetos(response.data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setProjetos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjetos();
    setSelectedIds([]);
  }, [activeTab]);

  // 4. Função para lidar com a submissão do formulário
  const handleProjectSubmit = async (formData: FormData) => {
    try {
      // Usando apiClient para consistência com o restante da página
      await apiClient.post('/projetos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Projeto cadastrado com sucesso e está aguardando aprovação!');
      closeForm(); // Fecha o modal
      fetchProjetos(); // Atualiza a lista de projetos na página!

    } catch (error: any) {
      console.error("Erro ao cadastrar projeto:", error);
      const errorMessage = error.response?.data?.error || "Falha ao cadastrar projeto.";
      alert(errorMessage);
    }
  };


  const handleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
  };

  const handleApprove = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map(id =>
        apiClient.put(`/admin/projetos/${id}/status`, { status: 'aprovado' })
      ));
      fetchProjetos(); // Recarrega a lista para refletir as mudanças
      setSelectedIds([]);
    } catch (error) {
      console.error("Erro ao aprovar projetos:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Tem certeza que deseja excluir ${selectedIds.length} projeto(s)?`)) {
      return;
    }
    try {
      await Promise.all(selectedIds.map(id => apiClient.delete(`/admin/projetos/${id}`)));
      fetchProjetos(); // Recarrega a lista para refletir as mudanças
      setSelectedIds([]);
    } catch (error) {
      console.error("Erro ao excluir projetos:", error);
    }
  };

  return (
    <AdminLayout title="Gerenciar Projetos">
      <div className="flex justify-between items-center mb-4">
        <div className="border-b">
          <button onClick={() => setActiveTab('pendentes')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'pendentes' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
            Projetos Pendentes
          </button>
          <button onClick={() => setActiveTab('aprovados')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'aprovados' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>
            Todos os Projetos
          </button>
        </div>
        {/* 5. Adicionando o onClick ao botão para abrir o formulário */}
        <button 
          onClick={openForm} 
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Cadastrar Novo Projeto
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm align-top">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 w-8 text-left font-semibold text-gray-600"></th>
              <th className="p-3 text-left font-semibold text-gray-600">Título</th>
              <th className="p-3 text-left font-semibold text-gray-600">Coordenador</th>
              <th className="p-3 text-left font-semibold text-gray-600">Categoria</th>
              <th className="p-3 text-left font-semibold text-gray-600">Status</th>
              <th className="p-3 text-left font-semibold text-gray-600">Data Criação</th>
              <th className="p-3 text-left font-semibold text-gray-600">Imagem</th>
              <th className="p-3 text-left font-semibold text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={8} className="text-center p-4 text-gray-600">Carregando...</td></tr>
            ) : projetos.length === 0 ? (
               <tr><td colSpan={8} className="text-center p-4 text-gray-600">Nenhum projeto encontrado.</td></tr>
            ) : (
              projetos.map(proj => (
                <tr key={proj._id} className={`${selectedIds.includes(proj._id) ? 'bg-purple-50' : 'hover:bg-gray-50'}`}>
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={selectedIds.includes(proj._id)} 
                      onChange={() => handleSelect(proj._id)} 
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">{proj.titulo}</td>
                  <td className="p-3 text-gray-600">{proj.coordenador}</td>
                  <td className="p-3 text-gray-600">{proj.categoria}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${proj.status === 'aprovado' ? 'bg-green-100 text-green-800' : proj.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(proj.dataCriacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-3">
                    <a href={getImageUrl(proj.imagemUrl)} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                      Ver Imagem
                    </a>
                  </td>
                  <td className="p-3 text-gray-600">{proj.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {selectedIds.length > 0 && (
        <div className="mt-4 flex gap-2">
          <span className="text-sm text-gray-700 self-center pr-4">{selectedIds.length} selecionado(s)</span>
          <button onClick={handleDelete} className="border border-red-500 text-red-500 py-1 px-3 rounded-md text-xs hover:bg-red-50">Excluir</button>
          {activeTab === 'pendentes' && (
            <button onClick={handleApprove} className="border border-green-500 text-green-600 py-1 px-3 rounded-md text-xs hover:bg-green-50">Aprovar</button>
          )}
        </div>
      )}

      {/* 6. Renderizando o formulário e passando as props de controle */}
      <FormularioProjeto
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleProjectSubmit}
      />
    </AdminLayout>
  );
};

export default ProjetosAdminPage;