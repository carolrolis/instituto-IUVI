import React from "react";
import CursoSection from "../../components/cursoSection";

const CursosTela: React.FC = () => {
  return (
    <div>
      <CursoSection
        periodo="Mestrado"
        titulo="Programa de Pós-Graduação em Tecnologia Educacional"
        subtitulo="Processos de aprendizagem por meio de recursos tecnológicos"
        semestres={4}
        anos={5}
      />
    </div>
  );
};

export default CursosTela;