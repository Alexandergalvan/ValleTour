import { useState } from 'react';
import { services, Service } from '../data/services';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'packages', name: 'Paquetes' },
  { id: 'hotels', name: 'Hoteles' },
  { id: 'transport', name: 'Transporte' },
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
    {service.image && (
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        {service.category === 'packages' && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {service.duration}
          </div>
        )}
      </div>
    )}
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
      <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

      {service.category === 'packages' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {service.difficulty && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {service.difficulty}
            </div>
          )}
          {service.groupSize && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {service.groupSize}
            </div>
          )}
        </div>
      )}

      {service.price && (
        <div className="mb-4">
          <p className="text-primary font-medium text-lg">
            Desde {service.price.min.toLocaleString('es-MX', { style: 'currency', currency: service.price.currency })}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-primary font-medium">Ver detalles</span>
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Paquetes Turísticos en Oaxaca</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre la magia de Oaxaca con nuestros paquetes turísticos especializados.
            Desde experiencias culturales hasta aventuras en la naturaleza,
            te ofrecemos todo lo necesario para una experiencia inolvidable en el corazón de México.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                ? 'bg-primary text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                {selectedService.image && (
                  <div className="relative h-64">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h3>
                      {selectedService.location && (
                        <div className="flex items-center text-white">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {selectedService.location}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {selectedService.category === 'packages' && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {selectedService.duration && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Duración</div>
                          <div className="font-medium text-lg">{selectedService.duration}</div>
                        </div>
                      )}
                      {selectedService.difficulty && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Dificultad</div>
                          <div className="font-medium text-lg">{selectedService.difficulty}</div>
                        </div>
                      )}
                      {selectedService.groupSize && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Tamaño del Grupo</div>
                          <div className="font-medium text-lg">{selectedService.groupSize}</div>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-gray-700 text-lg mb-6">{selectedService.description}</p>

                  {selectedService.price && (
                    <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 text-xl">Precios</h4>
                      <p className="text-primary font-medium text-2xl">
                        Desde {selectedService.price.min.toLocaleString('es-MX', { style: 'currency', currency: selectedService.price.currency })}
                      </p>
                      {selectedService.price.max && (
                        <p className="text-gray-600 text-lg">
                          Hasta {selectedService.price.max.toLocaleString('es-MX', { style: 'currency', currency: selectedService.price.currency })}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4 text-xl">Características</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                          <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cerrar
                    </button>
                    <button
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">
            ¿Necesitas ayuda para planificar tu viaje a Oaxaca?
            Contáctanos para recibir asesoría personalizada y crear el itinerario perfecto para ti.
          </p>
          <button className="mt-4 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Contactar Asesor
          </button>
        </div>
      </div>
    </div>
  );
}; 