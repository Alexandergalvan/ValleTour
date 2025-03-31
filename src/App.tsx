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

// Importación de páginas (se crearán después)
const Profile = () => <div>Página de Perfil</div>;
const MyTrips = () => <div>Página de Mis Viajes</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinos" element={<Destinations />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/mis-viajes" element={<MyTrips />} />
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
