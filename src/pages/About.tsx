import { memo, lazy, Suspense } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// Lazy load components
const TeamMember = lazy(() => import('../components/TeamMember'));
const ValueCard = lazy(() => import('../components/ValueCard'));
const StatCard = lazy(() => import('../components/StatCard'));

// Memoized data
const teamMembers = [
  {
    name: 'Sally Yuritzy',
    role: 'CEO & Fundadora',
    image: '/team/sally.webp',
    description:
      'Con más de 15 años de experiencia en el sector turístico, Sally fundó ValleTour con la visión de crear experiencias únicas y memorables.',
  },
  {
    name: 'Eduardo Del Angel',
    role: 'Director de Operaciones',
    image: '/team/eduardo.webp',
    description:
      'Experto en logística y operaciones, Eduardo asegura que cada viaje sea perfecto hasta el último detalle.',
  },
  {
    name: 'Sarahi Alvarez',
    role: 'Directora de Experiencias',
    image: '/team/sarahi.webp',
    description:
      'Sarahi se especializa en crear itinerarios únicos que combinan aventura, cultura y autenticidad.',
  },
  {
    name: 'Alexander Galvan',
    role: 'Director de Tecnología',
    image: '/team/alexander.webp',
    description:
      'Alexander lidera la transformación digital de ValleTour, mejorando la experiencia de nuestros clientes.',
  },
  {
    name: 'Homero Treviño',
    role: 'Director de Marketing y Ventas',
    image: '/team/homero.webp',
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

// Memoized components
const HeroSection = memo(() => (
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
));

const StatsSection = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-16 grid grid-cols-2 gap-8 rounded-lg bg-white p-8 shadow-lg dark:bg-primary-light md:grid-cols-4"
  >
    {stats.map((stat, index) => (
      <Suspense key={index} fallback={<div className="h-20 animate-pulse bg-gray-200 rounded" />}>
        <StatCard {...stat} />
      </Suspense>
    ))}
  </motion.div>
));

const ValuesSection = memo(() => (
  <div className="mt-24">
    <h2 className="text-center text-3xl font-bold text-primary dark:text-white">
      Nuestros Valores
    </h2>
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {values.map((value, index) => (
        <Suspense key={value.title} fallback={<div className="h-40 animate-pulse bg-gray-200 rounded" />}>
          <ValueCard {...value} index={index} />
        </Suspense>
      ))}
    </div>
  </div>
));

const TeamSection = memo(() => (
  <div className="mt-24">
    <h2 className="text-center text-3xl font-bold text-primary dark:text-white">
      Nuestro Equipo
    </h2>
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {teamMembers.map((member, index) => (
        <Suspense key={member.name} fallback={<div className="h-64 animate-pulse bg-gray-200 rounded-full" />}>
          <TeamMember {...member} index={index} />
        </Suspense>
      ))}
    </div>
  </div>
));

const CTASection = memo(() => (
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
    <button className="mt-8 rounded-lg bg-white px-8 py-3 font-semibold text-accent transition-colors hover:bg-gray-100">
      Contactar Ahora
    </button>
  </motion.div>
));

export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-primary">
        <div className="container mx-auto px-4">
          <HeroSection />
          <StatsSection />
          <ValuesSection />
          <TeamSection />
          <CTASection />
        </div>
      </div>
    </LazyMotion>
  );
} 