# 🚀 UMKM Mahasiswa Frontend

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-green)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-blue)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern Frontend untuk Platform UMKM & Mahasiswa - Connecting Indonesian Students with Small Business Opportunities.

## ✨ **FITUR TERBARU - APLIKASI SAYA** ✨

### 📱 **MyApplicationsPage - Manajemen Aplikasi Lengkap**
- **✅ FIXED**: Fitur "Aplikasi Saya" sekarang **FULLY IMPLEMENTED**
- **📊 Dashboard Aplikasi**: Real-time tracking status aplikasi
- **🔍 Filter & Search**: Cari berdasarkan nama project/UMKM  
- **📈 Stats Dashboard**: Total, pending, accepted, rejected applications
- **💬 Detail Modal**: Informasi lengkap project, UMKM, dan feedback
- **🗑️ Withdraw Feature**: Tarik aplikasi yang masih pending
- **🔄 Real-time Updates**: Status aplikasi update secara live

### 🎯 **Enhanced Student Dashboard**
- **📊 Live Statistics**: Dashboard stats terintegrasi dengan backend
- **🚀 Active Project Card**: Quick access ke project yang sedang dikerjakan
- **🔗 Smart Navigation**: Tab navigation yang smooth dan responsive
- **📱 Mobile Responsive**: UI yang optimal di semua device

## 🛠️ **Teknologi Stack**

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **Vite** | 4.5.0 | Build Tool & Dev Server |
| **Tailwind CSS** | 3.3.5 | Styling Framework |
| **Framer Motion** | 10.16.0 | Animations |
| **React Router** | 6.20.0 | Client-side Routing |
| **Axios** | 1.6.0 | HTTP Client |
| **React Hook Form** | 7.48.0 | Form Management |
| **Socket.io Client** | 4.7.4 | Real-time Communication |
| **Lucide React** | 0.294.0 | Modern Icons |

## 🚀 **Quick Start**

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
# Clone repository
git clone https://github.com/HaikalE/umkm-mahasiswa-frontend.git

# Navigate to project
cd umkm-mahasiswa-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000

# Firebase (Optional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id

# Cloudinary (Optional)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── ui/             # Basic UI components
│   └── layout/         # Layout components
├── pages/              # Page components
│   ├── auth/           # Login/Register pages
│   ├── student/        # Student dashboard & features
│   │   ├── StudentDashboard.jsx
│   │   ├── ActiveProjectPage.jsx
│   │   └── MyApplicationsPage.jsx ✨ NEW
│   ├── umkm/           # UMKM dashboard & features
│   └── admin/          # Admin dashboard
├── services/           # API services
│   └── api.js          # Enhanced API client ✨
├── contexts/           # React contexts
├── hooks/              # Custom hooks
└── utils/              # Utility functions
```

## 🎯 **Fitur Utama**

### 👨‍🎓 **Student Features**
- **✅ Complete Dashboard**: Overview, projects, applications, portfolio
- **🎯 Active Project Management**: Track progress, submit deliverables, communicate
- **📋 My Applications**: ✨ **FULLY IMPLEMENTED** - Complete application tracking
- **💼 Portfolio Management**: Upload CV, portfolio files, showcase skills
- **💬 Real-time Chat**: Communicate with UMKM clients
- **💰 Payment Tracking**: Monitor project payments and earnings

### 🏢 **UMKM Features**
- **📊 Business Dashboard**: Manage projects, applications, active collaborations
- **👥 Student Discovery**: Find and hire talented students
- **📝 Project Management**: Create, manage, and track project progress
- **💳 Payment System**: Secure payment processing with escrow
- **⭐ Review System**: Rate and review student performance

### 🔐 **Authentication & Security**
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Student, UMKM, Admin role management
- **Protected Routes**: Route-level security implementation
- **Firebase Integration**: Optional social login support

## 🌟 **Enhanced API Integration**

### New Features
```javascript
// Application Management
await studentsAPI.getMyApplications({ status: 'pending', search: 'web dev' });
await applicationsAPI.withdrawApplication(applicationId);
await applicationsAPI.getApplicationDetails(applicationId);

// Enhanced Error Handling
import { handleApiError } from './services/api';

try {
  const response = await studentsAPI.getMyApplications();
} catch (error) {
  const errorMessage = handleApiError(error);
  toast.error(errorMessage);
}
```

## 📱 **Routing Structure**

```javascript
// Student Routes
/student                    // Student Dashboard
/student/applications       // My Applications ✨ NEW
/student/active-project     // Active Project Management

// UMKM Routes  
/umkm/*                     // UMKM Dashboard & Features

// Admin Routes
/admin/*                    // Admin Dashboard

// General Routes
/projects                   // Browse Projects
/products                   // Browse Products
/profile                    // User Profile Management
```

## 🎨 **UI/UX Highlights**

### Design System
- **🎨 Modern Design**: Clean, professional interface
- **📱 Responsive**: Mobile-first approach
- **🌙 Consistent Theming**: Unified color scheme and typography
- **⚡ Fast Loading**: Optimized performance and lazy loading
- **♿ Accessible**: WCAG compliance and screen reader support

### Interactive Elements
- **🔄 Smooth Animations**: Framer Motion powered transitions
- **📊 Live Statistics**: Real-time data visualization
- **💬 Toast Notifications**: User-friendly feedback system
- **🔍 Smart Filtering**: Advanced search and filter capabilities

## 🧪 **Testing**

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 **Build & Deployment**

### Development
```bash
npm run dev              # Start development server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
```

### Production
```bash
npm run build            # Build for production
npm run preview          # Preview production build
```

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: JAMstack deployment
- **GitHub Pages**: Static hosting
- **Docker**: Containerized deployment

## 🔧 **Configuration**

### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* custom colors */ },
        secondary: { /* custom colors */ }
      }
    }
  }
};
```

## 📈 **Performance Optimizations**

- **⚡ Code Splitting**: Lazy loading for optimal performance
- **🗜️ Bundle Optimization**: Tree shaking and minification
- **📷 Image Optimization**: Responsive images with lazy loading
- **💾 Caching Strategy**: Service worker implementation
- **🔄 API Optimization**: Request deduplication and caching

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Development Guidelines
- Follow **ESLint** and **Prettier** configurations
- Write **comprehensive tests** for new features
- Use **conventional commits** for clear history
- Update **documentation** for new features

## 🐛 **Bug Reports & Feature Requests**

Found a bug? Have a feature request? Please check our [Issues](https://github.com/HaikalE/umkm-mahasiswa-frontend/issues) page.

### Bug Report Template
```markdown
**Bug Description**: Clear description of the issue
**Steps to Reproduce**: Step-by-step reproduction
**Expected Behavior**: What should happen
**Actual Behavior**: What actually happens
**Environment**: Browser, OS, Node version
**Screenshots**: If applicable
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Team**

- **Muhammad Haikal Rahman** - Full Stack Developer
- **Contributors** - See [Contributors](https://github.com/HaikalE/umkm-mahasiswa-frontend/contributors)

## 🙏 **Acknowledgments**

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All open source contributors

## 🔗 **Related Projects**

- **Backend API**: [umkm-mahasiswa-backend](https://github.com/HaikalE/umkm-mahasiswa-backend)
- **Mobile App**: Coming Soon
- **Admin Panel**: Integrated in this repository

---

## 🚨 **Recent Updates - v1.1.0**

### ✅ **MAJOR FIXES**
- **🎯 FIXED**: "Aplikasi Saya" feature now **FULLY FUNCTIONAL**
- **📱 ENHANCED**: Student Dashboard with complete integration
- **🔗 NEW**: MyApplicationsPage with comprehensive management
- **⚡ IMPROVED**: API service with better error handling
- **🎨 UPDATED**: Modern UI/UX with smooth animations

### 📋 **New Components**
- `MyApplicationsPage.jsx` - Complete application management
- Enhanced `StudentDashboard.jsx` - Integrated tab functionality  
- Updated `api.js` - Comprehensive API endpoints
- New routing for `/student/applications`

**🎉 The "Aplikasi Saya" feature is now fully implemented and ready for production use!**

---

**Made with ❤️ for Indonesian Students and Small Businesses**