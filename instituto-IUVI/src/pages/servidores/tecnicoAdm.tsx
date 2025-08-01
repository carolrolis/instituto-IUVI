import React from "react";
import ServidorCard from "../../components/servidorCard";

import semFoto from "../../assets/images/servidores/semFoto.png";
import tecAdm2 from "../../assets/images/servidores/tecAdm2.png";
import tecAdm4 from "../../assets/images/servidores/tecAdm4.png";
import tecAdm5 from "../../assets/images/servidores/tecAdm5.png";
import tecAdm6 from "../../assets/images/servidores/tecAdm6.png";
import tecAdm7 from "../../assets/images/servidores/tecAdm7.png";
import tecAdm8 from "../../assets/images/servidores/tecAdm8.png";
import tecAdm9 from "../../assets/images/servidores/tecAdm9.png";
import tecAdm10 from "../../assets/images/servidores/tecAdm10.png";
import tecAdm11 from "../../assets/images/servidores/tecAdm11.png";
import tecAdm14 from "../../assets/images/servidores/tecAdm14.png";
import tecAdm15 from "../../assets/images/servidores/tecAdm15.png";
import tecAdm16 from "../../assets/images/servidores/tecAdm16.png";
import tecAdm17 from "../../assets/images/servidores/tecAdm17.png";
import tecAdm18 from "../../assets/images/servidores/tecAdm18.png";
import tecAdm19 from "../../assets/images/servidores/tecAdm19.png";

const TecnicoAdm: React.FC = () => {
  const setores = {
    "Secretaria Geral/Diretoria": [
      {
        id: 1,
        nome: "Jucie Nunes Oliveira",
        cargo: "Secretário Executivo",
        foto: semFoto,
        lattesUrl: "",
      },
    ],
    "Setor de Tecnologias Digitais": [
      {
        id: 1,
        nome: "Paulo de Tarso Pequeno Filho",
        cargo: "Chefe do STD",
        foto: tecAdm2,
        lattesUrl: "http://lattes.cnpq.br/6450076324556052",
      },
      {
        id: 2,
        nome: "Hellanio Ferreira do Costa",
        cargo: "Suplente do STD",
        foto: semFoto,
        lattesUrl: "http://lattes.cnpq.br/1399450905789100",
      },
    ],
    "Tecnologia da Informação": [
      {
        id: 1,
        nome: "Luiz Carlos Tavares",
        cargo: "Técnico de TI",
        foto: tecAdm4,
        lattesUrl: "http://lattes.cnpq.br/3112415471064317",
      },
      {
        id: 2,
        nome: "Wesley Oliveira Silva",
        cargo: "Técnico de TI",
        foto: tecAdm5,
        lattesUrl: "http://lattes.cnpq.br/7741536324107310",
      },
      {
        id: 3,
        nome: "Marcondes Alexandre",
        cargo: "Técnico de TI",
        foto: tecAdm6,
        lattesUrl: "http://lattes.cnpq.br/7469784028342998",
      },
    ],

    "Des. de Software": [
      {
        id: 1,
        nome: "Bianca Stephani Barone",
        cargo: "Chefe do Centro de Desenvolvimento",
        foto: tecAdm7,
        lattesUrl: "http://lattes.cnpq.br/8159233448443240",
      },
    ],

    "Desen. de Conteúdo Multimídia": [
      {
        id: 1,
        nome: "Eduardo Ferreira de Sousa",
        cargo: "Técnico",
        foto: tecAdm8,
        lattesUrl: "http://lattes.cnpq.br/6216110703569917",
      },
      {
        id: 2,
        nome: "Rafaelli Monteiro Santos",
        cargo: "Analista em Assuntos Educacionais",
        foto: tecAdm9,
        lattesUrl: "http://lattes.cnpq.br/5218120201239459",
      },
    ],

    Audiovisual: [
      {
        id: 1,
        nome: "Otacílio Barros",
        cargo: "Técnico em Audiovisual",
        foto: tecAdm10,
        lattesUrl: "http://lattes.cnpq.br/5276391398380215",
      },
      {
        id: 2,
        nome: "Matheus Unfer",
        cargo: "Técnico Multimídia",
        foto: tecAdm11,
        lattesUrl: "http://lattes.cnpq.br/5749228929821736",
      },
      {
        id: 3,
        nome: "Alexandre Almeida",
        cargo: "Técnico em Audiovisual",
        foto: semFoto,
        lattesUrl: "",
      },
      {
        id: 4,
        nome: "Luiz Carlos dos Santos",
        cargo: "Analista em Assuntos Educacionais",
        foto: semFoto,
        lattesUrl: "",
      },
    ],

    "Sistemas e Mídias Digitais - Secretaria Acadêmica": [
      {
        id: 1,
        nome: "Allan George Bezerra",
        cargo: "Assistente em administração",
        foto: tecAdm14,
        lattesUrl: "http://lattes.cnpq.br/9952640513070243",
      },
      {
        id: 2,
        nome: "Monalisa Menezes",
        cargo: "Assistente em administração",
        foto: tecAdm15,
        lattesUrl: "http://lattes.cnpq.br/6251885781353682",
      },
    ],

    "Técnico de TI e Laboratório": [
      {
        id: 1,
        nome: "Emanoel Carvalho Lopes",
        cargo: "Técnico de Laboratório de Informática",
        foto: tecAdm16,
        lattesUrl: "http://lattes.cnpq.br/6844602803726866",
      },
      {
        id: 2,
        nome: "Fernando Silva Pereira",
        cargo: "Técnico de TI",
        foto: tecAdm17,
        lattesUrl: "",
      },
      {
        id: 3,
        nome: "Peterson Alexandre Sousa",
        cargo: "Técnico de Laboratório de Informática",
        foto: tecAdm18,
        lattesUrl: "http://lattes.cnpq.br/7918428245746054",
      },
    ],

    "Programa de Pós-Graduação em Tecnologia Educacional (PPGTE)": [
      {
        id: 1,
        nome: "Dalilia Maranhão",
        cargo: "Assistente em administração",
        foto: tecAdm19,
        lattesUrl: "http://lattes.cnpq.br/4125685022524893",
      },
    ],
  };

  return (
    <div className="mb-16">
      {Object.entries(setores).map(([nomeSetor, servidores]) => (
        <div key={nomeSetor} className="mb-16">
          <h3 className="font-grifter text-3xl md:text-5xl xl:text-8xl text-center mt-35 mb-15">
            {nomeSetor}
          </h3>
          <div className="flex flex-wrap justify-center gap-30 mx-auto">
            {servidores.map((servidor) => (
              <ServidorCard key={servidor.id} servidor={servidor} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TecnicoAdm;
