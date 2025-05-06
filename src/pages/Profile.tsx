import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/auth';

export default function Profile() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar_url: ''
  });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatar_url: user.avatar_url || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    setError('');

    try {
      const { error: updateError } = await updateProfile({
        name: formData.name,
        avatar_url: formData.avatar_url
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setMessage('Perfil actualizado con éxito');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar perfil');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-primary-light dark:text-gray-300">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50 py-12 dark:bg-primary">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-lg dark:bg-primary-light"
        >
          <h1 className="text-3xl font-bold text-primary dark:text-white">Mi Perfil</h1>
          <p className="mt-2 text-primary-light dark:text-gray-300">Actualiza tu información personal</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30"
            >
              <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30"
            >
              <p className="text-sm text-green-600 dark:text-green-200">{message}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-white text-3xl">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : formData.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-6">
                    <h2 className="text-xl font-semibold text-primary dark:text-white">{formData.name || "Usuario"}</h2>
                    <p className="text-primary-light dark:text-gray-300">{formData.email}</p>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="name" className="input-label">
                  Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="input-primary cursor-not-allowed opacity-75"
                />
                <p className="mt-1 text-xs text-primary-light dark:text-gray-400">
                  El correo electrónico no se puede cambiar
                </p>
              </div>

              <div className="input-group col-span-1 md:col-span-2">
                <label htmlFor="avatar_url" className="input-label">
                  URL de imagen de perfil (opcional)
                </label>
                <input
                  id="avatar_url"
                  name="avatar_url"
                  type="url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  className="input-primary"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={updating}
                className="btn-primary w-full"
              >
                {updating ? (
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
                  'Guardar cambios'
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-primary dark:text-white">Configuración de la cuenta</h2>
            
            <div className="mt-6 space-y-4">
              <div className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="text-lg font-medium text-primary dark:text-white">Cambiar contraseña</h3>
                <p className="mt-1 text-sm text-primary-light dark:text-gray-300">
                  Puedes cambiar tu contraseña para mantener tu cuenta segura
                </p>
                <div className="mt-4">
                  <Link to="/recuperar-password" className="btn-secondary inline-block">
                    Cambiar contraseña
                  </Link>
                </div>
              </div>
              
              <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/30">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Eliminar cuenta</h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos.
                </p>
                <div className="mt-4">
                  <button className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-950">
                    Eliminar mi cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 