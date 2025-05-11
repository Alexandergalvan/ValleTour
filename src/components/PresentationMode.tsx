import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePresentationMode } from '../context/PresentationContext';

interface PresentationModeProps {
  enabled: boolean;
  interval?: number; // tiempo en segundos entre cambios de página
  routes?: string[]; // rutas a recorrer
}

const defaultRoutes = [
  '/',             // Home
  '/destinos',     // Destinations
  '/destinos/monte-alban',
  '/destinos/hierve-el-agua',
  '/destinos/mitla',
  '/destinos/centro-historico',
  '/destinos/pueblos-mancomunados',
  '/destinos/bahias-huatulco',
  '/servicios',    // Services
  '/blog',         // Blog
  '/nosotros',     // About
  '/contacto',     // Contact
];

// Formatear la tecla para mostrarla
const formatKeyDisplay = (key: string) => {
  const specialKeys: Record<string, string> = {
    ' ': 'Espacio',
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'Enter': '↵',
    'Escape': 'Esc',
    'Tab': '⇥',
  };

  return specialKeys[key] || key.toUpperCase();
};

// Tiempo de espera para la animación de transición (en ms)
const TRANSITION_DELAY = 800;

const PresentationMode: React.FC<PresentationModeProps> = ({
  enabled,
  interval = 8, // 8 segundos por defecto
  routes = defaultRoutes,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showKeyHint, setShowKeyHint] = useState(true);
  const { hotkey } = usePresentationMode();
  const [currentPage, setCurrentPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Referencias para temporizadores
  const scrollTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  // Ocultar la pista de tecla después de 5 segundos
  useEffect(() => {
    if (enabled && showKeyHint) {
      const timer = setTimeout(() => {
        setShowKeyHint(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [enabled, showKeyHint]);

  // Efecto para limpiar los temporizadores cuando cambia la ruta o se desactiva
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, [location.pathname, enabled]);

  // Efecto principal para la inicialización al cambiar de página
  useEffect(() => {
    if (!enabled) return;

    // Limpiar temporizadores existentes
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    // Actualizar el índice de la página actual
    const currentRouteIndex = routes.indexOf(location.pathname);
    if (currentRouteIndex !== -1) {
      setCurrentPage(currentRouteIndex);
    }

    // Resetear la posición de scroll
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Marcar que estamos en transición
    setIsTransitioning(true);

    // Esperar a que termine la animación de transición
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      // Iniciar la secuencia de presentación después de la transición
      initializePresentation();
    }, TRANSITION_DELAY);

  }, [enabled, location.pathname, routes]);

  // Función para inicializar la presentación
  const initializePresentation = () => {
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    const viewportHeight = window.innerHeight;
    const scrollDistance = documentHeight - viewportHeight;

    // Iniciar el scroll suave
    startSmoothScroll(scrollDistance, interval * 1000);

    // Iniciar actualización de progreso
    startProgressUpdates(interval * 1000);
  };

  // Iniciar scroll suave
  const startSmoothScroll = (scrollDistance: number, duration: number) => {
    const startTime = Date.now();
    const startPosition = window.scrollY;

    const scrollStep = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= duration) {
        // Cuando termina el tiempo, navegar a la siguiente página
        navigateToNextPage();
        return;
      }

      // Calcular la nueva posición de scroll
      const progress = elapsed / duration;
      const newPosition = startPosition + (scrollDistance * progress);

      // Aplicar el scroll
      window.scrollTo(0, newPosition);

      // Programar el siguiente paso
      scrollTimerRef.current = window.requestAnimationFrame(scrollStep);
    };

    // Iniciar el scroll
    scrollTimerRef.current = window.requestAnimationFrame(scrollStep);
  };

  // Iniciar actualización de la barra de progreso
  const startProgressUpdates = (duration: number) => {
    const startTime = Date.now();

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = (elapsed / duration) * 100;
      setProgress(Math.min(currentProgress, 100));
    }, 50); // Actualizar cada 50ms para animación fluida
  };

  // Navegar a la siguiente página
  const navigateToNextPage = () => {
    const currentIndex = routes.indexOf(location.pathname);
    const nextIndex = (currentIndex + 1) % routes.length;

    // Navegar a la siguiente página
    navigate(routes[nextIndex]);
  };

  // Si el modo presentación no está habilitado, no renderizar nada
  if (!enabled) return null;

  const totalPages = routes.length;
  const pageIndicator = `${currentPage + 1} / ${totalPages}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Barra de progreso */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-blue-500 dark:bg-blue-400"
          initial={{ width: 0 }}
          animate={{ width: isTransitioning ? 0 : `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {pageIndicator}
          </span>
        </div>

        {/* Indicador de tecla de acceso rápido */}
        <AnimatePresence>
          {showKeyHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Presiona <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{formatKeyDisplay(hotkey)}</kbd> para salir
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PresentationMode; 