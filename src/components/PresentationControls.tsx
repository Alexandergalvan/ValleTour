import { useState, useRef, useEffect } from 'react';
import { usePresentationMode } from '../context/PresentationContext';

interface PresentationControlsProps {
  className?: string;
}

const PresentationControls: React.FC<PresentationControlsProps> = ({ className = '' }) => {
  const {
    presentationMode,
    togglePresentationMode,
    presentationInterval,
    setPresentationInterval,
    customRoutes,
    setCustomRoutes,
    hotkey,
    setHotkey,
  } = usePresentationMode();

  const [showSettings, setShowSettings] = useState(false);
  const [isRecordingHotkey, setIsRecordingHotkey] = useState(false);
  const hotkeyButtonRef = useRef<HTMLButtonElement>(null);

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
  ];

  // Efecto para grabar una nueva hotkey
  useEffect(() => {
    if (!isRecordingHotkey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignorar teclas de modificación por sí solas
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(event.key)) {
        return;
      }

      // Guardar la nueva tecla
      setHotkey(event.key);
      setIsRecordingHotkey(false);
      event.preventDefault();
    };

    // Añadir listener mientras se está grabando
    window.addEventListener('keydown', handleKeyDown);

    // Limpiar
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecordingHotkey, setHotkey]);

  // Iniciar grabación de hotkey
  const startRecordingHotkey = () => {
    setIsRecordingHotkey(true);
    // Enfocar el botón para evitar que se pierda el foco y se cancele la grabación
    if (hotkeyButtonRef.current) {
      hotkeyButtonRef.current.focus();
    }
  };

  // Manejar cambios en el intervalo
  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 3 && value <= 30) {
      setPresentationInterval(value);
    }
  };

  // Alternar rutas personalizadas/predeterminadas
  const handleRoutesToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCustomRoutes(null); // Usar rutas predeterminadas
    } else {
      setCustomRoutes(defaultRoutes); // Configurar rutas personalizadas
    }
  };

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

  return (
    <div className={`flex flex-col ${className}`}>
      <button
        onClick={togglePresentationMode}
        className={`px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
          presentationMode
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {presentationMode ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clipRule="evenodd"
              />
            </svg>
            Detener Presentación
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Iniciar Presentación
          </>
        )}
      </button>

      <div className="mt-2 text-center text-xs text-gray-600 dark:text-gray-400">
        Pulsa <kbd className="px-1.5 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-sans font-semibold">{formatKeyDisplay(hotkey)}</kbd> para {presentationMode ? 'detener' : 'activar'}
      </div>

      <button
        onClick={() => setShowSettings(!showSettings)}
        className="mt-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline flex items-center justify-center"
      >
        {showSettings ? 'Ocultar ajustes' : 'Mostrar ajustes'}
      </button>

      {showSettings && (
        <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Intervalo de cambio (segundos)
            </label>
            <input
              type="range"
              min="3"
              max="30"
              value={presentationInterval}
              onChange={handleIntervalChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3s</span>
              <span>{presentationInterval}s</span>
              <span>30s</span>
            </div>
          </div>

          {/* Configuración de tecla rápida */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tecla rápida
            </label>
            <div className="flex items-center gap-2">
              <button
                ref={hotkeyButtonRef}
                onClick={startRecordingHotkey}
                className={`px-3 py-1 rounded border ${
                  isRecordingHotkey
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-700 dark:bg-indigo-900 dark:border-indigo-600 dark:text-indigo-200'
                    : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
                }`}
              >
                {isRecordingHotkey ? 'Presiona una tecla...' : formatKeyDisplay(hotkey)}
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isRecordingHotkey 
                  ? 'Esperando nueva tecla...' 
                  : 'Haz clic para cambiar'}
              </span>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <input
              id="default-routes"
              type="checkbox"
              checked={customRoutes === null}
              onChange={handleRoutesToggle}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="default-routes"
              className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Usar rutas predeterminadas
            </label>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <p>Duración actual: {presentationInterval} segundos por página</p>
            <p>
              Rutas: {customRoutes === null
                ? 'Predeterminadas (Todas las páginas principales)'
                : 'Personalizadas'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentationControls; 