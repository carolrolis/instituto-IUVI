import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer
      id="website-footer"
      className="relative z-50 w-full bg-roxoEscuro text-white py-15 font-poppins text-md lg:text-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between px-10 md:px-20 lg:px-30 gap-20">
        <div className="flex flex-col gap-5 md:gap-50">
          <div className="">
            <img src={logo} alt="Logo" className="w-30 md:min-w-50" />
          </div>
          <p className="text-3 text-white">
            Site desenvolvido pela equipe
            <br />
            Hi-Fi da disciplina de Projeto Integrado I
          </p>
        </div>

        <div className="flex gap-6 lg:gap-3">
          <div className="flex flex-col gap-9">
            <Link to="/cursos" className="footer-link">
              <a>Cursos</a>
            </Link>
            <Link to="/projetos" className="footer-link">
              <a>Projetos</a>
            </Link>
            <Link to="/noticias" className="footer-link">
              <a>Notícias</a>
            </Link>
            <Link to="/historia" className="footer-link">
              <a>Sobre Nós</a>
            </Link>
            <a href="" className="footer-link">Newsletter</a>
          </div>
          <div className="flex flex-col gap-9">
            <a className="footer-link">Contato</a>
            <Link to="/localizacao" className="footer-link">
              <a>Localização</a>
            </Link>
            <a className="footer-link">Parceiros</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
