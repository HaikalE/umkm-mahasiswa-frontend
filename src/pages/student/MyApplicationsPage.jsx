import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  MessageCircle,
  Calendar,
  DollarSign,
  Filter,
  Search,
  RefreshCw,
  FileText,
  ArrowRight,
  Building2,
  User,
  Target,
  Trash2,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentsAPI, applicationsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filter, searchTerm]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await studentsAPI.getMyApplications({
        page: 1,
        limit: 50,
        status: filter !== 'all' ? filter : undefined,
        search: searchTerm || undefined
      });
      
      if (response.success) {
        setApplications(response.data.applications || []);
      } else {
        toast.error('Gagal memuat aplikasi');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Gagal memuat data aplikasi');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
    toast.success('Data berhasil diperbarui');
  };

  const withdrawApplication = async (applicationId) => {
    if (!window.confirm('Apakah Anda yakin ingin menarik aplikasi ini?')) {
      return;
    }

    try {
      const response = await applicationsAPI.withdrawApplication(applicationId);
      if (response.success) {
        toast.success('Aplikasi berhasil ditarik');
        fetchApplications();
        setShowDetails(false);
      }
    } catch (error) {
      console.error('Error withdrawing application:', error);
      toast.error('Gagal menarik aplikasi');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'withdrawn':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Review';
      case 'accepted':
        return 'Diterima';
      case 'rejected':
        return 'Ditolak';
      case 'withdrawn':
        return 'Ditarik';
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = !searchTerm || 
      app.project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.project?.umkm?.umkmProfile?.business_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const ApplicationCard = ({ application }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {application.project?.title || 'Project Title Not Available'}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              {application.project?.umkm?.umkmProfile?.business_name || 'Company Name Not Available'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Dilamar: {new Date(application.created_at).toLocaleDateString('id-ID')}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>Rp {application.proposed_budget?.toLocaleString('id-ID') || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            {getStatusText(application.status)}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedApplication(application);
                setShowDetails(true);
              }}
              className="text-blue-600 hover:text-blue-700 p-1"
              title="Lihat Detail"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            {application.status === 'pending' && (
              <button
                onClick={() => withdrawApplication(application.id)}
                className="text-red-600 hover:text-red-700 p-1"
                title="Tarik Aplikasi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-700 text-sm line-clamp-2">
          {application.cover_letter || 'Tidak ada cover letter'}
        </p>
        
        {application.project?.required_skills && (
          <div className="flex flex-wrap gap-1 mt-3">
            {application.project.required_skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {skill}
              </span>
            ))}
            {application.project.required_skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{application.project.required_skills.length - 3} lainnya
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  const ApplicationDetailModal = () => {
    if (!selectedApplication) return null;

    return (
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedApplication.project?.title}
                    </h2>
                    <p className="text-gray-600">
                      {selectedApplication.project?.umkm?.umkmProfile?.business_name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    Status: {getStatusText(selectedApplication.status)}
                  </span>
                </div>

                {/* Application Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Detail Aplikasi</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tanggal Apply:</span>
                        <p className="font-medium">{new Date(selectedApplication.created_at).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Budget Proposal:</span>
                        <p className="font-medium">Rp {selectedApplication.proposed_budget?.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Durasi Proposal:</span>
                        <p className="font-medium">{selectedApplication.proposed_duration} hari</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Update:</span>
                        <p className="font-medium">{new Date(selectedApplication.updated_at).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cover Letter</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedApplication.cover_letter || 'Tidak ada cover letter'}
                      </p>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informasi Project</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 mb-3">
                        {selectedApplication.project?.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Budget Range:</span>
                          <p className="font-medium">
                            Rp {selectedApplication.project?.budget_min?.toLocaleString('id-ID')} - 
                            Rp {selectedApplication.project?.budget_max?.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Deadline:</span>
                          <p className="font-medium">
                            {selectedApplication.project?.deadline ? 
                              new Date(selectedApplication.project.deadline).toLocaleDateString('id-ID') : 
                              'Tidak ditentukan'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UMKM Contact Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Kontak UMKM</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={selectedApplication.project?.umkm?.avatar_url || '/api/placeholder/40/40'} 
                          alt={selectedApplication.project?.umkm?.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{selectedApplication.project?.umkm?.full_name}</p>
                          <p className="text-sm text-gray-600">{selectedApplication.project?.umkm?.umkmProfile?.business_name}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{selectedApplication.project?.umkm?.email}</span>
                        </div>
                        {selectedApplication.project?.umkm?.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{selectedApplication.project?.umkm?.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review/Feedback if rejected */}
                  {selectedApplication.status === 'rejected' && selectedApplication.review_notes && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Feedback UMKM</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800">{selectedApplication.review_notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  {selectedApplication.status === 'pending' && (
                    <button
                      onClick={() => withdrawApplication(selectedApplication.id)}
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Tarik Aplikasi
                    </button>
                  )}
                  
                  {selectedApplication.status === 'accepted' && (
                    <button
                      onClick={() => window.location.href = '/student/active-project'}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                    >
                      Lihat Project Aktif
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

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
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Aplikasi Saya</h1>
            <p className="text-gray-600">Kelola dan pantau status aplikasi Anda ke berbagai project</p>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Memperbarui...' : 'Refresh'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Aplikasi</p>
                <p className="text-xl font-bold text-blue-900">{applications.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-600 font-medium">Menunggu</p>
                <p className="text-xl font-bold text-yellow-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Diterima</p>
                <p className="text-xl font-bold text-green-900">
                  {applications.filter(app => app.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600 font-medium">Ditolak</p>
                <p className="text-xl font-bold text-red-900">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="accepted">Diterima</option>
              <option value="rejected">Ditolak</option>
              <option value="withdrawn">Ditarik</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama project atau UMKM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === 'all' ? 'Belum Ada Aplikasi' : `Tidak Ada Aplikasi ${getStatusText(filter)}`}
          </h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? 'Anda belum mengajukan aplikasi ke project apapun. Mulai cari project yang menarik!'
              : `Saat ini tidak ada aplikasi dengan status ${getStatusText(filter).toLowerCase()}.`
            }
          </p>
          {filter === 'all' && (
            <button 
              onClick={() => window.location.href = '/projects'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cari Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ApplicationDetailModal />
    </div>
  );
};

export default MyApplicationsPage;