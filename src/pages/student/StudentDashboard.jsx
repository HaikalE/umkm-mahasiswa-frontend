import React, { useState } from 'react';
import {
  BarChart3,
  Search,
  Briefcase,
  User,
  MessageSquare,
  Award,
  Star,
  Calendar,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  Plus,
  Eye,
  ExternalLink
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    appliedProjects: 15,
    acceptedProjects: 8,
    completedProjects: 5,
    totalEarnings: 12500000,
    rating: 4.7,
    portfolioViews: 234
  };

  const recentApplications = [
    {
      id: 1,
      title: 'UI/UX Design untuk E-commerce',
      company: 'Toko Fashion Online',
      status: 'pending',
      appliedDate: '2024-07-05',
      budget: 'Rp 3.000.000'
    },
    {
      id: 2,
      title: 'Social Media Content Creator',
      company: 'Warung Kopi Sederhana',
      status: 'accepted',
      appliedDate: '2024-07-03',
      budget: 'Rp 2.000.000'
    }
  ];

  const availableProjects = [
    {
      id: 1,
      title: 'Website Development',
      company: 'PT Digital Solusi',
      budget: 'Rp 5.000.000 - Rp 8.000.000',
      duration: '2 bulan',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      postedDate: '2024-07-06'
    },
    {
      id: 2,
      title: 'Mobile App Design',
      company: 'Startup EdTech',
      budget: 'Rp 4.000.000 - Rp 6.000.000',
      duration: '6 minggu',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      postedDate: '2024-07-05'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color = "primary", change }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-success-600">+{change}% dari bulan lalu</p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Mahasiswa</h1>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <Plus className="w-4 h-4 mr-2" />
                Update Portfolio
              </button>
              <button className="btn btn-primary">
                <Search className="w-4 h-4 mr-2" />
                Cari Proyek
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: 'Cari Proyek', icon: Search },
              { id: 'applications', label: 'Aplikasi Saya', icon: Briefcase },
              { id: 'portfolio', label: 'Portfolio', icon: FileText },
              { id: 'messages', label: 'Pesan', icon: MessageSquare },
              { id: 'settings', label: 'Pengaturan', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <StatCard
                title="Proyek Dilamar"
                value={stats.appliedProjects}
                icon={Briefcase}
                color="primary"
                change={12}
              />
              <StatCard
                title="Proyek Diterima"
                value={stats.acceptedProjects}
                icon={Award}
                color="success"
                change={25}
              />
              <StatCard
                title="Proyek Selesai"
                value={stats.completedProjects}
                icon={Calendar}
                color="secondary"
              />
              <StatCard
                title="Total Earnings"
                value={`Rp ${(stats.totalEarnings / 1000000).toFixed(1)}M`}
                icon={DollarSign}
                color="warning"
                change={18}
              />
              <StatCard
                title="Rating"
                value={stats.rating}
                icon={Star}
                color="warning"
              />
              <StatCard
                title="Portfolio Views"
                value={stats.portfolioViews}
                icon={Eye}
                color="secondary"
                change={15}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Applications */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Aplikasi Terbaru</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{app.title}</h4>
                          <p className="text-sm text-gray-600">{app.company}</p>
                          <p className="text-sm text-gray-500">{app.budget}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            app.status === 'accepted' 
                              ? 'bg-success-100 text-success-800'
                              : app.status === 'pending'
                              ? 'bg-warning-100 text-warning-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {app.status === 'accepted' ? 'Diterima' : 
                             app.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Projects */}
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Proyek Tersedia</h3>
                    <button className="btn btn-outline btn-sm">
                      Lihat Semua
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {availableProjects.map((project) => (
                      <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{project.title}</h4>
                          <button className="text-primary-600 hover:text-primary-700">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{project.company}</p>
                        <p className="text-sm text-gray-900 mb-2">{project.budget}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          Diposting {new Date(project.postedDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'overview' && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              {activeTab === 'projects' && <Search className="w-6 h-6 text-gray-500" />}
              {activeTab === 'applications' && <Briefcase className="w-6 h-6 text-gray-500" />}
              {activeTab === 'portfolio' && <FileText className="w-6 h-6 text-gray-500" />}
              {activeTab === 'messages' && <MessageSquare className="w-6 h-6 text-gray-500" />}
              {activeTab === 'settings' && <Settings className="w-6 h-6 text-gray-500" />}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'projects' && 'Cari Proyek'}
              {activeTab === 'applications' && 'Aplikasi Saya'}
              {activeTab === 'portfolio' && 'Portfolio'}
              {activeTab === 'messages' && 'Pesan & Chat'}
              {activeTab === 'settings' && 'Pengaturan Akun'}
            </h3>
            <p className="text-gray-600">
              Fitur ini sedang dalam pengembangan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;