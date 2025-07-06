import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Redirect to appropriate dashboard based on user type
      switch (user.user_type) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'umkm':
          navigate('/umkm', { replace: true });
          break;
        case 'student':
          navigate('/student', { replace: true });
          break;
        default:
          // Stay on general dashboard
          break;
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-primary-600 font-bold text-xl">UM</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Selamat Datang, {user?.full_name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Anda akan dialihkan ke dashboard yang sesuai...
        </p>
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
};

export default DashboardPage;