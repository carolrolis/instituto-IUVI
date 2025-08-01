import slider1 from "../../assets/images/home/home-noticias/noticia1.png";
import ScrollReveal from "../../components/scrollReveal";
import LoopSlider from "../../components/sliders/loopSlider";

const HomeNoticias = () => {
  const noticias = [
    {
      id: 1,
      imagem: slider1,
      titulo: "Resultado da Reabertura de matrícula 2025.2",
      descricao:
        "A Secretaria Acadêmica dos Cursos de Graduação a distância divulgou o resultado das solicitações de Reabertura de Matrícula para o semestre 2025.2. ",
    },
    {
      id: 2,
      imagem: slider1,
      titulo: "Resultado da Reabertura de matrícula 2025.2",
      descricao:
        "A Secretaria Acadêmica dos Cursos de Graduação a distância divulgou o resultado das solicitações de Reabertura de Matrícula para o semestre 2025.2. ",
    },
    {
      id: 3,
      imagem: slider1,
      titulo: "Resultado da Reabertura de matrícula 2025.2",
      descricao:
        "A Secretaria Acadêmica dos Cursos de Graduação a distância divulgou o resultado das solicitações de Reabertura de Matrícula para o semestre 2025.2. ",
    },
    {
      id: 4,
      imagem: slider1,
      titulo: "Resultado da Reabertura de matrícula 2025.2",
      descricao:
        "A Secretaria Acadêmica dos Cursos de Graduação a distância divulgou o resultado das solicitações de Reabertura de Matrícula para o semestre 2025.2. ",
    },
    {
      id: 5,
      imagem: slider1,
      titulo: "Resultado da Reabertura de matrícula 2025.2",
      descricao:
        "A Secretaria Acadêmica dos Cursos de Graduação a distância divulgou o resultado das solicitações de Reabertura de Matrícula para o semestre 2025.2. ",
    },
  ];

  return (
    <section
      id="home-noticias"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full overflow-hidden"
    >
      <ScrollReveal direction="left" delay={0.2}>
        <div
          id="home-noticias-h1"
          className="max-w-99/100 lg:max-w-95/100 m-auto px-5 md:px-20 xl:px-30"
        >
          <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
            NOTÍCIAS E EVENTOS
          </h1>
        </div>
      </ScrollReveal>
      <ScrollReveal direction="bottom" delay={0.2}>
        <div
          id="home-noticias-conteudo"
          className="w-full bg-cover bg-center bg-no-repeat mt-15 pb-25 flex flex-col items-center"
        >
          <LoopSlider>
            {noticias.map((noticia) => (
              <div
                id="home-noticias-cards"
                key={noticia.id}
                className="relative bg-cinzaEscuro w-full flex flex-start justify-between rounded-lg md:rounded-3xl"
              >
                <div id="home-noticias-texto" className="max-w-55/100 my-5 md:my-10 ml-5 md:ml-10 2xl:ml-20">
                  <h1 className="text-md md:text-xl lg:text-3xl xl:text-5xl 2xl:text-7xl">
                    {noticia.titulo}
                  </h1>
                  <p className="text-md lg:text-xl xl:text-2xl 2xl:text-4xl pt-2 xl:pt-5 hidden sm:block">
                    {noticia.descricao}
                  </p>
                </div>
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="max-w-4/10 md:max-w-5/10 md:max-h-5/10 object-cover no-select mx-5 my-5 md:m-10 md:ml-10 2xl:mr-20 rounded-lg md:rounded-2xl"
                  loading="lazy"
                />
              </div>
            ))}
          </LoopSlider>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HomeNoticias;
