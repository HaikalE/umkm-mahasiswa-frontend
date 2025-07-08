import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ExternalLink,
  Activity,
  Clock,
  CheckCircle,
  ArrowRight,
  Target,
  PlayCircle,
  XCircle,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { studentsAPI } from '../../services/api';
import MyApplicationsPage from './MyApplicationsPage';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeProject, setActiveProject] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats and active project in parallel
      const [statsResponse, projectResponse, applicationsResponse, opportunitiesResponse] = await Promise.all([
        studentsAPI.getDashboardStats().catch(err => ({ data: {} })),
        studentsAPI.getActiveProject().catch(err => ({ data: {} })),
        studentsAPI.getMyApplications({ limit: 5 }).catch(err => ({ data: { applications: [] } })),
        studentsAPI.getOpportunities({ limit: 5 }).catch(err => ({ data: { projects: [] } }))
      ]);
      
      setDashboardStats(statsResponse.data || {});
      setActiveProject(projectResponse.data?.activeProject || null);
      setRecentApplications(applicationsResponse.data?.applications || []);
      setAvailableProjects(opportunitiesResponse.data?.projects || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = "primary", change }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600">+{change}% dari bulan lalu</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${
          color === 'primary' ? 'bg-blue-100' :
          color === 'success' ? 'bg-green-100' :
          color === 'warning' ? 'bg-yellow-100' :
          color === 'secondary' ? 'bg-purple-100' : 'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            color === 'primary' ? 'text-blue-600' :
            color === 'success' ? 'text-green-600' :
            color === 'warning' ? 'text-yellow-600' :
            color === 'secondary' ? 'text-purple-600' : 'text-gray-600'
          }`} />
        </div>
      </div>
    </div>
  );

  // Active Project Card Component
  const ActiveProjectCard = () => {
    if (!activeProject) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-8"
        >
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Project Aktif</h3>
            <p className="text-gray-600 mb-4">
              Jelajahi opportunities dan lamar project yang sesuai dengan skill Anda!
            </p>
            <button 
              onClick={() => setActiveTab('projects')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Cari Project
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Project Aktif</h3>
              <p className="text-green-600 text-sm font-medium">Sedang Dikerjakan</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/student/active-project')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            Kelola Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 text-lg mb-1">{activeProject.title}</h4>
            <p className="text-gray-600 mb-2">{activeProject.umkm?.umkmProfile?.business_name}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {new Date(activeProject.deadline).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{activeProject.duration} hari</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">75%</div>
            <p className="text-sm text-gray-600">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              Rp {activeProject.budget_min?.toLocaleString('id-ID')}
            </div>
            <p className="text-sm text-gray-600">Budget Project</p>
            <div className="flex justify-end gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {activeProject.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Projects Tab Component
  const ProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Cari Project</h2>
        <button 
          onClick={() => navigate('/projects')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Lihat Semua Project
        </button>
      </div>
      
      <div className="grid gap-4">
        {availableProjects.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Belum ada project tersedia saat ini</p>
          </div>
        ) : (
          availableProjects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-2">{project.umkm?.umkmProfile?.business_name}</p>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Rp {project.budget_min?.toLocaleString('id-ID')} - Rp {project.budget_max?.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  
                  {project.required_skills && (
                    <div className="flex flex-wrap gap-1">
                      {project.required_skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {skill}
                        </span>
                      ))}
                      {project.required_skills.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{project.required_skills.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  Lihat Detail
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Portfolio Tab Component
  const PortfolioTab = () => (
    <div className="text-center py-12">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <FileText className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio Management</h3>
      <p className="text-gray-600 mb-4">Kelola portfolio dan showcase skill Anda</p>
      <button 
        onClick={() => navigate('/profile')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Update Portfolio
      </button>
    </div>
  );

  // Messages Tab Component
  const MessagesTab = () => (
    <div className="text-center py-12">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <MessageSquare className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Pesan & Chat</h3>
      <p className="text-gray-600">Komunikasi dengan UMKM dan kelola pesan Anda</p>
    </div>
  );

  // Settings Tab Component
  const SettingsTab = () => (
    <div className="text-center py-12">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <Settings className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Pengaturan Akun</h3>
      <p className="text-gray-600 mb-4">Kelola preferensi dan pengaturan akun Anda</p>
      <button 
        onClick={() => navigate('/profile')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Buka Pengaturan
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Mahasiswa</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/profile')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Update Portfolio
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Cari Proyek
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Project Card - Only show on overview tab */}
        {activeTab === 'overview' && <ActiveProjectCard />}
        
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
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <StatCard
                title="Proyek Dilamar"
                value={dashboardStats?.total_applications || 0}
                icon={Briefcase}
                color="primary"
                change={12}
              />
              <StatCard
                title="Proyek Diterima"
                value={dashboardStats?.accepted_applications || 0}
                icon={Award}
                color="success"
                change={25}
              />
              <StatCard
                title="Proyek Selesai"
                value={dashboardStats?.completed_projects || 0}
                icon={CheckCircle}
                color="secondary"
              />
              <StatCard
                title="Rating"
                value={dashboardStats?.average_rating || 0}
                icon={Star}
                color="warning"
              />
              <StatCard
                title="Total Reviews"
                value={dashboardStats?.total_reviews || 0}
                icon={MessageSquare}
                color="secondary"
                change={15}
              />
              <StatCard
                title="Portfolio Views"
                value={dashboardStats?.portfolio_views || 234}
                icon={Eye}
                color="primary"
                change={15}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Applications */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Aplikasi Terbaru</h3>
                    <button 
                      onClick={() => setActiveTab('applications')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Lihat Semua
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentApplications.length === 0 ? (
                      <div className="text-center py-8">
                        <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">Belum ada aplikasi</p>
                      </div>
                    ) : (
                      recentApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{app.project?.title}</h4>
                            <p className="text-sm text-gray-600">{app.project?.umkm?.umkmProfile?.business_name}</p>
                            <p className="text-sm text-gray-500">Rp {app.proposed_budget?.toLocaleString('id-ID')}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              app.status === 'accepted' 
                                ? 'bg-green-100 text-green-800'
                                : app.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : app.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {app.status === 'accepted' ? 'Diterima' : 
                               app.status === 'pending' ? 'Menunggu' : 
                               app.status === 'rejected' ? 'Ditolak' : app.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Available Projects */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Proyek Tersedia</h3>
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Lihat Semua
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {availableProjects.length === 0 ? (
                      <div className="text-center py-8">
                        <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">Belum ada project tersedia</p>
                      </div>
                    ) : (
                      availableProjects.map((project) => (
                        <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{project.title}</h4>
                            <button 
                              onClick={() => navigate(`/projects/${project.id}`)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{project.umkm?.umkmProfile?.business_name}</p>
                          <p className="text-sm text-gray-900 mb-2">
                            Rp {project.budget_min?.toLocaleString('id-ID')} - Rp {project.budget_max?.toLocaleString('id-ID')}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.required_skills?.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            Diposting {new Date(project.created_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENHANCED: Use dedicated components for each tab */}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'applications' && <MyApplicationsPage />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
};

export default StudentDashboard;