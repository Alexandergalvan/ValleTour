import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PresentationControls from './PresentationControls';
import { usePresentationMode } from '../context/PresentationContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPresentationControls, setShowPresentationControls] = useState(false);
  const { presentationMode } = usePresentationMode();
  const location = useLocation();

  // Función para verificar si la ruta actual coincide con el enlace
  const isActive = (path: string) => {
    // Coincidencia exacta para inicio
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    // Para otras rutas, verificamos si comienzan con ese path
    // excepto el inicio ("/") que ya comprobamos
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
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
              <img className="h-8 w-auto" src="/logo.png" alt="ValleTour" />
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
            <div className="relative">
              <button
                onClick={() => setShowPresentationControls(!showPresentationControls)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium flex items-center gap-1 ${
                  presentationMode
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
                  <path d="M8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4z" />
                  <path d="M15 4a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2z" />
                </svg>
                Presentación
              </button>
              
              {showPresentationControls && (
                <div className="absolute right-0 mt-2 w-64 z-50">
                  <PresentationControls className="shadow-lg rounded-md overflow-hidden" />
                </div>
              )}
            </div>
            
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
            <div className="mb-3">
              <PresentationControls />
            </div>
            
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
          </div>
        </div>
      </motion.div>
    </nav>
  );
} 