import React from "react";
import Botao from "./button";

interface Servidor {
  id: number;
  nome: string;
  cargo: string;
  foto: string;
  lattesUrl: string;
}

interface ServidorCardProps {
  servidor: Servidor;
}

const ServidorCard: React.FC<ServidorCardProps> = ({ servidor }) => {
  return (
    <div className="flex flex-col h-full text-branco w-full max-w-[260px] md:max-w-[320px] items-center">
      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4">
        <img
          src={servidor.foto}
          alt={servidor.nome}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow w-full text-left">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2 h-[84px] overflow-hidden">
          {servidor.nome}
        </h1>
        <p className="text-lg md:text-2xl mb-4 font-normal h-[64px] overflow-hidden">
          {servidor.cargo}
        </p>
      </div>

      <Botao
        h1="Lattes"
        href={servidor.lattesUrl}
        cinza
        className="w-full mt-auto"
      />
    </div>
  );
};

export default ServidorCard;
