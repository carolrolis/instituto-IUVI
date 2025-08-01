import Botao from "./button";

interface CursoSectionProps {
  periodo: string;
  titulo: string;
  subtitulo: string;
  semestres: number;
  anos: number;
  semestresLabel?: string;
  anosLabel?: string;
}

const CursoSection: React.FC<CursoSectionProps> = ({
  periodo,
  titulo,
  subtitulo,
  semestres,
  anos,
  semestresLabel = "semestres de duração",
  anosLabel = "formados",
}) => {
  return (
    <section className="w-full mt-10 xl:mt-15">
      <div id="curso-card" className="flex justify-between w-full items-start">
        <h1 className="text-left font-grifter text-2xl md:text-5xl lg:text-6xl xl:text-8xl text-roxoClaro">
          {periodo}
        </h1>
        <div
          id="curso-card-conteudo"
          className="w-5/10 flex flex-col gap-2 md:gap-5 xl:gap-10"
        >
          <h2 className="text-left font-grifter text-xl md:text-4xl lg:text-5xl xl:text-7xl">
            {titulo}
          </h2>
          <p className="text-left text-lg lg:text-3xl xl:text-5xl text-cinza">
            {subtitulo}
          </p>
          <div
            id="curso-card-stats"
            className="flex flex-col md:flex-row justify-between items-start"
          >
            <div
              id="card-semestres"
              className="max-w-9/10 md:max-w-5/10 flex gap-2 items-start"
            >
              <div className="font-grifter text-2xl md:text-5xl lg:text-6xl xl:text-8xl">
                {semestres}
              </div>
              <div className="text-lg md:text-2xl xl:text-4xl">
                {semestresLabel}
              </div>
            </div>
            <div
              id="card-anos"
              className="md:max-w-5/10 flex flex-row sm:flex-col gap-2 sm:gap-0 md:gap-2 items-start"
            >
              <div className="font-grifter text-2xl md:text-5xl lg:text-6xl xl:text-8xl">
                {anos}
              </div>
              <div className="text-lg md:text-2xl xl:text-4xl">{anosLabel}</div>
            </div>
          </div>
          <Botao h1="Mais Informações" className=" max-h-15 md:max-h-20" />
        </div>
      </div>
    </section>
  );
};

export default CursoSection;
