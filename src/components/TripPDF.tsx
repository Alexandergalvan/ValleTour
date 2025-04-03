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
        return 'Ideal para viajeros que buscan experiencias auténticas y económicas, optimizando cada peso gastado.';
      case 'moderate':
        return 'Perfecto para quienes buscan un balance entre comodidad y valor, con opciones de calidad a precios razonables.';
      case 'comfort':
        return 'Diseñado para viajeros que prefieren servicios de alta calidad y experiencias más exclusivas.';
      case 'luxury':
        return 'Para quienes buscan lo mejor en cada aspecto del viaje, con servicios premium y atención personalizada.';
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
        return 'Experiencias exclusivas y servicios premium con atención personalizada.';
      case 'comfort':
        return 'Equilibrio perfecto entre comodidad y autenticidad.';
      case 'budget':
        return 'Enfoque en experiencias auténticas y eficiencia en costos.';
      case 'adventure':
        return 'Énfasis en actividades al aire libre y experiencias emocionantes.';
      case 'cultural':
        return 'Inmersión profunda en la cultura, tradiciones y costumbres locales.';
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
        return 'Servicios completos, comodidades estándar y atención profesional.';
      case 'boutique':
        return 'Ambiente íntimo, diseño único y servicio personalizado.';
      case 'hostel':
        return 'Ambiente social, opciones económicas y áreas comunes compartidas.';
      case 'apartment':
        return 'Espacio privado con cocina equipada y ambiente hogareño.';
      case 'hacienda':
        return 'Alojamiento histórico con arquitectura tradicional y ambiente auténtico.';
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
        return 'Máxima flexibilidad y comodidad con conductor personal.';
      case 'shared':
        return 'Opción económica compartiendo el viaje con otros turistas.';
      case 'public':
        return 'Experiencia local auténtica usando el transporte de la ciudad.';
      case 'rental':
        return 'Libertad total para explorar a tu propio ritmo.';
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
    if (size === 1) return 'Experiencia personalizada con máxima flexibilidad.';
    if (size === 2) return 'Ideal para compartir momentos especiales en pareja.';
    if (size <= 4) return 'Perfecto para una experiencia íntima y personalizada.';
    if (size <= 8) return 'Buen balance entre socialización y atención personal.';
    return 'Ideal para eventos grupales y experiencias compartidas.';
  };

  const getEstimatedCosts = (budget: string) => {
    switch (budget) {
      case 'economic':
        return {
          accommodation: '$300-500 MXN por noche',
          meals: '$200-300 MXN por día',
          activities: '$200-400 MXN por día',
          transportation: '$100-200 MXN por día',
          total: '$800-1,400 MXN por día'
        };
      case 'moderate':
        return {
          accommodation: '$500-1,500 MXN por noche',
          meals: '$300-600 MXN por día',
          activities: '$400-800 MXN por día',
          transportation: '$200-400 MXN por día',
          total: '$1,400-3,300 MXN por día'
        };
      case 'comfort':
        return {
          accommodation: '$1,500-3,000 MXN por noche',
          meals: '$600-1,200 MXN por día',
          activities: '$800-1,500 MXN por día',
          transportation: '$400-800 MXN por día',
          total: '$3,300-6,500 MXN por día'
        };
      case 'luxury':
        return {
          accommodation: '$3,000+ MXN por noche',
          meals: '$1,200+ MXN por día',
          activities: '$1,500+ MXN por día',
          transportation: '$800+ MXN por día',
          total: '$6,500+ MXN por día'
        };
      default:
        return {
          accommodation: 'Por definir',
          meals: 'Por definir',
          activities: 'Por definir',
          transportation: 'Por definir',
          total: 'Por definir'
        };
    }
  };

  const estimatedCosts = getEstimatedCosts(preferences.budget);
  const totalDays = preferences.duration || 0;
  const totalCost = preferences.budget !== 'undefined' 
    ? `${estimatedCosts.total} × ${totalDays} días = ${
        estimatedCosts.total.includes('+')
          ? `${estimatedCosts.total.replace('+ MXN', '')}+ MXN`
          : `${estimatedCosts.total.split('-')[1].replace(' MXN', '')} MXN`
      } aproximadamente`
    : 'Por definir';

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
          <View style={[styles.grid, { marginTop: 10 }]}>
            <View style={[styles.gridItem, { width: '100%' }]}>
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
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias y Requisitos</Text>
          <View style={styles.list}>
            {preferences.interests.length > 0 && (
              <>
                <Text style={[styles.text, styles.highlight]}>Intereses Principales:</Text>
                {preferences.interests.map((interest, index) => (
                  <Text key={index} style={styles.listItem}>• {interest}</Text>
                ))}
              </>
            )}
            
            {preferences.activities.length > 0 && (
              <>
                <Text style={[styles.text, styles.highlight, { marginTop: 10 }]}>
                  Actividades Seleccionadas:
                </Text>
                {preferences.activities.map((activity, index) => (
                  <Text key={index} style={styles.listItem}>• {activity}</Text>
                ))}
              </>
            )}

            {preferences.mealPreferences.length > 0 && (
              <>
                <Text style={[styles.text, styles.highlight, { marginTop: 10 }]}>
                  Preferencias Gastronómicas:
                </Text>
                {preferences.mealPreferences.map((pref, index) => (
                  <Text key={index} style={styles.listItem}>• {pref}</Text>
                ))}
              </>
            )}

            {preferences.accessibility.length > 0 && (
              <>
                <Text style={[styles.text, styles.highlight, { marginTop: 10 }]}>
                  Requerimientos de Accesibilidad:
                </Text>
                {preferences.accessibility.map((acc, index) => (
                  <Text key={index} style={styles.listItem}>• {acc}</Text>
                ))}
              </>
            )}

            {preferences.languages.length > 0 && (
              <>
                <Text style={[styles.text, styles.highlight, { marginTop: 10 }]}>
                  Idiomas Preferidos:
                </Text>
                {preferences.languages.map((lang, index) => (
                  <Text key={index} style={styles.listItem}>• {lang}</Text>
                ))}
              </>
            )}
          </View>
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
            <View style={[styles.costRow, styles.costHeader]}>
              <View style={[styles.costCell, { width: '40%' }]}>
                <Text>Total por día</Text>
              </View>
              <View style={[styles.costCell, { width: '60%' }]}>
                <Text>{estimatedCosts.total}</Text>
              </View>
            </View>
          </View>
          
          <Text style={[styles.text, { marginTop: 12, fontWeight: 'bold' }]}>
            Costo total estimado para {totalDays} días: {totalCost}
          </Text>
          
          <Text style={[styles.text, { fontSize: 10, fontStyle: 'italic', marginTop: 8 }]}>
            * Los costos son aproximados y pueden variar según la temporada, disponibilidad y servicios específicos seleccionados.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={{ marginBottom: 5 }}>
            Este plan de viaje ha sido personalizado según tus preferencias y necesidades específicas.
          </Text>
          <Text style={{ marginBottom: 5 }}>
            Los precios son aproximados y pueden variar según la temporada, disponibilidad y cambios en el mercado.
          </Text>
          <Text>© {new Date().getFullYear()} Valle Tour - Todos los derechos reservados</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TripPDF; 