import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Building2,
  GraduationCap,
  Target,
  MessageSquare,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  Calendar,
  Globe,
  Shield,
  Activity,
  UserCheck,
  UserX,
  Star,
  Award,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalUsers: 17500,
    totalUMKM: 2500,
    totalStudents: 15000,
    totalProjects: 8900,
    totalRevenue: 125000000,
    activeProjects: 1230,
    completedProjects: 7670,
    pendingVerifications: 45
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'user_registration',
      user: 'Ahmad Rizki',
      action: 'Mendaftar sebagai mahasiswa',
      timestamp: '2 menit yang lalu',
      status: 'success'
    },
    {
      id: 2,
      type: 'project_completed',
      user: 'Warung Sari Rasa',
      action: 'Menyelesaikan project "Website Landing Page"',
      timestamp: '15 menit yang lalu',
      status: 'success'
    },
    {
      id: 3,
      type: 'verification_pending',
      user: 'Toko Fashion Dewi',
      action: 'Meminta verifikasi bisnis',
      timestamp: '1 jam yang lalu',
      status: 'pending'
    },
    {
      id: 4,
      type: 'payment_processed',
      user: 'PT. Digital Solusi',
      action: 'Pembayaran Rp 5.000.000 berhasil',
      timestamp: '2 jam yang lalu',
      status: 'success'
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@email.com',
      type: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-07-06',
      projects: 5,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Warung Sari Rasa',
      email: 'sari.warung@email.com',
      type: 'umkm',
      status: 'verified',
      joinDate: '2024-02-20',
      lastActive: '2024-07-06',
      projects: 12,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Dewi Kartika',
      email: 'dewi.fashion@email.com',
      type: 'umkm',
      status: 'pending',
      joinDate: '2024-07-05',
      lastActive: '2024-07-06',
      projects: 0,
      rating: 0
    }
  ]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleUserAction = (userId, action) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'approve' ? 'verified' : 'suspended' }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.type === selectedFilter || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const StatCard = ({ title, value, change, icon: Icon, color = "primary" }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center text-sm ${change > 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {change > 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}% dari bulan lalu
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-3 h-3 rounded-full ${
        activity.status === 'success' ? 'bg-success-500' :
        activity.status === 'pending' ? 'bg-warning-500' : 'bg-danger-500'
      }`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
        <p className="text-sm text-gray-600">{activity.action}</p>
        <p className="text-xs text-gray-500">{activity.timestamp}</p>
      </div>
    </div>
  );

  const UserRow = ({ user }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.type === 'umkm' ? 'bg-primary-100 text-primary-800' : 'bg-secondary-100 text-secondary-800'
        }`}>
          {user.type === 'umkm' ? 'UMKM' : 'Mahasiswa'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.status === 'active' || user.status === 'verified' 
            ? 'bg-success-100 text-success-800' 
            : user.status === 'pending'
            ? 'bg-warning-100 text-warning-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {user.status === 'verified' ? 'Terverifikasi' : 
           user.status === 'active' ? 'Aktif' :
           user.status === 'pending' ? 'Menunggu' : 'Suspended'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.projects}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-warning-500 fill-current mr-1" />
          <span className="text-sm text-gray-900">{user.rating || 'N/A'}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.joinDate).toLocaleDateString('id-ID')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-900">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Edit className="w-4 h-4" />
          </button>
          {user.status === 'pending' && (
            <>
              <button 
                onClick={() => handleUserAction(user.id, 'approve')}
                className="text-success-600 hover:text-success-900"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleUserAction(user.id, 'reject')}
                className="text-danger-600 hover:text-danger-900"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
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
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'users', label: 'Pengguna', icon: Users },
              { id: 'projects', label: 'Proyek', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Pengguna"
                value={stats.totalUsers.toLocaleString('id-ID')}
                change={12}
                icon={Users}
                color="primary"
              />
              <StatCard
                title="Total UMKM"
                value={stats.totalUMKM.toLocaleString('id-ID')}
                change={8}
                icon={Building2}
                color="secondary"
              />
              <StatCard
                title="Total Mahasiswa"
                value={stats.totalStudents.toLocaleString('id-ID')}
                change={15}
                icon={GraduationCap}
                color="success"
              />
              <StatCard
                title="Total Revenue"
                value={`Rp ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
                change={23}
                icon={DollarSign}
                color="warning"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Aktivitas Terbaru</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      {recentActivities.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h3>
                  <div className="space-y-3">
                    <button className="w-full btn btn-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Admin
                    </button>
                    <button className="w-full btn btn-outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </button>
                    <button className="w-full btn btn-outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </button>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Statistik Hari Ini</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pengguna Baru</span>
                      <span className="text-sm font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Proyek Baru</span>
                      <span className="text-sm font-medium">43</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Proyek Selesai</span>
                      <span className="text-sm font-medium">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="text-sm font-medium">Rp 12.5M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari pengguna..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="form-input"
                >
                  <option value="all">Semua</option>
                  <option value="umkm">UMKM</option>
                  <option value="student">Mahasiswa</option>
                  <option value="pending">Menunggu Verifikasi</option>
                  <option value="verified">Terverifikasi</option>
                </select>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah User
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pengguna
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipe
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proyek
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bergabung
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manajemen Proyek</h3>
              <p className="text-gray-600">Kelola semua proyek yang berjalan di platform</p>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-gray-600">Analisa performa platform secara detail</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pengaturan Platform</h3>
              <p className="text-gray-600">Konfigurasi dan pengaturan sistem</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;