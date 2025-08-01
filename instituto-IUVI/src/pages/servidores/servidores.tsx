import { useState } from "react";
import servidoresCover from "../../assets/images/servidores/coverImg.png";
import Diretoria from "./diretoria";
import TecnicoAdm from "./tecnicoAdm";
import Docentes from "./docentes";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SetaInicio from "../../assets/images/icons/seta-inicio.svg";

const Servidores = () => {
  const [activeTab, setActiveTab] = useState("diretoria");

  const tabs = [
    { key: "diretoria", label: "Diretoria" },
    { key: "tecnicoAdm", label: "Servidores Técnico-Adm." },
    { key: "docentes", label: "Docentes" },
  ];

  const renderConteudo = () => {
    switch (activeTab) {
      case "diretoria":
        return <Diretoria />;
      case "tecnicoAdm":
        return <TecnicoAdm />;
      case "docentes":
        return <Docentes />;
      default:
        return <Diretoria />;
    }
  };

  return (
    <div id="servidores" className="relative w-full overflow-hidden">
      <Header />

      <section id="servidores-inicio" className="relative w-full h-screen">
        <img
          id="servidores-inicio-img"
          src={servidoresCover}
          alt="Professor apontando para um quadro"

          className="w-full h-full object-cover bg-left"

        />
        <div
          id="servidores-inicio-texto"
          className="absolute bottom-20 lg:bottom-30 xl:bottom-40 max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto max-h-fit"
        >
          <h1 className="font-grifter text-5xl md:text-8xl xl:text-[178px] w-fit">
            Servidores
          </h1>
          <p className="text-md lg:text-2xl xl:text-3xl w-9/10 mt-5">
            Reunindo profissionais das áreas administrativa, técnica, pedagógica
            e tecnológica, a equipe do IUVI atua de forma integrada para
            garantir o funcionamento, a inovação e a expansão das ações do
            Instituto.
          </p>
        </div>
        <img
          alt="Seção"
          src={SetaInicio}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        />
      </section>

      {/* Tabs e Conteúdo */}
      <section
        id="servidores-conteudo"
        className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30 py-15 xl:py-25"
      >
        <ul className="flex flex-col md:flex-row justify-between items-center">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`w-fit rounded-3xl text-xl lg:text-2xl xl:text-3xl py-5 px-10 font-bold cursor-pointer transition-all ${
                  activeTab === tab.key ? "bg-roxoClaro" : "bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {renderConteudo()}
      </section>
      <Footer />
    </div>
  );
};

export default Servidores;
