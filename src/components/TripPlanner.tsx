import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import TripPDF from '../components/TripPDF';
import { motion, AnimatePresence } from 'framer-motion';

// Constante con la URL base del servidor - usar la variable de entorno o un valor por defecto
const SERVER_URL = process.env.REACT_APP_API_URL || 'https://valletour-api.onrender.com';

interface Step {
  id: number;
  title: string;
}

interface TripPreferences {
  duration: number;
  startDate: string;
  budget: string;
  interests: string[];
  travelStyle: string;
  accommodation: string;
  transportation: string;
  groupSize: number;
  mealPreferences: string[];
  activities: string[];
  accessibility: string[];
  languages: string[];
}

const steps: Step[] = [
  { id: 1, title: "Duración y Fecha" },
  { id: 2, title: "Presupuesto" },
  { id: 3, title: "Intereses" },
  { id: 4, title: "Estilo de Viaje" },
  { id: 5, title: "Alojamiento" },
  { id: 6, title: "Transporte" },
  { id: 7, title: "Tamaño del Grupo" },
  { id: 8, title: "Preferencias Alimentarias" },
  { id: 9, title: "Actividades" },
  { id: 10, title: "Accesibilidad" },
  { id: 11, title: "Idiomas" },
  { id: 12, title: "Resumen" },
];

const durations = [1, 2, 3, 5, 7, 10, 14];

const budgetOptions = [
  { id: 'economic', label: 'Económico (hasta $1,000 por persona)' },
  { id: 'moderate', label: 'Moderado ($1,000 - $2,500 por persona)' },
  { id: 'premium', label: 'Confort ($2,500 - $5,000 por persona)' },
  { id: 'luxury', label: 'Lujo (más de $5,000 por persona)' },
];

const interestOptions = ['Cultura', 'Gastronomía', 'Arqueología', 'Naturaleza', 'Aventura', 'Artesanías', 'Historia', 'Playas', 'Vida Nocturna', 'Pueblos Mágicos', 'Mercados Locales', 'Ecoturismo'];

const travelStyles = [
  { id: 'budget', label: 'Relajado y Tranquilo', icon: '🌴' },
  { id: 'comfort', label: 'Equilibrado', icon: '⚖️' },
  { id: 'adventure', label: 'Aventurero y Activo', icon: '🧗‍♂️' },
];

const accommodationTypes = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'boutique', label: 'Hotel Boutique' },
  { id: 'hostel', label: 'Hostal' },
  { id: 'apartment', label: 'Airbnb / Apartamento' },
  { id: 'hacienda', label: 'Ecolodge' },
];

const transportationTypes = [
  { id: 'public', label: 'Transporte Público' },
  { id: 'private', label: 'Transporte Privado' },
  { id: 'rental', label: 'Vehículo Rentado' },
  { id: 'shared', label: 'Servicios Compartidos' },
];

const mealPreferences = ['Comida Local', 'Vegetariano', 'Vegano', 'Sin Gluten', 'Bajo en Carbohidratos', 'Pescetariano', 'Kosher', 'Halal', 'Orgánico', 'Street Food'];

const activities = ['Senderismo', 'Recorridos Gastronómicos', 'Tours Culturales', 'Clases de Cocina', 'Visitas a Mercados', 'Observación de Aves', 'Yoga y Bienestar', 'Ciclismo', 'Escalada', 'Surf', 'Kayak', 'Talleres Artesanales'];

const accessibility = ['Movilidad Reducida', 'Acceso para Sillas de Ruedas', 'Alergias Alimentarias', 'Asistencia Auditiva', 'Asistencia Visual', 'Transporte Adaptado'];

const languages = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués', 'Japonés', 'Chino Mandarín'];

type ArrayFields = 'interests' | 'mealPreferences' | 'activities' | 'accessibility' | 'languages';

const TripPlanner = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: 3,
    startDate: '',
    budget: '',
    interests: [],
    travelStyle: '',
    accommodation: '',
    transportation: '',
    groupSize: 2,
    mealPreferences: [],
    activities: [],
    accessibility: [],
    languages: ['Español'],
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(true);
  const [qrData, setQrData] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const pdfDocumentRef = useRef<React.ReactElement | null>(null);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleMultiSelect = (field: ArrayFields, value: string) => {
    setPreferences((prev) => {
      const currentValues = prev[field];
      return {
      ...prev,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  // Función para generar el PDF y enviarlo al servidor
  const generatePDF = useCallback(async () => {
    setQrLoading(true);
    setUploadError(null);
    
    try {
      // Crear el documento PDF
      const pdfDocument = <TripPDF preferences={preferences} />;
      pdfDocumentRef.current = pdfDocument;
      
      // Generar el Blob
      const blob = await pdf(pdfDocument).toBlob();
      
      // Crear un objeto File a partir del Blob
      const fileName = `plan-viaje-oaxaca-${new Date().toISOString().split('T')[0]}.pdf`;
      const pdfFile = new File([blob], fileName, { 
        type: 'application/pdf' 
      });
      
      // Crear un FormData para enviar el archivo
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      
      // Enviar el archivo al servidor
      const response = await fetch(`${SERVER_URL}/api/upload-pdf`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir el PDF al servidor');
      }
      
      const data = await response.json();
      
      // Guardar la URL del blob para la descarga local (respaldo)
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlob(blobUrl);
      
      // Establecer la URL compartible para el código QR
      // Esta URL apunta a la página de descarga en el servidor
      const shareableUrl = `${SERVER_URL}/descargar-plan?id=${data.id}`;
      setQrData(shareableUrl);
      
      setQrLoading(false);
    } catch (error) {
      console.error("Error al generar o subir el PDF:", error);
      setUploadError(error instanceof Error ? error.message : 'Error desconocido');
      setQrLoading(false);
    }
  }, [preferences]);
  
  // Cuando se abre el modal, generamos el PDF y lo enviamos al servidor
  useEffect(() => {
    if (showQRModal) {
      generatePDF();
    }
    
    // Limpieza al cerrar el modal
    return () => {
      if (!showQRModal && pdfBlob) {
        URL.revokeObjectURL(pdfBlob);
        setPdfBlob(null);
        setQrData('');
        setUploadError(null);
      }
    };
  }, [showQRModal, generatePDF]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Duración y Fecha</h3>
            <p className="text-gray-600">¿Cuántos días te gustaría quedarte en Oaxaca?</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {durations.map((d) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences({ ...preferences, duration: d })}
                  className={`rounded-xl border-2 p-3 transition-all ${
                    preferences.duration === d
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <span className="block text-lg font-medium">{d}</span>
                  <span className="text-sm text-gray-500">día{d !== 1 ? 's' : ''}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-gray-600">¿Cuándo planeas visitar?</p>
                <input
                  type="date"
                  value={preferences.startDate}
                onChange={(e) => setPreferences({ ...preferences, startDate: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 p-3 outline-none transition focus:border-primary focus:ring focus:ring-primary/20"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Presupuesto</h3>
            <p className="text-gray-600">¿Cuál es tu presupuesto aproximado para este viaje?</p>
            <div className="space-y-3">
              {budgetOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setPreferences({ ...preferences, budget: option.id })}
                  className={`w-full rounded-xl border-2 p-4 transition-all ${
                    preferences.budget === option.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center">
                    {preferences.budget === option.id ? (
                      <svg className="size-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                      <div className="size-6" />
                    )}
                    <span className="ml-2 text-lg font-medium">{option.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">¿Qué te interesa explorar?</h3>
            <p className="text-gray-600">Selecciona todas las opciones que te interesen</p>
            <div className="grid grid-cols-2 gap-4">
              {interestOptions.map((interest) => (
                <motion.button
                  key={interest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect('interests', interest)}
                  className={`rounded-xl border-2 p-4 transition-all ${preferences.interests.includes(interest)
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.interests.includes(interest) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="size-6 shrink-0 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-lg font-medium">{interest}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">¿Qué estilo de viaje prefieres?</h3>
            <div className="grid grid-cols-3 gap-4">
              {travelStyles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                  className={`rounded-xl border-2 p-6 transition-all ${preferences.travelStyle === style.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="text-lg font-medium">{style.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">¿Qué tipo de alojamiento prefieres?</h3>
            <div className="grid grid-cols-3 gap-4">
              {accommodationTypes.map((acc) => (
                <motion.button
                  key={acc.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(prev => ({ ...prev, accommodation: acc.id }))}
                  className={`rounded-xl border-2 p-6 transition-all ${preferences.accommodation === acc.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="text-lg font-medium">{acc.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">¿Qué tipo de transporte prefieres?</h3>
            <div className="grid grid-cols-3 gap-4">
              {transportationTypes.map((trans) => (
                <motion.button
                  key={trans.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(prev => ({ ...prev, transportation: trans.id }))}
                  className={`rounded-xl border-2 p-6 transition-all ${preferences.transportation === trans.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="text-lg font-medium">{trans.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">¿Cuántas personas viajarán?</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{preferences.groupSize}</span>
                  <p className="text-gray-600">personas</p>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: prev.groupSize + 1 }))}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-center italic text-gray-600">
                {preferences.groupSize === 1 ? 'Viaje individual' :
                  preferences.groupSize === 2 ? 'Perfecto para una experiencia en pareja' :
                    preferences.groupSize <= 4 ? 'Grupo pequeño ideal para experiencias personalizadas' :
                      'Grupo grande - Recomendamos reservar con anticipación'}
              </p>
            </div>
          </motion.div>
        );

      case 8:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Preferencias de Comida</h3>
            <p className="text-gray-600">Selecciona todas las opciones que apliquen</p>
            <div className="grid grid-cols-2 gap-4">
              {mealPreferences.map((pref) => (
                <motion.button
                  key={pref}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect('mealPreferences', pref)}
                  className={`rounded-xl border-2 p-4 transition-all ${preferences.mealPreferences.includes(pref)
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.mealPreferences.includes(pref) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="size-6 shrink-0 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-lg font-medium">{pref}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Actividades de Interés</h3>
            <p className="text-gray-600">Selecciona las actividades que te gustaría realizar</p>
            <div className="grid grid-cols-2 gap-4">
              {activities.map((activity) => (
                <motion.button
                  key={activity}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect('activities', activity)}
                  className={`rounded-xl border-2 p-4 transition-all ${preferences.activities.includes(activity)
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.activities.includes(activity) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="size-6 shrink-0 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-lg font-medium">{activity}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 10:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Necesidades de Accesibilidad</h3>
            <p className="text-gray-600">Selecciona si necesitas alguna de estas opciones</p>
            <div className="grid grid-cols-2 gap-4">
              {accessibility.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect('accessibility', option)}
                  className={`rounded-xl border-2 p-4 transition-all ${preferences.accessibility.includes(option)
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.accessibility.includes(option) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="size-6 shrink-0 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-lg font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 11:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Preferencias de Idioma</h3>
            <p className="text-gray-600">Selecciona los idiomas en los que te gustaría recibir el servicio</p>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <motion.button
                  key={lang}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect('languages', lang)}
                  className={`rounded-xl border-2 p-4 transition-all ${preferences.languages.includes(lang)
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.languages.includes(lang) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="size-6 shrink-0 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-lg font-medium">{lang}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 12:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Resumen de tu Viaje</h3>
            <div className="space-y-6 rounded-xl bg-gray-50 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700">Fechas</h4>
                  <p className="text-gray-600">
                    {preferences.startDate ? new Date(preferences.startDate).toLocaleDateString() : 'No especificado'}
                  </p>
                  <p className="text-gray-600">{preferences.duration} días</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Presupuesto</h4>
                  <p className="text-gray-600">{budgetOptions.find(b => b.id === preferences.budget)?.label}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Grupo</h4>
                  <p className="text-gray-600">{preferences.groupSize} personas</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Estilo de Viaje</h4>
                  <p className="text-gray-600">{travelStyles.find(s => s.id === preferences.travelStyle)?.label}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-700">Intereses</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.interests.map(interest => (
                    <span key={interest} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-700">Actividades</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.activities.map(activity => (
                    <span key={activity} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {preferences.accessibility.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold text-gray-700">Necesidades de Accesibilidad</h4>
                  <div className="flex flex-wrap gap-2">
                    {preferences.accessibility.map(acc => (
                      <span key={acc} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-2 font-semibold text-gray-700">Idiomas</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.languages.map(lang => (
                    <span key={lang} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative mb-12 h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/planificador/hero-planificador.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Diseña tu Experiencia Perfecta en Oaxaca
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Nuestro planificador inteligente creará un itinerario personalizado según tus preferencias
        </p>
      </div>
        </div>
      </section>

      {/* Content container */}
      <div className="container mx-auto px-4 pb-20">
        {/* Progress navigation */}
        <div className="mx-auto mb-8 max-w-5xl">
          <div className="mb-6 flex justify-center">
            <div className="scrollbar-hide flex overflow-x-auto pb-2">
              <div className="flex min-w-max space-x-3">
          {steps.map((s) => (
                  <motion.button
              key={s.id}
                    initial={s.id === 1 ? { scale: 1 } : { scale: 0.95 }}
              animate={s.id <= step ? {
                scale: 1,
                backgroundColor: s.id === step ? '#4F46E5' : '#3730A3',
                transition: { duration: 0.2 }
              } : {
                      scale: 0.95,
                backgroundColor: '#E5E7EB',
                transition: { duration: 0.2 }
              }}
                    className="relative flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-white transition-transform hover:scale-105"
              onClick={() => s.id < step && setStep(s.id)}
              title={s.title}
            >
              {s.id <= step ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                >
                  {s.id}
                </motion.span>
              ) : (
                s.id
              )}
                  </motion.button>
          ))}
        </div>
            </div>
          </div>
          <div className="mb-8 text-center">
            <span className="text-xl font-semibold text-primary">
            {steps[step - 1].title}
          </span>
        </div>
      </div>

        {/* Content section */}
        <div className="mx-auto max-w-5xl">
          <div className="flex min-h-[400px] flex-col">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

            <div className="mt-12 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={step === 1}
                className={`flex items-center space-x-2 rounded-xl px-8 py-4 font-medium transition-all ${step === 1
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Anterior</span>
          </motion.button>

          {step === steps.length ? (
                <div className="flex flex-wrap justify-end gap-4">
            <PDFDownloadLink
              document={<TripPDF preferences={preferences} />}
              fileName={`plan-viaje-oaxaca-${new Date().toISOString().split('T')[0]}.pdf`}
            >
              {({ loading }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-2 rounded-xl bg-primary px-8 py-4 font-medium text-white transition-all hover:bg-primary-dark"
                >
                        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{loading ? 'Generando PDF...' : 'Descargar Plan de Viaje'}</span>
                </motion.button>
              )}
            </PDFDownloadLink>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQRModal(true)}
                    className="flex items-center space-x-2 rounded-xl bg-green-600 px-8 py-4 font-medium text-white transition-all hover:bg-green-700"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>Generar Código QR</span>
                  </motion.button>
                </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
                  className="flex items-center space-x-2 rounded-xl bg-primary px-8 py-4 font-medium text-white transition-all hover:bg-primary-dark"
            >
              <span>Siguiente</span>
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQRModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setShowQRModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Descarga tu Plan de Viaje</h3>
                  <button 
                    onClick={() => setShowQRModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center pb-4">
                  {qrLoading ? (
                    <div className="flex flex-col items-center py-8">
                      <svg className="size-16 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="mt-4 text-gray-600">Generando y subiendo PDF...</p>
                    </div>
                  ) : uploadError ? (
                    <div className="flex flex-col items-center py-8">
                      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-red-100">
                        <svg className="size-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="mb-2 text-lg font-medium text-gray-800">Error al subir el PDF</h4>
                      <p className="text-center text-sm text-gray-600">{uploadError}</p>
                      <button
                        onClick={() => generatePDF()}
                        className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                      >
                        Reintentar
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 size-64 overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-2 shadow-md">
                        {qrData && (
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`} 
                            alt="Código QR para descargar PDF" 
                            className="size-full object-cover"
                          />
                        )}
                      </div>
                      <h4 className="mb-2 text-lg font-medium text-gray-800">Escanea para descargar</h4>
                      <p className="text-center text-sm text-gray-600">
                        Escanea este código QR con tu dispositivo móvil para descargar tu plan de viaje personalizado directamente.
                      </p>
                      
                      {/* <div className="mt-6 w-full border-t border-gray-200 pt-6">
                        <div className="flex flex-col space-y-4">
                          <p className="text-center text-sm font-medium text-gray-700">
                            Otras opciones para guardar tu plan:
                          </p>
                          
                          {pdfBlob && (
                            <a 
                              href={pdfBlob} 
                              download={`plan-viaje-oaxaca-${new Date().toISOString().split('T')[0]}.pdf`}
                              className="flex items-center justify-center space-x-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              <span>Descargar PDF ahora</span>
                            </a>
                          )}
                          
                          <button
                            onClick={() => {
                              if (qrData) {
                                navigator.clipboard.writeText(qrData);
                                alert('¡Enlace copiado al portapapeles!');
                              }
                            }}
                            className="flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            <span>Copiar enlace</span>
                          </button>
                        </div>
                      </div> */}
                    </>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQRModal(false)}
                    className="inline-flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <span>Cerrar</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beneficios Section */}
        <div className="mx-auto mt-32 max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-primary md:text-4xl">Beneficios de Nuestro Planificador</h2>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="group">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <svg className="size-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mb-4 text-center text-2xl font-semibold">Personalización Total</h3>
              <p className="text-center text-lg text-gray-600">
                Adaptamos cada detalle del viaje a tus preferencias y necesidades específicas
              </p>
            </div>

            <div className="group">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <svg className="size-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-center text-2xl font-semibold">Ahorro de Tiempo</h3>
              <p className="text-center text-lg text-gray-600">
                Evita horas de investigación con nuestro sistema que condensa toda la experiencia local
              </p>
            </div>

            <div className="group">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <svg className="size-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-4 text-center text-2xl font-semibold">Experiencia Local</h3>
              <p className="text-center text-lg text-gray-600">
                Descubre los secretos que solo los locales conocen con recomendaciones auténticas
              </p>
            </div>
          </div>
        </div>

        {/* Testimonio Section */}
        <div className="mx-auto mt-32 max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-primary md:text-4xl">Lo que dicen nuestros usuarios</h2>
          <div className="rounded-3xl bg-gray-50 p-10 md:p-12">
            <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
              <div className="size-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img src="/testimonios/testimonio1.jpg" alt="Cliente satisfecho" className="size-full object-cover" />
              </div>
              <div>
                <svg className="mb-6 size-12 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mb-8 text-xl italic leading-relaxed text-gray-700">
                  El planificador de viaje hizo toda la diferencia. En lugar de pasar horas investigando, tuve un plan perfecto en minutos. Descubrí lugares que nunca hubiera encontrado por mi cuenta.
                </p>
                <div>
                  <h4 className="text-lg font-semibold">María González</h4>
                  <p className="text-gray-600">Visitó Oaxaca en 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner; 