import React from "react";
import Header from "../components/header";
import historiaCover from "../assets/images/historia/coverImg.png";
import historiaCard1 from "../assets/images/historia/card1.png";
import historiaCard2 from "../assets/images/historia/card2.png";
import historiaCard3 from "../assets/images/historia/card3.png";
import Footer from "../components/footer";
import SetaInicio from "../assets/images/icons/seta-inicio.svg";
import HistoriaCard from "../components/historiaCard";
import ScrollReveal from "../components/scrollReveal";

const Historia: React.FC = () => {
  const cardsData = [
    {
      ano: 1997,
      titulo: "Início",
      descricao: `O Instituto Universidade Virtual (IUVI) foi criado em 1997 pela Universidade Federal do Ceará (UFC) com o objetivo de ampliar o acesso à educação de qualidade por meio da educação a distância. 

Sua origem está ligada a projetos financiados pelo CNPq, focados em minimizar dificuldades de aprendizagem enfrentadas por estudantes de regiões urbanas marginalizadas no Ensino Básico. 

Desde então, o IUVI tem buscado superar barreiras geográficas e sociais, promovendo a democratização do conhecimento por meio do uso de tecnologias digitais.`,
      imagem: historiaCard1,
    },
    {
      ano: 1998,
      titulo: "Premiações",
      descricao: `O ano de 1998 foi marcado pela realização, em Fortaleza, do IX Simpósio Brasileiro de Informática na Educação (SBIE), o primeiro grande evento nacional da área sediado no Ceará. 

Também foram estabelecidas parcerias estratégicas com instituições como o 
LED/UFSC e o AULANET/PUC-Rio, além de visitas técnicas a centros avançados de EaD ao redor do mundo, como a Open University (Reino Unido), o ITESM (México) e a Memorial University (Canadá). 

Ainda nesse ano, a UFC foi credenciada, juntamente com a UFPA, como uma das duas primeiras universidades brasileiras autorizadas a oferecer cursos a distância no país.`,
      imagem: historiaCard2,
    },
    {
      ano: "2024",
      titulo: "Atualmente",
      descricao: `Atualmente, o IUVI atua como um programa estratégico da UFC para ampliar o alcance do ensino superior e da educação básica por meio de plataformas digitais. 

Oferece cursos, capacitações e materiais educacionais que atendem a diversas regiões do país, com foco especial em áreas remotas e comunidades menos favorecidas. 

O instituto contribui para a aceleração do aprendizado, inclusão digital e expansão do acesso ao conhecimento, promovendo a qualidade e a democratização da educação no Brasil. `,
      imagem: historiaCard3,
    },
  ];

  return (
    <div id="historia" className="relative w-full overflow-x-hidden">
      <Header />
      <section id="historia-inicio" className="relative w-full h-screen">
        <img
          id="historia-inicio-img"
          src={historiaCover}
          alt="Alunos jogando ping-pong"
          className="w-full h-full md:w-full object-cover bg-left"
        />
        <div
          id="historia-inicio-texto"
          className="absolute bottom-20 lg:bottom-30 xl:bottom-40 max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto max-h-fit"
        >
          <h1 className="font-grifter text-5xl md:text-8xl xl:text-[178px] w-fit">
            História
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
        <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-[-15rem] left-[-15rem]" />
        <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute bottom-[-15rem] right-[-15rem]" />
      </section>

      <section
        id="historia-conteudo"
        className="max-w-95/100 px-5 md:px-20 xl:px-30 m-auto py-25 xl:py-40 flex flex-col gap-20"
      >
        {cardsData.map((card, index) => (
          <div key={index} className="flex flex-col gap-20">
            <div className="w-screen relative left-1/2 -translate-x-1/2 px-5 md:px-20 xl:px-30">
              <ScrollReveal
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.2}
                once={false}
              >
                <div className="relative w-full h-1 bg-white xl:mb-15">
                  <div className="w-4/10 md:w-2/10 bg-roxoClaro absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-grifter text-center tracking-widest md:text-3xl py-1">
                    ANO {card.ano}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <HistoriaCard
              titulo={card.titulo}
              descricao={card.descricao}
              imagem={card.imagem}
              textLeft={index % 2 === 0}
            />
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Historia;
