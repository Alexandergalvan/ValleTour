import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Sally Yuritzy',
    role: 'CEO & Fundadora',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description:
      'Con más de 15 años de experiencia en el sector turístico, Sally fundó ValleTour con la visión de crear experiencias únicas y memorables.',
  },
  {
    name: 'Eduardo Del Angel',
    role: 'Director de Operaciones',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    description:
      'Experto en logística y operaciones, Eduardo asegura que cada viaje sea perfecto hasta el último detalle.',
  },
  {
    name: 'Sarahi Alvarez',
    role: 'Directora de Experiencias',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    description:
      'Sarahi se especializa en crear itinerarios únicos que combinan aventura, cultura y autenticidad.',
  },
  {
    name: 'Alexander Galvan',
    role: 'Director de Tecnología',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    description:
      'Alexander lidera la transformación digital de ValleTour, mejorando la experiencia de nuestros clientes.',
  },
  {
    name: 'Homero Treviño',
    role: 'Director de Marketing y Ventas',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    description:
      'Homero lidera el equipo de marketing y ventas, asegurando que nuestros clientes encuentren la mejor experiencia de viaje.',
  },
];

const values = [
  {
    title: 'Excelencia',
    description:
      'Nos esforzamos por superar las expectativas en cada aspecto de nuestro servicio.',
  },
  {
    title: 'Innovación',
    description:
      'Constantemente buscamos nuevas formas de mejorar la experiencia de viaje.',
  },
  {
    title: 'Sostenibilidad',
    description:
      'Promovemos el turismo responsable y el respeto por el medio ambiente.',
  },
  {
    title: 'Pasión',
    description:
      'Amamos lo que hacemos y eso se refleja en cada viaje que organizamos.',
  },
];

const stats = [
  { value: '10+', label: 'Años de Experiencia' },
  { value: '50k+', label: 'Clientes Satisfechos' },
  { value: '100+', label: 'Destinos' },
  { value: '4.9/5', label: 'Calificación Promedio' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-primary">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-primary dark:text-white"
          >
            Sobre ValleTour
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
          >
            Somos una agencia de viajes comprometida con crear experiencias
            inolvidables y hacer realidad los sueños de nuestros viajeros.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-8 rounded-lg bg-white p-8 shadow-lg dark:bg-primary-light md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Values Section */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-primary dark:text-white">
            Nuestros Valores
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-primary-light"
              >
                <h3 className="text-xl font-semibold text-primary dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-primary dark:text-white">
            Nuestro Equipo
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-4 ring-secondary">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-primary dark:text-white">
                  {member.name}
                </h3>
                <p className="text-secondary-light">{member.role}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-lg bg-secondary px-6 py-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold">¿Listo para Viajar con Nosotros?</h2>
          <p className="mt-4 text-lg">
            Déjanos ayudarte a crear el viaje de tus sueños
          </p>
          <button className="mt-8 rounded-lg bg-white px-8 py-3 font-semibold text-accent hover:bg-gray-100 transition-colors">
            Contactar Ahora
          </button>
        </motion.div>
      </div>
    </div>
  );
} 