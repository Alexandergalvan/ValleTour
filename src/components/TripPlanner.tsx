import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import TripPDF from '../components/TripPDF';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadPDF, getPublicURL } from '../services/supabase';

interface Step {
  id: number;
  title: string;
  icon: string;
}

interface TripPreferences {
  destination: string;
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

const destinations = [
  {
    id: "monte-alban",
    title: 'Monte Albán',
    description: 'Antigua ciudad zapoteca declarada Patrimonio de la Humanidad por la UNESCO.',
    image: '/destinos/monte.webp',
    category: 'Arqueología',
    price: '899',
    features: [
      'Vistas panorámicas del Valle de Oaxaca',
      'Juego de Pelota',
      'Observatorio astronómico',
      'Galería de los Danzantes'
    ]
  },
  {
    id: "hierve-el-agua",
    title: 'Hierve el Agua',
    description: 'Formaciones rocosas naturales que simulan cascadas petrificadas.',
    image: '/destinos/agua.webp',
    category: 'Naturaleza',
    price: '699',
    features: [
      'Piscinas naturales',
      'Miradores espectaculares',
      'Área para camping',
      'Guías locales'
    ]
  },
  {
    id: "mitla",
    title: 'Mitla',
    description: 'Ciudad zapoteca conocida por sus elaborados mosaicos geométricos.',
    image: '/destinos/mitla.webp',
    category: 'Arqueología',
    price: '799',
    features: [
      'Palacio de las Columnas',
      'Patrones geométricos únicos',
      'Centro ceremonial',
      'Museo del sitio'
    ]
  },
  {
    id: "centro-historico",
    title: 'Centro Histórico de Oaxaca',
    description: 'Ciudad colonial con arquitectura barroca y tradiciones vivas.',
    image: '/destinos/centro.webp',
    category: 'Cultura',
    price: '599',
    features: [
      'Catedral de Oaxaca',
      'Templo de Santo Domingo',
      'Mercado 20 de Noviembre',
      'Zócalo'
    ]
  },
  {
    id: "pueblos-mancomunados",
    title: 'Pueblos Mancomunados',
    description: 'Red de comunidades indígenas en la Sierra Norte de Oaxaca.',
    image: '/destinos/pueblos.webp',
    category: 'Ecoturismo',
    price: '999',
    features: [
      'Senderismo',
      'Ciclismo de montaña',
      'Cabañas ecológicas',
      'Gastronomía local'
    ]
  },
  {
    id: "bahias-huatulco",
    title: 'Bahías de Huatulco',
    description: 'Complejo turístico con playas vírgenes y arrecifes de coral.',
    image: '/destinos/bahias.webp',
    category: 'Playa',
    price: '1299',
    features: [
      'Snorkeling',
      'Paseos en lancha',
      'Playas desiertas',
      'Parque Nacional'
    ]
  }
];

const steps: Step[] = [
  { id: 1, title: "Selecciona tu Destino", icon: "🗺️" },
  { id: 2, title: "Duración y Fecha", icon: "📅" },
  { id: 3, title: "Presupuesto", icon: "💰" },
  { id: 4, title: "Intereses", icon: "🎯" },
  { id: 5, title: "Estilo de Viaje", icon: "🎒" },
  { id: 6, title: "Alojamiento", icon: "🏨" },
  { id: 7, title: "Transporte", icon: "🚗" },
  { id: 8, title: "Tamaño del Grupo", icon: "👥" },
  { id: 9, title: "Preferencias Alimentarias", icon: "🍽️" },
  { id: 10, title: "Actividades", icon: "🎨" },
  { id: 11, title: "Accesibilidad", icon: "♿" },
  { id: 12, title: "Idiomas", icon: "🌍" },
  { id: 13, title: "Resumen", icon: "📋" },
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
    destination: '',
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

  // Animaciones para los botones de navegación
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { scale: 1, opacity: 0.5 }
  };

  // Animaciones para las tarjetas de destino
  const destinationCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Animaciones para los pasos
  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  // Animaciones para el modal
  const modalVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  // Animaciones para la barra de progreso
  const progressBarVariants = {
    initial: { width: 0 },
    animate: {
      width: `${(step / steps.length) * 100}%`,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

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

  const generatePDF = useCallback(async () => {
    setQrLoading(true);
    setUploadError(null);

    try {
      // Crear el documento PDF
      const pdfDocument = <TripPDF preferences={preferences} />;
      pdfDocumentRef.current = pdfDocument;

      // Generar el Blob
      const blob = await pdf(pdfDocument).toBlob();

      // Nombre del archivo para Supabase
      const fileName = `plan-viaje-oaxaca-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substring(2, 8)}.pdf`;

      // Subir PDF a Supabase Storage
      const { data, error } = await uploadPDF(blob, fileName);

      if (error) {
        throw new Error(error.message || 'Error al subir el PDF a Supabase');
      }

      // Obtener URL pública del PDF
      const path = data?.path || `public/${fileName}`;
      const publicUrl = await getPublicURL(path);

      // Guardar la URL del blob para la descarga local (respaldo)
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlob(blobUrl);

      // Establecer la URL directa del PDF para el código QR
      setQrData(publicUrl.data || '');

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
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-3xl font-bold text-primary">Selecciona tu Destino</h3>
              <p className="text-gray-600">¿A dónde te gustaría viajar en Oaxaca?</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((dest) => (
                <motion.button
                  key={dest.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreferences({ ...preferences, destination: dest.id })}
                  className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${preferences.destination === dest.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50'
                    }`}
                >
                  <div className="relative mb-4 h-48">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="size-full rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <h4 className="text-xl font-bold text-white">{dest.title}</h4>
                      <p className="text-sm text-white opacity-90">{dest.category}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{dest.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">${dest.price}</span>
                      <span className="text-sm text-gray-500">{dest.features.length} actividades</span>
                    </div>
                  </div>
                  {preferences.destination === dest.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-2 rounded-full bg-primary p-1 text-white"
                    >
                      <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
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
            <h3 className="text-2xl font-bold text-primary">Duración y Fecha</h3>
            <p className="text-gray-600">¿Cuántos días te gustaría quedarte en Oaxaca?</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {durations.map((d) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences({ ...preferences, duration: d })}
                  className={`rounded-xl border-2 p-3 transition-all ${preferences.duration === d
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

      case 3:
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
                  className={`w-full rounded-xl border-2 p-4 transition-all ${preferences.budget === option.id
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

      case 4:
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

      case 5:
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

      case 6:
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

      case 7:
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

      case 8:
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

      case 9:
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

      case 10:
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

      case 11:
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

      case 12:
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

      case 13:
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800"
        >
          {/* Barra de progreso animada */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="h-full bg-primary"
              variants={progressBarVariants}
              initial="initial"
              animate="animate"
            />
          </div>

          {/* Contenido principal */}
          <div className="p-8">
            <motion.div
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                <motion.span
                  className="text-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {steps[step - 1].icon}
                </motion.span>
                <div>
                  <motion.h2
                    className="text-2xl font-bold text-primary dark:text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {steps[step - 1].title}
                  </motion.h2>
                  <motion.p
                    className="text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Paso {step} de {steps.length}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Botones de navegación */}
            <motion.div
              className="mt-8 flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={prevStep}
                disabled={step === 1}
                variants={buttonVariants}
                initial="initial"
                whileHover={step === 1 ? "disabled" : "hover"}
                whileTap={step === 1 ? "disabled" : "tap"}
                className={`rounded-lg px-6 py-2 transition-all ${step === 1
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Anterior
              </motion.button>

              {step === steps.length ? (
                <div className="flex space-x-4">
                  <PDFDownloadLink
                    document={<TripPDF preferences={preferences} />}
                    fileName={`plan-viaje-${preferences.destination}-${new Date().toISOString().split('T')[0]}.pdf`}
                  >
                    {({ loading }) => (
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary-dark"
                      >
                        {loading ? 'Generando PDF...' : 'Descargar PDF'}
                      </motion.button>
                    )}
                  </PDFDownloadLink>
                  <motion.button
                    onClick={() => {
                      setShowQRModal(true);
                      generatePDF();
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
                  >
                    Generar QR
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={nextStep}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary-dark"
                >
                  Siguiente
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal de QR con animaciones mejoradas */}
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
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                className="mb-4 flex items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-800">Descarga tu Plan de Viaje</h3>
                <motion.button
                  onClick={() => setShowQRModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              <motion.div
                className="flex flex-col items-center justify-center pb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {qrLoading ? (
                  <motion.div
                    className="flex flex-col items-center justify-center  py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.svg
                      className="size-16 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    <motion.p
                      className="mt-4 text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Generando y subiendo PDF...
                    </motion.p>
                  </motion.div>
                ) : uploadError ? (
                  <motion.div
                    className="flex flex-col items-center py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div
                      className="mb-4 flex size-16 items-center justify-center rounded-full bg-red-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <svg className="size-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <motion.h4
                      className="mb-2 text-lg font-medium text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Error al subir el PDF
                    </motion.h4>
                    <motion.p
                      className="text-center text-sm text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {uploadError}
                    </motion.p>
                    <motion.button
                      onClick={generatePDF}
                      className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Reintentar
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-center items-center py-8"
                  >
                    <motion.div
                      className="mb-4 size-64 overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-2 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {qrData && (
                        <motion.img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`}
                          alt="Código QR para descargar PDF"
                          className="size-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      )}
                    </motion.div>
                    <motion.h4
                      className="mb-2 text-lg font-medium text-gray-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Escanea para descargar
                    </motion.h4>
                    <motion.p
                      className="text-center text-sm text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Escanea este código QR con tu dispositivo móvil para descargar tu plan de viaje personalizado directamente.
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripPlanner; 