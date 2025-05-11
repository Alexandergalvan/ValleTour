import { useState } from 'react';
import { services, Service } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'hotels', name: 'Hoteles' },
  { id: 'transport', name: 'Transporte' },
  { id: 'packages', name: 'Paquetes' },
  { id: 'guides', name: 'Guías' },
  { id: 'security', name: 'Seguridad' },
  { id: 'culture', name: 'Cultura' },
];

const ServiceCard = ({ service, onSelect }: { service: Service; onSelect: (service: Service) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    onClick={() => onSelect(service)}
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

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
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={setSelectedService}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedService && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {selectedService.location && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedService.location}
                    </div>
                  )}

                  <p className="text-gray-700 mb-6">{selectedService.description}</p>

                  {selectedService.price && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Precios</h4>
                      <p className="text-primary font-medium">
                        Desde {selectedService.price.min.toLocaleString('es-MX', { style: 'currency', currency: selectedService.price.currency })}
                      </p>
                      {selectedService.price.max && (
                        <p className="text-gray-600">
                          Hasta {selectedService.price.max.toLocaleString('es-MX', { style: 'currency', currency: selectedService.price.currency })}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Características</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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