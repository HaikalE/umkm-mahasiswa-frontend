import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-16 h-16 text-primary-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn btn-primary text-lg px-8 py-3 w-full sm:w-auto inline-flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="btn btn-outline px-6 py-2 inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Halaman Sebelumnya
            </button>
            
            <Link 
              to="/projects" 
              className="btn btn-outline px-6 py-2 inline-flex items-center justify-center"
            >
              <Search className="w-4 h-4 mr-2" />
              Cari Proyek
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-white/80 rounded-lg">
          <p className="text-sm text-gray-600">
            Butuh bantuan? Hubungi tim support kami di{' '}
            <a href="mailto:support@umkm-mahasiswa.id" className="text-primary-600 hover:text-primary-700 font-medium">
              support@umkm-mahasiswa.id
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;