import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building2, 
  GraduationCap, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    user_type: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const { register } = useAuth();
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

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setFormData(prev => ({ ...prev, user_type: type }));
    setStep(2);
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Nama lengkap harus diisi';
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Nama lengkap minimal 2 karakter';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi';
    } else if (!/^[+]?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'Anda harus menyetujui syarat dan ketentuan';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    showLoading('Sedang mendaftar...');
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        setStep(3); // Success step
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Register error:', error);
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
            
            {step < 3 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900">
                  {step === 1 ? 'Pilih Tipe Akun' : 'Buat Akun Baru'}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Sudah punya akun?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </>
            )}
          </div>

          <div className="mt-8">
            {/* Step 1: User Type Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <button
                  onClick={() => handleUserTypeSelect('umkm')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <Building2 className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Saya UMKM
                      </h3>
                      <p className="text-sm text-gray-600">
                        Saya ingin mencari talenta mahasiswa untuk membantu bisnis saya
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleUserTypeSelect('student')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-secondary-500 hover:bg-secondary-50 transition-all group"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-secondary-100 rounded-lg group-hover:bg-secondary-200 transition-colors">
                      <GraduationCap className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Saya Mahasiswa
                      </h3>
                      <p className="text-sm text-gray-600">
                        Saya ingin mencari pengalaman kerja dan project menarik
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Step 2: Registration Form */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Progress indicator */}
                <div className="flex items-center mb-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    ← Kembali ke pilihan tipe akun
                  </button>
                </div>

                {/* Selected user type indicator */}
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    {userType === 'umkm' ? (
                      <Building2 className="w-5 h-5 text-primary-600 mr-2" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-secondary-600 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      Mendaftar sebagai {userType === 'umkm' ? 'UMKM' : 'Mahasiswa'}
                    </span>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="full_name" className="form-label">
                    {userType === 'umkm' ? 'Nama Bisnis/UMKM' : 'Nama Lengkap'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className={`form-input pl-10 ${errors.full_name ? 'border-danger-500' : ''}`}
                      placeholder={userType === 'umkm' ? 'Nama bisnis Anda' : 'Nama lengkap Anda'}
                    />
                  </div>
                  {errors.full_name && (
                    <div className="flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 text-danger-500 mr-1" />
                      <span className="form-error">{errors.full_name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
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

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input pl-10 ${errors.phone ? 'border-danger-500' : ''}`}
                      placeholder="08123456789"
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 text-danger-500 mr-1" />
                      <span className="form-error">{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Password */}
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
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input pl-10 pr-10 ${errors.password ? 'border-danger-500' : ''}`}
                      placeholder="Minimal 6 karakter"
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

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`form-input pl-10 pr-10 ${errors.confirmPassword ? 'border-danger-500' : ''}`}
                      placeholder="Ulangi password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 text-danger-500 mr-1" />
                      <span className="form-error">{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                      Saya setuju dengan{' '}
                      <Link 
                        to="/terms" 
                        className="text-primary-600 hover:text-primary-500 transition-colors"
                      >
                        Syarat dan Ketentuan
                      </Link>
                      {' '}serta{' '}
                      <Link 
                        to="/privacy" 
                        className="text-primary-600 hover:text-primary-500 transition-colors"
                      >
                        Kebijakan Privasi
                      </Link>
                    </label>
                  </div>
                  {errors.terms && (
                    <div className="flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 text-danger-500 mr-1" />
                      <span className="form-error">{errors.terms}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full btn btn-primary text-lg py-3"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-gray-600 mb-6">
                  Selamat! Akun Anda telah berhasil dibuat. Anda akan dialihkan ke halaman login dalam beberapa detik.
                </p>
                <div className="space-y-3">
                  <Link 
                    to="/login" 
                    className="btn btn-primary w-full"
                  >
                    Masuk Sekarang
                  </Link>
                  <Link 
                    to="/" 
                    className="btn btn-outline w-full"
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&crop=center"
          alt="Tim bekerja sama"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-white text-2xl font-bold mb-2">
            Mulai Perjalanan Sukses Anda
          </h3>
          <p className="text-gray-200">
            Bergabunglah dengan komunitas UMKM dan mahasiswa yang saling mendukung untuk mencapai tujuan bersama.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;