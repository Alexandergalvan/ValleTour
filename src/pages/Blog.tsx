import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const categories = [
  'Todos',
  'Consejos de Viaje',
  'Destinos',
  'Cultura',
  'Gastronomía',
  'Aventura',
  'Presupuesto',
];

const blogPosts = [
  {
    id: 1,
    title: '10 Destinos Imperdibles para 2024',
    excerpt:
      'Descubre los lugares más emocionantes y tendencia para visitar este año.',
    category: 'Destinos',
    author: 'María González',
    date: '28 Mar 2024',
    readTime: '5 min',
    image: '/blog/datos.webp',
    tags: ['Viajes', '2024', 'Tendencias'],
  },
  {
    id: 2,
    title: 'Guía Completa para Viajar con Poco Presupuesto',
    excerpt:
      'Aprende los mejores trucos para hacer que tu dinero rinda al máximo durante tus viajes.',
    category: 'Presupuesto',
    author: 'Carlos Ruiz',
    date: '27 Mar 2024',
    readTime: '8 min',
    image: '/blog/presupuesto.webp',
    tags: ['Presupuesto', 'Consejos', 'Ahorro'],
  },
  {
    id: 3,
    title: 'Los Mejores Restaurantes de París',
    excerpt:
      'Una guía gastronómica por los rincones más deliciosos de la Ciudad Luz.',
    category: 'Gastronomía',
    author: 'Ana Martínez',
    date: '26 Mar 2024',
    readTime: '6 min',
    image: '/blog/paris.webp',
    tags: ['París', 'Gastronomía', 'Restaurantes'],
  },
  {
    id: 4,
    title: 'Aventuras en los Andes: Guía de Trekking',
    excerpt:
      'Todo lo que necesitas saber para preparar tu aventura en las montañas andinas.',
    category: 'Aventura',
    author: 'Pedro Sánchez',
    date: '25 Mar 2024',
    readTime: '10 min',
    image: '/blog/andes.webp',
    tags: ['Trekking', 'Andes', 'Aventura'],
  },
  {
    id: 5,
    title: 'Festivales Culturales Imperdibles',
    excerpt:
      'Los eventos culturales más importantes alrededor del mundo para este año.',
    category: 'Cultura',
    author: 'Laura Torres',
    date: '24 Mar 2024',
    readTime: '7 min',
    image: '/blog/festivales.webp',
    tags: ['Festivales', 'Cultura', 'Eventos'],
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white"
          >
            Blog de Viajes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-600 dark:text-gray-400"
          >
            Inspiración, consejos y guías para tus próximas aventuras
          </motion.p>
        </div>

        {/* Search and Categories */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border-gray-300 py-2 pl-10 pr-4 focus:border-secondary focus:ring-secondary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === category
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="size-full object-cover"
                />
                <div className="absolute right-4 top-4 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} lectura</span>
                </div>

                <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="mt-6 text-secondary hover:text-secondary/80 dark:text-secondary/90 dark:hover:text-secondary">
                  Leer más →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
} 