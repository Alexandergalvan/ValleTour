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

// Diferentes animaciones para la transición
const animations = [
  // Fade
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  // Slide
  {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  // Zoom
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  },
  // Rotate and Fade
  {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
  },
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

// Número de secciones en las que dividimos la página
const SECTIONS_PER_PAGE = 4;

const PresentationMode: React.FC<PresentationModeProps> = ({
  enabled,
  interval = 8, // 8 segundos por defecto
  routes = defaultRoutes,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [animationIndex, setAnimationIndex] = useState(0);
  const [showKeyHint, setShowKeyHint] = useState(true);
  const { hotkey } = usePresentationMode();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [totalSections, setTotalSections] = useState(SECTIONS_PER_PAGE);
  const [progress, setProgress] = useState(0);
  
  // Referencias para temporizadores y visualización
  const sectionTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  
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
      if (sectionTimerRef.current) {
        clearTimeout(sectionTimerRef.current);
        sectionTimerRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [location.pathname, enabled]);

  // Efecto principal para la inicialización al cambiar de página
  useEffect(() => {
    if (!enabled) return;
    
    // Limpiar temporizadores existentes
    if (sectionTimerRef.current) {
      clearTimeout(sectionTimerRef.current);
      sectionTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // Actualizar el índice de la página actual
    const currentRouteIndex = routes.indexOf(location.pathname);
    if (currentRouteIndex !== -1) {
      setCurrentPage(currentRouteIndex);
    }
    
    // Resetear la posición de scroll y la sección actual
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCurrentSection(0);
    
    // Iniciar la secuencia de presentación
    initializePresentation();
    
  }, [enabled, location.pathname, routes]);

  // Función para inicializar la presentación
  const initializePresentation = () => {
    // Obtener dimensiones del documento
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    
    const viewportHeight = window.innerHeight;
    
    // Calcular número de secciones
    const estimatedSections = Math.max(Math.ceil(documentHeight / viewportHeight), 1);
    const actualSections = Math.min(Math.max(estimatedSections, 1), SECTIONS_PER_PAGE);
    setTotalSections(actualSections);
    
    // Calcular tiempo por sección
    const timePerSection = interval * 1000 / actualSections;
    
    // Iniciar temporizador para la primera sección 
    // (que es la sección 0, ya establecida en el useEffect)
    scheduleNextSection(timePerSection, actualSections, documentHeight, viewportHeight);
    
    // Iniciar actualización de progreso
    startProgressUpdates(timePerSection, actualSections);
  };
  
  // Programar la transición a la siguiente sección
  const scheduleNextSection = (
    timePerSection: number, 
    totalSections: number, 
    documentHeight: number,
    viewportHeight: number
  ) => {
    sectionTimerRef.current = window.setTimeout(() => {
      setCurrentSection(prevSection => {
        const nextSection = prevSection + 1;
        
        // Si es la última sección, navegar a la siguiente página
        if (nextSection >= totalSections) {
          // Limpiar los temporizadores
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          
          // Navegar a la siguiente página
          navigateToNextPage();
          return prevSection; // Mantener el valor actual
        }
        
        // Calcular y aplicar la nueva posición de scroll
        const sectionHeight = documentHeight / totalSections;
        const targetPosition = Math.floor(nextSection * sectionHeight);
        
        // Hacer scroll a la posición
        window.scrollTo({ 
          top: targetPosition, 
          behavior: 'smooth' 
        });
        
        // Programar la siguiente sección
        scheduleNextSection(timePerSection, totalSections, documentHeight, viewportHeight);
        
        // Devolver la nueva sección actual
        return nextSection;
      });
    }, timePerSection);
  };
  
  // Iniciar actualización de la barra de progreso
  const startProgressUpdates = (timePerSection: number, totalSections: number) => {
    const startTime = Date.now();
    
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const sectionProgress = (elapsed % timePerSection) / timePerSection * 100;
      
      // Calcular el progreso total como combinación de sección actual + progreso dentro de la sección
      const sectionContribution = (currentSection / totalSections) * 100;
      const currentSectionContribution = sectionProgress / totalSections;
      
      setProgress(Math.min(sectionContribution + currentSectionContribution, 100));
    }, 50); // Actualizar cada 50ms para animación fluida
  };

  // Navegar a la siguiente página
  const navigateToNextPage = () => {
    const currentIndex = routes.indexOf(location.pathname);
    const nextIndex = (currentIndex + 1) % routes.length;
    
    // Cambiar la animación aleatoriamente
    setAnimationIndex(Math.floor(Math.random() * animations.length));
    
    // Navegar a la siguiente página
    navigate(routes[nextIndex]);
  };

  // Si el modo presentación no está habilitado, no renderizar nada
  if (!enabled) return null;

  const currentAnimation = animations[animationIndex];
  const totalPages = routes.length;
  const pageIndicator = `${currentPage + 1} / ${totalPages}`;
  
  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      ref={windowRef}
    >
      <AnimatePresence mode="wait">
        {enabled && (
          <motion.div
            key={location.pathname}
            initial={currentAnimation.initial}
            animate={currentAnimation.animate}
            exit={currentAnimation.exit}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-black/5"
          >
            {/* Indicador visual de modo presentación */}
            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1 z-50">
              <span>Modo Presentación</span>
              <span className="inline-block ml-1 size-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>
            
            {/* Indicador de página y sección */}
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-50 flex items-center gap-2">
              <span>{pageIndicator}</span>
              <span className="h-3 w-[1px] bg-gray-400"></span>
              <span>Sección {currentSection + 1}/{totalSections}</span>
            </div>
            
            {/* Indicadores de sección */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
              {Array.from({ length: totalSections }).map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSection 
                      ? 'bg-white scale-125' 
                      : index < currentSection 
                        ? 'bg-white/60' 
                        : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Información de tecla para salir */}
            {showKeyHint && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-2 rounded-lg text-sm shadow-lg flex items-center gap-2 z-50">
                <span>Presiona</span>
                <kbd className="px-1.5 py-0.5 bg-white/20 border border-white/30 rounded font-mono text-xs">{formatKeyDisplay(hotkey)}</kbd>
                <span>para salir</span>
              </div>
            )}
            
            {/* Barra de progreso general */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 z-50">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PresentationMode; 