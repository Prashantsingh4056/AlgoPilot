import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Coach from './pages/Coach';
import Reviewer from './pages/Reviewer';
import Interview from './pages/Interview';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import ReviewedProblems from './pages/ReviewedProblems';

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner className="min-h-screen" />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/reviewer" element={<Reviewer />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/solved-problems" element={<ReviewedProblems />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
