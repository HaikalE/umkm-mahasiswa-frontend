import React, { useState } from 'react';
import {
  BarChart3,
  Target,
  Users,
  MessageSquare,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  Calendar,
  TrendingUp,
  DollarSign,
  Package,
  Settings
} from 'lucide-react';

const UmkmDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalProjects: 12,
    activeProjects: 4,
    totalApplications: 87,
    totalRevenue: 25000000,
    rating: 4.8,
    totalProducts: 6
  };

  const recentProjects = [
    {
      id: 1,
      title: 'Website E-commerce',
      status: 'active',
      applications: 12,
      budget: 'Rp 5.000.000',
      deadline: '2024-08-15'
    },
    {
      id: 2,
      title: 'Social Media Management',
      status: 'completed',
      applications: 8,
      budget: 'Rp 2.500.000',
      deadline: '2024-07-20'
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard UMKM</h1>
            <div className="flex items-center space-x-4">
              <button className="btn btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Post Project Baru
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
              { id: 'projects', label: 'Proyek Saya', icon: Target },
              { id: 'products', label: 'Produk', icon: Package },
              { id: 'applications', label: 'Aplikasi', icon: Users },
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
                title="Total Proyek"
                value={stats.totalProjects}
                icon={Target}
                color="primary"
                change={15}
              />
              <StatCard
                title="Proyek Aktif"
                value={stats.activeProjects}
                icon={Calendar}
                color="warning"
              />
              <StatCard
                title="Total Aplikasi"
                value={stats.totalApplications}
                icon={Users}
                color="secondary"
                change={23}
              />
              <StatCard
                title="Revenue"
                value={`Rp ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
                icon={DollarSign}
                color="success"
                change={18}
              />
              <StatCard
                title="Rating"
                value={stats.rating}
                icon={Star}
                color="warning"
              />
              <StatCard
                title="Total Produk"
                value={stats.totalProducts}
                icon={Package}
                color="secondary"
              />
            </div>

            {/* Recent Projects */}
            <div className="card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Proyek Terbaru</h3>
                  <button className="btn btn-outline btn-sm">
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proyek
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aplikasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            project.status === 'active' 
                              ? 'bg-success-100 text-success-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status === 'active' ? 'Aktif' : 'Selesai'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.applications} aplikasi
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.budget}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(project.deadline).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-danger-600 hover:text-danger-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'overview' && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              {activeTab === 'projects' && <Target className="w-6 h-6 text-gray-500" />}
              {activeTab === 'products' && <Package className="w-6 h-6 text-gray-500" />}
              {activeTab === 'applications' && <Users className="w-6 h-6 text-gray-500" />}
              {activeTab === 'messages' && <MessageSquare className="w-6 h-6 text-gray-500" />}
              {activeTab === 'settings' && <Settings className="w-6 h-6 text-gray-500" />}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'projects' && 'Manajemen Proyek'}
              {activeTab === 'products' && 'Manajemen Produk'}
              {activeTab === 'applications' && 'Aplikasi Masuk'}
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

export default UmkmDashboard;