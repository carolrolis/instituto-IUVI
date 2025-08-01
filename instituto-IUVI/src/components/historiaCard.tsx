import ScrollReveal from "./scrollReveal";

interface HistoriaCardProps {
  titulo: string;
  descricao: string;
  imagem: string;
  textLeft?: boolean;
}

const HistoriaCard: React.FC<HistoriaCardProps> = ({
  titulo,
  descricao,
  imagem,
  textLeft = true,
}) => {
  return (
    <ScrollReveal direction="bottom" delay={0.2}>
      <div
        id="historia-card"
        className={`flex flex-col-reverse ${
          textLeft ? "xl:flex-row" : "xl:flex-row-reverse"
        } gap-10 justify-center items-center xl:items-start`}
      >
        <div
          className={`luzRoxa z-30 w-100 h-100 md:w-140 md:h-140 2xl:w-180 2xl:h-180 absolute ${
            textLeft ? "left-[-15rem]" : "right-[-15rem]"
          }`}
        />
        <div
          id="historia-card-texto"
          className="relative flex flex-col items-center xl:max-w-45/100"
        >
          <h1
            id="historia-card-titulo"
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap -top-12 text-2xl md:text-4xl font-bold text-roxoClaro mb-12"
          >
            {titulo}
          </h1>
          <p
            id="historia-card-descricao"
            className="text-md md:text-2xl text-left whitespace-pre-wrap"
          >
            {descricao}
          </p>
        </div>
        <img
          src={imagem}
          alt=""
          className="historia-card-img max-h-fit pb-10 aspect-square object-cover xl:aspect-[3/4]"
        />
      </div>
    </ScrollReveal>
  );
};

export default HistoriaCard;
