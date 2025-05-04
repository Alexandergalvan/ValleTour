import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
  presentationMode?: boolean;
}

// Animaciones para el modo normal (no presentación)
const normalTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Animaciones para el modo presentación (más llamativas)
const presentationVariants = [
  // Slide horizontalmente
  {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.7 }
  },
  // Zoom fade
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: { duration: 0.8, ease: 'easeInOut' }
  },
  // Rotación
  {
    initial: { opacity: 0, rotate: -5, y: 50 },
    animate: { opacity: 1, rotate: 0, y: 0 },
    exit: { opacity: 0, rotate: 5, y: -50 },
    transition: { duration: 0.7, ease: 'easeInOut' }
  },
  // Flip vertical
  {
    initial: { opacity: 0, rotateX: 90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90 },
    transition: { duration: 0.7, ease: 'easeInOut' }
  }
];

const PageTransition = ({ children, presentationMode = false }: PageTransitionProps) => {
  const location = useLocation();
  
  // Elegir una animación basada en la ruta actual (para el modo presentación)
  const variant = presentationMode
    ? presentationVariants[Math.floor(location.pathname.length % presentationVariants.length)]
    : normalTransition;

  return (
    <motion.div
      key={location.pathname}
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={variant.transition}
      className="flex flex-col min-h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 