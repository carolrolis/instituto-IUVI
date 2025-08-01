import React from "react";

// Defina a mesma interface ProjetoData aqui ou importe-a
interface ProjetoData {
  _id: string;
  titulo: string;
  categoria: "Ensino" | "Pesquisa" | "Extensão";
  coordenador: string;
  link: string;
  descricao: string;
  email: string;
  imagemUrl: string;
  status?: "pendente" | "aprovado" | "reprovado";
  dataCriacao?: string;
}

interface ExtensaoProps {
  projetos: ProjetoData[]; // Extensão agora recebe uma lista de projetos
}

const Extensao: React.FC<ExtensaoProps> = ({ projetos }) => {
  if (projetos.length === 0) {
    return (
      <p className="text-center py-10 text-lg">
        Nenhum projeto de Extensão disponível no momento.
      </p>
    );
  }

  return (
    <div id="projetos-extensao-conteudo" className="relative mt-10 xl:mt-15">
      <div className="blur-slider-wide max-w-99/100 lg:max-w-95/100 pl-5 md:pl-20 xl:pl-30 ml-auto">
        <DefaultSlider allowDrag={true} slidesPerView={1.2} showArrows={false}>
          {projetosEnsino.map((projeto) => (
            <div id="projetos-cards" key={projeto.id} className="relative">
              <img
                src={projeto.imagem}
                alt={projeto.titulo}
                className="w-full object-cover aspect-video no-select filter brightness-50 rounded-2xl md:rounded-4xl"
                loading="lazy"
              />
              <div
                className=" absolute bottom-2 md:bottom-4 xl:bottom-8 2xl:bottom-12 left-0 right-0 z-10"
              >
                <div className="px-5 xl:px-10">
                  <h1 className="w-fit font-grifter text-2xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-bold tracking-wider">
                    {projeto.titulo}
                  </h1>
                  <p className="text-md lg:text-xl xl:text-3xl 2xl:text-4xl pt-2 xl:pt-5 hidden sm:block">
                    {projeto.descricao}
                  </p>
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline w-fit text-md lg:text-xl xl:text-3xl 2xl:text-4xl pt-2 xl:pt-5 hover:text-roxoClaro"
                  >
                    Mais informações →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </DefaultSlider>
      </div>
    </div>
  );
};

export default Extensao;
