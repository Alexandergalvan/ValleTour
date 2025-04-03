import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Destinations from './pages/Destinations';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import DestinationDetailsPage from './pages/DestinationDetailsPage';
import TripPlannerPage from './pages/TripPlannerPage';

// Importación de páginas (se crearán después)
const Profile = () => <div>Página de Perfil</div>;
const MyTrips = () => <div>Mis Viajes</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinos" element={<Destinations />} />
                <Route path="/destinos/:id" element={<DestinationDetailsPage />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/mis-viajes" element={<MyTrips />} />
                <Route path="/planeador" element={<TripPlannerPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
