import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };
  
  // Classes para os links da NavLink (melhora a reutilização)
  const linkClass = "block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-100";
  const activeLinkClass = "bg-purple-200 text-purple-800 font-semibold";

  return (
    <aside className="w-64 bg-white p-5 shadow-lg flex-col hidden md:flex">
      <div className="text-2xl font-bold text-purple-700 mb-10">
        Monalisa <span className="text-sm font-normal">Admin</span>
      </div>
      <nav className="flex-grow">
        <p className="text-gray-500 text-sm font-bold uppercase mb-3">Dashboards</p>
        <NavLink 
          to="/admin/projetos" 
          className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} text-gray-600`}
        >
          Projetos
        </NavLink>
        <NavLink 
          to="/admin/noticias" 
          className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} text-gray-600`}
        >
          Notícias/Eventos
        </NavLink>
      </nav>
      <div>
        <button onClick={handleLogout} className="w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-red-100 text-red-600">
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;