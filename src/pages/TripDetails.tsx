import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchTrip = async () => {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Viaje no encontrado');
        if (data.user_id !== user.id) throw new Error('No tienes permiso para ver este viaje');

        setTrip(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el viaje');
      } finally {
        setLoadingTrip(false);
      }
    };

    fetchTrip();
  }, [id, user, navigate]);

  const handleDeleteTrip = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', id);

      if (error) throw error;
      navigate('/mis-viajes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el viaje');
      setShowDeleteConfirm(false);
    }
  };

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

  if (loading || loadingTrip) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-primary-light dark:text-gray-300">Cargando viaje...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-primary dark:text-white">Viaje no encontrado</h2>
          <p className="mt-2 text-primary-light dark:text-gray-300">El viaje que buscas no existe o no tienes permiso para verlo</p>
          <div className="mt-6">
            <Link to="/mis-viajes" className="btn-primary inline-block">
              Volver a mis viajes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50 py-12 dark:bg-primary">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-lg dark:bg-primary-light"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary dark:text-white">{trip.title}</h1>
              <p className="mt-2 text-primary-light dark:text-gray-300">Detalles del viaje</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={`/viajes/${trip.id}/editar`}
                className="btn-secondary"
              >
                Editar
              </Link>
              <button
                onClick={handleDeleteTrip}
                className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-950"
              >
                {showDeleteConfirm ? 'Confirmar eliminación' : 'Eliminar'}
              </button>
            </div>
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

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-primary dark:text-white">Información del viaje</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-primary-light dark:text-gray-300">Estado</h3>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      trip.status
                    )}`}
                  >
                    {getStatusText(trip.status)}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-primary-light dark:text-gray-300">Descripción</h3>
                  <p className="mt-1 text-primary dark:text-white">{trip.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-primary-light dark:text-gray-300">Fechas</h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-primary dark:text-white">
                      <span className="font-medium">Inicio:</span>{' '}
                      {new Date(trip.start_date).toLocaleDateString()}
                    </p>
                    <p className="text-primary dark:text-white">
                      <span className="font-medium">Fin:</span>{' '}
                      {new Date(trip.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-primary-light dark:text-gray-300">Creado</h3>
                  <p className="mt-1 text-primary dark:text-white">
                    {new Date(trip.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary dark:text-white">Acciones</h2>
              <div className="mt-4 space-y-4">
                <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-primary-light dark:text-gray-300 dark:hover:bg-gray-700">
                  Descargar itinerario
                </button>
                <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-primary-light dark:text-gray-300 dark:hover:bg-gray-700">
                  Compartir viaje
                </button>
                <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-primary-light dark:text-gray-300 dark:hover:bg-gray-700">
                  Ver mapa
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/mis-viajes"
              className="text-sm font-medium text-primary hover:text-primary-dark dark:text-white dark:hover:text-gray-300"
            >
              &larr; Volver a mis viajes
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 