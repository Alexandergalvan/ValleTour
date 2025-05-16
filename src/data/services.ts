export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'packages' | 'hotels' | 'transport' | 'guides' | 'security' | 'culture';
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  features: string[];
  image?: string;
  location?: string;
  duration?: string;
  difficulty?: 'Fácil' | 'Moderado' | 'Intenso';
  groupSize?: string;
}

export const services: Service[] = [
  {
    id: 'package-romantic',
    title: 'Escape Romántico en Oaxaca',
    description: 'Un viaje íntimo y romántico diseñado especialmente para parejas, combinando lujo, gastronomía y momentos inolvidables.',
    category: 'packages',
    location: 'Oaxaca y Valles Centrales',
    duration: '4 días / 3 noches',
    difficulty: 'Fácil',
    groupSize: '2 personas',
    image: '/packages/romantic.webp',
    price: {
      min: 35000,
      max: 45000,
      currency: 'MXN'
    },
    features: [
      'Suite romántica con jacuzzi privado',
      'Desayuno en la cama',
      'Cena romántica privada en el hotel',
      'Tour privado de mezcal artesanal',
      'Masaje de pareja en spa',
      'Paseo en globo aerostático al amanecer',
      'Picnic romántico en el campo',
      'Guía privado bilingüe',
      'Transporte privado con chofer',
      'Seguro de viaje premium',
      'Champagne de bienvenida',
      'Decoración romántica en la habitación'
    ]
  },
  {
    id: 'vegas-family',
    title: 'Aventura Familiar en Las Vegas',
    description: 'Un paquete especial diseñado para familias que quieren disfrutar de Las Vegas más allá de los casinos, con actividades para todas las edades.',
    category: 'packages',
    location: 'Las Vegas, Nevada',
    duration: '5 días / 4 noches',
    difficulty: 'Fácil',
    groupSize: '4-6 personas',
    image: '/packages/vegas-family.webp',
    price: {
      min: 45000,
      max: 65000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel familiar con piscina',
      'Entradas a espectáculos familiares',
      'Tour por el Grand Canyon',
      'Visita a parques temáticos',
      'Desayunos incluidos',
      'Transporte privado',
      'Guía especializado en tours familiares',
      'Seguro de viaje familiar'
    ]
  },
  {
    id: 'paris-solo',
    title: 'Escape Individual en París',
    description: 'Una experiencia personalizada para descubrir la Ciudad de la Luz a tu propio ritmo, perfecta para viajeros independientes.',
    category: 'packages',
    location: 'París, Francia',
    duration: '6 días / 5 noches',
    difficulty: 'Fácil',
    groupSize: '1 persona',
    image: '/packages/paris-solo.webp',
    price: {
      min: 55000,
      max: 75000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel boutique en el centro',
      'Tour privado por los museos principales',
      'Paseo en barco por el Sena',
      'Clase de cocina francesa',
      'Tarjeta de transporte ilimitado',
      'Desayunos incluidos',
      'Asistente personal de viaje',
      'Seguro de viaje individual'
    ]
  },
  {
    id: 'package-cultural',
    title: 'Ruta Cultural Oaxaqueña',
    description: 'Un viaje inmersivo por la riqueza cultural de Oaxaca, explorando sus tradiciones, gastronomía y arte popular.',
    category: 'packages',
    location: 'Oaxaca y Valles Centrales',
    duration: '5 días / 4 noches',
    difficulty: 'Fácil',
    groupSize: '2-8 personas',
    image: '/packages/cultural.webp',
    price: {
      min: 25000,
      max: 35000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel boutique colonial',
      'Visita a Monte Albán y Mitla',
      'Taller de alebrijes en San Martín Tilcajete',
      'Clase de cocina oaxaqueña tradicional',
      'Tour de mezcal artesanal en Matatlán',
      'Visita a Teotitlán del Valle para textiles',
      'Degustación de chocolate artesanal',
      'Guía especializado bilingüe',
      'Transporte privado con chofer',
      'Seguro de viaje premium'
    ]
  },
  {
    id: 'package-adventure',
    title: 'Aventura en la Sierra Norte',
    description: 'Explora la impresionante Sierra Norte de Oaxaca con este paquete de aventura y ecoturismo.',
    category: 'packages',
    location: 'Sierra Norte de Oaxaca',
    duration: '4 días / 3 noches',
    difficulty: 'Moderado',
    groupSize: '4-12 personas',
    image: '/packages/adventure.webp',
    price: {
      min: 18000,
      max: 28000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en cabañas ecológicas',
      'Senderismo en bosques de pino-encino',
      'Ciclismo de montaña',
      'Avistamiento de aves',
      'Visita a cascadas naturales',
      'Temazcal tradicional',
      'Comidas típicas de la región',
      'Guía local especializado',
      'Equipo de seguridad completo',
      'Transporte desde Oaxaca'
    ]
  },
  {
    id: 'package-coast',
    title: 'Paraíso Costeño',
    description: 'Descubre las hermosas playas y la cultura costera de Oaxaca en este paquete relajante.',
    category: 'packages',
    location: 'Costa de Oaxaca',
    duration: '6 días / 5 noches',
    difficulty: 'Fácil',
    groupSize: '2-6 personas',
    image: '/packages/coast.webp',
    price: {
      min: 32000,
      max: 45000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel frente al mar',
      'Visita a playas vírgenes',
      'Snorkel en arrecifes',
      'Avistamiento de tortugas marinas',
      'Tour de pesca tradicional',
      'Clase de cocina costeña',
      'Masaje relajante',
      'Transporte privado',
      'Guía local bilingüe',
      'Seguro de viaje'
    ]
  },
  {
    id: 'package-gastronomic',
    title: 'Ruta Gastronómica Premium',
    description: 'Un viaje culinario por los sabores más auténticos de Oaxaca, desde mercados tradicionales hasta restaurantes de autor.',
    category: 'packages',
    location: 'Oaxaca y alrededores',
    duration: '4 días / 3 noches',
    difficulty: 'Fácil',
    groupSize: '2-6 personas',
    image: '/packages/gastronomic.webp',
    price: {
      min: 28000,
      max: 38000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel boutique',
      'Tour de mercados tradicionales',
      'Clase de cocina con chef local',
      'Cena en restaurantes de autor',
      'Tour de mezcal premium',
      'Degustación de chocolate artesanal',
      'Visita a productores locales',
      'Guía gastronómico especializado',
      'Transporte privado',
      'Recetario exclusivo'
    ]
  },
  {
    id: 'package-magical',
    title: 'Pueblos Mágicos y Artesanías',
    description: 'Explora los pueblos mágicos de Oaxaca y descubre sus tradiciones artesanales centenarias.',
    category: 'packages',
    location: 'Valles Centrales de Oaxaca',
    duration: '5 días / 4 noches',
    difficulty: 'Fácil',
    groupSize: '2-8 personas',
    image: '/packages/magical.webp',
    price: {
      min: 22000,
      max: 32000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel colonial',
      'Visita a talleres artesanales',
      'Clase de barro negro en San Bartolo',
      'Taller de textiles en Teotitlán',
      'Tour de alebrijes en Tilcajete',
      'Visita a mercados artesanales',
      'Guía especializado en artesanías',
      'Transporte privado',
      'Comidas tradicionales incluidas',
      'Seguro de viaje'
    ]
  },
  {
    id: 'package-wellness',
    title: 'Retiro de Bienestar',
    description: 'Un paquete diseñado para la relajación y el bienestar, combinando tradiciones ancestrales con prácticas modernas.',
    category: 'packages',
    location: 'Oaxaca y Valles Centrales',
    duration: '4 días / 3 noches',
    difficulty: 'Fácil',
    groupSize: '2-6 personas',
    image: '/packages/wellness.webp',
    price: {
      min: 30000,
      max: 40000,
      currency: 'MXN'
    },
    features: [
      'Alojamiento en hotel spa',
      'Sesiones de yoga diarias',
      'Temazcal tradicional',
      'Masajes terapéuticos',
      'Meditación guiada',
      'Clase de cocina saludable',
      'Tour de hierbas medicinales',
      'Instructor de bienestar personal',
      'Transporte privado',
      'Comidas orgánicas incluidas'
    ]
  },
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