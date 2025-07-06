import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Edit,
  Camera,
  Save,
  X,
  Star,
  Award,
  Briefcase,
  Calendar,
  Globe,
  Github,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    github: user?.github || '',
    linkedin: user?.linkedin || ''
  });

  // Mock additional data based on user type
  const [profileData] = useState({
    umkm: {
      business_type: 'Kuliner',
      description: 'Warung kopi dengan konsep modern yang menyajikan kopi berkualitas tinggi dengan suasana yang nyaman.',
      address: 'Jl. Braga No. 123, Bandung',
      rating: 4.8,
      total_projects: 12,
      completed_projects: 10,
      total_reviews: 87,
      verified: true,
      founded_year: 2020
    },
    student: {
      university: 'Institut Teknologi Bandung',
      major: 'Teknik Informatika',
      semester: 6,
      graduation_year: 2025,
      skills: ['React', 'Node.js', 'Python', 'UI/UX Design', 'MongoDB'],
      experience_level: 'Intermediate',
      portfolio_url: 'https://portfolio.example.com',
      gpa: 3.85,
      completed_projects: 8,
      total_earnings: 12500000,
      rating: 4.7
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      github: user?.github || '',
      linkedin: user?.linkedin || ''
    });
    setIsEditing(false);
  };

  const StatCard = ({ icon: Icon, label, value, color = "primary" }) => (
    <div className="card p-6 text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-${color}-100 rounded-lg mb-4`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profil
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handleCancel}
                  className="btn btn-outline"
                >
                  <X className="w-4 h-4 mr-2" />
                  Batal
                </button>
                <button 
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="card p-6">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.full_name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-500">
                        {user?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Basic Details */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="form-label">
                          {user?.user_type === 'umkm' ? 'Nama Bisnis' : 'Nama Lengkap'}
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Nomor Telepon</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {user?.full_name}
                        </h2>
                        {user?.user_type === 'umkm' && profileData.umkm.verified && (
                          <div className="ml-2 w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {user?.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {user?.phone}
                        </div>
                        {user?.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {user?.user_type === 'umkm' ? 'Deskripsi Bisnis' : 'Bio'}
                </h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input w-full"
                    placeholder={user?.user_type === 'umkm' ? 'Ceritakan tentang bisnis Anda...' : 'Ceritakan tentang diri Anda...'}
                  />
                ) : (
                  <p className="text-gray-700">
                    {user?.bio || (user?.user_type === 'umkm' ? profileData.umkm.description : 'Belum ada bio yang ditambahkan.')}
                  </p>
                )}
              </div>

              {/* Links Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
                {isEditing ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="form-label">LinkedIn</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    {user?.user_type === 'student' && (
                      <div>
                        <label className="form-label">GitHub</label>
                        <input
                          type="url"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {user?.website && (
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 hover:text-primary-700"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                    {user?.linkedin && (
                      <a 
                        href={user.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 hover:text-primary-700"
                      >
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                    {user?.user_type === 'student' && user?.github && (
                      <a 
                        href={user.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 hover:text-primary-700"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Type-specific Info */}
            {user?.user_type === 'umkm' && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Bisnis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="font-medium">Jenis Bisnis:</span>
                    </div>
                    <p className="text-gray-900">{profileData.umkm.business_type}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Didirikan:</span>
                    </div>
                    <p className="text-gray-900">{profileData.umkm.founded_year}</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Alamat:</span>
                    </div>
                    <p className="text-gray-900">{profileData.umkm.address}</p>
                  </div>
                </div>
              </div>
            )}

            {user?.user_type === 'student' && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akademik</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span className="font-medium">Universitas:</span>
                    </div>
                    <p className="text-gray-900">{profileData.student.university}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="font-medium">Jurusan:</span>
                    </div>
                    <p className="text-gray-900">{profileData.student.major}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="font-medium">Semester:</span>
                    </div>
                    <p className="text-gray-900">{profileData.student.semester}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="font-medium">Tahun Lulus:</span>
                    </div>
                    <p className="text-gray-900">{profileData.student.graduation_year}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.student.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="space-y-4">
              {user?.user_type === 'umkm' && (
                <>
                  <StatCard 
                    icon={Star} 
                    label="Rating" 
                    value={profileData.umkm.rating} 
                    color="warning" 
                  />
                  <StatCard 
                    icon={Briefcase} 
                    label="Total Proyek" 
                    value={profileData.umkm.total_projects} 
                    color="primary" 
                  />
                  <StatCard 
                    icon={Award} 
                    label="Proyek Selesai" 
                    value={profileData.umkm.completed_projects} 
                    color="success" 
                  />
                </>
              )}

              {user?.user_type === 'student' && (
                <>
                  <StatCard 
                    icon={Star} 
                    label="Rating" 
                    value={profileData.student.rating} 
                    color="warning" 
                  />
                  <StatCard 
                    icon={Briefcase} 
                    label="Proyek Selesai" 
                    value={profileData.student.completed_projects} 
                    color="success" 
                  />
                  <StatCard 
                    icon={Award} 
                    label="Total Earnings" 
                    value={`Rp ${(profileData.student.total_earnings / 1000000).toFixed(1)}M`} 
                    color="primary" 
                  />
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                {user?.user_type === 'umkm' && (
                  <>
                    <button className="w-full btn btn-primary btn-sm">
                      Post Proyek Baru
                    </button>
                    <button className="w-full btn btn-outline btn-sm">
                      Kelola Produk
                    </button>
                  </>
                )}
                {user?.user_type === 'student' && (
                  <>
                    <button className="w-full btn btn-primary btn-sm">
                      Update Portfolio
                    </button>
                    <button className="w-full btn btn-outline btn-sm">
                      Cari Proyek
                    </button>
                  </>
                )}
                <button className="w-full btn btn-outline btn-sm">
                  Pengaturan Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;