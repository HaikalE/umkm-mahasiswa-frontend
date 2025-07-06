import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    showLoading('Sedang masuk...');
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        // Redirect based on user type
        const userType = result.user.user_type;
        if (userType === 'admin') {
          navigate('/admin');
        } else if (userType === 'umkm') {
          navigate('/umkm');
        } else if (userType === 'student') {
          navigate('/student');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">UM</span>
              </div>
              <span className="ml-3 font-heading font-bold text-2xl text-gray-900">
                UMKM x Mahasiswa
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Masuk ke Akun Anda
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link 
                to="/register" 
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input pl-10 ${errors.email ? 'border-danger-500' : ''}`}
                    placeholder="nama@email.com"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center mt-1">
                    <AlertCircle className="w-4 h-4 text-danger-500 mr-1" />
                    <span className="form-error">{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input pl-10 pr-10 ${errors.password ? 'border-danger-500' : ''}`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-1">
                    <AlertCircle className="w-4 h-4 text-danger-500 mr-1" />
                    <span className="form-error">{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Ingat saya
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary text-lg py-3"
                >
                  Masuk
                </button>
              </div>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Accounts:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>UMKM:</strong> warung.makan.sederhana@gmail.com / password123</p>
                <p><strong>Student:</strong> andi.mahasiswa@gmail.com / password123</p>
                <p><strong>Admin:</strong> admin@umkm-mahasiswa.id / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center"
          alt="UMKM dan Mahasiswa berkolaborasi"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-white text-2xl font-bold mb-2">
            Kolaborasi Tanpa Batas
          </h3>
          <p className="text-gray-200">
            Bergabunglah dengan ribuan UMKM dan mahasiswa yang telah berkolaborasi sukses di platform kami.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;