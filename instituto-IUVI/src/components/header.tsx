import { useState, useRef, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import menu from "../assets/images/icons/menu.svg";
import menuCross from "../assets/images/icons/cross.svg";
import logo from "../assets/images/logo.svg";

// Definição dos itens de navegação
const NavItems = [
  {
    title: "/Cursos",
    className: "nav-link",
    navigate: "/cursos",
  },
  {
    title: "/Projetos",
    className: "nav-link",
    navigate: "/projetos",
  },
  {
    title: "/Notícias",
    className: "nav-link",
    navigate: "/noticias",
  },
  {
    title: "/Sobre",
    className: "nav-link",
    children: [
      { title: "História", navigate: "/historia" },
      { title: "Laboratórios", navigate: "/laboratorios" },
      { title: "Servidores", navigate: "/servidores" },
    ],
  },
  // {
  //   className: "searchbar",
  // },
];

const Header: React.FC = () => {
  // Hooks de estado e referência
  const [openMenu, setOpenMenu] = useState(false);
  const [openSobre, setOpenSobre] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Função para alternar o menu mobile
  const handleClick = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  // Efeito para detectar o tamanho da tela (mobile/desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  // Função para lidar com o envio da pesquisa
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (searchQuery.trim()) {
      // Navega para a página de resultados de pesquisa com a consulta como parâmetro
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Limpa o campo de pesquisa após o envio
      if(isMobile) setOpenMenu(false); // Fecha o menu mobile após a pesquisa
    }
  };

  return (
    <header className="w-screen max-h-fit z-50 fixed top-0 left-0 bg-pretoTransparente hover:bg-cinzaHeader transform duration-300">
      <nav className="w-full flex items-center justify-between">
        <Link to="/">
          <div id="logo" className="cursor-pointer 2xl:min-w-80">
            <img
              alt="UFC Virtual 15 Anos"
              className="w-40 md:min-w-50 ml-10 md:ml-20 lg:ml-30 py-8"
              src={logo}
            />
          </div>
        </Link>
        <div
          id="mobile-menu"
          ref={menuButtonRef}
          className="mobile-menu-icon hidden mr-5"
          onClick={handleClick}
        >
          <img
            src={openMenu ? menuCross : menu}
            alt="Menu"
            className="w-12 md:w-15"
          />
        </div>
        <ul
          ref={menuRef}
          className={`md:w-9/10 lg:w-8/10 xl:w-7/10 flex items-center justify-between text-2xl 2xl:text-3xl px-10 md:px-20 lg:px-30 ${
            openMenu ? "MobileMenu active" : "MobileMenu"
          }`}
        >
          {NavItems.map((Item) => {
            // Renderiza a barra de pesquisa
            if (Item.className.includes("searchbar")) {
              return (
                <li key="searchbar" className={Item.className}>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      title="Pesquisar"
                      type="text"
                      placeholder="Pesquisar"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="searchbar-input placeholder:text- focus:placeholder:text-roxoClaro 2xl:text-2xl"
                    />
                  </form>
                </li>
              );
            }

            // Renderiza o item de menu com submenu (dropdown)
            if (Item.children) {
              return (
                <li
                  key={Item.title}
                  className={`${Item.className} relative`}
                  onMouseEnter={() => !isMobile && setOpenSobre(true)}
                  onMouseLeave={() => !isMobile && setOpenSobre(false)}
                  onClick={() => isMobile && setOpenSobre((prev) => !prev)}
                >
                  <span className="cursor-pointer flex items-center">
                    {Item.title}
                    <svg
                      className="w-5 h-5 ml-2 inline-block"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  {openSobre && (
                    <ul className="absolute bg-cinzaHeader rounded-lg p-6 space-y-2 z-50">
                      {Item.children.map((child) => (
                        <li key={child.title}>
                          <Link to={child.navigate}>{child.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // Renderiza um item de menu simples
            return (
              <li key={Item.title} className={Item.className}>
                <Link to={Item.navigate!}>{Item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
