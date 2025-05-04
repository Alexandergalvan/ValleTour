import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const categories = ['Todos', 'Arqueología', 'Naturaleza', 'Cultura'];

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredDestinations = selectedCategory === 'Todos'
    ? destinations
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destinos Turísticos</h1>
          <p className="text-lg text-gray-600">
            Descubre los lugares más emblemáticos y experiencias únicas que Oaxaca tiene para ti
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex justify-center gap-4 mb-12 w-[100%] overflow-x-scroll">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de destinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destinos/${destination.id}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">
                      {destination.category}
                    </span>
                    <span className="text-lg font-bold text-secondary">
                      ${destination.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {destination.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {destination.description}
                  </p>
                  <ul className="space-y-2">
                    {destination.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 