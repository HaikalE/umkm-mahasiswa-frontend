# 🤝 Contributing to UMKM x Mahasiswa Frontend

Terima kasih atas minat Anda untuk berkontribusi pada platform UMKM x Mahasiswa! Panduan ini akan membantu Anda memulai kontribusi dengan mudah dan efektif.

## 📋 Daftar Isi

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing](#testing)

## 📜 Code of Conduct

Proyek ini mengikuti [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Dengan berpartisipasi, Anda diharapkan untuk mematuhi kode etik ini.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork repository**
```bash
# Fork di GitHub, kemudian clone
git clone https://github.com/YOUR_USERNAME/umkm-mahasiswa-frontend.git
cd umkm-mahasiswa-frontend
```

2. **Add upstream remote**
```bash
git remote add upstream https://github.com/HaikalE/umkm-mahasiswa-frontend.git
```

3. **Install dependencies**
```bash
npm install
```

4. **Setup environment**
```bash
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan
```

5. **Start development server**
```bash
npm run dev
```

## 🔄 Development Workflow

### 1. Sync with Upstream
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create Feature Branch
```bash
# Gunakan naming convention yang jelas
git checkout -b feature/user-profile-edit
git checkout -b bugfix/login-validation
git checkout -b docs/api-integration
```

### 3. Make Changes
- Ikuti coding standards
- Tulis kode yang readable dan maintainable
- Tambahkan comments untuk logic yang kompleks
- Pastikan responsive design

### 4. Test Changes
```bash
# Lint code
npm run lint

# Build project
npm run build

# Test di berbagai device sizes
```

### 5. Commit Changes
```bash
git add .
git commit -m "feat: add user profile edit functionality"
```

### 6. Push and Create PR
```bash
git push origin feature/user-profile-edit
# Buat Pull Request di GitHub
```

## 📝 Coding Standards

### React/JavaScript

```javascript
// ✅ Good: Functional components dengan hooks
const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSave = useCallback(() => {
    // Handle save logic
  }, []);
  
  return (
    <div className="card p-6">
      {/* Component JSX */}
    </div>
  );
};

// ❌ Avoid: Class components untuk new code
class UserProfile extends Component {
  // Avoid unless necessary
}
```

### CSS/Tailwind

```javascript
// ✅ Good: Menggunakan utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h3 className="text-lg font-semibold text-gray-900">Title</h3>
  <button className="btn btn-primary">Action</button>
</div>

// ✅ Good: Custom classes untuk components
<div className="card card-hover">
  <div className="card-header">
    <h3 className="heading-3">Card Title</h3>
  </div>
</div>

// ❌ Avoid: Inline styles
<div style={{ padding: '16px', backgroundColor: 'white' }}>
  {/* Avoid inline styles */}
</div>
```

### File Naming

```
✅ Good:
components/ui/LoadingSpinner.jsx
pages/auth/LoginPage.jsx
hooks/useAuth.js
services/api.js

❌ Avoid:
components/loadingspinner.jsx
pages/Login.jsx
hooks/auth.js
services/API.js
```

### Component Structure

```javascript
// ✅ Good component structure
import React, { useState, useCallback } from 'react';
import { User, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UserProfile = ({ userId, onUpdate }) => {
  // 1. Hooks
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // 2. Event handlers
  const handleUpdate = useCallback(() => {
    // Handle logic
  }, []);
  
  // 3. Render helpers (if needed)
  const renderUserInfo = () => {
    // Complex render logic
  };
  
  // 4. Main render
  return (
    <div className="card">
      {/* Component JSX */}
    </div>
  );
};

export default UserProfile;
```

### Accessibility

```javascript
// ✅ Good: Proper accessibility
<button 
  onClick={handleClick}
  aria-label="Save user profile"
  disabled={loading}
  className="btn btn-primary"
>
  {loading ? 'Saving...' : 'Save'}
</button>

<input
  type="email"
  id="email"
  name="email"
  aria-describedby="email-error"
  className="form-input"
/>
{error && (
  <span id="email-error" className="form-error" role="alert">
    {error}
  </span>
)}

// ✅ Good: Semantic HTML
<main>
  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">Available Projects</h2>
    {/* Content */}
  </section>
</main>
```

## 📖 Commit Guidelines

### Conventional Commits

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
# Features
git commit -m "feat: add user profile edit functionality"
git commit -m "feat(auth): implement password reset flow"

# Bug fixes
git commit -m "fix: resolve login validation issue"
git commit -m "fix(ui): correct mobile navigation layout"

# Documentation
git commit -m "docs: update API integration guide"
git commit -m "docs(readme): add deployment instructions"

# Styling
git commit -m "style: format code with prettier"
git commit -m "style(components): improve button hover states"
```

## 🔀 Pull Request Process

### PR Title
```
feat: add user profile edit functionality
fix: resolve mobile navigation issue
docs: update contributing guidelines
```

### PR Description Template
```markdown
## 📝 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 Testing
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Code builds without warnings
- [ ] Responsive design tested
- [ ] Accessibility guidelines followed

## 📱 Screenshots (if applicable)
[Add screenshots for UI changes]

## 🔗 Related Issues
Closes #123
Related to #456
```

### Review Process

1. **Automated Checks**: Pastikan linting dan build berhasil
2. **Code Review**: Minimal 1 reviewer approval
3. **Testing**: Manual testing untuk UI changes
4. **Documentation**: Update docs jika diperlukan

## 🐛 Issue Guidelines

### Bug Reports

```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- Browser: [e.g. Chrome 91]
- Device: [e.g. iPhone 12]
- Screen size: [e.g. 375x812]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternative Solutions**
Any alternative approaches considered

**Additional Context**
Mockups, examples, or references
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Functionality**: Feature works as expected
- [ ] **Responsive**: Works on mobile, tablet, desktop
- [ ] **Cross-browser**: Tested on Chrome, Firefox, Safari
- [ ] **Accessibility**: Keyboard navigation works
- [ ] **Performance**: No significant performance regression
- [ ] **Visual**: UI matches design specifications

### Testing Commands

```bash
# Lint code
npm run lint

# Build project
npm run build

# Preview build
npm run preview
```

## 🎨 Design Guidelines

### UI/UX Principles

1. **Consistency**: Gunakan design system yang ada
2. **Simplicity**: Interface yang clean dan intuitive
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Performance**: Optimal loading dan interaction
5. **Mobile-first**: Responsive design approach

### Component Design

```javascript
// ✅ Good: Reusable dan configurable
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

### Design Tools
- [Figma Design System](link-to-figma)
- [Color Palette Generator](https://coolors.co)
- [Accessibility Checker](https://wave.webaim.org)

### Learning Resources
- [React Best Practices](https://react.dev/learn)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Optimization](https://web.dev/performance/)

## 🙋‍♂️ Getting Help

- **Discord**: [Join our community](link-to-discord)
- **GitHub Discussions**: [Ask questions](https://github.com/HaikalE/umkm-mahasiswa-frontend/discussions)
- **Email**: dev@umkm-mahasiswa.id

---

**Terima kasih atas kontribusi Anda! 🙏**

Setiap kontribusi, sekecil apapun, sangat berarti untuk kemajuan platform ini dan komunitas UMKM serta mahasiswa Indonesia.