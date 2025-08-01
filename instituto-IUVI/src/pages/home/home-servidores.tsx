import servidoresCard1 from "../../assets/images/servidores/diretoria1.png";
import servidoresCard2 from "../../assets/images/servidores/diretoria2.png";
import Botao from "../../components/button";
import ScrollReveal from "../../components/scrollReveal";
import ServidorCard from "../../components/servidorCard";

const HomeServidores = () => {
  const servidores = [
    {
      id: 1,
      nome: "Gabriel Antoine Louis Paillard",
      cargo: "Diretor do IUVI",
      foto: servidoresCard1,
      lattesUrl: "#",
    },
    {
      id: 2,
      nome: "Ernesto Trajano de Lima Neto",
      cargo: "Vice-Diretor/Coord. Programas Acadêmicos",
      foto: servidoresCard2,
      lattesUrl: "#",
    },
  ];

  return (
    <section
      id="home-servidores"
      className="relative bg-preto pb-25 xl:pb-40 mt-[-2px] w-full overflow-hidden"
    >
      <div className="luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute top-110 right-[-15rem]" />
      <div
        id="home-servidores-conteudo"
        className="max-w-99/100 lg:max-w-95/100 px-5 md:px-20 xl:px-30 m-auto"
      >
        <ScrollReveal direction="left" delay={0.2}>
          <span id="home-servidores-h1">
            <h1 className="font-grifter text-roxoClaro text-4xl md:text-7xl xl:text-[130px] text-left">
              SERVIDORES
            </h1>
          </span>
        </ScrollReveal>

        <ScrollReveal direction="bottom" delay={0.2}>
          <div
            id="home-servidores-cards"
            className="flex flex-wrap justify-center gap-[150px] my-15"
          >
            {servidores.map((servidor) => (
              <ServidorCard servidor={servidor} />
            ))}
          </div>
        </ScrollReveal>

        <Botao
          h1="Ver todos os servidores"
          to="/servidores"
          className="m-auto"
        />
      </div>
    </section>
  );
};

export default HomeServidores;
