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
  Activity
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
      
      // Fetch active project details
      const projectResponse = await studentsAPI.getActiveProjectDetails();
      
      if (projectResponse.activeProject) {
        setActiveProject(projectResponse.project);
        setApplication(projectResponse.application);
        setProgress(projectResponse.progress);
        
        // Fetch checkpoints
        const checkpointsResponse = await studentsAPI.getActiveProjectCheckpoints();
        setCheckpoints(checkpointsResponse.checkpoints || []);
      }
    } catch (error) {
      console.error('Error fetching active project:', error);
      toast.error('Gagal memuat project aktif');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className=\"flex items-center justify-center min-h-screen\">
        <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600\"></div>
      </div>
    );
  }

  if (!activeProject) {
    return (
      <div className=\"max-w-4xl mx-auto p-6\">
        <div className=\"text-center py-12\">
          <div className=\"w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center\">
            <Building2 className=\"w-12 h-12 text-gray-400\" />
          </div>
          <h2 className=\"text-2xl font-bold text-gray-900 mb-2\">Tidak Ada Project Aktif</h2>
          <p className=\"text-gray-600 mb-6\">
            Anda belum memiliki project yang sedang dikerjakan. Jelajahi opportunities untuk menemukan project menarik!
          </p>
          <button 
            onClick={() => window.location.href = '/student/opportunities'}
            className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors\"
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
    { id: 'deliverables', label: 'Deliverables', icon: Upload }
  ];

  return (
    <div className=\"max-w-7xl mx-auto p-6\">
      {/* Header */}
      <div className=\"bg-white rounded-lg shadow-sm border p-6 mb-6\">
        <div className=\"flex justify-between items-start\">
          <div className=\"flex-1\">
            <div className=\"flex items-center gap-3 mb-2\">
              <h1 className=\"text-2xl font-bold text-gray-900\">{activeProject.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${\n                activeProject.status === 'in_progress' \n                  ? 'bg-blue-100 text-blue-800' \n                  : 'bg-green-100 text-green-800'\n              }`}>
                {activeProject.status === 'in_progress' ? 'Sedang Dikerjakan' : 'Selesai'}
              </span>
            </div>\n            \n            <p className=\"text-gray-600 mb-4\">{activeProject.description}</p>\n            \n            <div className=\"flex flex-wrap gap-4 text-sm text-gray-600\">\n              <div className=\"flex items-center gap-1\">\n                <Calendar className=\"w-4 h-4\" />\n                <span>Deadline: {new Date(activeProject.deadline).toLocaleDateString('id-ID')}</span>\n              </div>\n              <div className=\"flex items-center gap-1\">\n                <Clock className=\"w-4 h-4\" />\n                <span>Durasi: {activeProject.duration} hari</span>\n              </div>\n              <div className=\"flex items-center gap-1\">\n                <TrendingUp className=\"w-4 h-4\" />\n                <span>Budget: Rp {activeProject.budget_min?.toLocaleString('id-ID')} - Rp {activeProject.budget_max?.toLocaleString('id-ID')}</span>\n              </div>\n            </div>\n          </div>\n          \n          {/* Progress Circle */}\n          <div className=\"ml-6\">\n            <div className=\"relative w-24 h-24\">\n              <svg className=\"w-24 h-24 transform -rotate-90\" viewBox=\"0 0 100 100\">\n                <circle\n                  cx=\"50\"\n                  cy=\"50\"\n                  r=\"40\"\n                  stroke=\"#e5e7eb\"\n                  strokeWidth=\"8\"\n                  fill=\"none\"\n                />\n                <circle\n                  cx=\"50\"\n                  cy=\"50\"\n                  r=\"40\"\n                  stroke=\"#3b82f6\"\n                  strokeWidth=\"8\"\n                  fill=\"none\"\n                  strokeDasharray={`${2 * Math.PI * 40}`}\n                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - (progress?.progress_percentage || 0) / 100)}`}\n                  className=\"transition-all duration-300\"\n                />\n              </svg>\n              <div className=\"absolute inset-0 flex items-center justify-center\">\n                <span className=\"text-lg font-bold text-gray-900\">\n                  {progress?.progress_percentage || 0}%\n                </span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* UMKM Info */}\n      <div className=\"bg-white rounded-lg shadow-sm border p-6 mb-6\">\n        <h3 className=\"text-lg font-semibold text-gray-900 mb-4\">Informasi Client</h3>\n        <div className=\"flex items-start gap-4\">\n          <img \n            src={activeProject.umkm.avatar_url || '/api/placeholder/64/64'} \n            alt={activeProject.umkm.full_name}\n            className=\"w-16 h-16 rounded-full object-cover\"\n          />\n          <div className=\"flex-1\">\n            <h4 className=\"font-semibold text-gray-900\">{activeProject.umkm.umkmProfile.business_name}</h4>\n            <p className=\"text-gray-600\">{activeProject.umkm.full_name}</p>\n            <div className=\"flex gap-4 mt-2 text-sm text-gray-600\">\n              <div className=\"flex items-center gap-1\">\n                <Mail className=\"w-4 h-4\" />\n                <span>{activeProject.umkm.email}</span>\n              </div>\n              {activeProject.umkm.phone && (\n                <div className=\"flex items-center gap-1\">\n                  <Phone className=\"w-4 h-4\" />\n                  <span>{activeProject.umkm.phone}</span>\n                </div>\n              )}\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Tabs */}\n      <div className=\"bg-white rounded-lg shadow-sm border mb-6\">\n        <div className=\"border-b border-gray-200\">\n          <nav className=\"flex space-x-8 px-6\">\n            {tabs.map((tab) => {\n              const Icon = tab.icon;\n              return (\n                <button\n                  key={tab.id}\n                  onClick={() => setSelectedTab(tab.id)}\n                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${\n                    selectedTab === tab.id\n                      ? 'border-blue-500 text-blue-600'\n                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'\n                  }`}\n                >\n                  <Icon className=\"w-4 h-4\" />\n                  {tab.label}\n                </button>\n              );\n            })}\n          </nav>\n        </div>\n\n        <div className=\"p-6\">\n          {selectedTab === 'overview' && <OverviewTab activeProject={activeProject} application={application} />}\n          {selectedTab === 'checkpoints' && <CheckpointsTab checkpoints={checkpoints} onUpdate={fetchActiveProject} />}\n          {selectedTab === 'communication' && <CommunicationTab projectId={activeProject.id} />}\n          {selectedTab === 'deliverables' && <DeliverablesTab projectId={activeProject.id} onUpdate={fetchActiveProject} />}\n        </div>\n      </div>\n    </div>\n  );\n};\n\n// Overview Tab Component\nconst OverviewTab = ({ activeProject, application }) => {\n  return (\n    <div className=\"space-y-6\">\n      <div>\n        <h3 className=\"text-lg font-semibold text-gray-900 mb-3\">Deskripsi Project</h3>\n        <p className=\"text-gray-700 whitespace-pre-wrap\">{activeProject.description}</p>\n      </div>\n      \n      <div>\n        <h3 className=\"text-lg font-semibold text-gray-900 mb-3\">Skills yang Dibutuhkan</h3>\n        <div className=\"flex flex-wrap gap-2\">\n          {activeProject.required_skills?.map((skill, index) => (\n            <span \n              key={index}\n              className=\"px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium\"\n            >\n              {skill}\n            </span>\n          ))}\n        </div>\n      </div>\n      \n      <div>\n        <h3 className=\"text-lg font-semibold text-gray-900 mb-3\">Proposal Anda</h3>\n        <div className=\"bg-gray-50 rounded-lg p-4\">\n          <p className=\"text-gray-700 mb-3\">{application.cover_letter}</p>\n          <div className=\"flex gap-4 text-sm text-gray-600\">\n            <span>Budget Proposal: Rp {application.proposed_budget?.toLocaleString('id-ID')}</span>\n            <span>Durasi: {application.proposed_duration} hari</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};\n\n// Checkpoints Tab Component\nconst CheckpointsTab = ({ checkpoints, onUpdate }) => {\n  const [submitting, setSubmitting] = useState(null);\n  const [submitData, setSubmitData] = useState({ notes: '', files: [] });\n\n  const handleSubmitCheckpoint = async (checkpointId) => {\n    try {\n      setSubmitting(checkpointId);\n      \n      const formData = new FormData();\n      formData.append('notes', submitData.notes);\n      submitData.files.forEach(file => {\n        formData.append('deliverables', file);\n      });\n      \n      await studentsAPI.submitCheckpoint(checkpointId, formData);\n      toast.success('Checkpoint berhasil disubmit!');\n      \n      setSubmitData({ notes: '', files: [] });\n      onUpdate();\n    } catch (error) {\n      console.error('Error submitting checkpoint:', error);\n      toast.error('Gagal submit checkpoint');\n    } finally {\n      setSubmitting(null);\n    }\n  };\n\n  const getStatusColor = (status) => {\n    switch (status) {\n      case 'completed':\n        return 'bg-green-100 text-green-800';\n      case 'submitted':\n        return 'bg-yellow-100 text-yellow-800';\n      case 'in_progress':\n        return 'bg-blue-100 text-blue-800';\n      default:\n        return 'bg-gray-100 text-gray-800';\n    }\n  };\n\n  const getStatusText = (status) => {\n    switch (status) {\n      case 'completed':\n        return 'Selesai';\n      case 'submitted':\n        return 'Menunggu Review';\n      case 'in_progress':\n        return 'Sedang Dikerjakan';\n      default:\n        return 'Belum Dimulai';\n    }\n  };\n\n  return (\n    <div className=\"space-y-4\">\n      {checkpoints.length === 0 ? (\n        <div className=\"text-center py-8\">\n          <CheckCircle className=\"w-12 h-12 text-gray-400 mx-auto mb-3\" />\n          <p className=\"text-gray-600\">Belum ada checkpoint yang dibuat untuk project ini.</p>\n        </div>\n      ) : (\n        checkpoints.map((checkpoint, index) => (\n          <motion.div\n            key={checkpoint.id}\n            initial={{ opacity: 0, y: 20 }}\n            animate={{ opacity: 1, y: 0 }}\n            transition={{ delay: index * 0.1 }}\n            className=\"border border-gray-200 rounded-lg p-4\"\n          >\n            <div className=\"flex justify-between items-start mb-3\">\n              <div>\n                <h4 className=\"font-semibold text-gray-900\">\n                  Checkpoint {checkpoint.order}: {checkpoint.title}\n                </h4>\n                <p className=\"text-gray-600 text-sm mt-1\">{checkpoint.description}</p>\n              </div>\n              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(checkpoint.status)}`}>\n                {getStatusText(checkpoint.status)}\n              </span>\n            </div>\n            \n            {checkpoint.deadline && (\n              <div className=\"flex items-center gap-1 text-sm text-gray-600 mb-3\">\n                <Calendar className=\"w-4 h-4\" />\n                <span>Deadline: {new Date(checkpoint.deadline).toLocaleDateString('id-ID')}</span>\n              </div>\n            )}\n            \n            {checkpoint.status === 'pending' && (\n              <div className=\"mt-4 p-4 bg-gray-50 rounded-lg\">\n                <h5 className=\"font-medium text-gray-900 mb-3\">Submit Checkpoint</h5>\n                <textarea\n                  placeholder=\"Catatan untuk submission...\"\n                  value={submitData.notes}\n                  onChange={(e) => setSubmitData({ ...submitData, notes: e.target.value })}\n                  className=\"w-full p-3 border border-gray-300 rounded-lg mb-3\"\n                  rows=\"3\"\n                />\n                <input\n                  type=\"file\"\n                  multiple\n                  onChange={(e) => setSubmitData({ ...submitData, files: Array.from(e.target.files) })}\n                  className=\"w-full p-2 border border-gray-300 rounded-lg mb-3\"\n                />\n                <button\n                  onClick={() => handleSubmitCheckpoint(checkpoint.id)}\n                  disabled={submitting === checkpoint.id}\n                  className=\"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50\"\n                >\n                  {submitting === checkpoint.id ? 'Submitting...' : 'Submit Checkpoint'}\n                </button>\n              </div>\n            )}\n            \n            {checkpoint.student_notes && (\n              <div className=\"mt-3 p-3 bg-blue-50 rounded-lg\">\n                <p className=\"text-sm text-blue-800\">\n                  <strong>Catatan:</strong> {checkpoint.student_notes}\n                </p>\n              </div>\n            )}\n          </motion.div>\n        ))\n      )}\n    </div>\n  );\n};\n\n// Communication Tab Component  \nconst CommunicationTab = ({ projectId }) => {\n  const [messages, setMessages] = useState([]);\n  const [newMessage, setNewMessage] = useState('');\n  const [loading, setLoading] = useState(true);\n  const [sending, setSending] = useState(false);\n\n  useEffect(() => {\n    fetchChats();\n  }, []);\n\n  const fetchChats = async () => {\n    try {\n      const response = await studentsAPI.getActiveProjectChats();\n      setMessages(response.chats || []);\n    } catch (error) {\n      console.error('Error fetching chats:', error);\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  const sendMessage = async () => {\n    if (!newMessage.trim()) return;\n    \n    try {\n      setSending(true);\n      await studentsAPI.sendProjectMessage({ message: newMessage });\n      setNewMessage('');\n      fetchChats();\n    } catch (error) {\n      console.error('Error sending message:', error);\n      toast.error('Gagal mengirim pesan');\n    } finally {\n      setSending(false);\n    }\n  };\n\n  if (loading) {\n    return <div className=\"text-center py-8\">Loading messages...</div>;\n  }\n\n  return (\n    <div className=\"space-y-4\">\n      {/* Messages */}\n      <div className=\"h-96 overflow-y-auto border rounded-lg p-4 space-y-3\">\n        {messages.length === 0 ? (\n          <div className=\"text-center py-8\">\n            <MessageCircle className=\"w-12 h-12 text-gray-400 mx-auto mb-3\" />\n            <p className=\"text-gray-600\">Belum ada pesan. Mulai percakapan dengan client!</p>\n          </div>\n        ) : (\n          messages.map((message) => (\n            <div\n              key={message.id}\n              className={`flex ${message.sender.id === activeProject?.umkm_id ? 'justify-start' : 'justify-end'}`}\n            >\n              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${\n                message.sender.id === activeProject?.umkm_id\n                  ? 'bg-gray-100 text-gray-900'\n                  : 'bg-blue-600 text-white'\n              }`}>\n                <p className=\"text-sm\">{message.message}</p>\n                <p className=\"text-xs opacity-75 mt-1\">\n                  {new Date(message.created_at).toLocaleTimeString('id-ID')}\n                </p>\n              </div>\n            </div>\n          ))\n        )}\n      </div>\n      \n      {/* Send Message */}\n      <div className=\"flex gap-2\">\n        <input\n          type=\"text\"\n          value={newMessage}\n          onChange={(e) => setNewMessage(e.target.value)}\n          placeholder=\"Ketik pesan...\"\n          className=\"flex-1 p-3 border border-gray-300 rounded-lg\"\n          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}\n        />\n        <button\n          onClick={sendMessage}\n          disabled={sending || !newMessage.trim()}\n          className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50\"\n        >\n          {sending ? 'Sending...' : 'Kirim'}\n        </button>\n      </div>\n    </div>\n  );\n};\n\n// Deliverables Tab Component\nconst DeliverablesTab = ({ projectId, onUpdate }) => {\n  const [files, setFiles] = useState([]);\n  const [description, setDescription] = useState('');\n  const [uploading, setUploading] = useState(false);\n\n  const handleUpload = async () => {\n    if (files.length === 0) {\n      toast.error('Pilih file untuk diupload');\n      return;\n    }\n\n    try {\n      setUploading(true);\n      \n      const formData = new FormData();\n      formData.append('description', description);\n      files.forEach(file => {\n        formData.append('files', file);\n      });\n      \n      await studentsAPI.uploadProjectDeliverables(formData);\n      toast.success('File berhasil diupload!');\n      \n      setFiles([]);\n      setDescription('');\n      onUpdate();\n    } catch (error) {\n      console.error('Error uploading files:', error);\n      toast.error('Gagal upload file');\n    } finally {\n      setUploading(false);\n    }\n  };\n\n  return (\n    <div className=\"space-y-6\">\n      {/* Upload Section */}\n      <div className=\"border-2 border-dashed border-gray-300 rounded-lg p-6\">\n        <div className=\"text-center\">\n          <Upload className=\"w-12 h-12 text-gray-400 mx-auto mb-3\" />\n          <h3 className=\"text-lg font-medium text-gray-900 mb-2\">Upload Deliverables</h3>\n          <p className=\"text-gray-600 mb-4\">Upload hasil kerja atau file pendukung untuk project ini</p>\n          \n          <input\n            type=\"file\"\n            multiple\n            onChange={(e) => setFiles(Array.from(e.target.files))}\n            className=\"w-full p-3 border border-gray-300 rounded-lg mb-3\"\n          />\n          \n          <textarea\n            placeholder=\"Deskripsi file (opsional)...\"\n            value={description}\n            onChange={(e) => setDescription(e.target.value)}\n            className=\"w-full p-3 border border-gray-300 rounded-lg mb-3\"\n            rows=\"3\"\n          />\n          \n          <button\n            onClick={handleUpload}\n            disabled={uploading || files.length === 0}\n            className=\"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50\"\n          >\n            {uploading ? 'Uploading...' : 'Upload Files'}\n          </button>\n        </div>\n      </div>\n      \n      {/* Completion Actions */}\n      <div className=\"bg-green-50 rounded-lg p-6\">\n        <h3 className=\"text-lg font-semibold text-green-900 mb-3\">Project Completion</h3>\n        <p className=\"text-green-700 mb-4\">\n          Jika Anda sudah menyelesaikan semua deliverables, Anda dapat mengajukan penyelesaian project.\n        </p>\n        <button className=\"bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700\">\n          Request Project Completion\n        </button>\n      </div>\n    </div>\n  );\n};\n\nexport default ActiveProjectPage;