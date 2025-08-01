import React, { useState, useEffect } from "react";
import Ensino from "./ensino";
import Pesquisa from "./pesquisa";
import Extensao from "./extensao";
import projetosCover from "../../assets/images/projetos/coverImg.png";
import SetaInicio from "../../assets/images/icons/seta-inicio.svg";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Botao from "../../components/button";
import FormularioProjeto from "../../components/formularioProjeto";
// O apiClient já está importado
import apiClient from "../../api/apiClient";
import { AxiosError } from "axios";

// A interface para os dados do projeto (sem alterações)
interface ProjetoData {
  _id: string;
  titulo: string;
  categoria: "Ensino" | "Pesquisa" | "Extensão";
  coordenador: string;
  link: string;
  descricao: string;
  email: string;
  imagemUrl: string;
  status?: "pendente" | "aprovado" | "reprovado";
  dataCriacao?: string;
}

const Projetos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "ensino" | "pesquisa" | "extensão"
  >("ensino");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const tabs = [
    { key: "ensino", label: "Ensino" },
    { key: "pesquisa", label: "Pesquisa" },
    { key: "extensão", label: "Extensão" },
  ];

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- CÓDIGO ALTERADO ---
        // Substituído 'fetch' por 'apiClient.get'.
        // A URL base já está no apiClient, então usamos apenas o endpoint '/projetos/aprovados'.
        // O Axios já converte a resposta para JSON, então acessamos 'response.data'.
        const response = await apiClient.get<ProjetoData[]>(
          "/projetos/aprovados"
        );
        setProjetos(response.data);
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        setError(
          "Não foi possível carregar os projetos. A lista pode estar vazia."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);

  const handleProjectSubmit = async (formData: FormData) => {
    try {
      // --- CÓDIGO ALTERADO ---
      // Substituído 'fetch' por 'apiClient.post'.
      // O Axios trata o envio de FormData automaticamente.
      // Erros de status (4xx, 5xx) são capturados pelo 'catch'.
      await apiClient.post("/projetos", formData);

      alert(
        "Seu projeto foi submetido com sucesso e está aguardando aprovação!"
      );
      closeForm();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error("Erro ao submeter o projeto:", error);

      // Extrai a mensagem de erro específica do backend, se disponível
      const errorMessage =
        error.response?.data?.error ||
        "Falha ao submeter o projeto. Verifique os dados e tente novamente.";
      alert(errorMessage);
    }
  };

  const renderConteudo = () => {
    if (loading) {
      return <div className="text-center py-10">Carregando projetos...</div>;
    }

    const projetosFiltrados = projetos.filter(
      (projeto) => projeto.categoria.toLowerCase() === activeTab
    );

    switch (activeTab) {
      case "ensino":
        return <Ensino projetos={projetosFiltrados} />;
      case "pesquisa":
        return <Pesquisa projetos={projetosFiltrados} />;
      case "extensão":
        return <Extensao projetos={projetosFiltrados} />;
      default:
        return <Ensino projetos={projetosFiltrados} />;
    }
  };

  return (
    <>
      <div id="projetos" className="relative w-full overflow-x-hidden">
        <Header />
        <section id="projetos-inicio" className="relative w-full h-screen">
          <img
            id="projetos-inicio-img"
            src={projetosCover}
            alt="Action figures LCF"
            className="w-full h-full object-cover bg-left"
          />
          <div
            id="projetos-inicio-texto"
            className="absolute bottom-20 lg:bottom-30 xl:bottom-40 max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 pt-15 xl:pt-25 max-h-fit"
          >
            <h1 className="font-grifter text-5xl md:text-8xl xl:text-[178px] w-fit">
              Projetos
            </h1>
            <p className="text-md lg:text-2xl xl:text-3xl w-9/10 mt-5">
              O IUVI originou-se em 1997, a partir de trabalhos de educação à
              distância financiados pelo CNPq, com o intuito de minimizar os
              problemas de aprendizagem dos alunos de regiões marginais urbanas
              do Ensino Básico.
            </p>
          </div>
          <img
            alt="Seção"
            src={SetaInicio}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          />
          <div className="luzRoxa z-20 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-[-15rem] left-[-15rem]" />
          <div className="luzRoxa z-20 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute bottom-[-15rem] right-[-15rem]" />
        </section>

        <section id="servidores-conteudo" className="w-full">
          <div className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30 pt-15 xl:pt-25 flex flex-col md:flex-row justify-between items-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key as "ensino" | "pesquisa" | "extensão")
                }
                className={`z-50 w-fit rounded-3xl text-xl lg:text-2xl xl:text-3xl py-5 px-10 font-bold cursor-pointer transition-all ${
                  activeTab === tab.key ? "bg-roxoClaro" : "bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {renderConteudo()}
        </section>

        <section
          id="projetos-submit"
          className="max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 ml-auto mb-15"
        >
          <h3 className="max-w-6/10 text-lg lg:text-xl xl:text-3xl 2xl:text-4xl pt-10 xl:pt-20 pb-10 text-cinza">
            Gostaria de cadastrar o seu projeto na página do Instituto?
          </h3>
          <Botao h1="Submeta seu projeto" onClick={openForm} />
        </section>
        <Footer />
      </div>

      <FormularioProjeto
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleProjectSubmit}
      />
    </>
  );
};

export default Projetos;
