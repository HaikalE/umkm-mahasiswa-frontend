import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Star,
  Bookmark,
  ExternalLink,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProjectsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [savedProjects, setSavedProjects] = useState([]);

  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Pengembangan Website E-commerce',
      description: 'Membutuhkan developer full-stack untuk membuat website e-commerce modern dengan fitur lengkap termasuk payment gateway, inventory management, dan admin dashboard.',
      company: 'Toko Fashion Modern',
      location: 'Jakarta',
      budget: { min: 5000000, max: 10000000 },
      duration: '2-3 bulan',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Payment Gateway'],
      applicants: 12,
      posted: '2024-07-06',
      deadline: '2024-07-20',
      category: 'web_development',
      experienceLevel: 'intermediate',
      type: 'remote',
      rating: 4.8,
      verified: true
    },
    {
      id: 2,
      title: 'Social Media Marketing Campaign',
      description: 'Mencari mahasiswa kreatif untuk mengelola social media dan membuat konten menarik untuk meningkatkan brand awareness.',
      company: 'Warung Kopi Sederhana',
      location: 'Bandung',
      budget: { min: 2000000, max: 3500000 },
      duration: '1 bulan',
      skills: ['Social Media', 'Content Creation', 'Graphic Design', 'Copywriting'],
      applicants: 8,
      posted: '2024-07-05',
      deadline: '2024-07-15',
      category: 'marketing',
      experienceLevel: 'beginner',
      type: 'hybrid',
      rating: 4.5,
      verified: true
    },
    {
      id: 3,
      title: 'Mobile App UI/UX Design',
      description: 'Desain UI/UX untuk aplikasi mobile fintech dengan fokus pada user experience yang intuitif dan modern.',
      company: 'Startup Fintech',
      location: 'Surabaya',
      budget: { min: 4000000, max: 7000000 },
      duration: '6-8 minggu',
      skills: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
      applicants: 15,
      posted: '2024-07-04',
      deadline: '2024-07-18',
      category: 'design',
      experienceLevel: 'intermediate',
      type: 'remote',
      rating: 4.9,
      verified: true
    }
  ]);

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'web_development', label: 'Web Development' },
    { value: 'mobile_development', label: 'Mobile Development' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'writing', label: 'Writing' },
    { value: 'data_analysis', label: 'Data Analysis' },
    { value: 'business', label: 'Business' }
  ];

  const locations = [
    { value: 'all', label: 'Semua Lokasi' },
    { value: 'jakarta', label: 'Jakarta' },
    { value: 'bandung', label: 'Bandung' },
    { value: 'surabaya', label: 'Surabaya' },
    { value: 'yogyakarta', label: 'Yogyakarta' },
    { value: 'remote', label: 'Remote' }
  ];

  const budgetRanges = [
    { value: 'all', label: 'Semua Budget' },
    { value: '0-2000000', label: 'Di bawah Rp 2 Juta' },
    { value: '2000000-5000000', label: 'Rp 2-5 Juta' },
    { value: '5000000-10000000', label: 'Rp 5-10 Juta' },
    { value: '10000000+', label: 'Di atas Rp 10 Juta' }
  ];

  const handleSaveProject = (projectId) => {
    setSavedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const formatBudget = (budget) => {
    if (budget.min === budget.max) {
      return `Rp ${(budget.min / 1000000).toFixed(1)}M`;
    }
    return `Rp ${(budget.min / 1000000).toFixed(1)}M - Rp ${(budget.max / 1000000).toFixed(1)}M`;
  };

  const ProjectCard = ({ project }) => (
    <div className="card p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mr-2">
              {project.title}
            </h3>
            {project.verified && (
              <div className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="font-medium">{project.company}</span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {project.duration}
            </div>
          </div>
        </div>
        <button 
          onClick={() => handleSaveProject(project.id)}
          className={`p-2 rounded-lg transition-colors ${
            savedProjects.includes(project.id)
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${savedProjects.includes(project.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="px-3 py-1 text-sm bg-primary-100 text-primary-800 rounded-full">
            {skill}
          </span>
        ))}
        {project.skills.length > 4 && (
          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
            +{project.skills.length - 4} lainnya
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            {formatBudget(project.budget)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            {project.applicants} pelamar
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 mr-1 fill-current text-warning-500" />
            {project.rating}
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          project.type === 'remote' ? 'bg-success-100 text-success-800' :
          project.type === 'onsite' ? 'bg-primary-100 text-primary-800' :
          'bg-warning-100 text-warning-800'
        }`}>
          {project.type === 'remote' ? 'Remote' :
           project.type === 'onsite' ? 'On-site' : 'Hybrid'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-outline btn-sm">
            <ExternalLink className="w-4 h-4 mr-1" />
            Detail
          </button>
          {user?.user_type === 'student' && (
            <button className="btn btn-primary btn-sm">
              Lamar Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Cari Proyek</h1>
              <p className="text-gray-600 mt-1">
                Temukan proyek yang sesuai dengan skill dan minat Anda
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {projects.length} proyek tersedia
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="form-label">Pencarian</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Cari proyek..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="form-label">Kategori</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-input"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="form-label">Lokasi</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="form-input"
                  >
                    {locations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="form-label">Budget</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="form-input"
                  >
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="form-label">Level Pengalaman</label>
                  <div className="space-y-2">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 mr-2" />
                        <span className="text-sm text-gray-700 capitalize">
                          {level === 'beginner' ? 'Pemula' :
                           level === 'intermediate' ? 'Menengah' : 'Mahir'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="form-label">Tipe Kerja</label>
                  <div className="space-y-2">
                    {['remote', 'onsite', 'hybrid'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 mr-2" />
                        <span className="text-sm text-gray-700 capitalize">
                          {type === 'remote' ? 'Remote' :
                           type === 'onsite' ? 'On-site' : 'Hybrid'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full btn btn-outline">
                  Reset Filter
                </button>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input w-auto"
                >
                  <option value="newest">Terbaru</option>
                  <option value="budget_high">Budget Tertinggi</option>
                  <option value="budget_low">Budget Terendah</option>
                  <option value="deadline">Deadline Terdekat</option>
                  <option value="applicants">Paling Banyak Pelamar</option>
                </select>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="space-y-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Sebelumnya
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;