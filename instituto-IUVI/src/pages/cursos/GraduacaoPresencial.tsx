import React from "react";
import CursoSection from "../../components/cursoSection";

const CursosPresencial: React.FC = () => {
  return (
    <div>
      <CursoSection
        periodo="Diurno"
        titulo="Sistemas e Mídias Digitais"
        subtitulo="Design, Desenvolvimento, Audiovisual e Jogos Digitais"
        semestres={8}
        anos={5}
      />

      <CursoSection
        periodo="Noturno"
        titulo="Sistemas e Mídias Digitais"
        subtitulo="Design, Desenvolvimento, Audiovisual e Jogos Digitais"
        semestres={9}
        anos={5}
      />
    </div>
  );
};

export default CursosPresencial;