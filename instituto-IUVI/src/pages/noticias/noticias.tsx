import React, { useState, useEffect } from "react";

// Importações de Componentes e Assets
import Header from "../../components/header";
import Footer from "../../components/footer";
import SetaInicio from "../../assets/images/icons/seta-inicio.svg";
import noticiasCover from "../../assets/images/noticias/coverImg.png";
import apiClient, { getImageUrl } from "../../api/apiClient";

// --- Interfaces ---
interface Noticia {
  _id: string;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  dataCriacao: string;
  link: string;
}

// --- Componentes Filhos ---

const DestaqueSlide: React.FC<{ noticia: Noticia }> = ({ noticia }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return { dia: "", mes: "", ano: "" };
    const date = new Date(dateString);
    return {
      dia: date.toLocaleDateString("pt-BR", { day: "2-digit" }),
      mes: date.toLocaleDateString("pt-BR", { month: "long" }),
      ano: date.toLocaleDateString("pt-BR", { year: "numeric" }),
    };
  };
  const { dia, mes, ano } = formatDate(noticia.dataCriacao);

  return (
    // O container principal continua sendo uma coluna flex que ocupa toda a altura
    <div className="w-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col h-full">
      {/* Container do Texto (sem alterações significativas) */}
      <div className="my-10 flex flex-col lg:flex-row items-start gap-x-12 gap-y-8">
        <div className="flex-shrink-0 text-3xl text-cinza">
          <span className="font-semibold text-4xl text-white">Data</span>
          <p className="mt-2 text-4xl font-medium">
            {dia} de {mes} de {ano}
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-4xl leading-tight">
            {noticia.titulo}
          </h3>
          <p className="text-2xl text-cinza leading-relaxed mt-4">
            {noticia.descricao}
          </p>
          <a
            href={noticia.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-purple-400 hover:text-purple-300 font-bold text-2xl"
          >
            Leia mais →
          </a>
        </div>
      </div>

      {/* === A MÁGICA ACONTECE AQUI === */}

      {/* 1. NOVO: Div Espaçador. Ele é flexível (flex-1) e vai ocupar todo o espaço vago. */}
      <div className="flex-1"></div>

      {/* 2. Container da Imagem: Agora não precisa mais do flex-1. */}
      {/* Ele é simplesmente empurrado para o fundo pelo espaçador. */}
      <div className="relative w-full max-h-[45vh] full-bleed">
        {/* 3. Imagem preenche 100% de seu container, sem precisar de mt-auto. */}
        <img
          src={getImageUrl(noticia.imagemUrl)}
          alt={`Imagem da notícia: ${noticia.titulo}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const NoticiaCard: React.FC<{ noticia: Noticia }> = ({ noticia }) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });

  return (
    <a
      href={noticia.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden group h-full flex flex-col"
    >
      <div className="relative w-full h-48">
        <img
          src={getImageUrl(noticia.imagemUrl)}
          alt={noticia.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors flex-grow">
          {noticia.titulo}
        </h3>
        <span className="text-sm text-cinza mt-2">
          {formatDate(noticia.dataCriacao)}
        </span>
      </div>
    </a>
  );
};

// --- Componente Principal da Página ---
const Noticias = () => {
  // --- Estados da Página ---
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"mais-recente" | "mais-antigo">(
    "mais-recente"
  ); // New state for sorting

  // --- Estados do Carrossel de Destaques ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const AUTOPLAY_DELAY = 4000; // Tempo reduzido para 4 segundos

  // --- Derivação de Dados ---
  const destaques = noticias.slice(0, 4);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(noticias.length / itemsPerPage);
  const currentNoticias = noticias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Efeito para carregar os dados ---
  useEffect(() => {
    const fetchNoticiasData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<Noticia[]>("/noticias");
        let sortedData = response.data;
        if (sortOrder === "mais-recente") {
          sortedData = response.data.sort(
            (a, b) =>
              new Date(b.dataCriacao).getTime() -
              new Date(a.dataCriacao).getTime()
          );
        } else {
          sortedData = response.data.sort(
            (a, b) =>
              new Date(a.dataCriacao).getTime() -
              new Date(b.dataCriacao).getTime()
          );
        }
        setNoticias(sortedData);
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        setError(
          "Não foi possível carregar as notícias. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNoticiasData();
  }, [sortOrder]); // Depend on sortOrder to re-fetch/re-sort

  // --- Efeito para o Autoplay do Carrossel (sem pausa) ---
  useEffect(() => {
    if (destaques.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destaques.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [destaques.length]); // Depende apenas do número de destaques

  // --- Handlers da Paginação ---
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div id="noticias" className="relative w-full overflow-x-hidden">
      <style>{`
        .full-bleed {
          width: 100vw;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>

      <Header />

      {/* Seção de Início */}
      <section id="noticias-inicio" className="relative w-full h-screen">
        <img
          id="noticias-inicio-img"
          src={noticiasCover}
          alt="Imagem de notícias"
          className="w-full h-full object-cover bg-left"
        />
        <div
          id="noticias-inicio-texto"
          className="absolute bottom-20 lg:bottom-30 xl:bottom-40 max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto max-h-fit"
        >
          <h1 className="font-grifter text-5xl md:text-8xl xl:text-[178px] w-fit">
            Notícias
          </h1>
          <p className="text-md lg:text-2xl xl:text-3xl w-9/10 mt-5">
            Fique por dentro das últimas novidades, eventos e conquistas do
            Instituto UFC Virtual. Acompanhe as notícias que impactam nossa
            comunidade acadêmica e o cenário educacional.
          </p>
        </div>
        <img
          alt="Seção"
          src={SetaInicio}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        />
      </section>

      {/* Seção de Destaques */}
      <section
        id="noticias-destaques"
        className="w-full relative flex flex-col justify-center py-20"
      >
        <div className="max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 max-h-fit">
          <h2 className="text-left font-grifter text-2xl md:text-5xl lg:text-6xl xl:text-8xl text-roxoClaro">
            Destaques
          </h2>
        </div>

        {loading && (
          <p className="text-center text-xl py-10">Carregando destaques...</p>
        )}
        {error && (
          <p className="text-red-500 text-center text-xl py-10">{error}</p>
        )}
        {!loading && !error && destaques.length === 0 && (
          <p className="text-center text-xl py-10">
            Nenhuma notícia em destaque.
          </p>
        )}

        {!loading && !error && destaques.length > 0 && (
          // Wrapper para o carrossel e as bolinhas, permitindo posicionamento correto
          <div className="w-full relative">
            <div className="relative">
              <div
                className="flex items-stretch transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {destaques.map((noticia) => (
                  <div key={noticia._id} className="w-full flex-shrink-0">
                    {" "}
                    <DestaqueSlide noticia={noticia} />
                  </div>
                ))}
              </div>
            </div>
            {/* Bolinhas de Paginação */}
            <div className="w-full flex justify-center pt-6">
              <div className="flex gap-3">
                {destaques.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentIndex === idx
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Ir para o destaque ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Seção de Últimas Notícias */}
      <section className="w-full pt-10 pb-20 px-8 md:px-16 lg:px-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h2 className="text-5xl md:text-6xl font-grifter text-purple-400">
            Últimas Notícias
          </h2>
          <div className="flex items-center gap-4 mt-6">
            <span className="text-lg">Agrupar por:</span>
            <button
              onClick={() => setSortOrder("mais-recente")}
              className={`px-4 py-2 rounded-full ${
                sortOrder === "mais-recente"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition-colors`}
            >
              Mais Recente
            </button>
            <button
              onClick={() => setSortOrder("mais-antigo")}
              className={`px-4 py-2 rounded-full ${
                sortOrder === "mais-antigo"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition-colors`}
            >
              Mais Antigo
            </button>
            {totalPages > 1 && (
              <div className="flex items-center gap-4 ml-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50 p-2 text-xl hover:text-purple-400 transition-colors"
                >
                  &lt;
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50 p-2 text-xl hover:text-purple-400 transition-colors"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>

        {loading && <p className="text-center">Carregando notícias...</p>}
        {error && (
          <p className="text-red-500 text-center text-xl py-10">{error}</p>
        )}
        {!loading && !error && currentNoticias.length === 0 && (
          <p className="text-center text-xl py-10">
            Nenhuma notícia encontrada com os filtros aplicados.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentNoticias.map((noticia) => (
            <NoticiaCard key={noticia._id} noticia={noticia} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Noticias;