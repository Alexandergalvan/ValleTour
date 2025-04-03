import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TripPDF from '../components/TripPDF';

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

const interests = [
  'Arqueología',
  'Gastronomía',
  'Artesanías',
  'Naturaleza',
  'Cultura',
  'Aventura',
  'Relax',
  'Fotografía',
  'Historia',
  'Mercados Locales',
  'Festivales',
  'Vida Nocturna'
];

const travelStyles = [
  { id: 'luxury', label: 'Lujo', description: 'Experiencias premium y servicios de alta gama' },
  { id: 'comfort', label: 'Confort', description: 'Buen balance entre comodidad y precio' },
  { id: 'budget', label: 'Económico', description: 'Viaje eficiente y accesible' },
  { id: 'adventure', label: 'Aventurero', description: 'Enfocado en experiencias únicas y auténticas' },
  { id: 'cultural', label: 'Cultural', description: 'Inmersión profunda en la cultura local' }
];

const accommodations = [
  { id: 'hotel', label: 'Hotel', description: 'Alojamiento tradicional con servicios completos' },
  { id: 'boutique', label: 'Hotel Boutique', description: 'Hoteles pequeños con encanto único' },
  { id: 'hostel', label: 'Hostal', description: 'Opción económica y social' },
  { id: 'apartment', label: 'Apartamento', description: 'Espacio privado con cocina' },
  { id: 'hacienda', label: 'Hacienda', description: 'Alojamiento histórico tradicional' }
];

const transportations = [
  { id: 'private', label: 'Privado', description: 'Transporte exclusivo y flexible' },
  { id: 'shared', label: 'Compartido', description: 'Servicio grupal económico' },
  { id: 'public', label: 'Público', description: 'Transporte local auténtico' },
  { id: 'rental', label: 'Auto Rentado', description: 'Libertad para explorar a tu ritmo' }
];

const mealPreferences = [
  'Tradicional Oaxaqueña',
  'Vegetariana',
  'Vegana',
  'Sin Gluten',
  'Gourmet',
  'Street Food',
  'Mercados Locales'
];

const activities = [
  'Tours Guiados',
  'Clases de Cocina',
  'Talleres Artesanales',
  'Senderismo',
  'Ciclismo',
  'Yoga y Meditación',
  'Degustación de Mezcal',
  'Fotografía',
  'Eventos Culturales',
  'Visitas a Comunidades',
  'Compras en Mercados',
  'Museos y Galerías'
];

const accessibility = [
  'Movilidad Reducida',
  'Acceso en Silla de Ruedas',
  'Guía en Lenguaje de Señas',
  'Materiales en Braille',
  'Dietas Especiales',
  'Transporte Adaptado'
];

const languages = [
  'Español',
  'Inglés',
  'Francés',
  'Alemán',
  'Italiano',
  'Portugués'
];

const budgetOptions = [
  {
    id: 'economic',
    label: 'Económico',
    range: '$500 - $1,000 MXN por día',
    description: 'Ideal para mochileros y viajeros con presupuesto limitado',
    includes: ['Hostales y alojamientos económicos', 'Transporte público', 'Comida en mercados locales']
  },
  {
    id: 'moderate',
    label: 'Moderado',
    range: '$1,000 - $2,500 MXN por día',
    description: 'Balance perfecto entre comodidad y presupuesto',
    includes: ['Hoteles 3 estrellas', 'Transporte compartido', 'Restaurantes locales']
  },
  {
    id: 'comfort',
    label: 'Confort',
    range: '$2,500 - $5,000 MXN por día',
    description: 'Experiencia cómoda con algunos lujos',
    includes: ['Hoteles 4 estrellas', 'Transporte privado ocasional', 'Restaurantes de calidad']
  },
  {
    id: 'luxury',
    label: 'Lujo',
    range: '$5,000+ MXN por día',
    description: 'Experiencias premium y máxima comodidad',
    includes: ['Hoteles 5 estrellas y boutique', 'Transporte privado', 'Restaurantes gourmet']
  }
];

type ArrayFields = 'interests' | 'mealPreferences' | 'activities' | 'accessibility' | 'languages';

const TripPlanner = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: 3,
    startDate: '',
    budget: 'moderate',
    interests: [],
    travelStyle: 'comfort',
    accommodation: 'hotel',
    transportation: 'shared',
    groupSize: 2,
    mealPreferences: [],
    activities: [],
    accessibility: [],
    languages: ['Español']
  });

  const steps = [
    { id: 1, title: 'Fechas y Duración' },
    { id: 2, title: 'Presupuesto' },
    { id: 3, title: 'Intereses' },
    { id: 4, title: 'Estilo de Viaje' },
    { id: 5, title: 'Alojamiento' },
    { id: 6, title: 'Transporte' },
    { id: 7, title: 'Grupo' },
    { id: 8, title: 'Comidas' },
    { id: 9, title: 'Actividades' },
    { id: 10, title: 'Accesibilidad' },
    { id: 11, title: 'Idiomas' },
    { id: 12, title: 'Resumen' }
  ];

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleMultiSelect = (field: ArrayFields, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

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
            <h3 className="text-2xl font-bold text-primary">¿Cuándo y por cuánto tiempo planeas visitar Oaxaca?</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={preferences.startDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración del viaje
                </label>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">1 día</span>
                    <span className="text-lg font-bold text-primary">{preferences.duration} días</span>
                    <span className="text-sm text-gray-600">14 días</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={preferences.duration}
                    onChange={(e) => setPreferences(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 italic"
                  >
                    {preferences.duration === 1 ? 'Un día perfecto para una visita rápida' :
                     preferences.duration <= 3 ? 'Tiempo ideal para conocer los lugares principales' :
                     preferences.duration <= 7 ? 'Una semana llena de experiencias inolvidables' :
                     'Una experiencia completa de Oaxaca'}
                  </motion.p>
                </div>
              </div>
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
            <h3 className="text-2xl font-bold text-primary">¿Cuál es tu presupuesto diario?</h3>
            <div className="grid grid-cols-1 gap-4">
              {budgetOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreferences(prev => ({ ...prev, budget: option.id }))}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    preferences.budget === option.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-primary">{option.label}</div>
                      <div className="text-lg font-medium text-secondary mt-1">{option.range}</div>
                      <div className="text-gray-600 mt-2">{option.description}</div>
                    </div>
                    {preferences.budget === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
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
              {interests.map((interest) => (
                <motion.button
                  key={interest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMultiSelect('interests', interest)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.interests.includes(interest)
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.interests.includes(interest) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-full" />
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
                  className={`p-6 rounded-xl border-2 transition-all ${
                    preferences.travelStyle === style.id
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
              {accommodations.map((acc) => (
                <motion.button
                  key={acc.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(prev => ({ ...prev, accommodation: acc.id }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    preferences.accommodation === acc.id
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
              {transportations.map((trans) => (
                <motion.button
                  key={trans.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(prev => ({ ...prev, transportation: trans.id }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    preferences.transportation === trans.id
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
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{preferences.groupSize}</span>
                  <p className="text-gray-600">personas</p>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: prev.groupSize + 1 }))}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-600 italic">
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
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.mealPreferences.includes(pref)
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.mealPreferences.includes(pref) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-full" />
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
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.activities.includes(activity)
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.activities.includes(activity) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-full" />
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
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.accessibility.includes(option)
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.accessibility.includes(option) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-full" />
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
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.languages.includes(lang)
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {preferences.languages.includes(lang) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-full" />
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
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
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
                <h4 className="font-semibold text-gray-700 mb-2">Intereses</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.interests.map(interest => (
                    <span key={interest} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Actividades</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.activities.map(activity => (
                    <span key={activity} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {preferences.accessibility.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Necesidades de Accesibilidad</h4>
                  <div className="flex flex-wrap gap-2">
                    {preferences.accessibility.map(acc => (
                      <span key={acc} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Idiomas</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.languages.map(lang => (
                    <span key={lang} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Planificador de Viaje</h2>
        <p className="text-lg text-gray-600 text-center">
          Personaliza tu experiencia en Oaxaca
        </p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10" />
          {steps.map((s) => (
            <motion.div
              key={s.id}
              initial={s.id === 1 ? { scale: 1 } : { scale: 0.8 }}
              animate={s.id <= step ? { 
                scale: 1,
                backgroundColor: s.id === step ? '#4F46E5' : '#3730A3',
                transition: { duration: 0.2 }
              } : {
                scale: 0.8,
                backgroundColor: '#E5E7EB',
                transition: { duration: 0.2 }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium relative z-10 cursor-pointer"
              onClick={() => s.id < step && setStep(s.id)}
              title={s.title}
            >
              {s.id <= step ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {s.id}
                </motion.span>
              ) : (
                s.id
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="mt-12 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              step === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Anterior
          </motion.button>

          {step === steps.length ? (
            <PDFDownloadLink
              document={<TripPDF preferences={preferences} />}
              fileName={`plan-viaje-oaxaca-${new Date().toISOString().split('T')[0]}.pdf`}
            >
              {({ loading }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{loading ? 'Generando PDF...' : 'Descargar Plan de Viaje'}</span>
                </motion.button>
              )}
            </PDFDownloadLink>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
            >
              Siguiente
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner; 