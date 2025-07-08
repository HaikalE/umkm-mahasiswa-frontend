import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MessageCircle, 
  FileText, 
  Calendar, 
  TrendingUp,
  Eye,
  Filter,
  Search,
  MoreHorizontal,
  User,
  Building2,
  Target,
  Activity,
  Send,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { umkmAPI } from '../../services/api';
import toast from 'react-hot-toast';

const UmkmActiveProjectsPage = () => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    fetchActiveProjects();
    fetchStats();
  }, [filter]);

  const fetchActiveProjects = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'all') {
        params.status = filter;
      }
      
      const response = await umkmAPI.getActiveProjects(params);
      
      if (response.success) {
        setActiveProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Error fetching active projects:', error);
      toast.error('Gagal memuat project aktif');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await umkmAPI.getActiveProjectStats();
      
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const openProjectDetails = async (project) => {
    try {
      const response = await umkmAPI.getActiveProjectDetails(project.id);
      if (response.success) {
        setSelectedProject(response.data.project);
        setShowProjectModal(true);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
      toast.error('Gagal memuat detail project');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completion_requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'in_progress':
        return 'Sedang Dikerjakan';
      case 'completion_requested':
        return 'Menunggu Approval';
      case 'completed':
        return 'Selesai';
      default:
        return status;
    }
  };

  const filteredProjects = activeProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.selectedStudent?.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && project.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Aktif</h1>
        <p className="text-gray-600">Kelola dan pantau project yang sedang dikerjakan mahasiswa</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_active_projects || 0}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sedang Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.in_progress_projects || 0}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Butuh Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completion_requested_projects || 0}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Selesai Bulan Ini</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed_projects_this_month || 0}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'in_progress' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sedang Dikerjakan
            </button>
            <button
              onClick={() => setFilter('completion_requested')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completion_requested' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Butuh Review
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Selesai
            </button>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari project atau mahasiswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg border">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada project aktif</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Belum ada project yang sedang dikerjakan mahasiswa.'
                : `Tidak ada project dengan status "${getStatusText(filter)}".`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => openProjectDetails(project)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Student Avatar */}
                      <img
                        src={project.selectedStudent?.avatar_url || '/api/placeholder/48/48'}
                        alt={project.selectedStudent?.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{project.selectedStudent?.full_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Dimulai: {new Date(project.started_at || project.created_at).toLocaleDateString('id-ID')}</span>
                          </div>
                          {project.deadline && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress?.percentage || 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {project.progress?.percentage || 0}%
                          </span>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-6 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{project.progress?.completed_checkpoints || 0}/{project.progress?.total_checkpoints || 0} Checkpoint</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Rp {project.budget_min?.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Open chat modal
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Chat dengan mahasiswa"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectDetails(project);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Lihat detail"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject}
          onClose={() => setShowProjectModal(false)}
          onUpdate={fetchActiveProjects}
        />
      )}
    </div>
  );
};

// Project Details Modal Component
const ProjectDetailsModal = ({ project, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'deliverables', label: 'Deliverables', icon: CheckCircle }
  ];

  useEffect(() => {
    if (activeTab === 'chat') {
      fetchChats();
    }
  }, [activeTab]);

  const fetchChats = async () => {
    try {
      const response = await umkmAPI.getActiveProjectChats(project.id);
      if (response.success) {
        setMessages(response.data.chats || []);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      setSending(true);
      const response = await umkmAPI.sendProjectMessage(project.id, { message: newMessage });
      
      if (response.success) {
        setNewMessage('');
        fetchChats();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Gagal mengirim pesan');
    } finally {
      setSending(false);
    }
  };

  const handleApproveCompletion = async () => {
    try {
      setLoading(true);
      const response = await umkmAPI.approveProjectCompletion(project.id, {
        completion_notes: 'Project completed successfully',
        rating: 5
      });

      if (response.success) {
        toast.success('Project berhasil diselesaikan!');
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Error approving completion:', error);
      toast.error('Gagal menyelesaikan project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
              <p className="text-gray-600 mt-1">Project Detail & Management</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Mahasiswa</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={project.selectedStudent?.avatar_url || '/api/placeholder/48/48'}
                    alt={project.selectedStudent?.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{project.selectedStudent?.full_name}</p>
                    <p className="text-sm text-gray-600">
                      {project.selectedStudent?.studentProfile?.university} - {project.selectedStudent?.studentProfile?.major}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Deskripsi Project</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
              </div>

              {/* Skills Required */}
              {project.required_skills && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Skills yang Dibutuhkan</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.required_skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Progress</p>
                  <p className="text-2xl font-bold text-blue-900">{project.progress?.percentage || 0}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Budget</p>
                  <p className="text-2xl font-bold text-green-900">Rp {project.budget_min?.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Project Progress</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="8" fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - (project.progress?.percentage || 0) / 100)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{project.progress?.percentage || 0}%</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  {project.progress?.completed_checkpoints || 0} dari {project.progress?.total_checkpoints || 0} checkpoint selesai
                </p>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-4">
              {/* Messages */}
              <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Belum ada pesan. Mulai percakapan dengan mahasiswa!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender.id === project.umkm_id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender.id === project.umkm_id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(message.created_at).toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Send Message */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !newMessage.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending...' : 'Kirim'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div>
              <p className="text-gray-600">Deliverables yang diupload akan ditampilkan di sini...</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {project.status === 'completion_requested' && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mahasiswa telah meminta penyelesaian project ini.</p>
                <p className="text-sm font-medium text-gray-900">Apakah Anda setuju untuk menyelesaikan project?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Review Nanti
                </button>
                <button
                  onClick={handleApproveCompletion}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Memproses...' : 'Setujui Penyelesaian'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UmkmActiveProjectsPage;
