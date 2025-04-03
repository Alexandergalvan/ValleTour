import { memo } from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  index: number;
}

const TeamMember = memo(({ name, role, image, description, index }: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="relative mx-auto size-40 overflow-hidden rounded-full ring-4 ring-secondary">
        <img
          src={image}
          alt={name}
          className="size-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-primary dark:text-white">
        {name}
      </h3>
      <p className="text-secondary-light">{role}</p>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
});

TeamMember.displayName = 'TeamMember';

export default TeamMember; 