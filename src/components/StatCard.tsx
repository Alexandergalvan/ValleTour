import { memo } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = memo(({ value, label }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl font-bold text-secondary">
        {value}
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {label}
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard; 