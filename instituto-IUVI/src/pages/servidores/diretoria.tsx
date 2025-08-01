import ServidorCard from "../../components/servidorCard";
import Diretoria1 from "../../assets/images/servidores/diretoria1.png";
import Diretoria2 from "../../assets/images/servidores/diretoria2.png";

const Diretoria = () => {
  const servidores = [
    {
      id: 1,
      nome: "Gabriel Antoine Louis Paillard",
      cargo: "Diretor do IUVI",
      foto: Diretoria1,
      lattesUrl: "#",
    },
    {
      id: 2,
      nome: "Ernesto Trajano de Lima Neto",
      cargo: "Vice-Diretor/Coord. Programas Acadêmicos",
      foto: Diretoria2,
      lattesUrl: "#",
    },
  ];

  return (
    <>
      <div className="mx-auto text-center mt-35 mb-15">
        <h2 className="font-grifter text-3xl md:text-5xl xl:text-8xl text-center mt-35 mb-15">Diretoria IUVI</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-30 mb-16">
        {servidores.map((servidor) => (
          <ServidorCard key={servidor.id} servidor={servidor} />
        ))}
      </div>
    </>
  );
};

export default Diretoria;
