import { memo } from 'react';
import { motion } from 'framer-motion';

interface ValueCardProps {
  title: string;
  description: string;
  index: number;
}

const ValueCard = memo(({ title, description, index }: ValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-primary-light"
    >
      <h3 className="text-xl font-semibold text-primary dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
});

ValueCard.displayName = 'ValueCard';

export default ValueCard; 