import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

interface Destination {
  id: string;
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
    id: "monte-alban",
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
    id: "hierve-el-agua",
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
    id: "mitla",
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
  },
  {
    id: "centro-historico",
    title: 'Centro Histórico de Oaxaca',
    description: 'Descubre la belleza colonial y el encanto cultural de Oaxaca',
    image: '/destinos/centro.webp',
    price: '599',
    features: ['Recorrido a pie', 'Visita a mercados', 'Degustación gastronómica'],
    longDescription: 'El Centro Histórico de Oaxaca, declarado Patrimonio de la Humanidad por la UNESCO, es un tesoro arquitectónico que combina estilos coloniales, iglesias barrocas y edificios históricos. Sus calles empedradas, patios interiores y coloridos edificios conservan la esencia de la época colonial mientras albergan una vibrante vida cultural contemporánea.',
    location: 'Ciudad de Oaxaca de Juárez',
    duration: '4-5 horas',
    bestTimeToVisit: 'Durante todo el año, especialmente en temporada de festividades locales',
    includedServices: [
      'Guía local especializado en historia y cultura',
      'Visita al Templo de Santo Domingo',
      'Recorrido por el Zócalo y edificios gubernamentales',
      'Degustación de chocolate oaxaqueño tradicional',
      'Visita al Mercado 20 de Noviembre con prueba de antojitos locales'
    ],
    itinerary: [
      '9:00 AM - Encuentro en el Zócalo de Oaxaca',
      '9:15 AM - Visita al Templo de Santo Domingo y museo cultural',
      '10:30 AM - Recorrido por edificios históricos y Andador Turístico',
      '11:30 AM - Visita a talleres artesanales locales',
      '12:30 PM - Degustación en el Mercado 20 de Noviembre',
      '1:30 PM - Visita a la Catedral de Oaxaca',
      '2:00 PM - Fin del recorrido con recomendaciones gastronómicas'
    ]
  },
  {
    id: "pueblos-mancomunados",
    title: 'Pueblos Mancomunados',
    description: 'Explora las comunidades rurales más auténticas de la Sierra Norte',
    image: '/destinos/pueblos.webp',
    price: '1,299',
    features: ['Ecoturismo', 'Turismo rural', 'Senderismo', 'Cultura zapoteca'],
    longDescription: 'Los Pueblos Mancomunados son un conjunto de ocho comunidades indígenas zapotecas ubicadas en la Sierra Norte de Oaxaca, que se han unido para gestionar de manera sostenible sus recursos naturales y desarrollar proyectos de ecoturismo comunitario. Rodeados de bosques de pino-encino y neblina característica, estos pueblos ofrecen una experiencia auténtica de la vida rural oaxaqueña, con senderos para caminatas, miradores espectaculares y la oportunidad de convivir con las comunidades locales.',
    location: 'Sierra Norte de Oaxaca, entre 50 y 100 km de la ciudad de Oaxaca',
    duration: '2 días/1 noche (también disponible en excursión de un día)',
    bestTimeToVisit: 'Marzo a noviembre, para evitar las lluvias intensas y el frío extremo',
    includedServices: [
      'Transporte en vehículo 4x4 desde Oaxaca',
      'Guía local de la comunidad',
      'Alojamiento en cabaña ecológica',
      'Alimentación completa con productos locales',
      'Actividades de senderismo con equipo necesario',
      'Taller de medicina tradicional',
      'Contribución directa a proyectos comunitarios'
    ],
    itinerary: [
      'Día 1:',
      '7:00 AM - Salida de Oaxaca hacia la Sierra Norte',
      '9:30 AM - Llegada a la comunidad de Benito Juárez',
      '10:00 AM - Recorrido por el pueblo y miradores',
      '1:00 PM - Comida tradicional zapoteca',
      '3:00 PM - Caminata por senderos de bosque nuboso',
      '5:00 PM - Taller de medicina tradicional',
      '7:00 PM - Cena con la comunidad local',
      'Día 2:',
      '7:00 AM - Desayuno con productos locales',
      '8:30 AM - Recorrido hacia la comunidad de Latuvi',
      '10:00 AM - Visita a proyectos sustentables',
      '1:00 PM - Comida de despedida',
      '3:00 PM - Regreso a la ciudad de Oaxaca'
    ]
  },
  {
    id: "bahias-huatulco",
    title: 'Bahías de Huatulco',
    description: 'Disfruta del paraíso tropical en las costas del Pacífico oaxaqueño',
    image: '/destinos/bahias.webp',
    price: '1,899',
    features: ['Playas', 'Snorkel', 'Tour en lancha', 'Gastronomía costera'],
    longDescription: 'Las Bahías de Huatulco constituyen uno de los destinos costeros más espectaculares de México, con nueve bahías y 36 playas de arena dorada bañadas por las aguas cristalinas del Océano Pacífico. Este paraíso tropical combina belleza natural con un desarrollo turístico planificado y sostenible, siendo además el primer destino turístico de América que ha recibido la certificación Earth Check Gold por sus prácticas ambientales. Sus aguas turquesa, arrecifes de coral, selva tropical y biodiversidad marina lo convierten en un destino perfecto para los amantes de la naturaleza y los deportes acuáticos.',
    location: 'Costa del Pacífico de Oaxaca, a 277 km de la ciudad de Oaxaca',
    duration: '3 días/2 noches',
    bestTimeToVisit: 'Noviembre a abril, durante la temporada seca con clima perfecto',
    includedServices: [
      'Transporte desde Oaxaca o traslados aeropuerto-hotel',
      'Alojamiento en hotel frente al mar',
      'Tour en lancha por las principales bahías',
      'Equipo de snorkel y actividades acuáticas',
      'Una comida típica costeña',
      'Cóctel de bienvenida',
      'Guía especializado en ecosistemas marinos'
    ],
    itinerary: [
      'Día 1:',
      '11:00 AM - Llegada y check-in en el hotel',
      '12:30 PM - Cóctel de bienvenida y orientación',
      '2:00 PM - Tiempo libre en playa La Entrega',
      '7:00 PM - Cena de mariscos al atardecer',
      'Día 2:',
      '8:00 AM - Desayuno buffet',
      '9:30 AM - Tour en lancha por bahías (Santa Cruz, Órgano, Maguey)',
      '11:00 AM - Snorkel en arrecifes de coral',
      '1:00 PM - Almuerzo en playa aislada',
      '3:00 PM - Continuación del tour acuático',
      '5:00 PM - Regreso al hotel y tiempo libre',
      'Día 3:',
      '8:00 AM - Desayuno buffet',
      '9:30 AM - Caminata por sendero ecológico en el Parque Nacional',
      '12:00 PM - Tiempo libre y check-out',
      '1:30 PM - Traslado de regreso o extensión de estadía'
    ]
  }
];

export const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(d => d.id === id);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = async () => {
    // Crear la URL actual para compartir
    const shareUrl = window.location.href;
    const shareTitle = `Descubre ${destination?.title} en ValleTour`;
    const shareText = destination?.description || 'Descubre este increíble destino en Oaxaca';

    // Verificar si la API Web Share está disponible
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        console.log('Contenido compartido con éxito');
      } catch (error) {
        console.log('Error al compartir:', error);
        // Si el usuario cancela la acción, no mostramos el modal alternativo
        if (error instanceof Error && error.name !== 'AbortError') {
          setShowShareOptions(true);
        }
      }
    } else {
      // Si Web Share API no está disponible, mostramos nuestras opciones personalizadas
      setShowShareOptions(true);
    }
  };

  // Función para copiar la URL al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('¡Enlace copiado al portapapeles!');
        setShowShareOptions(false);
      })
      .catch(err => {
        console.error('Error al copiar: ', err);
      });
  };

  // Funciones para compartir en redes sociales
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const shareOnTwitter = () => {
    const text = `Descubre ${destination?.title} en ValleTour ${window.location.href}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const shareOnWhatsApp = () => {
    const text = `Descubre ${destination?.title} en ValleTour: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

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
    <div className="bg-white">
      {/* Hero section con imagen de portada */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        <img
          src={destination.image}
          alt={destination.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-12">
          <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                {destination.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{destination.title}</h1>
              <p className="max-w-3xl text-xl font-light text-white md:text-2xl">{destination.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navegación en página */}
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex space-x-6 overflow-x-auto p-4 font-medium text-gray-600 lg:px-0">
            <a href="#descripcion" className="whitespace-nowrap text-gray-700">Descripción</a>
            <a href="#itinerario" className="whitespace-nowrap text-gray-700">Itinerario</a>
            <a href="#servicios" className="whitespace-nowrap text-gray-700">Servicios incluidos</a>
            <a href="#informacion" className="whitespace-nowrap text-gray-700">Información importante</a>
          </div>
            </div>
          </div>

          {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Columna principal - contenido */}
          <div className="lg:col-span-2">
            {/* Descripción */}
            <section id="descripcion" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary-700">Acerca de {destination.title}</h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">{destination.longDescription}</p>
              
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-5">
                  <div className="mb-3 flex items-center">
                    <svg className="mr-3 size-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold">Ubicación</h3>
                  </div>
                  <p className="text-gray-700">{destination.location}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-5">
                  <div className="mb-3 flex items-center">
                    <svg className="mr-3 size-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold">Duración</h3>
                  </div>
                  <p className="text-gray-700">{destination.duration}</p>
                </div>
              </div>
            </section>

            {/* Itinerario */}
            <section id="itinerario" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary-700">Itinerario</h2>
              <div className="space-y-6">
                {(() => {
                  // Agrupar itinerario por días
                  const days: { [key: string]: string[] } = {};
                  let currentDay = '';
                  
                  destination.itinerary.forEach((item) => {
                    // Detectar si es un encabezado de día
                    if (item.startsWith('Día') || /^Día \d+:$/.test(item)) {
                      currentDay = item;
                      days[currentDay] = [];
                    } else {
                      // Si no hay día actual, significa que es un itinerario simple de un día
                      if (!currentDay) {
                        if (!days['Actividades']) {
                          days['Actividades'] = [];
                        }
                        days['Actividades'].push(item);
                      } else {
                        days[currentDay].push(item);
                      }
                    }
                  });
                  
                  return Object.entries(days).map(([day, activities], dayIndex) => (
                    <div key={dayIndex} className="rounded-lg bg-gray-50 p-6">
                      <h3 className="mb-4 text-xl font-semibold text-primary-700">
                        {day === 'Actividades' ? 'Actividades del día' : day}
                      </h3>
                      <div className="space-y-4 border-l-2 border-secondary pl-4">
                        {activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="relative">
                            <div className="absolute left-[-9px] top-1.5 size-3 rounded-full bg-secondary"></div>
                            <p className="text-gray-700 pl-4">{activity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </section>

            {/* Servicios incluidos */}
            <section id="servicios" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-primary-700">Servicios incluidos</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {destination.includedServices.map((service, index) => (
                  <div key={index} className="flex items-center rounded-lg bg-gray-50 p-4">
                    <svg className="mr-3 size-6 shrink-0 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    <span className="text-gray-700">{service}</span>
                  </div>
                  ))}
              </div>
            </section>
          </div>

          {/* Columna lateral - información y reserva */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div id="informacion" className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="p-6 text-white">
                  <p className="mb-1 text-3xl font-bold text-secondary">
                    ${destination.price}
                  </p>
                  <p className="text-sm text-gray-600">por persona</p>
                </div>
                
                <div className="space-y-4 p-6">
                  <button className="w-full rounded-lg bg-secondary px-6 py-4 text-lg font-medium text-white transition-colors duration-300 hover:bg-secondary-dark">
                    Reservar ahora
                  </button>
                  
                  <div className="flex items-center justify-center text-center text-gray-500">
                    <svg className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm">Pago seguro garantizado</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-primary-700">Información importante</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-5 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    <div>
                        <span className="block font-medium text-secondary">Ubicación:</span>
                      <p className="text-gray-600">{destination.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-5 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    <div>
                        <span className="block font-medium text-secondary">Duración:</span>
                      <p className="text-gray-600">{destination.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-5 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    <div>
                        <span className="block font-medium text-secondary">Mejor época:</span>
                      <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="flex items-center justify-center space-x-4">
                    <button 
                      onClick={handleShare}
                      className="flex items-center text-gray-600 hover:text-secondary"
                    >
                      <svg className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Compartir
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-secondary">
                      <svg className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Guardar
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de destinos relacionados */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary-700">Destinos similares que podrían interesarte</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations
              .filter(d => d.id !== id)
              .slice(0, 3)
              .map((relatedDest) => (
                <motion.div
                  key={relatedDest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-48">
                    <img 
                      src={relatedDest.image} 
                      alt={relatedDest.title} 
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{relatedDest.title}</h3>
                    <p className="mb-4 text-gray-600">{relatedDest.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-700">Desde ${relatedDest.price}</span>
                      <a 
                        href={`/destinos/${relatedDest.id}`}
                        className="font-medium text-secondary hover:underline"
                      >
                        Ver detalles
                      </a>
            </div>
          </div>
        </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal de opciones de compartir */}
      {showShareOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Compartir destino</h3>
              <button 
                onClick={() => setShowShareOptions(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <button 
                onClick={shareOnFacebook}
                className="flex flex-col items-center justify-center rounded-lg p-3 text-blue-600 hover:bg-blue-50"
              >
                <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span className="mt-1 text-xs">Facebook</span>
              </button>
              
              <button 
                onClick={shareOnTwitter}
                className="flex flex-col items-center justify-center rounded-lg p-3 text-sky-500 hover:bg-sky-50"
              >
                <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.19 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
                </svg>
                <span className="mt-1 text-xs">Twitter</span>
              </button>
              
              <button 
                onClick={shareOnWhatsApp}
                className="flex flex-col items-center justify-center rounded-lg p-3 text-green-600 hover:bg-green-50"
              >
                <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 22.162c-5.522 0-10-4.477-10-10S6.478 2.162 12 2.162 22 6.64 22 12.163s-4.477 9.999-10 9.999zM12 4.162c-4.42 0-8 3.58-8 8 0 4.419 3.58 7.999 8 7.999s8-3.58 8-8c0-4.419-3.58-7.999-8-7.999z" />
                </svg>
                <span className="mt-1 text-xs">WhatsApp</span>
              </button>
              
              <button 
                onClick={copyToClipboard}
                className="flex flex-col items-center justify-center rounded-lg p-3 text-gray-600 hover:bg-gray-100"
              >
                <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="mt-1 text-xs">Copiar URL</span>
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Comparte este increíble destino con tus amigos y familiares
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 