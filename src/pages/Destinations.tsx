import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const destinations = [
  {
    id: 1,
    title: 'Machu Picchu',
    location: 'Cusco, Perú',
    type: 'Cultural',
    price: 1299,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
    description:
      'Explora una de las maravillas del mundo antiguo y descubre la historia del Imperio Inca.',
  },
  {
    id: 2,
    title: 'Cancún',
    location: 'Quintana Roo, México',
    type: 'Playa',
    price: 899,
    rating: 4.7,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18',
    description:
      'Disfruta de las mejores playas del Caribe con aguas cristalinas y arena blanca.',
  },
  {
    id: 3,
    title: 'París',
    location: 'Francia',
    type: 'Ciudad',
    price: 1499,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    description:
      'La ciudad del amor y la luz, con una rica historia y cultura incomparable.',
  },
  // Agrega más destinos aquí
];

const filters = {
  types: ['Todos', 'Playa', 'Montaña', 'Ciudad', 'Cultural', 'Aventura'],
  priceRanges: [
    { label: 'Todos los precios', value: 'all' },
    { label: 'Menos de $500', value: '0-500' },
    { label: '$500 - $1000', value: '500-1000' },
    { label: '$1000 - $2000', value: '1000-2000' },
    { label: 'Más de $2000', value: '2000+' },
  ],
};

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'Todos' || destination.type === selectedType;
    let matchesPrice = true;

    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      if (max) {
        matchesPrice = destination.price >= min && destination.price <= max;
      } else {
        matchesPrice = destination.price >= min;
      }
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
          Explora Nuestros Destinos
        </h1>

        {/* Search and Filters */}
        <div className="mt-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar destinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border-gray-300 py-2 pl-10 pr-4 focus:border-secondary focus:ring-secondary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border-gray-300 py-2 pl-3 pr-10 focus:border-secondary focus:ring-secondary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {filters.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="rounded-lg border-gray-300 py-2 pl-3 pr-10 focus:border-secondary focus:ring-secondary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {filters.priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                  ${destination.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {destination.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {destination.location}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {destination.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {destination.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      ({destination.reviews} reseñas)
                    </span>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white">
                    {destination.type}
                  </span>
                </div>

                <button className="mt-6 w-full rounded-lg bg-secondary py-2 text-white transition-colors hover:bg-secondary/90">
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 