import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  Upload, 
  FileText, 
  User, 
  Building2,
  Phone,
  Mail,
  Target,
  TrendingUp,
  Activity,
  DollarSign,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { studentsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ActiveProjectPage = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [application, setApplication] = useState(null);
  const [progress, setProgress] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchActiveProject();
  }, []);

  const fetchActiveProject = async () => {
    try {
      setLoading(true);
      
      // Fetch active project details using new API
      const response = await studentsAPI.getActiveProjectDetails();
      
      if (response.success && response.data.activeProject) {
        setActiveProject(response.data.project);
        setApplication(response.data.application);
        setProgress(response.data.progress);
        
        // Fetch checkpoints
        const checkpointsResponse = await studentsAPI.getActiveProjectCheckpoints();
        if (checkpointsResponse.success) {
          setCheckpoints(checkpointsResponse.data.checkpoints || []);
        }
      }
    } catch (error) {
      console.error('Error fetching active project:', error);
      if (error.response?.status === 404) {
        // No active project found - this is normal
        setActiveProject(null);
      } else {
        toast.error('Gagal memuat project aktif');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Building2 className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tidak Ada Project Aktif</h2>
          <p className="text-gray-600 mb-6">
            Anda belum memiliki project yang sedang dikerjakan. Jelajahi opportunities untuk menemukan project menarik!
          </p>
          <button 
            onClick={() => window.location.href = '/student/opportunities'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cari Project
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'checkpoints', label: 'Progress', icon: CheckCircle },
    { id: 'communication', label: 'Chat', icon: MessageCircle },
    { id: 'deliverables', label: 'Deliverables', icon: Upload },
    { id: 'payment', label: 'Payment', icon: DollarSign }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{activeProject.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeProject.status === 'in_progress' 
                  ? 'bg-blue-100 text-blue-800' 
                  : activeProject.status === 'completion_requested'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {activeProject.status === 'in_progress' 
                  ? 'Sedang Dikerjakan' 
                  : activeProject.status === 'completion_requested'
                  ? 'Menunggu Approval'
                  : 'Selesai'
                }
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{activeProject.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Dimulai: {new Date(activeProject.started_at || activeProject.created_at).toLocaleDateString('id-ID')}</span>
              </div>
              {activeProject.deadline && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Deadline: {new Date(activeProject.deadline).toLocaleDateString('id-ID')}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Budget: Rp {activeProject.actual_budget?.toLocaleString('id-ID') || activeProject.budget_min?.toLocaleString('id-ID')}</span>
              </div>
              {progress?.days_remaining !== undefined && (
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span className={progress.is_overdue ? 'text-red-600' : ''}>
                    {progress.is_overdue ? 'Terlambat' : `${progress.days_remaining} hari tersisa`}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Circle */}
          <div className="ml-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - (progress?.progress_percentage || 0) / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">
                  {progress?.progress_percentage || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UMKM Info */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Client</h3>
        <div className="flex items-start gap-4">
          <img 
            src={activeProject.umkm.avatar_url || '/api/placeholder/64/64'} 
            alt={activeProject.umkm.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{activeProject.umkm.umkmProfile.business_name}</h4>
            <p className="text-gray-600">{activeProject.umkm.full_name}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{activeProject.umkm.email}</span>
              </div>
              {activeProject.umkm.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{activeProject.umkm.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
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

        <div className="p-6">
          {selectedTab === 'overview' && <OverviewTab activeProject={activeProject} application={application} progress={progress} />}
          {selectedTab === 'checkpoints' && <CheckpointsTab checkpoints={checkpoints} onUpdate={fetchActiveProject} />}
          {selectedTab === 'communication' && <CommunicationTab projectId={activeProject.id} />}
          {selectedTab === 'deliverables' && <DeliverablesTab projectId={activeProject.id} onUpdate={fetchActiveProject} />}
          {selectedTab === 'payment' && <PaymentTab projectId={activeProject.id} />}
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ activeProject, application, progress }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Project</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{activeProject.description}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills yang Dibutuhkan</h3>
        <div className="flex flex-wrap gap-2">
          {activeProject.required_skills?.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Proposal Anda</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 mb-3">{application.cover_letter}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Budget Proposal: Rp {application.proposed_budget?.toLocaleString('id-ID')}</span>
            <span>Durasi: {application.proposed_duration} hari</span>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ringkasan Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Progress</p>
                <p className="text-2xl font-bold text-blue-900">{progress?.progress_percentage || 0}%</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Checkpoint</p>
                <p className="text-2xl font-bold text-green-900">
                  {progress?.completed_checkpoints || 0}/{progress?.total_checkpoints || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Hari Tersisa</p>
                <p className="text-2xl font-bold text-orange-900">
                  {progress?.is_overdue ? 'Terlambat' : (progress?.days_remaining || 0)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkpoints Tab Component
const CheckpointsTab = ({ checkpoints, onUpdate }) => {
  const [submitting, setSubmitting] = useState(null);
  const [submitData, setSubmitData] = useState({ notes: '', files: [] });

  const handleSubmitCheckpoint = async (checkpointId) => {
    try {
      setSubmitting(checkpointId);
      
      const formData = new FormData();
      formData.append('notes', submitData.notes);
      submitData.files.forEach(file => {
        formData.append('deliverables', file);
      });
      
      const response = await studentsAPI.submitCheckpoint(checkpointId, formData);
      
      if (response.success) {
        toast.success('Checkpoint berhasil disubmit!');
        setSubmitData({ notes: '', files: [] });
        onUpdate();
      }
    } catch (error) {
      console.error('Error submitting checkpoint:', error);
      toast.error('Gagal submit checkpoint');
    } finally {
      setSubmitting(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'submitted':
        return 'Menunggu Review';
      case 'pending':
        return 'Sedang Dikerjakan';
      default:
        return 'Belum Dimulai';
    }
  };

  return (
    <div className="space-y-4">
      {checkpoints.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Belum ada checkpoint yang dibuat untuk project ini.</p>
        </div>
      ) : (
        checkpoints.map((checkpoint, index) => (
          <motion.div
            key={checkpoint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Checkpoint {checkpoint.order}: {checkpoint.title}
                </h4>
                <p className="text-gray-600 text-sm mt-1">{checkpoint.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(checkpoint.status)}`}>
                {getStatusText(checkpoint.status)}
              </span>
            </div>
            
            {checkpoint.deadline && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {new Date(checkpoint.deadline).toLocaleDateString('id-ID')}</span>
              </div>
            )}
            
            {checkpoint.status === 'pending' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">Submit Checkpoint</h5>
                <textarea
                  placeholder="Catatan untuk submission..."
                  value={submitData.notes}
                  onChange={(e) => setSubmitData({ ...submitData, notes: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                  rows="3"
                />
                <input
                  type="file"
                  multiple
                  onChange={(e) => setSubmitData({ ...submitData, files: Array.from(e.target.files) })}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
                <button
                  onClick={() => handleSubmitCheckpoint(checkpoint.id)}
                  disabled={submitting === checkpoint.id}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting === checkpoint.id ? 'Submitting...' : 'Submit Checkpoint'}
                </button>
              </div>
            )}
            
            {checkpoint.student_notes && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Catatan:</strong> {checkpoint.student_notes}
                </p>
              </div>
            )}

            {checkpoint.umkm_notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Feedback UMKM:</strong> {checkpoint.umkm_notes}
                </p>
              </div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
};

// Communication Tab Component  
const CommunicationTab = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await studentsAPI.getActiveProjectChats();
      if (response.success) {
        setMessages(response.data.chats || []);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      setSending(true);
      const response = await studentsAPI.sendProjectMessage({ message: newMessage });
      
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

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Messages */}
      <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Belum ada pesan. Mulai percakapan dengan client!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.id !== message.receiver.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender.id !== message.receiver.id
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
  );
};

// Deliverables Tab Component
const DeliverablesTab = ({ projectId, onUpdate }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Pilih file untuk diupload');
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('description', description);
      files.forEach(file => {
        formData.append('files', file);
      });
      
      const response = await studentsAPI.uploadProjectDeliverables(formData);
      
      if (response.success) {
        toast.success('File berhasil diupload!');
        setFiles([]);
        setDescription('');
        onUpdate();
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Gagal upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRequestCompletion = async () => {
    try {
      const response = await studentsAPI.requestProjectCompletion({
        completion_notes: 'Project telah selesai dikerjakan sesuai dengan requirement.'
      });
      
      if (response.success) {
        toast.success('Permintaan penyelesaian project berhasil dikirim!');
        onUpdate();
      }
    } catch (error) {
      console.error('Error requesting completion:', error);
      toast.error('Gagal mengajukan penyelesaian project');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Deliverables</h3>
          <p className="text-gray-600 mb-4">Upload hasil kerja atau file pendukung untuk project ini</p>
          
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          />
          
          <textarea
            placeholder="Deskripsi file (opsional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            rows="3"
          />
          
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>
      
      {/* Completion Actions */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Project Completion</h3>
        <p className="text-green-700 mb-4">
          Jika Anda sudah menyelesaikan semua deliverables, Anda dapat mengajukan penyelesaian project.
        </p>
        <button 
          onClick={handleRequestCompletion}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Request Project Completion
        </button>
      </div>
    </div>
  );
};

// Payment Tab Component
const PaymentTab = ({ projectId }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const fetchPaymentInfo = async () => {
    try {
      const response = await studentsAPI.getProjectPaymentInfo();
      if (response.success) {
        setPaymentInfo(response.data);
      }
    } catch (error) {
      console.error('Error fetching payment info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading payment information...</div>;
  }

  if (!paymentInfo) {
    return (
      <div className="text-center py-8">
        <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">Informasi pembayaran tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-blue-900">
                Rp {paymentInfo.agreed_budget?.toLocaleString('id-ID')}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Sudah Dibayar</p>
              <p className="text-2xl font-bold text-green-900">
                Rp {paymentInfo.total_paid?.toLocaleString('id-ID')}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Sisa Pembayaran</p>
              <p className="text-2xl font-bold text-yellow-900">
                Rp {paymentInfo.remaining_payment?.toLocaleString('id-ID')}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Pembayaran</h3>
        {paymentInfo.payment_history?.length === 0 ? (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-gray-600">Belum ada transaksi pembayaran.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentInfo.payment_history?.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">
                      Rp {payment.amount?.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(payment.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    payment.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {payment.status === 'completed' ? 'Selesai' : 
                     payment.status === 'pending' ? 'Pending' : payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveProjectPage;
