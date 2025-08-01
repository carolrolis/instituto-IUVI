import labImg from "../../assets/images/home/home-destaques/lab.png";
import lcfImg from "../../assets/images/home/home-destaques/lcf.png";
import Botao from "../../components/button";
import ScrollReveal from "../../components/scrollReveal";

const HomeDestaques = () => {
  return (
    <section
      id="home-destaques"
      className="relative bg-preto py-25 xl:py-40 w-full h-full overflow-hidden"
    >
      <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-80 right-[-15rem]" />

      <div
        id="home-destaques-conteudo"
        className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30"
      >
        <ScrollReveal direction="left" delay={0.2}>
          <span id="home-destaques-h1">
            <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
              MODERNIDADE E DIVERSIDADE
            </h1>
          </span>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.4}>
          <div
            id="home-destaques-cards"
            className="grid grid-cols-1 grid-rows-4 lg:grid-cols-3 lg:grid-rows-1 gap-5 mt-15 max-h-fit w-9/10 m-auto"
          >
            <div
              id="home-destaques-card1"
              className="relative col-span-2 h-full"
            >
              <img
                id="home-destaques-card1-img"
                src={labImg}
                alt="Imagem de laboratório"
                className="h-full w-full"
              />
              <p className="font-poppins absolute bottom-3 text-sm md:text-md xl:text-lg 2xl:text-2xl pb-5 px-6 lg:px-8 2xl:px-20">
                O IUVI originou-se em 1997, a partir de trabalhos de educação à
                distância financiados pelo CNPq, com o intuito de minimizar os
                problemas de aprendizagem de regiões marginais urbanas.
              </p>
            </div>

            <div
              id="home-destaques-card2"
              className="relative row-span-2 col-span-2 lg:col-span-1 max-h-fit max-w-fit"
            >
              <img
                id="home-destaques-card2-img"
                src={lcfImg}
                alt="Imagem de laboratório"
                className="w-full h-full"
              />
              <Botao
                h1="Sobre nós"
                to="/historia"
                className="absolute bottom-5 xl:bottom-10 right-5 md:right-6 lg:right-3 xl:right-5"
              />
            </div>

            <div
              id="home-destaques-card3"
              className="bg-white h-full px-5 py-5 col-span-2 lg:col-span-1 sm:w-7/10 lg:w-full flex flex-col justify-center"
            >
              <h1 className="font-grifter text-6xl md:text-8xl lg:text-5xl xl:text-7xl text-roxoEscuro">
                Nº1
              </h1>
              <h2 className="font-poppins text-roxoEscuro md:text-md xl:text-xl font-bold">
                EM EDUCAÇÃO À DISTÂNCIA NO NORDESTE
              </h2>
            </div>

            <div
              id="home-destaques-card4"
              className="bg-roxoEscuro h-full px-5 py-5 col-span-2 lg:col-span-1 sm:w-7/10 lg:w-full flex flex-col justify-center"
            >
              <h1 className="font-grifter text-6xl md:text-8xl lg:text-5xl xl:text-7xl text-white">
                +2000
              </h1>
              <h2 className="font-poppins md:text-md xl:text-xl font-bold text-white">
                ESTUDANTES PELO BRASIL
              </h2>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HomeDestaques;
