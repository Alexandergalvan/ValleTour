import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Make Buffer available globally
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    objectFit: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: '#1a365d',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1 solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2d3748',
    marginBottom: 10,
    backgroundColor: '#f7fafc',
    padding: '6 10',
    borderRadius: 4,
  },
  text: {
    fontSize: 11,
    color: '#4a5568',
    marginBottom: 6,
    lineHeight: 1.4,
  },
  list: {
    marginLeft: 12,
    marginTop: 6,
  },
  listItem: {
    fontSize: 11,
    color: '#4a5568',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  highlight: {
    color: '#2b6cb0',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  gridItem: {
    width: '50%',
    marginBottom: 6,
    paddingRight: 10,
  },
  costTable: {
    marginTop: 8,
    borderTop: '1 solid #e2e8f0',
    borderLeft: '1 solid #e2e8f0',
  },
  costRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e2e8f0',
  },
  costCell: {
    padding: 6,
    borderRight: '1 solid #e2e8f0',
    fontSize: 10,
  },
  costHeader: {
    backgroundColor: '#f7fafc',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#718096',
    borderTop: '1 solid #e2e8f0',
    paddingTop: 10,
  },
  divider: {
    borderBottom: '1 dashed #e2e8f0',
    marginVertical: 10,
  },
  italicText: {
    fontStyle: 'italic',
    fontSize: 10,
    color: '#718096',
    marginTop: 4,
  },
  dayTitle: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
    backgroundColor: '#EBF8FF',
    padding: '4 8',
    borderRadius: 4,
  },
  activityTitle: {
    fontSize: 12,
    color: '#2c5282',
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 2,
  },
  recommendationBox: {
    backgroundColor: '#F0FFF4',
    padding: 8,
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 12,
    color: '#276749',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mapImage: {
    width: 250,
    height: 150,
    marginVertical: 10,
    alignSelf: 'center',
  },
  weatherBox: {
    backgroundColor: '#FFFAF0',
    padding: 8,
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 10,
  },
  alertBox: {
    backgroundColor: '#FFF5F5',
    padding: 8,
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 10,
  },
  tipsBox: {
    backgroundColor: '#E6FFFA',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  }
});

interface TripPDFProps {
  preferences: {
    duration: number;
    startDate: string;
    budget: string;
    interests: string[];
    travelStyle: string;
    accommodation: string;
    transportation: string;
    groupSize: number;
    mealPreferences: string[];
    activities: string[];
    accessibility: string[];
    languages: string[];
  };
}

const TripPDF = ({ preferences }: TripPDFProps) => {
  const formatDate = (date: string) => {
    if (!date) return 'Fecha por definir';
    try {
      return new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Fecha por definir';
    }
  };

  const getDateForDay = (startDate: string, dayOffset: number) => {
    if (!startDate) return 'Fecha por definir';
    try {
      const date = new Date(startDate);
      date.setDate(date.getDate() + dayOffset);
      return date.toLocaleDateString('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    } catch {
      return 'Fecha por definir';
    }
  };

  const getBudgetText = (budget: string) => {
    switch (budget) {
      case 'economic':
        return 'Económico ($500-1,000 MXN por día)';
      case 'moderate':
        return 'Moderado ($1,000-2,500 MXN por día)';
      case 'comfort':
        return 'Confort ($2,500-5,000 MXN por día)';
      case 'luxury':
        return 'Lujo ($5,000+ MXN por día)';
      default:
        return 'Presupuesto por definir';
    }
  };

  const getBudgetDescription = (budget: string) => {
    switch (budget) {
      case 'economic':
        return 'Ideal para viajeros que buscan experiencias auténticas y económicas, optimizando cada peso gastado. Recomendamos hospedaje en hostales, transporte público y comer en mercados locales.';
      case 'moderate':
        return 'Perfecto para quienes buscan un balance entre comodidad y valor, con opciones de calidad a precios razonables. Sugerimos hoteles de 3 estrellas, algunos tours guiados y una mezcla de restaurantes locales y establecimientos de mayor categoría.';
      case 'comfort':
        return 'Diseñado para viajeros que prefieren servicios de alta calidad y experiencias más exclusivas. Recomendamos hoteles boutique, transporte privado a los principales destinos y restaurantes reconocidos con la mejor gastronomía oaxaqueña.';
      case 'luxury':
        return 'Para quienes buscan lo mejor en cada aspecto del viaje, con servicios premium y atención personalizada. Sugerimos hospedaje en haciendas o hoteles 5 estrellas, chef privado, guía exclusivo y experiencias únicas no disponibles para el público general.';
      default:
        return '';
    }
  };

  const getTravelStyleText = (style: string) => {
    switch (style) {
      case 'luxury':
        return 'Viaje de Lujo';
      case 'comfort':
        return 'Viaje Confortable';
      case 'budget':
        return 'Viaje Económico';
      case 'adventure':
        return 'Viaje de Aventura';
      case 'cultural':
        return 'Viaje Cultural';
      default:
        return 'Estilo por definir';
    }
  };

  const getTravelStyleDescription = (style: string) => {
    switch (style) {
      case 'luxury':
        return 'Experiencias exclusivas y servicios premium con atención personalizada. Reservaremos para ti las mejores habitaciones, mesas en los restaurantes más prestigiosos y acceso VIP a eventos culturales.';
      case 'comfort':
        return 'Equilibrio perfecto entre comodidad y autenticidad. Priorizaremos experiencias de calidad con tiempo suficiente para disfrutar cada destino sin prisas, con opciones flexibles en tu itinerario.';
      case 'budget':
        return 'Enfoque en experiencias auténticas y eficiencia en costos. Te recomendaremos opciones económicas que maximicen tu presupuesto sin sacrificar las vivencias esenciales de Oaxaca.';
      case 'adventure':
        return 'Énfasis en actividades al aire libre y experiencias emocionantes. Tu itinerario incluirá senderismo, ecoturismo, deportes de aventura y encuentros con la naturaleza oaxaqueña.';
      case 'cultural':
        return 'Inmersión profunda en la cultura, tradiciones y costumbres locales. Visitarás museos, talleres artesanales, ceremonias tradicionales y tendrás interacción directa con comunidades indígenas.';
      default:
        return '';
    }
  };

  const getAccommodationText = (acc: string) => {
    switch (acc) {
      case 'hotel':
        return 'Hotel Tradicional';
      case 'boutique':
        return 'Hotel Boutique';
      case 'hostel':
        return 'Hostal';
      case 'apartment':
        return 'Apartamento';
      case 'hacienda':
        return 'Hacienda';
      default:
        return 'Alojamiento por definir';
    }
  };

  const getAccommodationDescription = (acc: string) => {
    switch (acc) {
      case 'hotel':
        return 'Servicios completos, comodidades estándar y atención profesional. Recomendamos: Hotel Misión de los Ángeles, Holiday Inn Express, Fiesta Inn Oaxaca.';
      case 'boutique':
        return 'Ambiente íntimo, diseño único y servicio personalizado. Sugerimos: Hotel Azul, Casa Oaxaca, El Callejón, Hotel Sin Nombre.';
      case 'hostel':
        return 'Ambiente social, opciones económicas y áreas comunes compartidas. Recomendamos: Hostal de la Noria, Azul Cielo Hostel, Casa Angel Youth Hostel.';
      case 'apartment':
        return 'Espacio privado con cocina equipada y ambiente hogareño. Sugerimos: Casona Oaxaca, Apartments Oaxaca Centro, Casa de las Bugambilias.';
      case 'hacienda':
        return 'Alojamiento histórico con arquitectura tradicional y ambiente auténtico. Recomendamos: Quinta Real Oaxaca, Hacienda Los Laureles, Casa Conzatti.';
      default:
        return '';
    }
  };

  const getTransportationText = (trans: string) => {
    switch (trans) {
      case 'private':
        return 'Transporte Privado';
      case 'shared':
        return 'Transporte Compartido';
      case 'public':
        return 'Transporte Público';
      case 'rental':
        return 'Auto Rentado';
      default:
        return 'Transporte por definir';
    }
  };

  const getTransportationDescription = (trans: string) => {
    switch (trans) {
      case 'private':
        return 'Máxima flexibilidad y comodidad con conductor personal. Te recomendamos los servicios de ADO para traslados largos y Taxi Turístico para movimientos locales. Precio aproximado: $1500 MXN por día.';
      case 'shared':
        return 'Opción económica compartiendo el viaje con otros turistas. Sugerimos servicios de shuttle como Huatulco Tours o Turismo El Convento. Precio aproximado: $300-500 MXN por trayecto.';
      case 'public':
        return 'Experiencia local auténtica usando el transporte de la ciudad. Recomendamos mototaxis para distancias cortas ($30-50 MXN), autobuses urbanos para movilidad en la ciudad ($8-10 MXN) y colectivos para viajes a pueblos cercanos ($20-50 MXN).';
      case 'rental':
        return 'Libertad total para explorar a tu propio ritmo. Agencias recomendadas: Hertz, Europcar y Budget. Precios desde $800 MXN diarios incluyendo seguro básico. Nota: se recomienda GPS y conocer las restricciones de circulación local.';
      default:
        return '';
    }
  };

  const getGroupSizeText = (size: number) => {
    if (!size || size < 1) return 'Tamaño del grupo por definir';
    if (size === 1) return 'Viaje Individual';
    if (size === 2) return 'Viaje en Pareja';
    if (size <= 4) return `Grupo Pequeño (${size} personas)`;
    if (size <= 8) return `Grupo Mediano (${size} personas)`;
    return `Grupo Grande (${size} personas)`;
  };

  const getGroupSizeDescription = (size: number) => {
    if (!size || size < 1) return '';
    if (size === 1) return 'Experiencia personalizada con máxima flexibilidad. Ideal para conocer gente nueva en hostales y tours grupales. Recomendamos actividades sociales y free tours.';
    if (size === 2) return 'Ideal para compartir momentos especiales en pareja. Sugerimos cenas románticas, recorridos por viñedos y alojamiento en hoteles boutique con atención personalizada.';
    if (size <= 4) return 'Perfecto para una experiencia íntima y personalizada. Recomendamos tours privados, restaurantes con servicio exclusivo y actividades temáticas personalizadas para su grupo.';
    if (size <= 8) return 'Buen balance entre socialización y atención personal. Sugerimos hospedaje en casas de alquiler completas, transporte privado tipo van y reservaciones anticipadas para todas las actividades.';
    return 'Ideal para eventos grupales y experiencias compartidas. Recomendamos coordinación anticipada con restaurantes, hoteles con bloques de habitaciones y guías dedicados exclusivamente a su grupo.';
  };

  const getEstimatedCosts = (budget: string) => {
    const costs = {
      accommodation: '',
      meals: '',
      activities: '',
      transportation: ''
    };

    switch (budget) {
      case 'economic':
        costs.accommodation = '$250-600 MXN por noche (hostal, Airbnb compartido)';
        costs.meals = '$150-300 MXN diarios (mercados, fondas, comida callejera)';
        costs.activities = '$0-200 MXN por actividad (tours gratuitos, sitios públicos)';
        costs.transportation = '$50-150 MXN diarios (transporte público, colectivos)';
        break;
      case 'moderate':
        costs.accommodation = '$600-1,500 MXN por noche (hotel 3★, Airbnb privado)';
        costs.meals = '$300-700 MXN diarios (restaurantes locales, algunos de mayor categoría)';
        costs.activities = '$200-600 MXN por actividad (tours grupales, entradas)';
        costs.transportation = '$150-400 MXN diarios (taxi, transporte compartido)';
        break;
      case 'comfort':
        costs.accommodation = '$1,500-3,500 MXN por noche (hotel 4★, hotel boutique)';
        costs.meals = '$700-1,500 MXN diarios (restaurantes reconocidos, experiencias gourmet)';
        costs.activities = '$600-1,200 MXN por actividad (tours privados, experiencias exclusivas)';
        costs.transportation = '$400-1,000 MXN diarios (auto rentado, servicios especiales)';
        break;
      case 'luxury':
        costs.accommodation = '$3,500-12,000 MXN por noche (hotel 5★, hacienda exclusiva)';
        costs.meals = '$1,500-3,000 MXN diarios (restaurantes premium, chef privado)';
        costs.activities = '$1,200-5,000 MXN por actividad (experiencias VIP, guías exclusivos)';
        costs.transportation = '$1,000-3,000 MXN diarios (chofer privado, vehículo premium)';
        break;
      default:
        costs.accommodation = 'Variable según elección';
        costs.meals = 'Variable según elección';
        costs.activities = 'Variable según elección';
        costs.transportation = 'Variable según elección';
    }

    return costs;
  };

  const getRecommendedAccommodations = (accommodation: string, budget: string) => {
    const recommendations: {
      [key: string]: {
        [key: string]: string[]
      }
    } = {
      economic: {
        hotel: ['Hotel Parador San Agustín ($600-800 MXN)', 'Hotel Aitana ($500-700 MXN)', 'Hotel Oaxaca Real ($550-750 MXN)'],
        boutique: ['Casa de las Bugambilias ($900-1200 MXN)', 'Hotel La Casona de Tita ($800-1000 MXN)'],
        hostel: ['Azul Cielo Hostel ($250-350 MXN)', 'Casa Angel Youth Hostel ($280-380 MXN)', 'Hostal de la Noria ($300-400 MXN)'],
        apartment: ['Departamentos en Jalatlaco ($450-700 MXN)', 'Estudios Centro Histórico ($500-800 MXN)'],
        hacienda: ['Posadas familiares en Santa María del Tule ($550-750 MXN)']
      },
      moderate: {
        hotel: ['Hotel Victoria Oaxaca ($1100-1500 MXN)', 'Hotel Fortin Plaza ($900-1300 MXN)', 'Hotel Casantica ($950-1200 MXN)'],
        boutique: ['Hotel Las Golondrinas ($1200-1600 MXN)', 'Hotel Casa del Sotano ($1000-1400 MXN)'],
        hostel: ['City Centro Hostel & Roof Garden ($400-550 MXN - habitación privada)', 'Cielo Rojo Hostel ($350-500 MXN - suite)'],
        apartment: ['Casita Oaxaqueña ($850-1100 MXN)', 'Departamentos La Fuente ($900-1200 MXN)'],
        hacienda: ['Hotel Hacienda Los Laureles ($1300-1800 MXN - temporada baja)']
      },
      comfort: {
        hotel: ['Hotel Quinta Real Oaxaca ($2500-3500 MXN)', 'Fiesta Americana ($2200-3200 MXN)', 'Holiday Inn Express ($1800-2800 MXN)'],
        boutique: ['Casa Oaxaca ($2800-3800 MXN)', 'Hotel Sin Nombre ($2500-3500 MXN)', 'El Callejón Hotel Boutique ($2300-3300 MXN)'],
        hostel: ['No disponible en esta categoría'],
        apartment: ['Casona Oaxaca ($2000-3000 MXN)', 'Suites Del Centro ($1800-2800 MXN)'],
        hacienda: ['Hotel Hacienda Los Laureles ($2500-3500 MXN - suite)']
      },
      luxury: {
        hotel: ['Quinta Real Oaxaca - Suite ($5000-8000 MXN)', 'Grand Fiesta Americana Oaxaca ($4500-7500 MXN)'],
        boutique: ['Hotel Azul de Oaxaca - Master Suite ($4000-6000 MXN)', 'Palacio Borghese ($3800-5800 MXN)'],
        hostel: ['No disponible en esta categoría'],
        apartment: ['Penthouse en el Centro Histórico ($3500-5500 MXN)'],
        hacienda: ['Casa Conzatti - Suite Exclusiva ($4500-7000 MXN)', 'Hacienda Los Laureles - Villa Privada ($6000-9000 MXN)']
      }
    };

    const budgetCategory = budget === 'economic' ? 'economic' : 
                          budget === 'moderate' ? 'moderate' : 
                          budget === 'comfort' ? 'comfort' : 
                          budget === 'luxury' ? 'luxury' : 'moderate';
    
    return recommendations[budgetCategory][accommodation] || [];
  };

  const getRecommendedRestaurants = (budget: string, mealPreferences: string[]) => {
    const restaurantList = [];
    
    const isVegetarianOrVegan = mealPreferences.some(pref => 
      ['Vegetariano', 'Vegano'].includes(pref));
    
    const isLocalFood = mealPreferences.includes('Comida Local');
    const isStreetFood = mealPreferences.includes('Street Food');
    
    if (budget === 'economic') {
      if (isLocalFood || restaurantList.length === 0) {
        restaurantList.push('Mercado 20 de Noviembre (comedores populares, $70-150 MXN por comida)');
        restaurantList.push('Mercado Benito Juárez (varios puestos, $60-130 MXN por persona)');
      }
      if (isStreetFood || restaurantList.length < 3) {
        restaurantList.push('Tlayudas del Llano (tlayudas tradicionales, $50-100 MXN)');
        restaurantList.push('Tacos del Carmen Alto (tacos y memelas, $40-80 MXN)');
      }
      if (isVegetarianOrVegan && restaurantList.length < 5) {
        restaurantList.push('La Jícara (opciones vegetarianas y veganas, $80-180 MXN por persona)');
      }
      
      // Completar con opciones económicas generales si es necesario
      if (restaurantList.length < 4) {
        restaurantList.push('Fonda Florecita (comida tradicional, $80-150 MXN por persona)');
        restaurantList.push('Itanoní (tortillería y antojería, $70-140 MXN por persona)');
      }
    } else if (budget === 'moderate') {
      if (isLocalFood || restaurantList.length === 0) {
        restaurantList.push('La Olla (cocina oaxaqueña tradicional, $180-350 MXN por persona)');
        restaurantList.push('Zandunga (cocina istmeña, $200-400 MXN por persona)');
      }
      if (isVegetarianOrVegan && restaurantList.length < 5) {
        restaurantList.push('Hierba Dulce (cocina vegana oaxaqueña, $150-300 MXN por persona)');
        restaurantList.push('Cabuche (opciones vegetarianas, $180-350 MXN por persona)');
      }
      
      // Completar con opciones moderadas generales si es necesario
      if (restaurantList.length < 4) {
        restaurantList.push('Catedral (cocina oaxaqueña contemporánea, $250-450 MXN por persona)');
        restaurantList.push('Los Danzantes (cocina mexicana contemporánea, $280-500 MXN por persona)');
      }
    } else if (budget === 'comfort' || budget === 'luxury') {
      if (isLocalFood || restaurantList.length === 0) {
        restaurantList.push('Casa Oaxaca El Restaurante (alta cocina oaxaqueña, $500-1000 MXN por persona)');
        restaurantList.push('Pitiona (cocina oaxaqueña de autor, $450-900 MXN por persona)');
      }
      if (isVegetarianOrVegan && restaurantList.length < 5) {
        restaurantList.push('Criollo (opciones vegetarianas gourmet, $600-1200 MXN por persona)');
      }
      
      // Completar con opciones premium generales si es necesario
      if (restaurantList.length < 4) {
        restaurantList.push('Origen (cocina de autor, $500-1000 MXN por persona)');
        restaurantList.push('Levadura de Olla (cocina gourmet, $450-900 MXN por persona)');
      }
      
      // Añadir opciones exclusivas para presupuesto de lujo
      if (budget === 'luxury' && restaurantList.length < 5) {
        restaurantList.push('Experiencia gastronómica privada con chef ($1500-3000 MXN por persona)');
        restaurantList.push('Cata de mezcales premium con maridaje ($800-1500 MXN por persona)');
      }
    }
    
    return restaurantList.slice(0, 5); // Limitar a 5 recomendaciones
  };

  const getRecommendedActivities = (interests: string[], activities: string[], budget: string) => {
    const allRecommendations = [];
    
    // Actividades basadas en intereses
    if (interests.includes('Cultura') || interests.includes('Historia')) {
      allRecommendations.push('Visita al Museo de las Culturas de Oaxaca (Ex-Convento de Santo Domingo)');
      allRecommendations.push('Recorrido guiado por el Centro Histórico');
      allRecommendations.push('Visita al Museo Textil de Oaxaca');
    }
    
    if (interests.includes('Arqueología')) {
      allRecommendations.push('Visita a la zona arqueológica de Monte Albán');
      allRecommendations.push('Exploración de las ruinas de Mitla');
      allRecommendations.push('Visita al sitio arqueológico de Yagul');
    }
    
    if (interests.includes('Artesanías')) {
      allRecommendations.push('Visita a los talleres de alebrijes en San Martín Tilcajete');
      allRecommendations.push('Recorrido por los telares de Teotitlán del Valle');
      allRecommendations.push('Visita a talleres de barro negro en San Bartolo Coyotepec');
    }
    
    if (interests.includes('Gastronomía')) {
      if (activities.includes('Clases de Cocina')) {
        allRecommendations.push('Clase de cocina tradicional oaxaqueña (aprende a preparar mole y tlayudas)');
      }
      allRecommendations.push('Tour gastronómico por los mercados locales');
      allRecommendations.push('Cata de mezcal con maridaje de platillos regionales');
    }
    
    if (interests.includes('Naturaleza') || interests.includes('Ecoturismo')) {
      if (activities.includes('Senderismo')) {
        allRecommendations.push('Senderismo en la Sierra Norte (Pueblos Mancomunados)');
      }
      allRecommendations.push('Visita a las cascadas petrificadas de Hierve el Agua');
      if (activities.includes('Observación de Aves')) {
        allRecommendations.push('Tour de observación de aves en la Sierra de Juárez');
      }
    }
    
    if (interests.includes('Aventura')) {
      if (activities.includes('Ciclismo')) {
        allRecommendations.push('Ruta de ciclismo de montaña por la Sierra Norte');
      }
      if (activities.includes('Kayak')) {
        allRecommendations.push('Kayak en la Presa Piedra Azul');
      }
      allRecommendations.push('Espeleología en las grutas de San Sebastián de las Grutas');
    }
    
    if (interests.includes('Pueblos Mágicos')) {
      allRecommendations.push('Visita a Tepoztlán y su mercado artesanal');
      allRecommendations.push('Recorrido por Capulálpam de Méndez, Pueblo Mágico en la Sierra Norte');
    }
    
    // Actividades específicas seleccionadas
    if (activities.includes('Tours Culturales')) {
      allRecommendations.push('Tour nocturno de leyendas en el centro histórico');
      allRecommendations.push('Visita guiada a la Biblioteca Burgoa y sus incunables');
    }
    
    if (activities.includes('Talleres Artesanales')) {
      allRecommendations.push('Taller de cerámica tradicional');
      allRecommendations.push('Clase de tejido en telar de cintura');
    }
    
    if (activities.includes('Yoga y Bienestar')) {
      allRecommendations.push('Sesión de temazcal (baño de vapor tradicional prehispánico)');
      allRecommendations.push('Clase de yoga al amanecer en un jardín histórico');
    }
    
    // Añadir experiencias exclusivas para presupuestos más altos
    if (budget === 'comfort' || budget === 'luxury') {
      allRecommendations.push('Tour privado en helicóptero sobre Monte Albán y los valles centrales');
      allRecommendations.push('Experiencia de mezcal: destilería exclusiva con el maestro mezcalero');
      
      if (budget === 'luxury') {
        allRecommendations.push('Cena privada con chef reconocido en locación histórica exclusiva');
        allRecommendations.push('Acceso VIP a celebraciones tradicionales como la Guelaguetza');
      }
    }
    
    // Filtrar duplicados y limitar a 8 recomendaciones para no sobrecargar
    return [...new Set(allRecommendations)].slice(0, 8);
  };

  const getSeasonalEvents = (startDate: string) => {
    if (!startDate) return [];
    
    const date = new Date(startDate);
    const month = date.getMonth() + 1; // getMonth() devuelve 0-11
    
    const events = [];
    
    switch (month) {
      case 1: // Enero
        events.push('Fiesta de la Virgen de la Juquila (todo el mes)');
        events.push('Celebraciones de Año Nuevo en comunidades zapotecas');
        break;
      case 2: // Febrero
        events.push('Carnaval en Villa de Zaachila (fechas variables en febrero)');
        events.push('Festival de Globos de Cantoya en San Andrés Huayapam');
        break;
      case 3: // Marzo
        events.push('Equinoccio de Primavera en Monte Albán (21 de marzo)');
        events.push('Procesiones de Semana Santa (fechas variables en marzo-abril)');
        break;
      case 4: // Abril
        events.push('Feria del Tejate y el Tamal en Santa María Zacatepec');
        events.push('Semana Santa con procesiones en Oaxaca capital');
        break;
      case 5: // Mayo
        events.push('Festival de la Nieve en Tlacolula (helados artesanales)');
        events.push('Fiesta de las Cruces de Mayo');
        break;
      case 6: // Junio
        events.push('Festival del Mole en San Pedro Mixtepec');
        events.push('Celebración de Corpus Christi con tapetes florales');
        break;
      case 7: // Julio
        events.push('Guelaguetza (últimos dos lunes de julio)');
        events.push('Feria del Tejate y Totopo en San Andrés Huayapam');
        events.push('Festival de los Moles en Oaxaca capital');
        break;
      case 8: // Agosto
        events.push('Festival del Mezcal (primera semana de agosto)');
        events.push('Fiesta de la Asunción (15 de agosto)');
        break;
      case 9: // Septiembre
        events.push('Fiestas Patrias (15-16 de septiembre)');
        events.push('Festival Gastronómico en Zimatlán');
        break;
      case 10: // Octubre
        events.push('Festival del Tamal en Tlalixtac de Cabrera');
        events.push('Inicio de preparativos para Día de Muertos');
        break;
      case 11: // Noviembre
        events.push('Día de Muertos (31 oct - 2 nov)');
        events.push('Festival de Arte y Cultura de Oaxaca');
        break;
      case 12: // Diciembre
        events.push('Noche de Rábanos (23 de diciembre)');
        events.push('Posadas y Calendas navideñas (16-24 de diciembre)');
        events.push('Procesión de la Virgen de la Soledad (18 de diciembre)');
        break;
      default:
        return [];
    }
    
    return events;
  };

  const getTravelTips = (preferences: TripPDFProps['preferences']) => {
    const tips = [
      'El centro histórico de Oaxaca es muy caminable. Lleve calzado cómodo para explorar a pie.',
      'La mayoría de los museos cierran los lunes. Planifique sus visitas culturales en otros días.',
      'Lleve siempre efectivo. Muchos negocios pequeños y mercados no aceptan tarjetas.',
      'El sol puede ser intenso, especialmente en zonas arqueológicas. Lleve protector solar, sombrero y agua.',
      'Pruebe el chocolate caliente oaxaqueño tradicional en cualquiera de los cafés del Zócalo.'
    ];
    
    // Añadir tips específicos según preferencias
    if (preferences.transportation === 'rental') {
      tips.push('Estacionar en el Centro Histórico puede ser complicado. Considere estacionamientos públicos como el del Mercado 20 de Noviembre.');
      tips.push('Algunas zonas arqueológicas tienen carreteras de acceso en condiciones variables. Consulte el estado antes de partir.');
    }
    
    if (preferences.transportation === 'public') {
      tips.push('Los colectivos (camionetas compartidas) son una forma económica y auténtica de viajar a pueblos cercanos. Salen cuando se llenan.');
      tips.push('Para usar el transporte público urbano, es útil tener ubicaciones guardadas offline en su teléfono.');
    }
    
    if (preferences.interests.includes('Gastronomía')) {
      tips.push('Los desayunos en los mercados (6-10 AM) ofrecen las experiencias culinarias más auténticas.');
      tips.push('Pruebe los siete moles de Oaxaca, cada uno con características únicas.');
    }
    
    if (preferences.mealPreferences.includes('Vegetariano') || preferences.mealPreferences.includes('Vegano')) {
      tips.push('Comunique claramente sus preferencias alimentarias, ya que muchos platillos tradicionales contienen caldo de pollo o manteca de cerdo.');
      tips.push('La app Happy Cow puede ayudarle a encontrar opciones vegetarianas y veganas en Oaxaca.');
    }
    
    if (preferences.accessibility.length > 0) {
      tips.push('Llamar con anticipación a los lugares que planea visitar para confirmar las condiciones de accesibilidad.');
      tips.push('El Centro Cultural Santo Domingo y el Museo de las Culturas de Oaxaca cuentan con rampas y ascensores.');
    }
    
    return tips;
  };

  const estimatedCosts = getEstimatedCosts(preferences.budget);
  const recommendedAccommodations = getRecommendedAccommodations(preferences.accommodation, preferences.budget);
  const recommendedRestaurants = getRecommendedRestaurants(preferences.budget, preferences.mealPreferences);
  const recommendedActivities = getRecommendedActivities(preferences.interests, preferences.activities, preferences.budget);
  const seasonalEvents = getSeasonalEvents(preferences.startDate);
  const travelTips = getTravelTips(preferences);

  const totalDays = preferences.duration || 0;
  const dailyCostEstimate = preferences.budget === 'economic' ? 1500 : 
                            preferences.budget === 'moderate' ? 2500 : 
                            preferences.budget === 'comfort' ? 5000 : 8000;
  const totalCostEstimate = totalDays * preferences.groupSize * dailyCostEstimate;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Image 
            src="/logo.png" 
            style={styles.logo}
            cache={false}
          />
          <Text style={styles.title}>Plan de Viaje Personalizado</Text>
          <Text style={styles.subtitle}>Oaxaca, México</Text>
          <Text style={styles.date}>Generado el {new Date().toLocaleDateString('es-MX')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen Ejecutivo</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Fecha de inicio: </Text>
                {formatDate(preferences.startDate)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Duración: </Text>
                {preferences.duration ? `${preferences.duration} días` : 'Por definir'}
              </Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Grupo: </Text>
                {getGroupSizeText(preferences.groupSize)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Presupuesto: </Text>
                {getBudgetText(preferences.budget)}
              </Text>
            </View>
          </View>
          {getGroupSizeDescription(preferences.groupSize) && (
            <Text style={styles.italicText}>
              {getGroupSizeDescription(preferences.groupSize)}
            </Text>
          )}
          {getBudgetDescription(preferences.budget) && (
            <Text style={styles.italicText}>
              {getBudgetDescription(preferences.budget)}
            </Text>
          )}

          {seasonalEvents.length > 0 && (
            <View style={styles.weatherBox}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Eventos en temporada para sus fechas:</Text>
              </Text>
              <View style={styles.list}>
                {seasonalEvents.map((event, index) => (
                  <Text key={index} style={styles.listItem}>• {event}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estilo de Viaje y Servicios</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Estilo: </Text>
                {getTravelStyleText(preferences.travelStyle)}
              </Text>
              {getTravelStyleDescription(preferences.travelStyle) && (
                <Text style={styles.italicText}>
                  {getTravelStyleDescription(preferences.travelStyle)}
                </Text>
              )}
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Alojamiento: </Text>
                {getAccommodationText(preferences.accommodation)}
              </Text>
              {getAccommodationDescription(preferences.accommodation) && (
                <Text style={styles.italicText}>
                  {getAccommodationDescription(preferences.accommodation)}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Transporte: </Text>
                {getTransportationText(preferences.transportation)}
              </Text>
              {getTransportationDescription(preferences.transportation) && (
                <Text style={styles.italicText}>
                  {getTransportationDescription(preferences.transportation)}
                </Text>
              )}
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Idiomas: </Text>
                {preferences.languages.join(', ')}
              </Text>
          </View>
          </View>

          {preferences.accessibility.length > 0 && (
            <View>
              <Text style={[styles.text, { marginTop: 8 }]}>
                <Text style={styles.highlight}>Necesidades de accesibilidad: </Text>
                {preferences.accessibility.join(', ')}
              </Text>
              <Text style={styles.italicText}>
                Hemos considerado sus necesidades en todas las recomendaciones incluidas en este plan.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intereses y Actividades</Text>
          
            {preferences.interests.length > 0 && (
            <View>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Intereses principales: </Text>
                {preferences.interests.join(', ')}
              </Text>
            </View>
            )}
            
            {preferences.activities.length > 0 && (
            <View>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Actividades preferidas: </Text>
                {preferences.activities.join(', ')}
                </Text>
            </View>
            )}

            {preferences.mealPreferences.length > 0 && (
            <View>
              <Text style={styles.text}>
                <Text style={styles.highlight}>Preferencias gastronómicas: </Text>
                {preferences.mealPreferences.join(', ')}
                </Text>
            </View>
          )}

          <View style={styles.recommendationBox}>
            <Text style={styles.recommendationTitle}>Actividades recomendadas según sus intereses:</Text>
            <View style={styles.list}>
              {recommendedActivities.map((activity, index) => (
                <Text key={index} style={styles.listItem}>• {activity}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alojamientos Recomendados</Text>
          <Text style={styles.text}>
            Basado en sus preferencias de {getAccommodationText(preferences.accommodation)} y un presupuesto {getBudgetText(preferences.budget).toLowerCase()}, le recomendamos:
                </Text>
          <View style={styles.list}>
            {recommendedAccommodations.map((accommodation, index) => (
              <Text key={index} style={styles.listItem}>• {accommodation}</Text>
            ))}
          </View>
          <Text style={styles.italicText}>
            *Los precios son aproximados y pueden variar según temporada y disponibilidad.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurantes Recomendados</Text>
          <Text style={styles.text}>
            Selección de establecimientos que se adaptan a sus preferencias gastronómicas:
                </Text>
          <View style={styles.list}>
            {recommendedRestaurants.map((restaurant, index) => (
              <Text key={index} style={styles.listItem}>• {restaurant}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinerario Recomendado</Text>
          {preferences.duration > 0 ? (
            Array.from({ length: Math.min(preferences.duration, 7) }).map((_, index) => (
              <View key={index}>
                <Text style={styles.dayTitle}>Día {index + 1}: {getDateForDay(preferences.startDate, index)}</Text>
                
                {index === 0 ? (
                  // Primer día
                  <View>
                    <Text style={styles.activityTitle}>Mañana</Text>
                    <Text style={styles.text}>• Llegada y check-in en su alojamiento</Text>
                    <Text style={styles.text}>• Recorrido de orientación por el centro histórico</Text>
                    
                    <Text style={styles.activityTitle}>Tarde</Text>
                    <Text style={styles.text}>• Visita al Zócalo y la Catedral de Oaxaca</Text>
                    <Text style={styles.text}>• Paseo por el Andador Turístico</Text>
                    
                    <Text style={styles.activityTitle}>Noche</Text>
                    <Text style={styles.text}>• Cena de bienvenida en {preferences.budget === 'economic' ? 'el Mercado 20 de Noviembre' : 'un restaurante tradicional oaxaqueño'}</Text>
                  </View>
                ) : index === 1 ? (
                  // Segundo día
                  <View>
                    <Text style={styles.activityTitle}>Mañana</Text>
                    <Text style={styles.text}>• Visita al Ex-Convento de Santo Domingo</Text>
                    <Text style={styles.text}>• Recorrido por el Jardín Etnobotánico</Text>
                    
                    <Text style={styles.activityTitle}>Tarde</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Arqueología') ? 'Visita a la zona arqueológica de Monte Albán' : 'Visita al Museo de las Culturas de Oaxaca'}</Text>
                    
                    <Text style={styles.activityTitle}>Noche</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Gastronomía') ? 'Cata de mezcales con maridaje gastronómico' : 'Paseo nocturno por el centro histórico iluminado'}</Text>
                  </View>
                ) : index === 2 ? (
                  // Tercer día
                  <View>
                    <Text style={styles.activityTitle}>Mañana</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Artesanías') ? 'Visita a talleres artesanales en San Bartolo Coyotepec (barro negro)' : 'Tour por mercados locales'}</Text>
                    
                    <Text style={styles.activityTitle}>Tarde</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Naturaleza') ? 'Excursión a las Cascadas Petrificadas de Hierve el Agua' : 'Visita a la zona arqueológica de Mitla'}</Text>
                    
                    <Text style={styles.activityTitle}>Noche</Text>
                    <Text style={styles.text}>• {preferences.activities.includes('Recorridos Gastronómicos') ? 'Tour gastronómico nocturno' : 'Cena y paseo por el centro'}</Text>
                  </View>
                ) : index === 3 ? (
                  // Cuarto día
                  <View>
                    <Text style={styles.activityTitle}>Mañana</Text>
                    <Text style={styles.text}>• {preferences.activities.includes('Clases de Cocina') ? 'Clase de cocina tradicional oaxaqueña' : 'Visita al Museo Textil de Oaxaca'}</Text>
                    
                    <Text style={styles.activityTitle}>Tarde</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Pueblos Mágicos') ? 'Excursión a Teotitlán del Valle (pueblo de tejedores)' : 'Visita al Museo de Arte Contemporáneo'}</Text>
                    
                    <Text style={styles.activityTitle}>Noche</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Vida Nocturna') ? 'Tour de mezcalerías en el centro' : 'Cena en un patio tradicional oaxaqueño'}</Text>
                  </View>
                ) : index === 4 ? (
                  // Quinto día
                  <View>
                    <Text style={styles.activityTitle}>Mañana</Text>
                    <Text style={styles.text}>• Día libre para explorar según sus intereses</Text>
                    <Text style={styles.text}>• {preferences.activities.includes('Senderismo') ? 'Excursión a la Sierra Norte' : 'Visita a la Biblioteca Burgoa'}</Text>
                    
                    <Text style={styles.activityTitle}>Tarde</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Artesanías') ? 'Visita a San Martín Tilcajete (talleres de alebrijes)' : 'Tour histórico por el centro'}</Text>
                    
                    <Text style={styles.activityTitle}>Noche</Text>
                    <Text style={styles.text}>• {preferences.budget === 'luxury' ? 'Cena de despedida en restaurante gourmet' : 'Noche folklórica con danzas tradicionales'}</Text>
                  </View>
                ) : index === 5 ? (
                  // Sexto día
                  <View>
                    <Text style={styles.activityTitle}>Día Completo</Text>
                    <Text style={styles.text}>• {preferences.travelStyle === 'adventure' ? 'Excursión a las grutas de San Sebastián' : 'Día de descanso con actividades ligeras'}</Text>
                    <Text style={styles.text}>• {preferences.activities.includes('Yoga y Bienestar') ? 'Sesión de temazcal tradicional' : 'Compras de último momento para souvenirs'}</Text>
                    
                    <Text style={styles.activityTitle}>Noche</Text>
                    <Text style={styles.text}>• {preferences.interests.includes('Gastronomía') ? 'Degustación de postres tradicionales oaxaqueños' : 'Velada tranquila en su alojamiento'}</Text>
                  </View>
                ) : (
                  // Séptimo día o posterior
                  <View>
                    <Text style={styles.activityTitle}>Mañana</Text>
                    <Text style={styles.text}>• Tiempo libre para últimas compras</Text>
                    <Text style={styles.text}>• Check-out del alojamiento</Text>
                    
                    <Text style={styles.activityTitle}>Mediodía</Text>
                    <Text style={styles.text}>• Traslado al aeropuerto/terminal</Text>
                    <Text style={styles.text}>• Fin de los servicios</Text>
                  </View>
            )}
          </View>
            ))
          ) : (
            <Text style={styles.text}>Por favor seleccione una duración para generar un itinerario.</Text>
          )}
          
          <Text style={styles.italicText}>
            *Este itinerario es una sugerencia y puede ser adaptado según sus necesidades y preferencias.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presupuesto Estimado</Text>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            Desglose de costos diarios por persona:
          </Text>
          <View style={styles.costTable}>
            <View style={[styles.costRow, styles.costHeader]}>
              <View style={[styles.costCell, { width: '40%' }]}>
                <Text>Concepto</Text>
              </View>
              <View style={[styles.costCell, { width: '60%' }]}>
                <Text>Costo Estimado</Text>
              </View>
            </View>
            <View style={styles.costRow}>
              <View style={[styles.costCell, { width: '40%' }]}>
                <Text>Alojamiento</Text>
              </View>
              <View style={[styles.costCell, { width: '60%' }]}>
                <Text>{estimatedCosts.accommodation}</Text>
              </View>
            </View>
            <View style={styles.costRow}>
              <View style={[styles.costCell, { width: '40%' }]}>
                <Text>Alimentación</Text>
              </View>
              <View style={[styles.costCell, { width: '60%' }]}>
                <Text>{estimatedCosts.meals}</Text>
              </View>
            </View>
            <View style={styles.costRow}>
              <View style={[styles.costCell, { width: '40%' }]}>
                <Text>Actividades</Text>
              </View>
              <View style={[styles.costCell, { width: '60%' }]}>
                <Text>{estimatedCosts.activities}</Text>
              </View>
            </View>
            <View style={styles.costRow}>
              <View style={[styles.costCell, { width: '40%' }]}>
                <Text>Transporte</Text>
              </View>
              <View style={[styles.costCell, { width: '60%' }]}>
                <Text>{estimatedCosts.transportation}</Text>
              </View>
            </View>
              </View>
          <Text style={[styles.italicText, { marginTop: 8 }]}>
            *Presupuesto aproximado basado en sus preferencias seleccionadas. Los precios pueden variar según temporada y disponibilidad.
          </Text>
          <Text style={[styles.italicText, { marginTop: 4 }]}>
            *Para un grupo de {preferences.groupSize} persona(s), considere un presupuesto total aproximado de {totalCostEstimate} MXN para toda la estancia.
          </Text>
              </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consejos Útiles</Text>
          <View style={styles.tipsBox}>
            <View style={styles.list}>
              {travelTips.map((tip, index) => (
                <Text key={index} style={styles.listItem}>• {tip}</Text>
              ))}
            </View>
          </View>
          
          <View style={styles.alertBox}>
            <Text style={styles.text}>
              <Text style={styles.highlight}>Información importante:</Text>
          </Text>
            <Text style={styles.listItem}>• El clima en Oaxaca es generalmente templado, con temperaturas entre 15-30°C según la época del año.</Text>
            <Text style={styles.listItem}>• Se recomienda llevar siempre una identificación y copia de documentos importantes.</Text>
            <Text style={styles.listItem}>• Número de emergencias en México: 911</Text>
            <Text style={styles.listItem}>• Contacto de asistencia turística: (951) 516-0123</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>ValleTour | Plan de Viaje Personalizado | Contacto: info@valletour.com | Tel: (951) 123-4567</Text>
          <Text>Este documento es una guía personalizada basada en sus preferencias y no constituye una reserva.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TripPDF; 