import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { PresentationProvider } from './context/PresentationContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Destinations from './pages/Destinations';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import DestinationDetailsPage from './pages/DestinationDetailsPage';
import TripPlannerPage from './pages/TripPlannerPage';
import PresentationMode from './components/PresentationMode';
import PageTransition from './components/PageTransition';
import { usePresentationMode } from './context/PresentationContext';
import Profile from './pages/Profile';
import MyTrips from './pages/MyTrips';

// Componente interno para manejar las animaciones de ruta
const AnimatedRoutes = () => {
  const location = useLocation();
  const { presentationMode, presentationInterval, customRoutes } = usePresentationMode();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition presentationMode={presentationMode}>
              <Home />
            </PageTransition>
          } />
          <Route path="/destinos" element={
            <PageTransition presentationMode={presentationMode}>
              <Destinations />
            </PageTransition>
          } />
          <Route path="/destinos/:id" element={
            <PageTransition presentationMode={presentationMode}>
              <DestinationDetailsPage />
            </PageTransition>
          } />
          <Route path="/servicios" element={
            <PageTransition presentationMode={presentationMode}>
              <Services />
            </PageTransition>
          } />
          <Route path="/blog" element={
            <PageTransition presentationMode={presentationMode}>
              <Blog />
            </PageTransition>
          } />
          <Route path="/nosotros" element={
            <PageTransition presentationMode={presentationMode}>
              <About />
            </PageTransition>
          } />
          <Route path="/contacto" element={
            <PageTransition presentationMode={presentationMode}>
              <Contact />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition presentationMode={presentationMode}>
              <Login />
            </PageTransition>
          } />
          <Route path="/registro" element={
            <PageTransition presentationMode={presentationMode}>
              <Register />
            </PageTransition>
          } />
          <Route path="/recuperar-password" element={
            <PageTransition presentationMode={presentationMode}>
              <ForgotPassword />
            </PageTransition>
          } />
          <Route path="/reset-password" element={
            <PageTransition presentationMode={presentationMode}>
              <ResetPassword />
            </PageTransition>
          } />
          <Route path="/perfil" element={
            <PageTransition presentationMode={presentationMode}>
              <Profile />
            </PageTransition>
          } />
          <Route path="/mis-viajes" element={
            <PageTransition presentationMode={presentationMode}>
              <MyTrips />
            </PageTransition>
          } />
          <Route path="/planificador" element={
            <PageTransition presentationMode={presentationMode}>
              <TripPlannerPage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>

      {/* Componente de Modo Presentación */}
      <PresentationMode
        enabled={presentationMode}
        interval={presentationInterval}
        routes={customRoutes || undefined}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <PresentationProvider>
            <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <main className="grow">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </PresentationProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
