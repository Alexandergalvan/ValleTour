import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  // Estilos para enlaces activos e inactivos
  const activeNavLinkClass = "inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary border-b-2 border-secondary dark:text-secondary-light dark:border-secondary-light";
  const inactiveNavLinkClass = "inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light";

  // Estilos para enlaces activos e inactivos en modo móvil
  const activeMobileNavLinkClass = "block border-l-4 border-secondary py-2 pl-3 pr-4 text-base font-medium text-secondary bg-gray-50 dark:text-secondary-light dark:bg-primary-light dark:border-secondary-light";
  const inactiveMobileNavLinkClass = "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light";

  return (
    <nav className="bg-white shadow-lg dark:bg-primary">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/logo.webp" alt="ValleTour" />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className={isActive('/') ? activeNavLinkClass : inactiveNavLinkClass}
            >
              Inicio
            </Link>
            <Link
              to="/destinos"
              className={isActive('/destinos') ? activeNavLinkClass : inactiveNavLinkClass}
            >
              Destinos
            </Link>
            <Link
              to="/servicios"
              className={isActive('/servicios') ? activeNavLinkClass : inactiveNavLinkClass}
            >
              Servicios
            </Link>
            <Link
              to="/blog"
              className={isActive('/blog') ? activeNavLinkClass : inactiveNavLinkClass}
            >
              Blog
            </Link>
            <Link
              to="/nosotros"
              className={isActive('/nosotros') ? activeNavLinkClass : inactiveNavLinkClass}
            >
              Nosotros
            </Link>
            <Link
              to="/contacto"
              className={isActive('/contacto') ? activeNavLinkClass : inactiveNavLinkClass}
            >
              Contacto
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">

            {isAuthenticated ? (
              // Menú de usuario
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center rounded-full text-sm font-medium text-primary-light focus:outline-none focus:ring-2 focus:ring-secondary dark:text-gray-300"
                >
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
                    </div>
                    <span>{user?.name || user?.email}</span>
                    <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 opacity-5 shadow-lg ring-1 ring-black dark:bg-primary-light">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-sm text-primary-light hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-primary"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/mis-viajes"
                      className="block px-4 py-2 text-sm text-primary-light hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-primary"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mis Viajes
                    </Link>
                    <Link
                      to="/planificador"
                      className="block px-4 py-2 text-sm text-primary-light hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-primary"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Planificar Viaje
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-primary"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Botones de login/registro
              <>
                <Link
                  to="/login"
                  className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${isActive('/login') ? 'bg-secondary-dark text-white' : 'bg-secondary text-white hover:bg-secondary-dark'}`}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${isActive('/registro') ? 'bg-accent-dark text-white' : 'bg-accent text-white hover:bg-accent-dark'}`}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-light hover:bg-gray-100 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary dark:text-gray-300 dark:hover:bg-primary-light"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg
                  className="block size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto' } : { height: 0 }}
        className="overflow-hidden sm:hidden"
      >
        <div className="space-y-1 pb-3 pt-2">
          <Link
            to="/"
            className={isActive('/') ? activeMobileNavLinkClass : inactiveMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/destinos"
            className={isActive('/destinos') ? activeMobileNavLinkClass : inactiveMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Destinos
          </Link>
          <Link
            to="/servicios"
            className={isActive('/servicios') ? activeMobileNavLinkClass : inactiveMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </Link>
          <Link
            to="/blog"
            className={isActive('/blog') ? activeMobileNavLinkClass : inactiveMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/nosotros"
            className={isActive('/nosotros') ? activeMobileNavLinkClass : inactiveMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className={isActive('/contacto') ? activeMobileNavLinkClass : inactiveMobileNavLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </Link>
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4 dark:border-primary-light">
          <div className="space-y-2 px-4">

            {isAuthenticated ? (
              // Menú de usuario móvil
              <div className="space-y-2">
                <div className="flex items-center px-4 py-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-primary-dark dark:text-white">{user?.name || "Usuario"}</div>
                    <div className="text-sm text-primary-light dark:text-gray-300">{user?.email}</div>
                  </div>
                </div>
                <Link
                  to="/perfil"
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary-light hover:bg-gray-100 hover:text-secondary dark:text-gray-300 dark:hover:bg-primary-light"
                  onClick={() => setIsOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  to="/mis-viajes"
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary-light hover:bg-gray-100 hover:text-secondary dark:text-gray-300 dark:hover:bg-primary-light"
                  onClick={() => setIsOpen(false)}
                >
                  Mis Viajes
                </Link>
                <Link
                  to="/planificador"
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary-light hover:bg-gray-100 hover:text-secondary dark:text-gray-300 dark:hover:bg-primary-light"
                  onClick={() => setIsOpen(false)}
                >
                  Planificar Viaje
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-primary-light"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              // Botones de login/registro móvil
              <>
                <Link
                  to="/login"
                  className={`block rounded-md px-3 py-2 text-center text-base font-medium text-white ${isActive('/login') ? 'bg-secondary-dark' : 'bg-secondary hover:bg-secondary-dark'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className={`block rounded-md px-3 py-2 text-center text-base font-medium text-white ${isActive('/registro') ? 'bg-accent-dark' : 'bg-accent hover:bg-accent-dark'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
} 