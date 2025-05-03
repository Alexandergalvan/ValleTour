import { useState } from 'react';
import { services, Service } from '../data/services';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'hotels', name: 'Hoteles' },
  { id: 'transport', name: 'Transporte' },
  { id: 'packages', name: 'Paquetes' },
  { id: 'guides', name: 'Guías' },
  { id: 'security', name: 'Seguridad' },
  { id: 'culture', name: 'Cultura' },
];

const ServiceCard = ({ service }: { service: Service }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
        {service.location && (
          <span className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {service.location}
          </span>
        )}
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>

      {service.price && (
        <div className="mb-4">
          <p className="text-primary font-medium">
            Desde {service.price.min.toLocaleString('es-MX', { style: 'currency', currency: service.price.currency })}
          </p>
        </div>
      )}

      <ul className="space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Servicios Turísticos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre la magia de Oaxaca con nuestros servicios turísticos especializados.
            Desde hoteles coloniales hasta experiencias culturales auténticas,
            te ofrecemos todo lo necesario para una experiencia inolvidable en el corazón de México.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            ¿Necesitas ayuda para planificar tu viaje a Oaxaca?
            Contáctanos para recibir asesoría personalizada y crear el itinerario perfecto para ti.
          </p>
        </div>
      </div>
    </div>
  );
}; 