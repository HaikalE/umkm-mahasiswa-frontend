# 🚀 Deployment Guide - UMKM x Mahasiswa Frontend

Panduan lengkap untuk deploy frontend platform UMKM x Mahasiswa ke berbagai platform hosting.

## 📋 Daftar Isi

- [Prerequisites](#prerequisites)
- [Build Production](#build-production)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Docker Deployment](#docker-deployment)
- [Custom Server](#custom-server)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment](#post-deployment)

## 📋 Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git repository
- Backend API running (https://github.com/HaikalE/umkm-mahasiswa-backend)

## 🏗️ Build Production

### 1. Prepare Environment
```bash
# Clone repository
git clone https://github.com/HaikalE/umkm-mahasiswa-frontend.git
cd umkm-mahasiswa-frontend

# Install dependencies
npm install

# Create production environment file
cp .env.example .env.production
```

### 2. Configure Environment Variables
```env
# .env.production
VITE_API_URL=https://your-backend-api.com/api
VITE_SOCKET_URL=https://your-backend-api.com
VITE_APP_NAME="UMKM x Mahasiswa"
VITE_APP_ENV=production
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
```

### 3. Build Application
```bash
# Build for production
npm run build

# Preview production build (optional)
npm run preview

# Verify build
ls -la dist/
```

## ▲ Vercel Deployment (Recommended)

Vercel adalah pilihan terbaik untuk React applications dengan zero-config deployment.

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# ? Set up and deploy "umkm-mahasiswa-frontend"? [Y/n] y
# ? Which scope do you want to deploy to? Your Name
# ? Link to existing project? [y/N] n
# ? What's your project's name? umkm-mahasiswa-frontend
# ? In which directory is your code located? ./
```

### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import from GitHub
5. Select `umkm-mahasiswa-frontend` repository
6. Configure build settings:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
7. Add environment variables
8. Deploy!

### Vercel Configuration File
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🌐 Netlify Deployment

### Method 1: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Method 2: Git Integration
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "New site from Git"
4. Choose GitHub and select repository
5. Configure build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
6. Set environment variables
7. Deploy

### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## ☁️ AWS S3 + CloudFront

### 1. Create S3 Bucket
```bash
# Install AWS CLI
aws configure

# Create bucket
aws s3 mb s3://umkm-mahasiswa-frontend

# Enable static website hosting
aws s3 website s3://umkm-mahasiswa-frontend \
  --index-document index.html \
  --error-document index.html
```

### 2. Upload Build Files
```bash
# Build application
npm run build

# Upload to S3
aws s3 sync dist/ s3://umkm-mahasiswa-frontend --delete

# Set public read permissions
aws s3api put-bucket-policy --bucket umkm-mahasiswa-frontend --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::umkm-mahasiswa-frontend/*"
    }
  ]
}'
```

### 3. Setup CloudFront (CDN)
```bash
# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config '{
  "CallerReference": "umkm-mahasiswa-frontend-'$(date +%s)'",
  "Comment": "UMKM x Mahasiswa Frontend CDN",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-umkm-mahasiswa-frontend",
        "DomainName": "umkm-mahasiswa-frontend.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-umkm-mahasiswa-frontend",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "Enabled": true
}'
```

## 🐳 Docker Deployment

### 1. Create Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Create Nginx Configuration
```nginx
# nginx.conf
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  
  # Enable gzip compression
  gzip on;
  gzip_vary on;
  gzip_types
    text/plain
    text/css
    text/javascript
    application/javascript
    application/json
    application/xml
    image/svg+xml;

  server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Cache static assets
    location /static/ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }

    # Handle React Router
    location / {
      try_files $uri $uri/ /index.html;
    }

    # Health check endpoint
    location /health {
      access_log off;
      return 200 "healthy\n";
      add_header Content-Type text/plain;
    }
  }
}
```

### 3. Build and Run Docker Container
```bash
# Build image
docker build -t umkm-mahasiswa-frontend .

# Run container
docker run -d \
  --name umkm-frontend \
  -p 80:80 \
  --restart unless-stopped \
  umkm-mahasiswa-frontend

# Check status
docker ps
docker logs umkm-frontend
```

### 4. Docker Compose (with backend)
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:3000/api
      - VITE_SOCKET_URL=http://backend:3000
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    image: umkm-mahasiswa-backend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=database
    depends_on:
      - database
    restart: unless-stopped

  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=umkm_mahasiswa
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## 🖥️ Custom Server (VPS/Dedicated)

### 1. Server Setup (Ubuntu/CentOS)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Deploy Application
```bash
# Clone repository
git clone https://github.com/HaikalE/umkm-mahasiswa-frontend.git
cd umkm-mahasiswa-frontend

# Install dependencies
npm install

# Build application
npm run build

# Move build files to web directory
sudo cp -r dist/* /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### 3. Configure Nginx
```nginx
# /etc/nginx/sites-available/umkm-mahasiswa
server {
    listen 80;
    server_name umkm-mahasiswa.id www.umkm-mahasiswa.id;
    root /var/www/html;
    index index.html;

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Cache static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Enable Site and SSL
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/umkm-mahasiswa /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d umkm-mahasiswa.id -d www.umkm-mahasiswa.id

# Setup auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## ⚙️ Environment Configuration

### Development
```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
VITE_APP_ENV=development
VITE_DEBUG=true
```

### Staging
```env
VITE_API_URL=https://staging-api.umkm-mahasiswa.id/api
VITE_SOCKET_URL=https://staging-api.umkm-mahasiswa.id
VITE_APP_ENV=staging
VITE_DEBUG=false
```

### Production
```env
VITE_API_URL=https://api.umkm-mahasiswa.id/api
VITE_SOCKET_URL=https://api.umkm-mahasiswa.id
VITE_APP_ENV=production
VITE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 🔍 Post-Deployment

### 1. Verify Deployment
```bash
# Check if site is accessible
curl -I https://umkm-mahasiswa.id

# Test API connectivity
curl https://umkm-mahasiswa.id/api/health

# Check console for errors
# Open browser developer tools
```

### 2. Performance Testing
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://webpagetest.org/

### 3. Monitoring Setup
```javascript
// Add to index.html for basic monitoring
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Google Analytics (if enabled)
if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
  // GA4 tracking code
}
```

### 4. Security Checklist
- ✅ HTTPS enabled
- ✅ Security headers configured
- ✅ Environment variables secured
- ✅ API endpoints protected
- ✅ Rate limiting in place
- ✅ Error messages don't expose sensitive info

### 5. Backup Strategy
```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/frontend"

# Backup build files
tar -czf "$BACKUP_DIR/frontend_$DATE.tar.gz" /var/www/html/

# Backup nginx config
cp /etc/nginx/sites-available/umkm-mahasiswa "$BACKUP_DIR/nginx_$DATE.conf"

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

## 🚨 Troubleshooting

### Common Issues

**1. White Screen (Blank Page)**
```bash
# Check console errors
# Verify API_URL is correct
# Check if backend is running
# Verify build was successful
```

**2. API Connection Issues**
```bash
# Check CORS settings on backend
# Verify API_URL environment variable
# Test API endpoints directly
curl https://api.umkm-mahasiswa.id/api/health
```

**3. Routing Issues (404 on refresh)**
```nginx
# Ensure nginx has fallback to index.html
location / {
    try_files $uri $uri/ /index.html;
}
```

**4. Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

### Performance Issues
```bash
# Enable gzip compression
# Optimize images
# Use CDN for static assets
# Enable browser caching
# Minimize bundle size
```

## 📞 Support

Jika mengalami masalah deployment:
- 📧 Email: dev@umkm-mahasiswa.id
- 🐛 GitHub Issues: https://github.com/HaikalE/umkm-mahasiswa-frontend/issues
- 💬 Discord: [Community Link]

---

**🎉 Selamat! Frontend UMKM x Mahasiswa telah berhasil di-deploy! 🚀**