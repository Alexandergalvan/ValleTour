import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Trip, mockUsers, mockTrips, getUserTrips, getUserById, getTripById } from '../data/mockData';

interface UserContextType {
  currentUser: User | null;
  userTrips: Trip[];
  setCurrentUser: (user: User | null) => void;
  getTripDetails: (tripId: string) => Trip | undefined;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userTrips, setUserTrips] = useState<Trip[]>([]);

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      setUserTrips(getUserTrips(user.id));
    } else {
      setUserTrips([]);
    }
  };

  const getTripDetails = (tripId: string) => {
    return getTripById(tripId);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        userTrips,
        setCurrentUser: handleSetCurrentUser,
        getTripDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 