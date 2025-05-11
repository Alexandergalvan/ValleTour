import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

interface Trip {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  user_id: string;
}

export default function MyTrips() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchTrips = async () => {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTrips(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los viajes');
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, [user, navigate]);

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getStatusText = (status: Trip['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading || loadingTrips) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-primary-light dark:text-gray-300">Cargando viajes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50 py-12 dark:bg-primary">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-lg dark:bg-primary-light"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary dark:text-white">Mis Viajes</h1>
              <p className="mt-2 text-primary-light dark:text-gray-300">Gestiona tus reservas y viajes</p>
            </div>
            <Link
              to="/nuevo-viaje"
              className="btn-primary"
            >
              Nuevo Viaje
            </Link>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30"
            >
              <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
            </motion.div>
          )}

          {trips.length === 0 ? (
            <div className="mt-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-primary dark:text-white">No tienes viajes</h3>
              <p className="mt-1 text-sm text-primary-light dark:text-gray-300">
                Comienza a planificar tu próximo viaje
              </p>
              <div className="mt-6">
                <Link
                  to="/nuevo-viaje"
                  className="btn-primary"
                >
                  Crear nuevo viaje
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-primary-light"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary dark:text-white">
                      {trip.title}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        trip.status
                      )}`}
                    >
                      {getStatusText(trip.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-primary-light dark:text-gray-300">
                    {trip.description}
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-primary-light dark:text-gray-300">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(trip.start_date).toLocaleDateString()} -{' '}
                        {new Date(trip.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        Creado el {new Date(trip.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Link
                      to={`/viajes/${trip.id}`}
                      className="text-sm font-medium text-primary hover:text-primary-dark dark:text-white dark:hover:text-gray-300"
                    >
                      Ver detalles
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 