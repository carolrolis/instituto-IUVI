import React from "react";
import CursoSection from "../../components/cursoSection";

const CursosDistancia: React.FC = () => {
  return (
    <div className="w-full">
      <CursoSection
        periodo="Híbrido"
        titulo="Administração Pública"
        subtitulo="Bacharelado em Administração Pública"
        semestres={8}
        anos={603}
      />

      <CursoSection
        periodo="Online"
        titulo="Letras: Língua Inglesa"
        subtitulo="Licenciatura em Letras Inglês"
        semestres={10}
        anos={424}
      />

      <CursoSection
        periodo="Online"
        titulo="Letras: Língua Espanhola"
        subtitulo="Licenciatura em Letras Espanhol"
        semestres={10}
        anos={425}
      />

      <CursoSection
        periodo="Híbrido"
        titulo="Física"
        subtitulo="Licenciatura plena em Física à Distância"
        semestres={10}
        anos={154}
      />

      <CursoSection
        periodo="Híbrido"
        titulo="Matemática"
        subtitulo="Licenciatura plena em Matemática à Distância"
        semestres={8}
        anos={566}
      />

      <CursoSection
        periodo="Online"
        titulo="Pedagogia"
        subtitulo="Licenciatura em Pedagogia"
        semestres={8}
        anos={293}
      />

      <CursoSection
        periodo="Online"
        titulo="Letras: Língua Portuguesa"
        subtitulo="Licenciatura em Letras Português"
        semestres={9}
        anos={1158}
      />

      <CursoSection
        periodo="Online"
        titulo="Química"
        subtitulo="Licenciatura Plena em Química à Distância"
        semestres={10}
        anos={1158}
      />
    </div>
  );
};

export default CursosDistancia;