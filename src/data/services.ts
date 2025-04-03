export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'hotels' | 'transport' | 'packages' | 'guides' | 'security' | 'culture';
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  features: string[];
  image?: string;
  location?: string;
}

export const services: Service[] = [
  {
    id: 'hotels-luxury',
    title: 'Hoteles Coloniales de Lujo',
    description: 'Alojamiento en históricos edificios coloniales convertidos en hoteles de lujo en el centro histórico de Oaxaca.',
    category: 'hotels',
    location: 'Centro Histórico, Oaxaca de Juárez',
    price: {
      min: 2500,
      max: 6000,
      currency: 'MXN'
    },
    features: [
      'Patios coloniales restaurados',
      'Vistas al Zócalo y Catedral',
      'Spa con temazcal tradicional',
      'Restaurante con cocina oaxaqueña',
      'Terraza con vista panorámica',
      'Servicio de conserjería 24/7',
      'WiFi de alta velocidad'
    ]
  },
  {
    id: 'hotels-budget',
    title: 'Hostales Coloniales',
    description: 'Alojamiento económico en edificios coloniales restaurados, perfectos para mochileros y viajeros independientes.',
    category: 'hotels',
    location: 'Centro Histórico, Oaxaca de Juárez',
    price: {
      min: 400,
      max: 1200,
      currency: 'MXN'
    },
    features: [
      'Patio colonial compartido',
      'Cocina comunitaria',
      'Área de descanso',
      'WiFi gratuito',
      'Ubicación céntrica',
      'Servicio de lavandería',
      'Tours organizados'
    ]
  },
  {
    id: 'transport-private',
    title: 'Transporte Privado a Sitios Arqueológicos',
    description: 'Servicio de transporte privado a Monte Albán, Mitla y otros sitios arqueológicos importantes.',
    category: 'transport',
    location: 'Oaxaca de Juárez y alrededores',
    price: {
      min: 1000,
      max: 2500,
      currency: 'MXN'
    },
    features: [
      'Vehículos con aire acondicionado',
      'Conductores certificados bilingües',
      'Seguro de viajero incluido',
      'Agua embotellada incluida',
      'Paradas en miradores',
      'Flexibilidad de horarios',
      'Información turística durante el trayecto'
    ]
  },
  {
    id: 'transport-shared',
    title: 'Transporte Compartido a Pueblos Mágicos',
    description: 'Servicio de transporte compartido a pueblos mágicos como San Martín Tilcajete y Teotitlán del Valle.',
    category: 'transport',
    location: 'Valles Centrales de Oaxaca',
    price: {
      min: 250,
      max: 600,
      currency: 'MXN'
    },
    features: [
      'Vehículos modernos',
      'Rutas preestablecidas',
      'Puntos de recogida fijos',
      'Servicio económico',
      'Ideal para grupos pequeños',
      'Paradas en talleres artesanales',
      'Guía local incluido'
    ]
  },
  {
    id: 'packages-luxury',
    title: 'Experiencia Oaxaqueña Premium',
    description: 'Paquete turístico completo que incluye los mejores sitios y experiencias de Oaxaca.',
    category: 'packages',
    location: 'Oaxaca y alrededores',
    price: {
      min: 18000,
      max: 35000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel colonial de lujo',
      'Transporte privado a todos los sitios',
      'Guía turístico personalizado bilingüe',
      'Visita a Monte Albán y Mitla',
      'Tour de mezcal en Matatlán',
      'Clase de cocina oaxaqueña',
      'Seguro de viaje premium',
      'Comidas gourmet incluidas',
      'Acceso a eventos culturales exclusivos'
    ]
  },
  {
    id: 'packages-budget',
    title: 'Descubre Oaxaca',
    description: 'Paquete turístico económico que cubre los principales atractivos de Oaxaca.',
    category: 'packages',
    location: 'Oaxaca y alrededores',
    price: {
      min: 6000,
      max: 12000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hostal colonial',
      'Transporte compartido a sitios principales',
      'Guía turístico grupal',
      'Visita a Monte Albán',
      'Tour de mezcal básico',
      'Clase de cocina básica',
      'Seguro de viaje básico',
      'Comidas incluidas',
      'Acceso a eventos culturales'
    ]
  },
  {
    id: 'guides-private',
    title: 'Guías Culturales Privados',
    description: 'Guías turísticos especializados en la historia y cultura de Oaxaca.',
    category: 'guides',
    location: 'Oaxaca de Juárez y alrededores',
    price: {
      min: 1200,
      max: 3000,
      currency: 'MXN'
    },
    features: [
      'Conocimiento profundo de la historia oaxaqueña',
      'Dominio de zapoteco y español',
      'Rutas personalizadas',
      'Atención personalizada',
      'Flexibilidad de horarios',
      'Acceso a sitios especiales',
      'Información cultural detallada'
    ]
  },
  {
    id: 'guides-group',
    title: 'Tours Culturales Grupales',
    description: 'Tours guiados para grupos que exploran la riqueza cultural de Oaxaca.',
    category: 'guides',
    location: 'Oaxaca de Juárez y alrededores',
    price: {
      min: 350,
      max: 900,
      currency: 'MXN'
    },
    features: [
      'Explicaciones detalladas en español',
      'Rutas preestablecidas',
      'Atención a grupos',
      'Precio por persona',
      'Horarios fijos',
      'Visitas a mercados locales',
      'Información histórica'
    ]
  },
  {
    id: 'security-basic',
    title: 'Seguridad Básica para Viajeros',
    description: 'Servicios básicos de seguridad para tu viaje por Oaxaca.',
    category: 'security',
    location: 'Oaxaca de Juárez',
    price: {
      min: 600,
      max: 1200,
      currency: 'MXN'
    },
    features: [
      'Seguro de viaje básico',
      'Asistencia 24/7 en español',
      'Información de emergencia local',
      'Contactos de emergencia locales',
      'Guía de seguridad regional',
      'Mapas de zonas seguras',
      'Asistencia médica básica'
    ]
  },
  {
    id: 'security-premium',
    title: 'Seguridad Premium Oaxaca',
    description: 'Servicios de seguridad completos con atención personalizada en Oaxaca.',
    category: 'security',
    location: 'Oaxaca de Juárez',
    price: {
      min: 1800,
      max: 3500,
      currency: 'MXN'
    },
    features: [
      'Seguro de viaje premium',
      'Asistencia médica 24/7 bilingüe',
      'Evacuación médica',
      'Seguro de equipaje',
      'Asistencia legal local',
      'Servicio de concierge de seguridad',
      'Transporte de emergencia',
      'Asistencia en caso de pérdida de documentos'
    ]
  },
  {
    id: 'culture-language',
    title: 'Clases de Zapoteco y Mixteco',
    description: 'Aprende los idiomas indígenas de Oaxaca con profesores nativos.',
    category: 'culture',
    location: 'Oaxaca de Juárez',
    price: {
      min: 350,
      max: 900,
      currency: 'MXN'
    },
    features: [
      'Profesores nativos certificados',
      'Material didáctico incluido',
      'Clases personalizadas',
      'Práctica conversacional',
      'Certificado de participación',
      'Visitas a comunidades indígenas',
      'Inmersión cultural'
    ]
  },
  {
    id: 'culture-workshops',
    title: 'Talleres de Artesanías Oaxaqueñas',
    description: 'Talleres prácticos de artesanías tradicionales de Oaxaca.',
    category: 'culture',
    location: 'Oaxaca de Juárez y pueblos aledaños',
    price: {
      min: 600,
      max: 1800,
      currency: 'MXN'
    },
    features: [
      'Talleres de alebrijes en San Martín Tilcajete',
      'Clases de cocina oaxaqueña tradicional',
      'Talleres de textiles en Teotitlán del Valle',
      'Talleres de barro negro en San Bartolo Coyotepec',
      'Materiales incluidos',
      'Instructores expertos locales',
      'Certificado de participación',
      'Visitas a talleres artesanales'
    ]
  }
]; 