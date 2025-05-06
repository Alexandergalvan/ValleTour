import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  status: 'planned' | 'active' | 'completed';
}

export default function MyTrips() {
  const { loading, isAuthenticated } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      // Aquí cargaríamos los viajes desde la API o Supabase
      // Por ahora usamos datos de ejemplo
      const exampleTrips: Trip[] = [
        {
          id: '1',
          title: 'Vacaciones en Oaxaca',
          destination: 'Oaxaca, México',
          startDate: '2023-12-15',
          endDate: '2023-12-22',
          imageUrl: '/images/destinations/oaxaca-centro.jpg',
          status: 'planned'
        },
        {
          id: '2',
          title: 'Fin de semana en Monte Albán',
          destination: 'Monte Albán, Oaxaca',
          startDate: '2023-11-10',
          endDate: '2023-11-12',
          imageUrl: '/images/destinations/monte-alban.jpg',
          status: 'completed'
        }
      ];
      
      setTimeout(() => {
        setTrips(exampleTrips);
        setLoadingTrips(false);
      }, 1000); // Simulamos un tiempo de carga
    } else {
      setLoadingTrips(false);
    }
  }, [isAuthenticated]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusBadge = (status: Trip['status']) => {
    switch (status) {
      case 'planned':
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Planeado
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Activo
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            Completado
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-primary-light dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
        <div className="text-center max-w-md mx-auto px-4">
          <svg className="mx-auto h-12 w-12 text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-primary dark:text-white">Acceso restringido</h2>
          <p className="mt-2 text-primary-light dark:text-gray-300">Necesitas iniciar sesión para ver tus viajes</p>
          <div className="mt-6">
            <Link to="/login" className="btn-primary inline-block">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 dark:bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-white">Mis Viajes</h1>
            <p className="mt-1 text-lg text-primary-light dark:text-gray-300">
              Gestiona todos tus viajes a Oaxaca
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/planificador" className="btn-primary inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Planificar Nuevo Viaje
            </Link>
          </div>
        </div>

        {loadingTrips ? (
          <div className="mt-12 text-center">
            <svg className="mx-auto h-12 w-12 animate-spin text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg font-medium text-primary-light dark:text-gray-300">Cargando tus viajes...</p>
          </div>
        ) : trips.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-primary-light"
              >
                <div className="relative h-48">
                  <img
                    src={trip.imageUrl}
                    alt={trip.destination}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-semibold text-white">{trip.title}</h3>
                    <p className="text-white/80">{trip.destination}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-primary-light dark:text-gray-300">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>
                    {getStatusBadge(trip.status)}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/trips/${trip.id}`}
                      className="text-sm font-medium text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary"
                    >
                      Ver detalles
                    </Link>
                    <button className="text-sm font-medium text-primary-light hover:text-primary dark:text-gray-300 dark:hover:text-white">
                      Descargar PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-lg bg-white p-8 text-center shadow-md dark:bg-primary-light"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-primary-light dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-primary dark:text-white">No tienes viajes guardados</h3>
            <p className="mt-2 text-primary-light dark:text-gray-300">
              Comienza a planificar tu primer viaje a Oaxaca
            </p>
            <div className="mt-6">
              <Link to="/planificador" className="btn-secondary inline-block">
                Planificar mi primer viaje
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 