import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api' 
    : 'http://localhost:3000/api',
  timeout: 15000, // Increased timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  verifyToken: (token) => api.post('/auth/verify-token', { token }),
  refreshToken: () => api.post('/auth/refresh-token'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Users API endpoints
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// UMKM API endpoints
export const umkmAPI = {
  getProfile: () => api.get('/umkm/profile'),
  updateProfile: (data) => api.put('/umkm/profile', data),
  getUMKMs: (params) => api.get('/umkm', { params }),
  getUMKMById: (id) => api.get(`/umkm/${id}`),
  verifyUMKM: (id) => api.post(`/umkm/${id}/verify`),
  
  // ENHANCED: Active Projects Management for UMKM
  getActiveProjects: (params) => api.get('/umkm/active-projects', { params }),
  getActiveProjectStats: () => api.get('/umkm/active-projects/stats'),
  getActiveProjectDetails: (id) => api.get(`/umkm/active-projects/${id}`),
  getActiveProjectChats: (id, params) => api.get(`/umkm/active-projects/${id}/chats`, { params }),
  sendProjectMessage: (id, data) => api.post(`/umkm/active-projects/${id}/chat`, data),
  reviewCheckpoint: (projectId, checkpointId, data) => api.post(`/umkm/active-projects/${projectId}/checkpoint/${checkpointId}/review`, data),
  approveProjectCompletion: (id, data) => api.post(`/umkm/active-projects/${id}/complete`, data),
};

// Students API endpoints - ENHANCED with better application management
export const studentsAPI = {
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
  getStudents: (params) => api.get('/students', { params }),
  getStudentById: (id) => api.get(`/students/${id}`),
  uploadPortfolio: (file) => {
    const formData = new FormData();
    formData.append('portfolio', file);
    return api.post('/students/portfolio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // ENHANCED: Active Project Management APIs (Updated with new backend endpoints)
  getActiveProject: () => api.get('/students/active-project'),
  getActiveProjectDetails: () => api.get('/students/active-project/details'),
  getActiveProjectCheckpoints: () => api.get('/students/active-project/checkpoints'),
  submitCheckpoint: (checkpointId, formData) => {
    return api.post(`/students/active-project/checkpoint/${checkpointId}/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getActiveProjectChats: (params) => api.get('/students/active-project/chats', { params }),
  sendProjectMessage: (data) => api.post('/students/active-project/chat', data),
  uploadProjectDeliverables: (formData) => {
    return api.post('/students/active-project/deliverables', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  requestProjectCompletion: (data) => api.post('/students/active-project/request-completion', data),
  getProjectPaymentInfo: () => api.get('/students/active-project/payment'),
  
  // Dashboard and Applications APIs - ENHANCED
  getDashboardStats: () => api.get('/students/dashboard/stats'),
  getOpportunities: (params) => api.get('/students/dashboard/opportunities', { params }),
  getMyApplications: (params) => api.get('/students/my-applications', { params }),
  getMyProjects: (params) => api.get('/students/my-projects', { params }),
  updateAvailability: (data) => api.put('/students/availability', data),
  
  // NEW: Enhanced application tracking
  getApplicationStats: () => api.get('/students/applications/stats'),
  getApplicationHistory: (params) => api.get('/students/applications/history', { params }),
};

// Projects API endpoints
export const projectsAPI = {
  getProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  getMyProjects: () => api.get('/projects/my'),
  uploadProjectAttachments: (id, formData) => {
    return api.post(`/projects/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  updateProjectStatus: (id, data) => api.patch(`/projects/${id}/status`, data),
  selectStudent: (id, data) => api.patch(`/projects/${id}/select-student`, data),
  
  // NEW: Enhanced project search and filtering
  searchProjects: (params) => api.get('/projects/search', { params }),
  getProjectsByCategory: (category, params) => api.get(`/projects/category/${category}`, { params }),
  getFeaturedProjects: (params) => api.get('/projects/featured', { params }),
};

// Products API endpoints
export const productsAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getMyProducts: () => api.get('/products/my'),
};

// Applications API endpoints - ENHANCED with better error handling
export const applicationsAPI = {
  getApplications: (params) => api.get('/applications', { params }),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  createApplication: (data) => api.post('/applications', data),
  updateApplication: (id, data) => api.put(`/applications/${id}`, data),
  withdrawApplication: (id) => api.delete(`/applications/${id}`),
  reviewApplication: (id, data) => api.patch(`/applications/${id}/review`, data),
  acceptApplication: (id, data) => api.patch(`/applications/${id}/accept`, data),
  rejectApplication: (id, data) => api.patch(`/applications/${id}/reject`, data),
  uploadApplicationAttachments: (id, formData) => {
    return api.post(`/applications/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getMyApplications: (params) => api.get('/applications/my', { params }),
  
  // NEW: Enhanced application management
  getApplicationDetails: (id) => api.get(`/applications/${id}/details`),
  updateApplicationStatus: (id, status, notes) => api.patch(`/applications/${id}/status`, { status, notes }),
  getApplicationTimeline: (id) => api.get(`/applications/${id}/timeline`),
  bulkWithdrawApplications: (applicationIds) => api.post('/applications/bulk-withdraw', { applicationIds }),
};

// Chat API endpoints
export const chatsAPI = {
  getConversations: () => api.get('/chats/conversations'),
  getMessages: (conversationId) => api.get(`/chats/${conversationId}/messages`),
  sendMessage: (data) => api.post('/chats/messages', data),
  markAsRead: (messageId) => api.post(`/chats/messages/${messageId}/read`),
  
  // NEW: Enhanced chat features
  getUnreadCount: () => api.get('/chats/unread-count'),
  searchMessages: (query, params) => api.get('/chats/search', { params: { q: query, ...params } }),
  deleteMessage: (messageId) => api.delete(`/chats/messages/${messageId}`),
};

// Reviews API endpoints
export const reviewsAPI = {
  getReviews: (params) => api.get('/reviews', { params }),
  createReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  
  // NEW: Enhanced review features
  getReviewsByProject: (projectId) => api.get(`/reviews/project/${projectId}`),
  getReviewsByUser: (userId) => api.get(`/reviews/user/${userId}`),
  getReviewStats: (userId) => api.get(`/reviews/stats/${userId}`),
};

// Notifications API endpoints
export const notificationsAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  markAllAsRead: () => api.post('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  
  // NEW: Enhanced notification features
  getUnreadCount: () => api.get('/notifications/unread-count'),
  getNotificationsByType: (type) => api.get(`/notifications/type/${type}`),
  updateNotificationSettings: (settings) => api.put('/notifications/settings', settings),
};

// Upload API endpoints
export const uploadsAPI = {
  uploadFile: (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteFile: (fileId) => api.delete(`/uploads/${fileId}`),
  
  // NEW: Enhanced file management
  getFileInfo: (fileId) => api.get(`/uploads/${fileId}/info`),
  updateFileMetadata: (fileId, metadata) => api.put(`/uploads/${fileId}/metadata`, metadata),
  bulkUpload: (files, type = 'general') => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('type', type);
    return api.post('/uploads/bulk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Payment API endpoints
export const paymentsAPI = {
  getPayments: (params) => api.get('/payments', { params }),
  createPayment: (data) => api.post('/payments', data),
  getPaymentById: (id) => api.get(`/payments/${id}`),
  updatePaymentStatus: (id, data) => api.patch(`/payments/${id}/status`, data),
  processPayment: (data) => api.post('/payments/process', data),
  getPaymentHistory: () => api.get('/payments/history'),
  
  // NEW: Enhanced payment features
  getPaymentMethods: () => api.get('/payments/methods'),
  addPaymentMethod: (data) => api.post('/payments/methods', data),
  removePaymentMethod: (methodId) => api.delete(`/payments/methods/${methodId}`),
  initiateRefund: (paymentId, data) => api.post(`/payments/${paymentId}/refund`, data),
};

// Checkpoint API endpoints
export const checkpointsAPI = {
  getCheckpoints: (projectId) => api.get(`/checkpoints/project/${projectId}`),
  createCheckpoint: (data) => api.post('/checkpoints', data),
  updateCheckpoint: (id, data) => api.put(`/checkpoints/${id}`, data),
  deleteCheckpoint: (id) => api.delete(`/checkpoints/${id}`),
  submitCheckpoint: (id, formData) => {
    return api.post(`/checkpoints/${id}/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  reviewCheckpoint: (id, data) => api.post(`/checkpoints/${id}/review`, data),
  
  // NEW: Enhanced checkpoint features
  getCheckpointHistory: (id) => api.get(`/checkpoints/${id}/history`),
  bulkUpdateCheckpoints: (projectId, updates) => api.put(`/checkpoints/project/${projectId}/bulk`, updates),
  getCheckpointStats: (projectId) => api.get(`/checkpoints/project/${projectId}/stats`),
};

// Admin API endpoints
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  approveUser: (id) => api.post(`/admin/users/${id}/approve`),
  suspendUser: (id) => api.post(`/admin/users/${id}/suspend`),
  getProjects: (params) => api.get('/admin/projects', { params }),
  getReports: (params) => api.get('/admin/reports', { params }),
  exportData: (type) => api.get(`/admin/export/${type}`, { responseType: 'blob' }),
  
  // NEW: Enhanced admin features
  getUserActivity: (userId, params) => api.get(`/admin/users/${userId}/activity`, { params }),
  getSystemHealth: () => api.get('/admin/system/health'),
  getAuditLogs: (params) => api.get('/admin/audit-logs', { params }),
  manageFeatureFlags: (flags) => api.put('/admin/feature-flags', flags),
};

// Analytics API endpoints
export const analyticsAPI = {
  getUserStats: () => api.get('/analytics/users'),
  getProjectStats: () => api.get('/analytics/projects'),
  getRevenueStats: () => api.get('/analytics/revenue'),
  getPerformanceMetrics: () => api.get('/analytics/performance'),
  
  // NEW: Enhanced analytics
  getConversionRates: () => api.get('/analytics/conversion'),
  getUserEngagement: (params) => api.get('/analytics/engagement', { params }),
  getProjectSuccessRates: () => api.get('/analytics/project-success'),
  getCustomAnalytics: (query) => api.post('/analytics/custom', query),
};

// NEW: Matching API endpoints
export const matchingAPI = {
  getStudentMatches: (params) => api.get('/matching/students', { params }),
  getProjectRecommendations: (params) => api.get('/matching/recommendations', { params }),
  updateMatchingPreferences: (data) => api.put('/matching/preferences', data),
  getMatchingScore: (projectId) => api.get(`/matching/score/${projectId}`),
};

// NEW: Pricing API endpoints
export const pricingAPI = {
  getPricingSuggestions: (projectData) => api.post('/pricing/suggestions', projectData),
  getMarketRates: (category, params) => api.get(`/pricing/market-rates/${category}`, { params }),
  updatePricingTiers: (data) => api.put('/pricing/tiers', data),
  getPricingHistory: (params) => api.get('/pricing/history', { params }),
};

// Utility function for handling API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return data.message || 'Bad request';
      case 401:
        return 'Unauthorized - Please login again';
      case 403:
        return 'Forbidden - You do not have permission';
      case 404:
        return 'Resource not found';
      case 409:
        return 'Conflict - Resource already exists';
      case 422:
        return data.message || 'Validation error';
      case 429:
        return 'Too many requests - Please try again later';
      case 500:
        return 'Internal server error';
      default:
        return data.message || 'An error occurred';
    }
  } else if (error.request) {
    // Network error
    return 'Network error - Please check your connection';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred';
  }
};

export default api;