import React from "react";
import ServidorCard from "../../components/servidorCard";

import semFoto from "../../assets/images/servidores/semFoto.png";
import docente1 from "../../assets/images/servidores/docente1.png";
import docente2 from "../../assets/images/servidores/docente2.png";
import docente3 from "../../assets/images/servidores/docente3.png";
import docente4 from "../../assets/images/servidores/docente4.png";
import docente5 from "../../assets/images/servidores/docente5.png";
import docente6 from "../../assets/images/servidores/docente6.png";
import docente7 from "../../assets/images/servidores/docente7.png";
import docente9 from "../../assets/images/servidores/docente9.png";
import docente10 from "../../assets/images/servidores/docente10.png";
import docente11 from "../../assets/images/servidores/docente11.png";
import docente13 from "../../assets/images/servidores/docente13.png";
import docente14 from "../../assets/images/servidores/docente14.png";
import docente15 from "../../assets/images/servidores/docente15.png";
import docente16 from "../../assets/images/servidores/docente16.png";
import docente17 from "../../assets/images/servidores/docente17.png";
import docente18 from "../../assets/images/servidores/docente18.png";
import docente20 from "../../assets/images/servidores/docente20.png";
import docente21 from "../../assets/images/servidores/docente21.png";
import docente22 from "../../assets/images/servidores/docente22.png";
import docente23 from "../../assets/images/servidores/docente23.png";
import docente24 from "../../assets/images/servidores/docente24.png";
import docente25 from "../../assets/images/servidores/docente25.png";
import docente26 from "../../assets/images/servidores/docente26.png";
import docente27 from "../../assets/images/servidores/docente27.png";
import docente28 from "../../assets/images/servidores/docente28.png";
import docente29 from "../../assets/images/servidores/docente29.png";
import docente30 from "../../assets/images/servidores/docente30.png";
import docente31 from "../../assets/images/servidores/docente31.png";
import docente32 from "../../assets/images/servidores/docente32.png";
import docente33 from "../../assets/images/servidores/docente33.png";
import docente34 from "../../assets/images/servidores/docente34.png";
import docente35 from "../../assets/images/servidores/docente35.png";
import docente36 from "../../assets/images/servidores/docente36.png";
import docente37 from "../../assets/images/servidores/docente37.png";
import docente38 from "../../assets/images/servidores/docente38.png";

const Docentes: React.FC = () => {
  const setores = {
    "Setor de Processos Pedagógicos": [
      {
        id: 1,
        nome: "Carlos Eduardo Brito Novais",
        cargo: "Titulação: Doutor",
        foto: docente1,
        lattesUrl: "http://lattes.cnpq.br/4467706783113621",
      },
      {
        id: 2,
        nome: "Robson Carlos Loureiro",
        cargo: "Titulação: Doutor",
        foto: docente2,
        lattesUrl: "http://lattes.cnpq.br/0813145478267268",
      },
    ],
    "Secretaria Administrativa": [
      {
        id: 1,
        nome: "George Allan Gomes",
        cargo: "Titulação: Doutor",
        foto: docente3,
        lattesUrl: "http://lattes.cnpq.br/5012576140529904",
      },
      {
        id: 2,
        nome: "Clemilson Costa Dos Santos",
        cargo: "Titulação: Doutor",
        foto: docente4,
        lattesUrl: "http://lattes.cnpq.br/9671291450823171",
      },
    ],
    "Setor de Avaliação": [
      {
        id: 1,
        nome: "Leonardo Oliveira Moreira",
        cargo: "Titulação: Doutor",
        foto: docente5,
        lattesUrl: "http://lattes.cnpq.br/2880668102587861",
      },
      {
        id: 2,
        nome: "José Gilvan Rodrigues Maia",
        cargo: "Titulação: Doutor",
        foto: docente6,
        lattesUrl: "http://lattes.cnpq.br/0022110232147076",
      },
    ],
    "Setor de Avaliação do Curso": [
      {
        id: 1,
        nome: "Ticiana Linhares Coelho",
        cargo: "Titulação: Doutora",
        foto: docente7,
        lattesUrl: "http://lattes.cnpq.br/3125027229507836",
      },
      {
        id: 2,
        nome: "Antonio José Melo Leite Junior",
        cargo: "Titulação: Doutor",
        foto: semFoto,
        lattesUrl: "http://lattes.cnpq.br/2610619567290943",
      },
    ],
    "Coordenação Curso de SMD - Diurno": [
      {
        id: 1,
        nome: "Rafael Augusto do Carmo",
        cargo: "Titulação: Doutor",
        foto: docente9,
        lattesUrl: "http://lattes.cnpq.br/3102406452063651",
      },
      {
        id: 2,
        nome: "Mara Franklin Bonates",
        cargo: "Titulação: Doutora",
        foto: docente10,
        lattesUrl: "http://lattes.cnpq.br/6695871479363040",
      },
    ],

    "Coordenação Curso de SMD - Noturno": [
      {
        id: 1,
        nome: "Henrique Barbosa Silva",
        cargo: "Titulação: Doutor",
        foto: docente11,
        lattesUrl: "http://lattes.cnpq.br/9848407021720705",
      },
      {
        id: 2,
        nome: "Alysson Diniz dos Santos",
        cargo: "Titulação: Doutor",
        foto: semFoto,
        lattesUrl: "http://lattes.cnpq.br/8463540065575491",
      },
    ],

    "Corpo Docente": [
      {
        id: 1,
        nome: "Adriano Oliveira",
        cargo: "Titulação: Doutor",
        foto: docente13,
        lattesUrl: "http://lattes.cnpq.br/8343393957854863",
      },
      {
        id: 2,
        nome: "Andrea Pinheiro Paiva",
        cargo: "Titulação: Doutora",
        foto: docente14,
        lattesUrl: "http://lattes.cnpq.br/6013088230083785",
      },

      {
        id: 3,
        nome: "Cátia Luzia Oliveira Da Silva",
        cargo: "Titulação: Doutora",
        foto: docente15,
        lattesUrl: "http://lattes.cnpq.br/2462245257053946",
      },
      {
        id: 4,
        nome: "Carlos Diego Andrade",
        cargo: "Titulação: Doutor",
        foto: docente16,
        lattesUrl: "http://lattes.cnpq.br/5809810239519406",
      },
      {
        id: 5,
        nome: "Luciana de Lima",
        cargo: "Titulação: Doutora",
        foto: docente17,
        lattesUrl: "http://lattes.cnpq.br/2967595851995266",
      },
      {
        id: 6,
        nome: "Edgar Marçal de Barros",
        cargo: "Titulação: Doutor",
        foto: docente18,
        lattesUrl: "http://lattes.cnpq.br/1015882558876646",
      },
      {
        id: 7,
        nome: "Eduardo Santos ",
        cargo: "Titulação: Doutor",
        foto: semFoto,
        lattesUrl: "http://lattes.cnpq.br/7443323966791424",
      },
      {
        id: 8,
        nome: "Fernando Lincoln",
        cargo: "Titulação: Doutor",
        foto: docente20,
        lattesUrl: "http://lattes.cnpq.br/8478923669299994",
      },
      {
        id: 9,
        nome: "Ticianne Darin",
        cargo: "Titulação: Doutora",
        foto: docente21,
        lattesUrl: "http://lattes.cnpq.br/7388836998087457",
      },
      {
        id: 10,
        nome: "Glaudiney Moreira",
        cargo: "Titulação: Mestre",
        foto: docente22,
        lattesUrl: "http://lattes.cnpq.br/7706674770409286",
      },
      {
        id: 11,
        nome: "Inga Freire Saboia",
        cargo: "Titulação: Doutora",
        foto: docente23,
        lattesUrl: "http://lattes.cnpq.br/4277758788188363",
      },
      {
        id: 12,
        nome: "Ismael Furtado",
        cargo: "Titulação: Doutor",
        foto: docente24,
        lattesUrl: "http://lattes.cnpq.br/0552099245346620",
      },
      {
        id: 13,
        nome: "Henrique Sergio Pequeno",
        cargo: "Titulação: Doutor",
        foto: docente25,
        lattesUrl: "http://lattes.cnpq.br/8556816688689358",
      },
      {
        id: 14,
        nome: "Levi Bayde Ribeiro  ",
        cargo: "Titulação: Doutor",
        foto: docente26,
        lattesUrl: "http://lattes.cnpq.br/8312347869060522",
      },
      {
        id: 15,
        nome: "Liandro Roger",
        cargo: "Titulação: Doutor",
        foto: docente27,
        lattesUrl: "http://lattes.cnpq.br/7248407498815333",
      },
      {
        id: 16,
        nome: "José Aires De Castro Filho",
        cargo: "Titulação: Doutor",
        foto: docente28,
        lattesUrl: "http://lattes.cnpq.br/1001172700194924",
      },
      {
        id: 17,
        nome: "Georgia da Cruz Pereira",
        cargo: "Titulação: Doutora",
        foto: docente29,
        lattesUrl: "http://lattes.cnpq.br/7282584890816961",
      },
      {
        id: 18,
        nome: "Maria De Fátima Costa",
        cargo: "Titulação: Doutora",
        foto: docente30,
        lattesUrl: "http://lattes.cnpq.br/8761933941200089",
      },
      {
        id: 19,
        nome: "Francisco Herbert Lima",
        cargo: "Titulação: Doutor",
        foto: docente31,
        lattesUrl: "http://lattes.cnpq.br/0512183585660835",
      },
      {
        id: 20,
        nome: "Marilia Soares Mendes",
        cargo: "Titulação: Doutora",
        foto: docente32,
        lattesUrl: "http://lattes.cnpq.br/3731017260116598",
      },
      {
        id: 21,
        nome: "Neil Armstrong Rezende",
        cargo: "Titulação: Doutor",
        foto: docente33,
        lattesUrl: "http://lattes.cnpq.br/8593302689592847",
      },
      {
        id: 22,
        nome: "Windson Viana De Carvalho",
        cargo: "Titulação: Doutor",
        foto: docente34,
        lattesUrl: "http://lattes.cnpq.br/1744732999336375",
      },
      {
        id: 23,
        nome: "Priscila Barros David",
        cargo: "Titulação: Doutora",
        foto: docente35,
        lattesUrl: "http://lattes.cnpq.br/4580502642241951",
      },
      {
        id: 24,
        nome: "Raquel Santiago Freire",
        cargo: "Titulação: Doutora",
        foto: docente36,
        lattesUrl: "http://lattes.cnpq.br/9322311013034336",
      },
      {
        id: 25,
        nome: "Ricardo Brauner Dos Santos",
        cargo: "Titulação: Doutor",
        foto: docente37,
        lattesUrl: "http://lattes.cnpq.br/3043028707821380",
      },
      {
        id: 26,
        nome: "Wellington Sarmento",
        cargo: "Titulação: Doutor",
        foto: docente38,
        lattesUrl: "http://lattes.cnpq.br/1015561507843037",
      },
    ],
  };

  return (
    <div className="mb-16">
      {Object.entries(setores).map(([nomeSetor, servidores]) => (
        <div key={nomeSetor} className="mb-16">
          <h3 className="font-grifter text-2xl md:text-5xl lg:text-8xl text-center mt-35 mb-15">
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

export default Docentes;
