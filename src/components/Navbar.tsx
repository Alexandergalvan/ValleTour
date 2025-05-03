import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Destinos', href: '/destinos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Blog', href: '/blog' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="ValleTour" />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
            >
              Inicio
            </Link>
            <Link
              to="/destinos"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
            >
              Destinos
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
            >
              Servicios
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
            >
              Blog
            </Link>
            <Link
              to="/nosotros"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
            >
              Nosotros
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
            >
              Contacto
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/login"
              className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-dark"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark"
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
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/destinos"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light"
            onClick={() => setIsOpen(false)}
          >
            Destinos
          </Link>
          <Link
            to="/servicios"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light"
            onClick={() => setIsOpen(false)}
          >
            Servicios
          </Link>
          <Link
            to="/blog"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/nosotros"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light"
            onClick={() => setIsOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary-light hover:border-secondary hover:bg-gray-50 hover:text-secondary dark:text-gray-300 dark:hover:border-secondary-light dark:hover:bg-primary-light dark:hover:text-secondary-light"
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </Link>
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4 dark:border-primary-light">
          <div className="space-y-2 px-4">
            <Link
              to="/login"
              className="block rounded-md bg-secondary px-3 py-2 text-center text-base font-medium text-white hover:bg-secondary-dark"
              onClick={() => setIsOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="block rounded-md bg-accent px-3 py-2 text-center text-base font-medium text-white hover:bg-accent-dark"
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