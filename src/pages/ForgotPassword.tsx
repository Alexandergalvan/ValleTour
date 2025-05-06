import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { forgotPassword, error, loading, clearError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) clearError();
    if (message) setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 dark:bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-primary-light"
      >
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/footer.webp"
            alt="ValleTour"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary dark:text-white">
            Recupera tu contraseña
          </h2>
          <p className="mt-2 text-center text-sm">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-red-50 p-4 dark:bg-red-900/30"
          >
            <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
          </motion.div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-green-50 p-4 dark:bg-green-900/30"
          >
            <p className="text-sm text-green-600 dark:text-green-200">{message}</p>
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleChange}
                className="input-primary"
                placeholder="juan@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary group relative flex w-full justify-center"
            >
              {loading ? (
                <svg
                  className="size-5 animate-spin text-white"
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
                'Enviar enlace de recuperación'
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <div className="flex flex-col space-y-2">
            <Link
              to="/login"
              className="text-sm font-medium text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary"
            >
              Volver a inicio de sesión
            </Link>
            <Link
              to="/registro"
              className="text-sm font-medium text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary"
            >
              Crear una cuenta nueva
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 