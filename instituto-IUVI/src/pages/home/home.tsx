import Header from "../../components/header";
import HomeInicio from "./home-inicio";
import HomeDestaques from "./home-destaques";
import HomeCursos from "./home-cursos";
import Footer from "../../components/footer";
import HomeCompetencias from "./home-competencias";
import HomeServidores from "./home-servidores";
import HomeProjetos from "./home-projetos";
import HomeNewsletter from "./home-newsletter";
import HomeLaboratorios from "./home-laboratorios";
import HomeParceiros from "./home-parceiros";
import HomeNoticias from "./home-noticias";

const Home: React.FC = () => {
  return (
    <div id="home">
      <main id="main" className="relative w-full bg-preto overflow-x-hidden">
        <Header />
        <div id="home-div-efeito" className="h-[150vh] md:h-[200vh]" />
        <HomeInicio />
        <HomeDestaques />
        <div id="faixas" className="relative z-30 w-full">
          <div className="absolute  z-30 w-full h-12 bg-[#273A78] -rotate-[0.5deg]"></div>
          <div className="absolute top-[89.3%] w-full z-30 h-12 bg-roxoEscuro rotate-[1deg] font-semibold text-xl items-center ">
            <div className="flex justify-between items-center pt-2">
              <p>Inovação</p>
              <p>Acessibilidade</p>
              <p>Modernidade</p>
              <p className="hidden xl:block">Impacto Social</p>
              <p>Desenvolvimento</p>
              <p className="hidden xl:block">Sistemas Interativos</p>
              <p>Experiência</p>
              <p>Educação</p>
            </div>
          </div>
        </div>
        <HomeCursos />
        <HomeProjetos />
        <HomeCompetencias />
        <HomeLaboratorios />
        <HomeParceiros />
        <HomeServidores />
        <HomeNoticias />
        <HomeNewsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
