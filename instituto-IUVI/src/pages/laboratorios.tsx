import Footer from "../components/footer";
import Header from "../components/header";
import laboratoriosCover from "../assets/images/laboratorios/laboratoriosCover.png";
import celulaMultimidia1 from "../assets/images/laboratorios/celulaMultimidia/img1.png";
import celulaMultimidia2 from "../assets/images/laboratorios/celulaMultimidia/img2.png";
import celulaMultimidia3 from "../assets/images/laboratorios/celulaMultimidia/img3.png";
import lcf1 from "../assets/images/laboratorios/lcf/img1.png";
import lcf2 from "../assets/images/laboratorios/lcf/img2.png";
import lcf3 from "../assets/images/laboratorios/lcf/img3.png";
import lcf4 from "../assets/images/laboratorios/lcf/img4.png";
import lcf5 from "../assets/images/laboratorios/lcf/img5.png";
import labvis1 from "../assets/images/laboratorios/labvis/img1.png";
import labvis2 from "../assets/images/laboratorios/labvis/img2.png";
import labvis3 from "../assets/images/laboratorios/labvis/img3.png";
import labvis4 from "../assets/images/laboratorios/labvis/img4.png";
import tecnodocencia1 from "../assets/images/laboratorios/tecnodocencia/img1.png";
import tecnodocencia2 from "../assets/images/laboratorios/tecnodocencia/img2.png";
import tecnodocencia3 from "../assets/images/laboratorios/tecnodocencia/img3.png";
import tecnodocencia4 from "../assets/images/laboratorios/tecnodocencia/img4.png";
import { useState } from "react";
import ButtonArrow from "../assets/images/icons/button-arrow";
import SetaInicio from "../assets/images/icons/seta-inicio.svg";
import WideSlider from "../components/sliders/wideSlider";

const Laboratorios: React.FC = () => {
  const laboratorios = {
    celulaMultimidia: {
      id: 1,
      nome: "Célula Multimídia",
      descrição:
        "A Célula de Design e Multimídia nasceu em 2012 e está sob a orientação das professoras Ticianne Darin e Georgia Cruz. O grupo tem como objetivo explorar os conceitos, técnicas e procedimentos relacionados ao estudo e desenvolvimento de produtos multimídia, design e avaliação de interfaces e experiência do usuário fundamentados nos conhecimentos da Interação Humano-Computador.",
      link: "https://celulamultimidia.vercel.app/",
      imagens: [celulaMultimidia1, celulaMultimidia2, celulaMultimidia3],
    },
    lcf: {
      id: 2,
      nome: "Laboratório de Computação Física",
      descrição:
        "Pesquisas, serviços, treinamentos e projetos em impressão 3D, sistemas embarcados e educação com tecnologia.",
      link: "https://www.instagram.com/lcf.smd/",
      imagens: [lcf1, lcf2, lcf3, lcf4, lcf5],
    },
    labvis: {
      id: 3,
      nome: "Labvis",
      descrição:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem consequatur voluptatibus vel perferendis",
      link: "https://labvis.virtual.ufc.br/",
      imagens: [labvis1, labvis2, labvis3, labvis4],
    },
    tecnodocencia: {
      id: 4,
      nome: "Tecnodocência",
      descrição:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem consequatur voluptatibus vel perferendis",
      link: "https://tecnodocencia.virtual.ufc.br/",
      imagens: [tecnodocencia1, tecnodocencia2, tecnodocencia3, tecnodocencia4],
    },
  };

  const tabs: { key: keyof typeof laboratorios; label: string }[] = [
    { key: "celulaMultimidia", label: "Célula Multimídia" },
    { key: "lcf", label: "Laboratório de Computação Física" },
    {
      key: "labvis",
      label: "Labvis",
    },
    { key: "tecnodocencia", label: "Tecnodocência" },
  ];

  const [activeTab, setActiveTab] =
    useState<keyof typeof laboratorios>("celulaMultimidia");
  const activeLaboratorio = laboratorios[activeTab];
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % tabs.length;
    const nextTabKey = tabs[nextIndex].key;
    setActiveTab(nextTabKey);
  };

  return (
    <div id="laboratorios">
      <Header />
      <section id="laboratorios-inicio" className="relative w-full h-screen">
        <img
          id="laboratorios-inicio-img"
          src={laboratoriosCover}
          alt="Laboratório"
          className="w-full h-full object-cover bg-left"
        />
        <div
          id="laboratorios-inicio-texto"
          className="absolute bottom-20 lg:bottom-30 xl:bottom-40 max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto max-h-fit"
        >
          <h1 className="font-grifter text-5xl md:text-8xl xl:text-[178px] w-fit ">
            Laboratórios
          </h1>
          <p className="text-md lg:text-2xl xl:text-3xl w-9/10 mt-5">
            O IUVI originou-se em 1997, a partir de trabalhos de educação à
            distância financiados pelo CNPq, com o intuito de minimizar os
            problemas de aprendizagem dos alunos de regiões marginais urbanas do
            Ensino Básico.
          </p>
        </div>
        <img
          alt="Seção"
          src={SetaInicio}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        />
      </section>
      <section
        id="laboratorios-conteudo"
        className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30 py-25 xl:py-40"
      >
        <div id="laboratorios-texto" className="flex flex-col lg:flex-row">
          <div id="laboratorios-titulo" className="flex-3/5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-left font-grifter text-2xl md:text-5xl lg:text-6xl xl:text-8xl ${
                  activeTab === tab.key ? "text-roxoClaro block" : "hidden"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-end flex-2/5">
            <div
              id="laboratorios-handler"
              className="flex items-center gap-4 mb-6"
            >
              <button
                title="Próximo"
                onClick={handleNext}
                className="cursor-pointer"
              >
                <span className="font-grifter text-4xl md:text-7xl flex items-center">
                  {activeIndex + 1}/{tabs.length}{" "}
                  <ButtonArrow className="h-6 md:h-10 lg:h-15" />
                </span>
              </button>
            </div>

            <p
              id="laboratorios-descricao"
              className="mb-4 text-cinza text-lg md:text-2xl xl:text-4xl"
            >
              {activeLaboratorio.descrição}
              <br />
              <br />
              <a
                href={activeLaboratorio.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-roxoClaro underline"
              >
                Mais Informações →
              </a>
            </p>
          </div>
        </div>

        <div id="laboratorios-slider" className="py-10">
          <WideSlider>
            {activeLaboratorio.imagens.map((imagem, index) => (
              <img
                key={`${activeTab}-${index}`}
                src={imagem}
                alt={`Imagem ${index + 1} do ${activeLaboratorio.nome}`}
                className="w-full h-full object-cover rounded-4xl"
              />
            ))}
          </WideSlider>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Laboratorios;
