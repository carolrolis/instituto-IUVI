import { useState, useRef, useEffect, FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import menu from "../assets/images/icons/menu.svg";
import menuCross from "../assets/images/icons/cross.svg";
import logo from "../assets/images/logo.svg";

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
  //   className: "searchbar",
  // },
];

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSobre, setOpenSobre] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (searchQuery.trim()) {
      // Navega para a página de resultados de pesquisa com a consulta como parâmetro
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Limpa o campo de pesquisa após o envio
      if (isMobile) setOpenMenu(false); // Fecha o menu mobile após a pesquisa
    }
  };

  return (
    <header className="w-screen max-h-fit z-1000 fixed top-0 left-0 bg-pretoTransparente hover:bg-cinzaHeader transform duration-300">
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

            if (Item.children) {
              const isSobreMenuActive = Item.children.some(
                (child) => child.navigate === location.pathname
              );

              return (
                <li
                  key={Item.title}
                  className={`${Item.className} relative`}
                  onMouseEnter={() => !isMobile && setOpenSobre(true)}
                  onMouseLeave={() => !isMobile && setOpenSobre(false)}
                  onClick={() => isMobile && setOpenSobre((prev) => !prev)}
                >
                  <span
                    className={`cursor-pointer flex items-center ${
                      isSobreMenuActive ? "text-roxoClaro font-bold" : ""
                    }`}
                  >
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
                          <NavLink
                            to={child.navigate}
                            className={({ isActive }) =>
                              isActive ? "text-roxoClaro font-bold" : ""
                            }
                          >
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={Item.title} className={Item.className}>
                <NavLink
                  to={Item.navigate!}
                  className={({ isActive }) =>
                    isActive ? "text-roxoClaro font-bold" : ""
                  }
                >
                  {Item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;