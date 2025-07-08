import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api' 
    : 'http://localhost:3000/api',
  timeout: 10000,
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
};

// Students API endpoints
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
  
  // ENHANCED: Active Project Management APIs
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
  updateProjectStatus: (data) => api.put('/students/active-project/status', data),
  requestProjectCompletion: (data) => api.post('/students/active-project/request-completion', data),
  completeProject: () => api.post('/students/active-project/complete'),
  
  // Dashboard and other existing APIs
  getDashboardStats: () => api.get('/students/dashboard/stats'),
  getOpportunities: (params) => api.get('/students/dashboard/opportunities', { params }),
  getMyApplications: (params) => api.get('/students/my-applications', { params }),
  getMyProjects: (params) => api.get('/students/my-projects', { params }),
  updateAvailability: (data) => api.put('/students/availability', data),
};

// Projects API endpoints
export const projectsAPI = {
  getProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  getMyProjects: () => api.get('/projects/my'),
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

// Applications API endpoints
export const applicationsAPI = {
  getApplications: (params) => api.get('/applications', { params }),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  createApplication: (data) => api.post('/applications', data),
  updateApplication: (id, data) => api.put(`/applications/${id}`, data),
  approveApplication: (id) => api.post(`/applications/${id}/approve`),
  rejectApplication: (id) => api.post(`/applications/${id}/reject`),
  getMyApplications: () => api.get('/applications/my'),
};

// Chat API endpoints
export const chatsAPI = {
  getConversations: () => api.get('/chats/conversations'),
  getMessages: (conversationId) => api.get(`/chats/${conversationId}/messages`),
  sendMessage: (data) => api.post('/chats/messages', data),
  markAsRead: (messageId) => api.post(`/chats/messages/${messageId}/read`),
};

// Reviews API endpoints
export const reviewsAPI = {
  getReviews: (params) => api.get('/reviews', { params }),
  createReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

// Notifications API endpoints
export const notificationsAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  markAllAsRead: () => api.post('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
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
};

// Analytics API endpoints
export const analyticsAPI = {
  getUserStats: () => api.get('/analytics/users'),
  getProjectStats: () => api.get('/analytics/projects'),
  getRevenueStats: () => api.get('/analytics/revenue'),
  getPerformanceMetrics: () => api.get('/analytics/performance'),
};

export default api;