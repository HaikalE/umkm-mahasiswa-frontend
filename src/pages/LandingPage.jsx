import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Users, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Building2,
  Star,
  MessageCircle,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  ChevronDown,
  Play,
  Award,
  Globe,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: '2,500+', label: 'UMKM Terdaftar', icon: Building2 },
    { number: '15,000+', label: 'Mahasiswa Aktif', icon: GraduationCap },
    { number: '8,900+', label: 'Project Selesai', icon: Target },
    { number: '4.8/5', label: 'Rating Kepuasan', icon: Star }
  ];

  const features = [
    {
      icon: Users,
      title: 'Matching Cerdas',
      description: 'AI-powered matching system yang menghubungkan UMKM dengan mahasiswa berdasarkan skill, lokasi, dan kebutuhan project.'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Komunikasi langsung antara UMKM dan mahasiswa dengan fitur chat real-time, file sharing, dan video call.'
    },
    {
      icon: Shield,
      title: 'Payment Secure',
      description: 'Sistem pembayaran yang aman dengan escrow system dan multiple payment gateway untuk perlindungan maksimal.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Dashboard analytics lengkap untuk tracking performance, ROI, dan growth metrics bisnis Anda.'
    },
    {
      icon: Award,
      title: 'Skill Verification',
      description: 'Sistem verifikasi skill mahasiswa melalui portfolio review dan test competency untuk kualitas terjamin.'
    },
    {
      icon: Globe,
      title: 'Jangkauan Nasional',
      description: 'Platform yang mencakup seluruh Indonesia dengan support untuk remote work dan on-site collaboration.'
    }
  ];

  const testimonials = [
    {
      name: 'Sari Wulandari',
      role: 'Owner Warung Sari Rasa',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b618?w=64&h=64&fit=crop&crop=face',
      content: 'Platform ini membantu bisnis kuliner saya berkembang pesat. Mahasiswa IT yang saya hire berhasil membuat sistem POS yang meningkatkan penjualan 40%!',
      rating: 5
    },
    {
      name: 'Ahmad Rizki',
      role: 'Mahasiswa UI/UX ITB',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      content: 'Saya dapat pengalaman kerja nyata dan portfolio yang kuat. Sekarang sudah dapat 5 project dari platform ini dengan total earning 15 juta!',
      rating: 5
    },
    {
      name: 'Dewi Kartika',
      role: 'Owner Toko Online Fashion',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      content: 'Tim marketing mahasiswa yang saya hire berhasil meningkatkan followers Instagram dari 2K ke 50K dalam 3 bulan. ROI yang luar biasa!',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Gratis',
      period: 'selamanya',
      description: 'Untuk UMKM yang baru memulai',
      features: [
        'Post hingga 3 project per bulan',
        'Basic matching system',
        'Chat dengan mahasiswa',
        'Profile verification',
        'Community support'
      ],
      cta: 'Mulai Gratis',
      popular: false
    },
    {
      name: 'Professional',
      price: 'Rp 99K',
      period: 'per bulan',
      description: 'Untuk UMKM yang sedang berkembang',
      features: [
        'Post unlimited project',
        'AI-powered matching',
        'Priority support',
        'Advanced analytics',
        'Payment protection',
        'Video call integration',
        'Portfolio review'
      ],
      cta: 'Upgrade Sekarang',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per tahun',
      description: 'Untuk korporasi dan enterprise',
      features: [
        'Semua fitur Professional',
        'Dedicated account manager',
        'Custom integration',
        'White-label solution',
        'Training & onboarding',
        'SLA guarantee',
        'Custom reporting'
      ],
      cta: 'Hubungi Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">UM</span>
                </div>
                <span className="ml-2 font-heading font-bold text-xl text-gray-900">
                  UMKM x Mahasiswa
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Fitur
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Testimoni
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Harga
                </a>
                <a href="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  Masuk
                </a>
                <a href="/register" className="btn btn-primary">
                  Daftar Sekarang
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-primary-600 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Fitur
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Testimoni
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Harga
              </a>
              <a href="/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Masuk
              </a>
              <div className="px-3 py-2">
                <a href="/register" className="btn btn-primary w-full">
                  Daftar Sekarang
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 gradient-hero overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="heading-1 bg-gradient-to-r from-gray-900 via-primary-700 to-secondary-700 bg-clip-text text-transparent">
                  Jembatan Digital Antara{' '}
                  <span className="block">UMKM & Mahasiswa</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Platform terdepan yang menghubungkan UMKM dengan talenta mahasiswa terbaik Indonesia. 
                  Wujudkan kolaborasi yang saling menguntungkan untuk pertumbuhan bisnis dan pengembangan skill.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/register" className="btn btn-primary text-lg px-8 py-4 group">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="btn btn-outline text-lg px-8 py-4 group">
                  <Play className="mr-2 w-5 h-5" />
                  Lihat Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center"
                  alt="UMKM dan Mahasiswa berkolaborasi"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg animate-bounce-soft">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span className="text-sm font-medium">+127 Project Baru</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg animate-bounce-soft" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-warning-500 fill-current" />
                  <span className="text-sm font-medium">Rating 4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center pb-8">
          <ChevronDown className="w-6 h-6 mx-auto text-gray-400 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dilengkapi teknologi terdepan dan fitur yang dirancang khusus untuk memudahkan kolaborasi antara UMKM dan mahasiswa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card card-hover p-8 text-center group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">
              Cara Kerja Platform
            </h2>
            <p className="text-xl text-gray-600">
              Tiga langkah mudah untuk memulai kolaborasi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Daftar & Verifikasi',
                description: 'Buat akun dan lengkapi profil. Verifikasi identitas untuk keamanan maksimal.'
              },
              {
                step: '02', 
                title: 'Temukan & Connect',
                description: 'Gunakan AI matching untuk menemukan partner ideal. Mulai komunikasi melalui chat.'
              },
              {
                step: '03',
                title: 'Kolaborasi & Sukses',
                description: 'Jalankan project bersama dengan monitoring dan payment system yang aman.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full text-white font-bold text-2xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">
              Kata Mereka Tentang Kami
            </h2>
            <p className="text-xl text-gray-600">
              Ribuan UMKM dan mahasiswa telah merasakan manfaatnya
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">
              Pilih Paket Yang Tepat
            </h2>
            <p className="text-xl text-gray-600">
              Mulai gratis, upgrade sesuai kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Paling Populer
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-success-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full ${plan.popular ? 'btn btn-primary' : 'btn btn-outline'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-2 text-white mb-6">
            Siap Memulai Kolaborasi?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Bergabunglah dengan ribuan UMKM dan mahasiswa yang telah merasakan manfaatnya. Daftar sekarang dan mulai perjalanan sukses Anda!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4">
              Daftar Sebagai UMKM
            </a>
            <a href="/register" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              Daftar Sebagai Mahasiswa
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">UM</span>
                </div>
                <span className="ml-2 font-heading font-bold text-xl">
                  UMKM x Mahasiswa
                </span>
              </div>
              <p className="text-gray-400">
                Platform digital terdepan yang menghubungkan UMKM dengan talenta mahasiswa terbaik Indonesia.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fitur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Harga</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrasi</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dokumentasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 UMKM x Mahasiswa. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;