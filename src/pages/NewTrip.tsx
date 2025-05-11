import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

interface TripFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export default function NewTrip() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TripFormData>({
    title: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!user) throw new Error('Debes iniciar sesión para crear un viaje');

      const { error: insertError } = await supabase
        .from('trips')
        .insert([
          {
            ...formData,
            user_id: user.id,
            status: 'pending'
          }
        ]);

      if (insertError) throw insertError;
      navigate('/mis-viajes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el viaje');
    } finally {
      setSubmitting(false);
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

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50 py-12 dark:bg-primary">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-lg dark:bg-primary-light"
        >
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-white">Nuevo Viaje</h1>
            <p className="mt-2 text-primary-light dark:text-gray-300">Crea un nuevo viaje a Oaxaca</p>
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="input-group">
              <label htmlFor="title" className="input-label">
                Título del viaje
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-primary"
                placeholder="Mi viaje a Oaxaca"
              />
            </div>

            <div className="input-group">
              <label htmlFor="description" className="input-label">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="input-primary min-h-[100px]"
                placeholder="Describe tu viaje..."
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="input-group">
                <label htmlFor="start_date" className="input-label">
                  Fecha de inicio
                </label>
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={handleChange}
                  className="input-primary"
                />
              </div>

              <div className="input-group">
                <label htmlFor="end_date" className="input-label">
                  Fecha de fin
                </label>
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={handleChange}
                  className="input-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/mis-viajes')}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
              >
                {submitting ? (
                  <svg
                    className="mx-auto h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Crear viaje'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 