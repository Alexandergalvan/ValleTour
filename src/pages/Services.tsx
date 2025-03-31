import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CalendarIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PhoneIcon,
  MapIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    title: 'Asesoría Personalizada',
    description: 'Nuestros expertos te ayudarán a planificar el viaje perfecto según tus preferencias y necesidades.',
    icon: UserGroupIcon,
  },
  {
    title: 'Reservas Completas',
    description: 'Gestionamos todas las reservas necesarias: hoteles, vuelos, tours y actividades.',
    icon: CalendarIcon,
  },
  {
    title: 'Seguro de Viaje',
    description: 'Protección completa durante tu viaje con las mejores coberturas.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Facilidades de Pago',
    description: 'Opciones flexibles de pago y planes de financiamiento disponibles.',
    icon: CreditCardIcon,
  },
  {
    title: 'Asistencia 24/7',
    description: 'Soporte continuo durante todo tu viaje, estés donde estés.',
    icon: PhoneIcon,
  },
  {
    title: 'Itinerarios Personalizados',
    description: 'Diseñamos itinerarios únicos adaptados a tus intereses y tiempo.',
    icon: MapIcon,
  },
];

const features = [
  {
    title: 'Experiencia y Profesionalismo',
    description: 'Más de 10 años brindando experiencias inolvidables a nuestros clientes.',
  },
  {
    title: 'Destinos Exclusivos',
    description: 'Acceso a lugares únicos y experiencias auténticas en todo el país.',
  },
  {
    title: 'Mejor Precio Garantizado',
    description: 'Ofrecemos las mejores tarifas y descuentos especiales para nuestros clientes.',
  },
  {
    title: 'Atención Personalizada',
    description: 'Cada cliente es único y merece una atención especial y dedicada.',
  },
];

export default function Services() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20 dark:from-primary/10">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  Nuestros Servicios
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Ofrecemos una amplia gama de servicios para hacer de tu viaje una experiencia única e inolvidable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Todo lo que necesitas para un viaje perfecto
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Nos destacamos por ofrecer un servicio integral y personalizado, asegurando que cada detalle de tu viaje sea perfecto.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  {feature.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.375rem] bg-gradient-to-tr from-primary to-secondary"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 33.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            ¿Listo para comenzar tu aventura?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Contáctanos hoy mismo y comienza a planificar tu próximo viaje inolvidable.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/contacto"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Contáctanos
            </a>
            <a href="/destinos" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Ver destinos <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 