import competenciasCard1 from "../../assets/images/home/home-competencias/competenciasCard1.svg";
import competenciasCard2 from "../../assets/images/home/home-competencias/competenciasCard2.svg";
import competenciasCard3 from "../../assets/images/home/home-competencias/competenciasCard3.svg";
import competenciasCard4 from "../../assets/images/home/home-competencias/competenciasCard4.svg";
import competenciasCard5 from "../../assets/images/home/home-competencias/competenciasCard5.svg";
import competenciasCard6 from "../../assets/images/home/home-competencias/competenciasCard6.svg";
import ScrollReveal from "../../components/scrollReveal";

interface CompetenciaData {
  img: string;
  alt: string;
  title: string;
}

const competenciasData: CompetenciaData[] = [
  {
    img: competenciasCard1,
    alt: "Design",
    title: "UI/UX Design",
  },
  {
    img: competenciasCard2,
    alt: "Clique",
    title: "Elementos Interativos",
  },
  {
    img: competenciasCard3,
    alt: "Aparelho de som",
    title: "Design de Som",
  },
  {
    img: competenciasCard4,
    alt: "Personalização",
    title: "Acessibilidade",
  },
  {
    img: competenciasCard5,
    alt: "Xadrez",
    title: "Jogos",
  },
  {
    img: competenciasCard6,
    alt: "Computador",
    title: "Desenvolvimento",
  },
];

const CompetenciaCard = ({ img, alt, title }: CompetenciaData) => (
  <div className="p-5 flex flex-col items-center gap-2 rounded-2xl hover:scale-110 transform duration-300">
    <img
      src={img}
      alt={alt}
      className="mb-5 w-15 h-15 md:w-30 md:h-30 xl:w-50 xl:h-50 hover:scale-110 transform duration-300"
    />
    <h1 className="text-lg md:text-2xl lg:text-3xl text-center font-semibold">
      {title}
    </h1>
  </div>
);

const HomeCompetencias = () => {
  return (
    <section
      id="home-competencias"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full overflow-hidden"
    >
      <div
        id="home-competencias-conteudo"
        className="max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto"
      >
        <ScrollReveal direction="left" delay={0.2}>
          <span id="home-competencias-h1">
            <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
              COMPETÊNCIAS
            </h1>
          </span>
        </ScrollReveal>

        <div
          id="home-competencias-cards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-y-0 md:gap-y-10 mt-15"
        >
          {competenciasData.map((competencia, i) => (
            <ScrollReveal direction="bottom" delay={0.2}>
              <CompetenciaCard key={i} {...competencia} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCompetencias;
