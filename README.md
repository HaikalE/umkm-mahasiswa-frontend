# 🚀 UMKM x Mahasiswa - Frontend Platform

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.5.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**Modern Frontend untuk Platform UMKM & Mahasiswa Indonesia** - Interface yang menghubungkan UMKM dengan talenta mahasiswa untuk kolaborasi dan pertumbuhan bisnis digital.

---

## 📋 Daftar Isi

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Authentication Flow](#-authentication-flow)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌟 Overview

Platform frontend modern yang dibangun dengan **React.js** dan **Tailwind CSS** untuk menghubungkan UMKM dengan mahasiswa Indonesia. Dirancang dengan prinsip **Human-Computer Interaction (HCI)** dan standar **ISO** untuk memberikan pengalaman pengguna terbaik.

### 🎯 Vision & Mission

**Vision:** Interface yang intuitif dan accessible untuk semua kalangan

**Mission:**
- 🎨 **Design Excellence** - UI/UX yang modern dan user-friendly
- ♿ **Accessibility** - Mendukung semua pengguna termasuk penyandang disabilitas
- 📱 **Responsive** - Optimal di semua perangkat (mobile, tablet, desktop)
- ⚡ **Performance** - Loading cepat dan interaksi yang smooth
- 🔒 **Security** - Implementasi keamanan frontend yang robust

---

## ✨ Features

### 🏠 Landing Page
- ✅ **Hero Section** dengan animasi smooth
- ✅ **Features Showcase** dengan interactive cards
- ✅ **Testimonials** dari pengguna real
- ✅ **Pricing Plans** yang jelas dan transparent
- ✅ **CTA Sections** yang persuasive
- ✅ **Responsive Navigation** dengan mobile menu

### 🔐 Authentication System
- ✅ **Multi-step Registration** dengan user type selection
- ✅ **Secure Login** dengan error handling
- ✅ **Password Strength** indicator
- ✅ **Form Validation** real-time
- ✅ **Remember Me** functionality
- ✅ **Demo Accounts** untuk testing

### 👨‍💼 Admin Dashboard
- ✅ **Comprehensive Stats** dengan real-time data
- ✅ **User Management** dengan approval system
- ✅ **Analytics Dashboard** dengan charts
- ✅ **Activity Monitoring** untuk tracking
- ✅ **Export/Import** functionality
- ✅ **Quick Actions** untuk efficiency

### 🏢 UMKM Dashboard
- ✅ **Project Management** - Post dan kelola proyek
- ✅ **Product Catalog** - Showcase produk/jasa
- ✅ **Application Review** - Review aplikasi mahasiswa
- ✅ **Revenue Tracking** - Monitor pendapatan
- ✅ **Analytics** - Performance metrics
- ✅ **Chat System** - Komunikasi real-time

### 🎓 Student Dashboard
- ✅ **Project Discovery** - Cari dan filter proyek
- ✅ **Application Tracking** - Monitor status aplikasi
- ✅ **Portfolio Management** - Showcase karya
- ✅ **Earnings Dashboard** - Track penghasilan
- ✅ **Skill Management** - Update keahlian
- ✅ **Chat System** - Komunikasi dengan UMKM

### 🔍 Project & Product Pages
- ✅ **Advanced Search** dengan multiple filters
- ✅ **Grid/List View** toggle
- ✅ **Bookmark System** untuk save items
- ✅ **Detailed View** dengan complete information
- ✅ **Application Flow** yang user-friendly
- ✅ **Rating & Reviews** system

### 👤 Profile Management
- ✅ **Editable Profiles** dengan real-time update
- ✅ **Avatar Upload** dengan preview
- ✅ **Social Links** integration
- ✅ **Type-specific Info** (UMKM vs Student)
- ✅ **Statistics Display** - Performance metrics
- ✅ **Quick Actions** shortcuts

---

## 🛠️ Tech Stack

### Frontend Core
- **React.js 18.2.0** - Component-based UI library
- **Vite 4.5.0** - Fast build tool dan dev server
- **React Router 6.20.0** - Client-side routing
- **Tailwind CSS 3.3.5** - Utility-first CSS framework

### State Management & API
- **React Context** - Global state management
- **Axios 1.6.0** - HTTP client untuk API calls
- **React Hook Form 7.48.0** - Form handling
- **React Hot Toast 2.4.1** - Toast notifications

### UI/UX Enhancement
- **Lucide React 0.294.0** - Beautiful icon library
- **Framer Motion 10.16.0** - Smooth animations
- **Clsx 2.0.0** - Conditional className utility
- **Date-fns 2.30.0** - Date manipulation

### Real-time Communication
- **Socket.io Client 4.7.4** - Real-time chat system

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 🚀 Quick Start

### Menggunakan Development Server

```bash
# Clone repository
git clone https://github.com/HaikalE/umkm-mahasiswa-frontend.git
cd umkm-mahasiswa-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda

# Start development server
npm run dev

# Frontend akan berjalan di http://localhost:3001
```

### Demo Accounts
```
UMKM Account:
📧 Email: warung.makan.sederhana@gmail.com
🔑 Password: password123

Student Account:
📧 Email: andi.mahasiswa@gmail.com
🔑 Password: password123

Admin Account:
📧 Email: admin@umkm-mahasiswa.id
🔑 Password: admin123
```

---

## 📦 Installation

### Prerequisites

- **Node.js** 18+ dan npm
- **Backend API** (https://github.com/HaikalE/umkm-mahasiswa-backend)
- **Git** untuk version control

### Step-by-Step Setup

#### 1. **Clone Repository**
```bash
git clone https://github.com/HaikalE/umkm-mahasiswa-frontend.git
cd umkm-mahasiswa-frontend
```

#### 2. **Install Dependencies**
```bash
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

#### 3. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local
vim .env.local
```

**Environment Variables:**
```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME="UMKM x Mahasiswa"
VITE_APP_VERSION=1.0.0

# External Services
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
VITE_GOOGLE_ANALYTICS_ID=your-ga-id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=true
```

#### 4. **Start Development**
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── ui/             # Basic UI components
│   └── layout/         # Layout components
├── contexts/           # React Context providers
│   ├── AuthContext.jsx    # User authentication state
│   └── LoadingContext.jsx # Global loading state
├── hooks/              # Custom React hooks
│   ├── useAuth.js         # Authentication hook
│   └── useLoading.js      # Loading state hook
├── pages/              # Page components
│   ├── auth/              # Login, Register pages
│   ├── admin/             # Admin dashboard
│   ├── umkm/              # UMKM dashboard
│   ├── student/           # Student dashboard
│   ├── dashboard/         # General dashboard
│   ├── LandingPage.jsx    # Landing page
│   ├── ProjectsPage.jsx   # Projects listing
│   ├── ProductsPage.jsx   # Products catalog
│   ├── ProfilePage.jsx    # User profile
│   └── NotFoundPage.jsx   # 404 error page
├── services/           # API services
│   └── api.js             # API endpoints
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

### Component Architecture

```
App.jsx
├── AuthProvider
│   ├── LoadingProvider
│   │   ├── Router
│   │   │   ├── PublicRoute (Landing, Login, Register)
│   │   │   └── ProtectedRoute
│   │   │       ├── AdminDashboard (role: admin)
│   │   │       ├── UmkmDashboard (user_type: umkm)
│   │   │       ├── StudentDashboard (user_type: student)
│   │   │       ├── ProjectsPage
│   │   │       ├── ProductsPage
│   │   │       └── ProfilePage
│   │   └── Toast Notifications
│   └── Error Boundary
└── Global Loading Spinner
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;

/* Secondary Colors */
--secondary-500: #d946ef;
--secondary-600: #c026d3;

/* Status Colors */
--success-500: #22c55e;
--warning-500: #f59e0b;
--danger-500: #ef4444;
```

### Typography

```css
/* Font Families */
font-family: 'Inter', system-ui, sans-serif;        /* Body text */
font-heading: 'Poppins', 'Inter', system-ui, sans-serif; /* Headings */

/* Font Sizes */
.heading-1 { @apply text-4xl md:text-5xl lg:text-6xl font-bold; }
.heading-2 { @apply text-3xl md:text-4xl lg:text-5xl font-bold; }
.heading-3 { @apply text-2xl md:text-3xl lg:text-4xl font-semibold; }
```

### Component Classes

```css
/* Buttons */
.btn { @apply inline-flex items-center justify-center px-4 py-2 rounded-lg transition-all; }
.btn-primary { @apply bg-primary-600 text-white hover:bg-primary-700; }
.btn-outline { @apply border border-gray-300 text-gray-700 hover:bg-gray-50; }

/* Cards */
.card { @apply bg-white rounded-xl shadow-soft border border-gray-100; }
.card-hover { @apply transition-all duration-300 hover:shadow-medium hover:-translate-y-1; }

/* Forms */
.form-input { @apply block w-full px-3 py-2 border border-gray-300 rounded-lg; }
.form-label { @apply block text-sm font-medium text-gray-700 mb-1; }
```

### Accessibility Features

- **Focus Management** - Visible focus indicators
- **Semantic HTML** - Proper heading hierarchy dan landmarks
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Color Contrast** - WCAG AA compliant
- **Skip Links** - Quick navigation for screen readers
- **Reduced Motion** - Respects user preferences

---

## 🔐 Authentication Flow

### User Registration
```
1. User Type Selection (UMKM/Student)
   ↓
2. Form Validation (Real-time)
   ↓
3. API Call to Backend
   ↓
4. Success Confirmation
   ↓
5. Redirect to Login
```

### User Login
```
1. Credential Validation
   ↓
2. API Authentication
   ↓
3. JWT Token Storage
   ↓
4. User Context Update
   ↓
5. Role-based Redirect
   ├── Admin → /admin
   ├── UMKM → /umkm
   └── Student → /student
```

### Protected Routes
```javascript
// Route Protection
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>

// Role-based Protection
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>

// User Type Protection
<ProtectedRoute requiredUserType="umkm">
  <UmkmDashboard />
</ProtectedRoute>
```

---

## 🔌 API Integration

### API Configuration
```javascript
// services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Endpoints
```javascript
// Authentication
authAPI.login(credentials)
authAPI.register(userData)
authAPI.logout()

// Users
usersAPI.getProfile()
usersAPI.updateProfile(data)

// Projects
projectsAPI.getProjects(params)
projectsAPI.createProject(data)

// Products
productsAPI.getProducts(params)
productsAPI.createProduct(data)

// Admin
adminAPI.getDashboardStats()
adminAPI.getUsers(params)
```

### Error Handling
```javascript
// Global error interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Setup
```bash
# Production Environment Variables
VITE_API_URL=https://api.umkm-mahasiswa.id
VITE_SOCKET_URL=https://api.umkm-mahasiswa.id
VITE_APP_ENV=production
```

---

## 🤝 Contributing

### Development Workflow

1. **Fork Repository**
```bash
git clone https://github.com/YOUR_USERNAME/umkm-mahasiswa-frontend.git
cd umkm-mahasiswa-frontend
```

2. **Create Feature Branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Development Setup**
```bash
npm install
cp .env.example .env.local
npm run dev
```

4. **Code & Test**
```bash
# Follow coding standards
npm run lint
npm run build
```

5. **Commit Changes**
```bash
# Use conventional commits
git commit -m "feat: add user profile edit functionality"
```

6. **Push & Create PR**
```bash
git push origin feature/amazing-feature
```

### Code Standards

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format
- **Component Documentation** - JSDoc comments
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG guidelines compliance

### Contribution Guidelines

- 🐛 **Bug Reports** - Use issue templates
- ✨ **Feature Requests** - Describe use case clearly
- 📖 **Documentation** - Update docs for any changes
- 🧪 **Testing** - Ensure components work properly
- 🔍 **Code Review** - All PRs require review

---

## 📄 License

**MIT License** - Feel free to use for educational dan commercial purposes.

See [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

### 🆘 Getting Help
- 📖 **Documentation**: [Frontend Docs](https://github.com/HaikalE/umkm-mahasiswa-frontend)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/HaikalE/umkm-mahasiswa-frontend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/HaikalE/umkm-mahasiswa-frontend/discussions)
- 🎯 **Backend API**: [Backend Repository](https://github.com/HaikalE/umkm-mahasiswa-backend)

### 📧 Contact Information
- **Email**: dev@umkm-mahasiswa.id
- **Instagram**: [@umkm.mahasiswa](https://instagram.com/umkm.mahasiswa)
- **LinkedIn**: [UMKM x Mahasiswa Platform](https://linkedin.com/company/umkm-mahasiswa)

### 🌟 Acknowledgments
- **Design Inspiration** - Modern web design trends
- **Open Source Libraries** - Amazing React ecosystem
- **Indonesian Tech Community** - Support dan feedback
- **Contributors** - Thank you untuk semua kontribusi

---

<div align="center">

**Made with ❤️ for Indonesia 🇮🇩**

*Empowering UMKM and Students Through Modern Technology*

[⭐ Star this repo](https://github.com/HaikalE/umkm-mahasiswa-frontend) • [🐛 Report Bug](https://github.com/HaikalE/umkm-mahasiswa-frontend/issues) • [✨ Request Feature](https://github.com/HaikalE/umkm-mahasiswa-frontend/issues)

</div>