import { useState } from "react";
import SetaInicio from "../../assets/images/icons/seta-inicio.svg";
import Header from "../../components/header";
import Footer from "../../components/footer";

import GraduacaoPresencial from "./GraduacaoPresencial";
import GraduacaoDistancia from "./GraduacaoDistancia";
import PosGraduacao from "./PosGraduacao";

import cursosCover from "../../assets/images/cursos/formados.jpg";

const Cursos = () => {
  const [activeTab, setActiveTab] = useState("presencial");

  const tabs = [
    { key: "presencial", label: "Graduação Presencial" },
    { key: "distancia", label: "Graduação à Distância" },
    { key: "pos", label: "Pós-Graduação" },
  ];

  const renderConteudo = () => {
    switch (activeTab) {
      case "presencial":
        return <GraduacaoPresencial />; // ← Maiúscula
      case "distancia":
        return <GraduacaoDistancia />; // ← Maiúscula
      case "pos":
        return <PosGraduacao />; // ← Maiúscula
      default:
        return <GraduacaoPresencial />; // ← Evita loop infinito
    }
  };

  return (
    <div id="cursos" className="relative w-full overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section id="cursos-inicio" className="relative w-full h-screen">
        <img
          id="cursos-inicio-img"
          src={cursosCover}
          alt="Formandos"
          className="w-full h-full md:w-full object-cover bg-left brightness-50"
        />
        <div
          id="cursos-inicio-texto"
          className="absolute bottom-20 lg:bottom-30 xl:bottom-40 max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 pt-15 xl:pt-25 max-h-fit"
        >
          <h1 className="font-grifter text-5xl md:text-8xl xl:text-[178px] w-fit">
            Cursos
          </h1>
          <p className="text-md lg:text-2xl xl:text-3xl w-9/10 mt-5">
            Os cursos do Instituto UFC Virtual contam com grades curriculares
            ideais e inovadoras para a formação de alunos cada vez mais
            capacitados ao mercado de trabalho em uma instituição de renome como
            a Universidade Federal do Ceará
          </p>
        </div>
        <img
          alt="Seção"
          src={SetaInicio}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        />
      </section>

      {/* Tabs e Conteúdo */}
      <section id="cursos-conteudo" className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30 py-15 xl:py-25">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {tabs.map((tab) => (
            <div key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`w-fit rounded-3xl text-xl lg:text-2xl xl:text-3xl py-5 px-10 font-bold cursor-pointer transition-all ${
                  activeTab === tab.key ? "bg-roxoClaro" : "bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            </div>
          ))}
        </div>

        {renderConteudo()}
      </section>
      <Footer />
    </div>
  );
};

export default Cursos;