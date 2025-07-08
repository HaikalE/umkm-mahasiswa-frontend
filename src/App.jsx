import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UmkmDashboard from './pages/umkm/UmkmDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import ActiveProjectPage from './pages/student/ActiveProjectPage';
import ProjectsPage from './pages/ProjectsPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useLoading } from './hooks/useLoading';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { loading: globalLoading } = useLoading();

  if (authLoading || globalLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content for screen readers */}
      <a 
        href="#main-content" 
        className="skip-link"
        aria-label="Lewati ke konten utama"
      >
        Lewati ke konten utama
      </a>
      
      <main id="main-content" className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes - Only for non-authenticated users */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          
          {/* Protected Routes - Only for authenticated users */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* UMKM Routes */}
          <Route path="/umkm/*" element={
            <ProtectedRoute requiredUserType="umkm">
              <UmkmDashboard />
            </ProtectedRoute>
          } />
          
          {/* Student Routes - ENHANCED */}
          <Route path="/student/*" element={
            <ProtectedRoute requiredUserType="student">
              <Routes>
                <Route index element={<StudentDashboard />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="active-project" element={<ActiveProjectPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Routes>
            </ProtectedRoute>
          } />
          
          {/* General Protected Routes */}
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/products" element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;