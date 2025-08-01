import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import FirstLoading from "./pages/firstLoading";
import AlwaysTop from "./components/alwaysTop";
import BackToTopArrow from "./components/backToTop";
import Noticias from "./pages/noticias/noticias";

// --- Páginas Públicas ---
const Home = lazy(() => import("./pages/home/home"));
const Projetos = lazy(() => import("./pages/projetos/projetos"));
const Servidor = lazy(() => import("./pages/servidores/servidores"));
const Historia = lazy(() => import("./pages/historia"));
const Laboratorios = lazy(() => import("./pages/laboratorios"));
const Cursos = lazy(() => import("./pages/cursos/Cursos"));

// --- Páginas e Componentes do Admin ---
const LoginPage = lazy(() => import('./pages/admin/login'));
const ProjetosAdminPage = lazy(() => import('./pages/admin/projetosAdmin'));
const NoticiasAdminPage = lazy(() => import('./pages/admin/noticiasAdmin'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

// --- COMPONENTE DE LAYOUT PARA O SITE PÚBLICO ---
// Este componente agora encapsula toda a lógica de loading e animação
// apenas para as páginas públicas.
const PublicSiteLayout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFirstLoading, setShowFirstLoading] = useState(true);

  useEffect(() => {
    const hasLoadedOnce = sessionStorage.getItem('hasLoadedOnce');
    if (hasLoadedOnce) {
      setShowFirstLoading(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
    sessionStorage.setItem('hasLoadedOnce', 'true');
    setShowFirstLoading(false);
  };

  // Mostra a tela de loading apenas na primeira visita
  if (showFirstLoading) {
    return <FirstLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div
      className={`min-h-screen transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <BackToTopArrow />
      <AlwaysTop />
      {/* O <Outlet> renderiza a página pública correspondente (Home, Projetos, etc.) */}
      <Outlet />
    </div>
  );
};


// --- COMPONENTE APP PRINCIPAL ---
// Agora ele apenas define a estrutura de rotas.
export default function App() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">Carregando...</div>}>
      <Routes>
        {/* ROTAS DE ADMIN: Renderizadas diretamente, sem o layout público */}
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin/projetos"
          element={
            <ProtectedRoute>
              <ProjetosAdminPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/noticias"
          element={
            <ProtectedRoute>
              <NoticiasAdminPage />
            </ProtectedRoute>
          }
        />  

        {/* ROTAS PÚBLICAS: Agrupadas sob o PublicSiteLayout */}
        {/* Todas as rotas filhas serão renderizadas dentro do <Outlet> do layout */}
        <Route element={<PublicSiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/servidores" element={<Servidor />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/laboratorios" element={<Laboratorios />} />
          <Route path="/Cursos" element={<Cursos />} />
          <Route path="/noticias" element={<Noticias/>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
