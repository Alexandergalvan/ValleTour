import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

const footerNavigation = {
  destinos: [
    { name: 'Mitla', href: '/destinos/mitla' },
    { name: 'Monte Albán', href: '/destinos/monte-alban' },
    { name: 'Centro Historico de Oaxaca', href: '/destinos/centro-historico' },
    { name: 'Bahías de Huatulco', href: '/destinos/bahias-huatulco' },
  ],
  servicios: [
    { name: 'Tours Guiados', href: '/servicios#tours' },
    { name: 'Paquetes Turísticos', href: '/servicios#paquetes' },
    { name: 'Transporte', href: '/servicios#transporte' },
    { name: 'Alojamiento', href: '/servicios#alojamiento' },
  ],
  empresa: [
    { name: 'Sobre Nosotros', href: '/nosotros' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Trabaja con Nosotros', href: '/careers' },
  ],
  legal: [
    { name: 'Términos y Condiciones', id: 'terminos' },
    { name: 'Política de Privacidad', id: 'privacidad' },
    { name: 'Política de Cookies', id: 'cookies' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/valletour',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/valletour',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/valletour',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

const legalContent = {
  terminos: {
    title: 'Términos y Condiciones',
    content: `
      <div class="space-y-6">
        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">1. Aceptación de los Términos</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Al acceder y utilizar ValleTour, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestros servicios.</p>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">2. Servicios</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">ValleTour ofrece servicios de turismo y viajes en la región de Oaxaca, incluyendo:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Tours guiados personalizados</li>
            <li>Paquetes turísticos completos</li>
            <li>Servicios de transporte privado</li>
            <li>Asesoría turística especializada</li>
            <li>Reservaciones de alojamiento</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">3. Reservaciones y Pagos</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Las reservaciones están sujetas a disponibilidad y confirmación. Los precios pueden variar según la temporada y la demanda. Para garantizar su reservación:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Se requiere un depósito del 30% del valor total</li>
            <li>El pago completo debe realizarse 48 horas antes del servicio</li>
            <li>Aceptamos pagos con tarjeta de crédito/débito y transferencias bancarias</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">4. Cancelaciones y Reembolsos</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Nuestra política de cancelación es la siguiente:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Cancelación con más de 48 horas de anticipación: reembolso completo</li>
            <li>Cancelación entre 24 y 48 horas: reembolso del 50%</li>
            <li>Cancelación con menos de 24 horas: no hay reembolso</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">5. Responsabilidades</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">ValleTour se compromete a:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Proporcionar servicios de alta calidad</li>
            <li>Garantizar la seguridad de nuestros clientes</li>
            <li>Respetar los horarios establecidos</li>
            <li>Proporcionar guías profesionales y certificados</li>
          </ul>
        </section>
      </div>
    `
  },
  privacidad: {
    title: 'Política de Privacidad',
    content: `
      <div class="space-y-6">
        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">1. Información que Recopilamos</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Recopilamos la siguiente información personal:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Información de pago</li>
            <li>Preferencias de viaje</li>
            <li>Documentos de identificación (cuando sea necesario)</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">2. Uso de la Información</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Utilizamos su información para:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Procesar sus reservaciones</li>
            <li>Enviar confirmaciones y actualizaciones</li>
            <li>Personalizar su experiencia</li>
            <li>Mejorar nuestros servicios</li>
            <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">3. Protección de Datos</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Su información está protegida mediante:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Encriptación SSL</li>
            <li>Almacenamiento seguro</li>
            <li>Acceso restringido al personal autorizado</li>
            <li>Cumplimiento con la normativa de protección de datos</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">4. Sus Derechos</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Usted tiene derecho a:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Acceder a sus datos personales</li>
            <li>Rectificar información incorrecta</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Retirar su consentimiento en cualquier momento</li>
          </ul>
        </section>
      </div>
    `
  },
  cookies: {
    title: 'Política de Cookies',
    content: `
      <div class="space-y-6">
        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">1. ¿Qué son las Cookies?</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Estas nos ayudan a:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>Recordar sus preferencias</li>
            <li>Mejorar su experiencia de navegación</li>
            <li>Analizar el uso del sitio</li>
            <li>Personalizar el contenido</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">2. Tipos de Cookies que Utilizamos</h4>
          <div class="mb-4">
            <h5 class="font-semibold mb-2 text-primary dark:text-white">Cookies Esenciales</h5>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Necesarias para el funcionamiento básico del sitio. No pueden ser desactivadas.</p>
            
            <h5 class="font-semibold mb-2 text-primary dark:text-white">Cookies de Rendimiento</h5>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio.</p>
            
            <h5 class="font-semibold mb-2 text-primary dark:text-white">Cookies de Funcionalidad</h5>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Permiten recordar sus preferencias y personalizar su experiencia.</p>
            
            <h5 class="font-semibold mb-2 text-primary dark:text-white">Cookies de Marketing</h5>
            <p class="text-gray-600 dark:text-gray-300">Utilizadas para mostrar anuncios relevantes y rastrear campañas.</p>
          </div>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">3. Control de Cookies</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Puede controlar y eliminar las cookies a través de:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
            <li>La configuración de su navegador</li>
            <li>Nuestro panel de preferencias de cookies</li>
            <li>Herramientas de terceros de gestión de cookies</li>
          </ul>
        </section>

        <section>
          <h4 class="text-lg font-semibold mb-3 text-primary dark:text-white">4. Actualizaciones de la Política</h4>
          <p class="mb-4 text-gray-600 dark:text-gray-300">Nos reservamos el derecho de actualizar esta política de cookies en cualquier momento. Le notificaremos cualquier cambio significativo a través de nuestro sitio web.</p>
        </section>
      </div>
    `
  }
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <footer className="bg-white dark:bg-primary" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-full px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="h-12 w-auto"
              src="/logo.webp"
              alt="ValleTour"
            />
            <p className="text-sm leading-6 text-primary dark:text-gray-300">
              Descubre los destinos más fascinantes de Oaxaca con los mejores guías y servicios turísticos.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-primary dark:text-white">Destinos</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.destinos.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-primary dark:text-white">Servicios</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.servicios.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-primary dark:text-white">Empresa</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.empresa.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-primary dark:text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => openModal(item.id)}
                        className="text-sm leading-6 text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary-light"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 dark:border-primary-light sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ValleTour. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Modales */}
      {Object.entries(legalContent).map(([key, content]) => (
        <Modal
          key={key}
          isOpen={activeModal === key}
          onClose={closeModal}
          title={content.title}
        >
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </Modal>
      ))}
    </footer>
  );
} 