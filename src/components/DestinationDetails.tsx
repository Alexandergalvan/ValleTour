import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  features: string[];
  longDescription: string;
  location: string;
  duration: string;
  bestTimeToVisit: string;
  includedServices: string[];
  itinerary: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    title: 'Monte Albán',
    description: 'Descubre la antigua ciudad zapoteca con nuestros guías expertos',
    image: '/destinos/monte.webp',
    price: '899',
    features: ['Tour guiado', 'Transporte incluido', 'Entrada al sitio'],
    longDescription: 'Monte Albán, declarado Patrimonio de la Humanidad por la UNESCO, es uno de los sitios arqueológicos más importantes de México. Esta antigua ciudad zapoteca, fundada en el año 500 a.C., se alza majestuosamente sobre una meseta artificial a 400 metros sobre el valle de Oaxaca.',
    location: 'Valle de Oaxaca, a 9 km de la ciudad de Oaxaca',
    duration: '6-8 horas',
    bestTimeToVisit: 'Octubre a marzo, temprano en la mañana para evitar el calor',
    includedServices: [
      'Transporte redondo desde tu hotel',
      'Guía certificado especializado en arqueología',
      'Entrada al sitio arqueológico',
      'Agua embotellada',
      'Seguro de viajero'
    ],
    itinerary: [
      '7:00 AM - Recogida en el hotel',
      '8:00 AM - Llegada a Monte Albán',
      '8:30 AM - Tour guiado por el sitio',
      '11:30 AM - Tiempo libre para fotos',
      '12:30 PM - Regreso a la ciudad'
    ]
  },
  {
    id: 2,
    title: 'Hierve el Agua',
    description: 'Explora las cascadas petrificadas y baños termales',
    image: '/destinos/agua.webp',
    price: '699',
    features: ['Baños termales', 'Fotografía', 'Comida típica'],
    longDescription: 'Hierve el Agua es un conjunto de cascadas petrificadas y pozas naturales de agua mineral que forman una de las maravillas naturales más impresionantes de Oaxaca. El agua rica en minerales ha creado formaciones rocosas únicas que parecen cascadas congeladas.',
    location: 'San Isidro Roaguía, Oaxaca',
    duration: '8-10 horas',
    bestTimeToVisit: 'Noviembre a abril, durante la temporada seca',
    includedServices: [
      'Transporte redondo',
      'Guía local',
      'Entrada al sitio',
      'Comida típica',
      'Seguro de viajero'
    ],
    itinerary: [
      '8:00 AM - Recogida en el hotel',
      '10:00 AM - Llegada a Hierve el Agua',
      '10:30 AM - Tour guiado y baños termales',
      '1:00 PM - Comida típica',
      '2:30 PM - Regreso a la ciudad'
    ]
  },
  {
    id: 3,
    title: 'Mitla',
    description: 'Vive la magia de la "Ciudad de los Muertos"',
    image: '/destinos/mitla.webp',
    price: '799',
    features: ['Visita guiada', 'Taller de textiles', 'Degustación de mezcal'],
    longDescription: 'Mitla, conocida como la "Ciudad de los Muertos" en náhuatl, es un sitio arqueológico único por sus elaborados mosaicos geométricos y su arquitectura distintiva. Este centro ceremonial zapoteca es famoso por sus frisos decorativos y su importancia histórica.',
    location: 'San Pablo Villa de Mitla, Oaxaca',
    duration: '6-7 horas',
    bestTimeToVisit: 'Todo el año, preferiblemente por la mañana',
    includedServices: [
      'Transporte redondo',
      'Guía especializado',
      'Entrada al sitio arqueológico',
      'Taller de textiles tradicionales',
      'Degustación de mezcal artesanal'
    ],
    itinerary: [
      '9:00 AM - Recogida en el hotel',
      '10:30 AM - Llegada a Mitla',
      '11:00 AM - Tour guiado por el sitio',
      '1:00 PM - Taller de textiles',
      '2:30 PM - Degustación de mezcal',
      '3:30 PM - Regreso a la ciudad'
    ]
  }
];

export const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(d => d.id === Number(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">Destino no encontrado</h1>
            <p className="mt-4 text-gray-600">El destino que buscas no existe.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Imagen de portada */}
          <div className="relative h-96">
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4 text-white">{destination.title}</h1>
              <p className="text-xl text-white">{destination.description}</p>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Columna izquierda */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-primary-700 mb-4">Sobre este destino</h2>
                <p className="text-gray-600 mb-6">{destination.longDescription}</p>

                <h2 className="text-2xl font-bold text-primary-700 mb-4">Itinerario</h2>
                <ul className="space-y-3 mb-6">
                  {destination.itinerary.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary-700 text-white rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-primary-700 mb-4">Servicios incluidos</h2>
                <ul className="space-y-3">
                  {destination.includedServices.map((service, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-primary-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Columna derecha */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">Información importante</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-secondary">Ubicación:</span>
                      <p className="text-gray-600">{destination.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-secondary">Duración:</span>
                      <p className="text-gray-600">{destination.duration}</p>
                    </div>
                    <div>
                      <span className="font-medium text-secondary">Mejor época para visitar:</span>
                      <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-3xl font-bold text-primary-700 mb-4">
                    Desde ${destination.price}
                  </p>
                  <button className="w-full bg-secondary text-white py-3 px-6 rounded-lg hover:bg-secondary-dark transition-colors duration-300">
                    Reservar ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 