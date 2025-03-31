import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const featuredDestinations = [
  {
    id: 1,
    title: 'Machu Picchu',
    country: 'Perú',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
    price: '1,299',
  },
  {
    id: 2,
    title: 'Cancún',
    country: 'México',
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18',
    price: '899',
  },
  {
    id: 3,
    title: 'París',
    country: 'Francia',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    price: '1,499',
  },
];

const benefits = [
  {
    title: 'Experiencias Únicas',
    description: 'Viajes personalizados que se adaptan a tus preferencias.',
    icon: '🌟',
  },
  {
    title: 'Atención 24/7',
    description: 'Soporte durante todo tu viaje, cuando lo necesites.',
    icon: '🕒',
  },
  {
    title: 'Mejores Precios',
    description: 'Garantizamos las mejores tarifas del mercado.',
    icon: '💰',
  },
  {
    title: 'Guías Expertos',
    description: 'Profesionales locales con amplia experiencia.',
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
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="relative flex h-full items-center justify-center text-center">
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Descubre el Mundo con ValleTour
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-xl text-gray-200"
            >
              Experiencias únicas y destinos increíbles te esperan
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                to="/destinos"
                className="btn-primary text-lg"
              >
                Explorar Destinos
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDownIcon className="h-8 w-8 animate-bounce text-white" />
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Destinos Destacados</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white">
                    {destination.title}
                  </h3>
                  <p className="text-gray-300">{destination.country}</p>
                  <p className="mt-2 text-lg font-semibold text-white">
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
          <h2 className="text-center text-3xl font-bold">
            ¿Por qué Viajar con Nosotros?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">¿Listo para tu Próxima Aventura?</h2>
          <p className="mt-4 text-lg text-gray-300">
            Nuestros asesores están listos para ayudarte a planificar tu viaje perfecto
          </p>
          <Link
            to="/contacto"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
} 