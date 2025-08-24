import { Routes as RouterRoutes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Vehicles from './components/Vehicles';
import Maintenance from './components/Maintenance';
import Drivers from './components/Drivers';
import Alerts from './components/Alerts';

function App() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  // Don't show header/navbar/footer on auth pages
  const showAuthComponents = user && !['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showAuthComponents && <Header />}
      {showAuthComponents && <Navbar />}
      
      <main className="flex-1">
        <RouterRoutes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/vehicles" 
            element={user ? <Vehicles /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/maintenance" 
            element={user ? <Maintenance /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/drivers" 
            element={user ? <Drivers /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/alerts" 
            element={user ? <Alerts /> : <Navigate to="/login" replace />} 
          />
          
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </RouterRoutes>
      </main>

      {showAuthComponents && <Footer />}
    </div>
  );
}

export default App;