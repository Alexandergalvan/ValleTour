import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const featuredDestinations = [
  {
    id: 1,
    title: 'Monte Albán',
    description: 'Descubre la antigua ciudad zapoteca con nuestros guías expertos',
    image: '/destinos/monte.webp',
    price: '899',
    features: ['Tour guiado', 'Transporte incluido', 'Entrada al sitio'],
  },
  {
    id: 2,
    title: 'Hierve el Agua',
    description: 'Explora las cascadas petrificadas y baños termales',
    image: '/destinos/agua.webp',
    price: '699',
    features: ['Baños termales', 'Fotografía', 'Comida típica'],
  },
  {
    id: 3,
    title: 'Mitla',
    description: 'Vive la magia de la "Ciudad de los Muertos"',
    image: '/destinos/mitla.webp',
    price: '799',
    features: ['Visita guiada', 'Taller de textiles', 'Degustación de mezcal'],
  },
];

const benefits = [
  {
    title: 'Experiencia Local',
    description: 'Conectamos con comunidades indígenas para experiencias auténticas.',
    icon: '🌟',
  },
  {
    title: 'Gastronomía Oaxaqueña',
    description: 'Tours culinarios y talleres de cocina tradicional.',
    icon: '🍽️',
  },
  {
    title: 'Artesanías',
    description: 'Visitas a talleres de artesanos y pueblos mágicos.',
    icon: '🎨',
  },
  {
    title: 'Guías Expertos',
    description: 'Equipo local con amplio conocimiento cultural.',
    icon: '👥',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero.webp)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative flex h-full items-center justify-center text-center">
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <img
                src="/logo-alt.png"
                alt="ValleTour"
                className="mx-auto h-24 w-auto"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              ValleTour Oaxaca
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-gray-200"
            >
              Tu puerta de entrada a experiencias culturales auténticas en el corazón de México
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 space-x-4"
            >
              <Link
                to="/destinos"
                className="inline-block rounded-lg bg-secondary px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-secondary-dark"
              >
                Explorar Destinos
              </Link>
              <Link
                to="/contacto"
                className="inline-block rounded-lg bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Planificar Viaje
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDownIcon className="size-8 animate-bounce text-white" />
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary dark:text-white">
              Destinos Destacados
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Descubre los lugares más emblemáticos de Oaxaca con nuestras experiencias exclusivas
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-lg bg-white shadow-lg dark:bg-primary-light"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary dark:text-white">
                    {destination.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {destination.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {destination.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg className="mr-2 size-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-lg font-semibold text-secondary">
                    Desde ${destination.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary dark:text-white">
              ¿Por qué Elegir ValleTour?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Nuestra experiencia y compromiso con la autenticidad nos hace únicos
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-primary-light"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-2xl">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-primary dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planifica tu Viaje */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Planifica tu Viaje</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personaliza tu experiencia en Oaxaca con nuestro planificador de viajes interactivo.
              Obtén un itinerario personalizado basado en tus preferencias.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Link
              to="/planeador"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
            >
              Comenzar a Planificar
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">¿Listo para tu Aventura en Oaxaca?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Permítenos ser tu guía en este viaje inolvidable por la riqueza cultural de Oaxaca
            </p>
            <div className="mt-8 space-x-4">
              <Link
                to="/contacto"
                className="inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary transition-colors hover:bg-gray-100"
              >
                Planifica tu Viaje
              </Link>
              <Link
                to="/servicios"
                className="inline-block rounded-lg bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 