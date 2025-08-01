import slider1 from "../../assets/images/home/home-projetos/slider1.png";
import slider2 from "../../assets/images/home/home-projetos/slider2.png";
import slider3 from "../../assets/images/home/home-projetos/slider3.png";
import Botao from "../../components/button";
import ScrollReveal from "../../components/scrollReveal";
import DefaultSlider from "../../components/sliders/defaultSlider";

const HomeProjetos = () => {
  const imagens = [
    {
      id: 1,
      src: slider1,
      alt: "Projeto 1",
    },
    {
      id: 2,
      src: slider2,
      alt: "Projeto 2",
    },
    {
      id: 3,
      src: slider3,
      alt: "Projeto 3",
    },
  ];

  return (
    <section
      id="home-projetos"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full h-full overflow-hidden"
    >
      <div
        id="home-projetos-conteudo"
        className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30"
      >
        <ScrollReveal direction="left" delay={0.2}>
          <span id="home-projetos-h1">
            <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
              NOSSOS PROJETOS
            </h1>
          </span>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.4}>
          <div className="flex flex-col-reverse lg:flex-row gap-4 mt-15 w-full">
            <div className="flex flex-col justify-between">
              <div id="home-projetos-texto">
                <h2 className="text-4xl mb-4 font-semibold">
                  O alcance do Instituto para além da Universidade
                </h2>
                <p className="hidden md:block text-2xl mb-6 w-8/10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
                  quam risus. Duis ac scelerisque nulla. Aenean congue molestie
                  nibh consectetur laoreet. Maecenas malesuada orci ex.
                </p>
              </div>

              <Botao h1="Conheça nossos trabalhos" to="/projetos" />
            </div>

            <div className="relative w-90/100 lg:max-w-5/10 2xl:max-w-4/10">
              <div className="w-full h-full blur-slider">
                <DefaultSlider allowDrag={true} oneAtATime={false}>
                  {imagens.map((imagem) => (
                    <img
                      key={imagem.id}
                      src={imagem.src}
                      alt={imagem.alt}
                      className="no-select rounded-3xl"
                      loading="lazy"
                    />
                  ))}
                </DefaultSlider>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HomeProjetos;
