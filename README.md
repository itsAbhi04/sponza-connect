# Sponza Connect

A comprehensive influencer marketing platform built with Next.js 15 and TypeScript.

## 🚀 Overview

Sponza Connect bridges brands and influencers through an AI-powered platform, enabling seamless campaign management and collaboration.

## ⭐ Core Features

### For Brands
- 📊 Advanced campaign analytics dashboard
- 🔍 AI-powered influencer matching
- 💰 Secure payment processing via Razorpay
- 📱 Real-time campaign tracking
- 📈 ROI measurement tools
- 💬 Direct messaging system

### For Influencers
- 🎯 Smart campaign recommendations
- 📱 Multi-platform stats integration
- 💼 Portfolio management
- 📊 Performance analytics
- 🔔 Automated payment tracking
- 👥 Referral program

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.2, React 19
- **Type Safety**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - Radix UI Components
  - CSS Variables for theming
  - class-variance-authority
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod
- **Data Fetching**: axios

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: 
  - MongoDB with Mongoose
  - Indexes for performance
  - Aggregation pipelines
- **Authentication**: 
  - JWT-based auth
  - HTTP-only cookies
  - Role-based access control

### Infrastructure
- **Hosting**: Vercel
- **Media Storage**: AWS S3
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics

### Third-Party Services
- **Payments**: Razorpay
- **Email**: SendGrid
- **SMS**: Twilio
- **Analytics**: 
  - Google Analytics
  - Custom event tracking

## 📦 Dependencies

### Core Dependencies
```json
{
  "next": "15.2.4",
  "react": "^19",
  "typescript": "^5",
  "mongoose": "latest",
  "razorpay": "latest",
  "tailwindcss": "^3.4.17"
}
```

### UI Components
```json
{
  "@radix-ui/react-*": "Various UI components",
  "lucide-react": "^0.454.0",
  "class-variance-authority": "^0.7.1",
  "tailwind-merge": "^2.5.5"
}
```

## 🚀 Getting Started

1. **Clone and Install:**
```bash
git clone https://github.com/yourusername/sponza-connect.git
cd sponza-connect
npm install
```

2. **Environment Setup:**
```bash
cp .env.example .env.local
```

Required environment variables:
```env
MONGODB_URI=your_mongodb_uri
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
```

3. **Development:**
```bash
npm run dev
```

4. **Build & Deploy:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
sponza-connect/
├── app/                    
│   ├── admin/             # Admin dashboard
│   ├── brand/             # Brand portal
│   ├── influencer/        # Influencer portal
│   ├── api/               # API routes
│   └── (auth)/            # Authentication pages
├── components/            
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layouts/          # Layout components
├── lib/                  
│   ├── models/           # Mongoose models
│   ├── utils/            # Utility functions
│   └── config/           # Configuration
├── public/               # Static assets
└── styles/              # Global styles
```

## 🔒 Security Features

- CSRF Protection
- Rate Limiting
- Input Sanitization
- XSS Prevention
- SQL Injection Protection
- Secure Headers
- Cookie Security
- File Upload Validation

## 📝 License & Legal

- **License**: Proprietary
- **Privacy Policy**: [View](https://sponza.in/privacy)
- **Terms of Service**: [View](https://sponza.in/terms)

## 📞 Contact & Support

- **Email**: support@sponza.in
- **Website**: https://sponza.in
- **Documentation**: https://docs.sponza.in

## 🌟 Status

![Vercel Deploy](https://img.shields.io/github/deployments/yourusername/sponza-connect/production?label=vercel&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-proprietary-red)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
