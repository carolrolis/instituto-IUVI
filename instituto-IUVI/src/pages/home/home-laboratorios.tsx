import slider1 from "../../assets/images/home/home-laboratorios/slider1.png";
import slider2 from "../../assets/images/home/home-laboratorios/slider2.png";
import slider3 from "../../assets/images/home/home-laboratorios/slider3.png";
import slider4 from "../../assets/images/home/home-laboratorios/slider4.png";
import slider5 from "../../assets/images/home/home-laboratorios/slider5.png";
import ScrollReveal from "../../components/scrollReveal";
import WideSlider from "../../components/sliders/wideSlider";

const HomeLaboratorios = () => {
  const laboratorios = [
    {
      id: 1,
      imagem: slider1,
      nome: "Laboratório de Computação Física",
      descricao:
        "Pesquisas, serviços, treinamentos e projetos em impressão 3D, sistemas embarcados e educação com tecnologia.",
    },
    {
      id: 2,
      imagem: slider2,
      nome: "Labvis - Laboratório da Visualidade e da Visualização",
      descricao: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      imagem: slider3,
      nome: "Célula Multimídia",
      descricao: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      imagem: slider4,
      nome: "Tecnodocência",
      descricao: "Lorem ipsum dolor sit amet",
    },
    {
      id: 5,
      imagem: slider5,
      nome: "Laboratório de Microscopia Eletrônica",
      descricao: "Lorem ipsum dolor sit amet",
    },
  ];

  return (
    <section
      id="home-laboratorios"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full overflow-hidden"
    >
      <ScrollReveal direction="left" delay={0.2}>
        <div
          id="home-laboratorios-h1"
          className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30"
        >
          <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
            LABORATÓRIOS
          </h1>
        </div>
      </ScrollReveal>
      <ScrollReveal direction="bottom" delay={0.2}>
        <div
          id="home-laboratorios-conteudo"
          className="w-screen bg-cover bg-center bg-no-repeat mt-15 flex flex-col items-center gap-10"
        >
          <WideSlider allowDrag={false}>
            {laboratorios.map((laboratorio) => (
              <div
                id="home-laboratorios-cards"
                key={laboratorio.id}
                className="relative"
              >
                <img
                  src={laboratorio.imagem}
                  alt={laboratorio.nome}
                  className="w-full object-cover no-select"
                  loading="lazy"
                />
                <div
                  id="home-laboratorios-texto"
                  className="max-w-8/10 absolute bottom-5 md:bottom-10 xl:bottom-15 2xl:bottom-25 left-0 right-0 z-10"
                >
                  <div className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30">
                    <h1 className="text-2xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-bold">
                      {laboratorio.nome}
                    </h1>
                    <p className="max-w-8/10 text-md lg:text-xl xl:text-3xl 2xl:text-4xl pt-2 xl:pt-5 hidden sm:block">
                      {laboratorio.descricao}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </WideSlider>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HomeLaboratorios;
