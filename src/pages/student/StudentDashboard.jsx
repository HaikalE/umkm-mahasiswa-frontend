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
  PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { studentsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeProject, setActiveProject] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats and active project in parallel
      const [statsResponse, projectResponse] = await Promise.all([
        studentsAPI.getDashboardStats(),
        studentsAPI.getActiveProject()
      ]);
      
      setDashboardStats(statsResponse);
      setActiveProject(projectResponse.activeProject);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
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

  const StatCard = ({ title, value, icon: Icon, color = \"primary\", change }) => (
    <div className=\"bg-white rounded-lg shadow-sm border p-6\">\n      <div className=\"flex items-center justify-between\">\n        <div>\n          <p className=\"text-sm font-medium text-gray-600\">{title}</p>\n          <p className=\"text-2xl font-semibold text-gray-900\">{value}</p>\n          {change && (\n            <p className=\"text-sm text-green-600\">+{change}% dari bulan lalu</p>\n          )}\n        </div>\n        <div className={`p-3 rounded-full ${\n          color === 'primary' ? 'bg-blue-100' :\n          color === 'success' ? 'bg-green-100' :\n          color === 'warning' ? 'bg-yellow-100' :\n          color === 'secondary' ? 'bg-purple-100' : 'bg-gray-100'\n        }`}>\n          <Icon className={`w-6 h-6 ${\n            color === 'primary' ? 'text-blue-600' :\n            color === 'success' ? 'text-green-600' :\n            color === 'warning' ? 'text-yellow-600' :\n            color === 'secondary' ? 'text-purple-600' : 'text-gray-600'\n          }`} />\n        </div>\n      </div>\n    </div>\n  );\n\n  // Active Project Card Component\n  const ActiveProjectCard = () => {\n    if (!activeProject) {\n      return (\n        <motion.div \n          initial={{ opacity: 0, y: 20 }}\n          animate={{ opacity: 1, y: 0 }}\n          className=\"bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-8\"\n        >\n          <div className=\"text-center py-8\">\n            <div className=\"w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center\">\n              <Target className=\"w-8 h-8 text-blue-600\" />\n            </div>\n            <h3 className=\"text-lg font-semibold text-gray-900 mb-2\">Belum Ada Project Aktif</h3>\n            <p className=\"text-gray-600 mb-4\">\n              Jelajahi opportunities dan lamar project yang sesuai dengan skill Anda!\n            </p>\n            <button \n              onClick={() => setActiveTab('projects')}\n              className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2\"\n            >\n              <Search className=\"w-4 h-4\" />\n              Cari Project\n            </button>\n          </div>\n        </motion.div>\n      );\n    }\n\n    return (\n      <motion.div \n        initial={{ opacity: 0, y: 20 }}\n        animate={{ opacity: 1, y: 0 }}\n        className=\"bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6 mb-8\"\n      >\n        <div className=\"flex items-center justify-between mb-4\">\n          <div className=\"flex items-center gap-3\">\n            <div className=\"w-12 h-12 rounded-full bg-green-100 flex items-center justify-center\">\n              <PlayCircle className=\"w-6 h-6 text-green-600\" />\n            </div>\n            <div>\n              <h3 className=\"text-lg font-semibold text-gray-900\">Project Aktif</h3>\n              <p className=\"text-green-600 text-sm font-medium\">Sedang Dikerjakan</p>\n            </div>\n          </div>\n          <button \n            onClick={() => navigate('/student/active-project')}\n            className=\"bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2\"\n          >\n            Kelola Project\n            <ArrowRight className=\"w-4 h-4\" />\n          </button>\n        </div>\n        \n        <div className=\"grid md:grid-cols-3 gap-4\">\n          <div>\n            <h4 className=\"font-semibold text-gray-900 text-lg mb-1\">{activeProject.title}</h4>\n            <p className=\"text-gray-600 mb-2\">{activeProject.umkm?.umkmProfile?.business_name}</p>\n            <div className=\"flex items-center gap-4 text-sm text-gray-600\">\n              <div className=\"flex items-center gap-1\">\n                <Calendar className=\"w-4 h-4\" />\n                <span>Deadline: {new Date(activeProject.deadline).toLocaleDateString('id-ID')}</span>\n              </div>\n              <div className=\"flex items-center gap-1\">\n                <Clock className=\"w-4 h-4\" />\n                <span>{activeProject.duration} hari</span>\n              </div>\n            </div>\n          </div>\n          \n          <div className=\"text-center\">\n            <div className=\"text-2xl font-bold text-green-600\">75%</div>\n            <p className=\"text-sm text-gray-600\">Progress</p>\n            <div className=\"w-full bg-gray-200 rounded-full h-2 mt-2\">\n              <div className=\"bg-green-600 h-2 rounded-full\" style={{ width: '75%' }}></div>\n            </div>\n          </div>\n          \n          <div className=\"text-right\">\n            <div className=\"text-lg font-semibold text-gray-900\">\n              Rp {activeProject.budget_min?.toLocaleString('id-ID')}\n            </div>\n            <p className=\"text-sm text-gray-600\">Budget Project</p>\n            <div className=\"flex justify-end gap-2 mt-2\">\n              <span className=\"px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs\">\n                {activeProject.category}\n              </span>\n            </div>\n          </div>\n        </div>\n      </motion.div>\n    );\n  };\n\n  if (loading) {\n    return (\n      <div className=\"flex items-center justify-center min-h-screen\">\n        <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600\"></div>\n      </div>\n    );\n  }\n\n  return (\n    <div className=\"min-h-screen bg-gray-50\">\n      {/* Header */}\n      <header className=\"bg-white shadow-sm border-b border-gray-200\">\n        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n          <div className=\"flex justify-between items-center h-16\">\n            <h1 className=\"text-2xl font-bold text-gray-900\">Dashboard Mahasiswa</h1>\n            <div className=\"flex items-center space-x-4\">\n              <button \n                onClick={() => navigate('/profile')}\n                className=\"text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2\"\n              >\n                <Plus className=\"w-4 h-4\" />\n                Update Portfolio\n              </button>\n              <button \n                onClick={() => setActiveTab('projects')}\n                className=\"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2\"\n              >\n                <Search className=\"w-4 h-4\" />\n                Cari Proyek\n              </button>\n            </div>\n          </div>\n        </div>\n      </header>\n\n      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">\n        {/* Active Project Card */}\n        <ActiveProjectCard />\n        \n        {/* Navigation Tabs */}\n        <div className=\"mb-8\">\n          <nav className=\"flex space-x-8 border-b border-gray-200\">\n            {[\n              { id: 'overview', label: 'Overview', icon: BarChart3 },\n              { id: 'projects', label: 'Cari Proyek', icon: Search },\n              { id: 'applications', label: 'Aplikasi Saya', icon: Briefcase },\n              { id: 'portfolio', label: 'Portfolio', icon: FileText },\n              { id: 'messages', label: 'Pesan', icon: MessageSquare },\n              { id: 'settings', label: 'Pengaturan', icon: Settings }\n            ].map((tab) => (\n              <button\n                key={tab.id}\n                onClick={() => setActiveTab(tab.id)}\n                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${\n                  activeTab === tab.id\n                    ? 'border-blue-500 text-blue-600'\n                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'\n                }`}\n              >\n                <tab.icon className=\"w-4 h-4\" />\n                <span>{tab.label}</span>\n              </button>\n            ))}\n          </nav>\n        </div>\n\n        {/* Overview Tab */}\n        {activeTab === 'overview' && (\n          <div className=\"space-y-8\">\n            {/* Stats Grid */}\n            <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6\">\n              <StatCard\n                title=\"Proyek Dilamar\"\n                value={dashboardStats?.total_applications || 0}\n                icon={Briefcase}\n                color=\"primary\"\n                change={12}\n              />\n              <StatCard\n                title=\"Proyek Diterima\"\n                value={dashboardStats?.accepted_applications || 0}\n                icon={Award}\n                color=\"success\"\n                change={25}\n              />\n              <StatCard\n                title=\"Proyek Selesai\"\n                value={dashboardStats?.completed_projects || 0}\n                icon={CheckCircle}\n                color=\"secondary\"\n              />\n              <StatCard\n                title=\"Rating\"\n                value={dashboardStats?.average_rating || 0}\n                icon={Star}\n                color=\"warning\"\n              />\n              <StatCard\n                title=\"Total Reviews\"\n                value={dashboardStats?.total_reviews || 0}\n                icon={MessageSquare}\n                color=\"secondary\"\n                change={15}\n              />\n              <StatCard\n                title=\"Portfolio Views\"\n                value={234}\n                icon={Eye}\n                color=\"primary\"\n                change={15}\n              />\n            </div>\n\n            <div className=\"grid lg:grid-cols-2 gap-8\">\n              {/* Recent Applications */}\n              <div className=\"bg-white rounded-lg shadow-sm border\">\n                <div className=\"p-6 border-b border-gray-200\">\n                  <h3 className=\"text-lg font-medium text-gray-900\">Aplikasi Terbaru</h3>\n                </div>\n                <div className=\"p-6\">\n                  <div className=\"space-y-4\">\n                    {recentApplications.map((app) => (\n                      <div key={app.id} className=\"flex items-center justify-between p-4 bg-gray-50 rounded-lg\">\n                        <div className=\"flex-1\">\n                          <h4 className=\"font-medium text-gray-900\">{app.title}</h4>\n                          <p className=\"text-sm text-gray-600\">{app.company}</p>\n                          <p className=\"text-sm text-gray-500\">{app.budget}</p>\n                        </div>\n                        <div className=\"text-right\">\n                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${\n                            app.status === 'accepted' \n                              ? 'bg-green-100 text-green-800'\n                              : app.status === 'pending'\n                              ? 'bg-yellow-100 text-yellow-800'\n                              : 'bg-gray-100 text-gray-800'\n                          }`}>\n                            {app.status === 'accepted' ? 'Diterima' : \n                             app.status === 'pending' ? 'Menunggu' : 'Ditolak'}\n                          </span>\n                        </div>\n                      </div>\n                    ))}\n                  </div>\n                </div>\n              </div>\n\n              {/* Available Projects */}\n              <div className=\"bg-white rounded-lg shadow-sm border\">\n                <div className=\"p-6 border-b border-gray-200\">\n                  <div className=\"flex justify-between items-center\">\n                    <h3 className=\"text-lg font-medium text-gray-900\">Proyek Tersedia</h3>\n                    <button \n                      onClick={() => setActiveTab('projects')}\n                      className=\"text-blue-600 hover:text-blue-700 text-sm font-medium\"\n                    >\n                      Lihat Semua\n                    </button>\n                  </div>\n                </div>\n                <div className=\"p-6\">\n                  <div className=\"space-y-4\">\n                    {availableProjects.map((project) => (\n                      <div key={project.id} className=\"p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors\">\n                        <div className=\"flex justify-between items-start mb-2\">\n                          <h4 className=\"font-medium text-gray-900\">{project.title}</h4>\n                          <button className=\"text-blue-600 hover:text-blue-700\">\n                            <ExternalLink className=\"w-4 h-4\" />\n                          </button>\n                        </div>\n                        <p className=\"text-sm text-gray-600 mb-2\">{project.company}</p>\n                        <p className=\"text-sm text-gray-900 mb-2\">{project.budget}</p>\n                        <div className=\"flex flex-wrap gap-1 mb-2\">\n                          {project.skills.map((skill, index) => (\n                            <span key={index} className=\"px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded\">\n                              {skill}\n                            </span>\n                          ))}\n                        </div>\n                        <p className=\"text-xs text-gray-500\">\n                          Diposting {new Date(project.postedDate).toLocaleDateString('id-ID')}\n                        </p>\n                      </div>\n                    ))}\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        )}\n\n        {/* Other tabs placeholder */}\n        {activeTab !== 'overview' && (\n          <div className=\"text-center py-12\">\n            <div className=\"w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center\">\n              {activeTab === 'projects' && <Search className=\"w-6 h-6 text-gray-500\" />}\n              {activeTab === 'applications' && <Briefcase className=\"w-6 h-6 text-gray-500\" />}\n              {activeTab === 'portfolio' && <FileText className=\"w-6 h-6 text-gray-500\" />}\n              {activeTab === 'messages' && <MessageSquare className=\"w-6 h-6 text-gray-500\" />}\n              {activeTab === 'settings' && <Settings className=\"w-6 h-6 text-gray-500\" />}\n            </div>\n            <h3 className=\"text-lg font-medium text-gray-900 mb-2\">\n              {activeTab === 'projects' && 'Cari Proyek'}\n              {activeTab === 'applications' && 'Aplikasi Saya'}\n              {activeTab === 'portfolio' && 'Portfolio'}\n              {activeTab === 'messages' && 'Pesan & Chat'}\n              {activeTab === 'settings' && 'Pengaturan Akun'}\n            </h3>\n            <p className=\"text-gray-600\">\n              Fitur ini sedang dalam pengembangan\n            </p>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n};\n\nexport default StudentDashboard;