export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  image: string;
  description: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    phone: '+51 987654321',
    address: 'Av. Principal 123, Lima',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    phone: '+51 987654322',
    address: 'Calle Los Pinos 456, Lima',
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    phone: '+51 987654323',
    address: 'Av. Central 789, Lima',
  },
];

export const mockTrips: Trip[] = [
  {
    id: '1',
    userId: '1',
    destination: 'Machu Picchu',
    startDate: '2024-06-15',
    endDate: '2024-06-20',
    status: 'confirmed',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
    description: 'Explora la maravilla del mundo antiguo y descubre la historia del Imperio Inca.',
  },
  {
    id: '2',
    userId: '1',
    destination: 'Cancún',
    startDate: '2024-08-01',
    endDate: '2024-08-07',
    status: 'pending',
    price: 899,
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18',
    description: 'Disfruta de las mejores playas del Caribe con aguas cristalinas y arena blanca.',
  },
  {
    id: '3',
    userId: '2',
    destination: 'París',
    startDate: '2024-07-10',
    endDate: '2024-07-17',
    status: 'completed',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    description: 'La ciudad del amor y la luz, con una rica historia y cultura incomparable.',
  },
  {
    id: '4',
    userId: '3',
    destination: 'Roma',
    startDate: '2024-09-05',
    endDate: '2024-09-12',
    status: 'confirmed',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    description: 'Explora la Ciudad Eterna y sus monumentos históricos.',
  },
];

// Función para obtener los viajes de un usuario específico
export const getUserTrips = (userId: string): Trip[] => {
  return mockTrips.filter(trip => trip.userId === userId);
};

// Función para obtener un usuario por ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Función para obtener un viaje por ID
export const getTripById = (tripId: string): Trip | undefined => {
  return mockTrips.find(trip => trip.id === tripId);
}; 