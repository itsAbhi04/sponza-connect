# Sponza Connect

A comprehensive platform connecting brands with influencers for effective marketing campaigns.

## Overview

Sponza Connect is a robust influencer marketing platform that facilitates seamless collaboration between brands and content creators. The platform leverages AI-powered features for content moderation, smart matching, and analytics.

## Features

### For Brands
- Campaign creation and management
- Influencer discovery and filtering
- Real-time analytics and reporting
- Secure payment processing
- Direct messaging with influencers
- Campaign performance tracking

### For Influencers
- Profile customization
- Campaign discovery
- Application management
- Analytics dashboard
- Secure payments
- Direct communication with brands

### Platform Features
- AI-powered content moderation
- Real-time messaging
- Automated campaign reminders
- Multi-language support
- Secure authentication
- Role-based access control

## Tech Stack

- **Frontend**: React 19, Next.js 15.2
- **Backend**: Node.js with Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based auth
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Payment Processing**: Razorpay
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sponza-connect.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
sponza-connect/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── brand/             # Brand dashboard
│   ├── influencer/        # Influencer dashboard
│   └── api/               # API routes
├── components/            # Reusable components
├── lib/                   # Utilities and models
│   ├── models/           # Mongoose models
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## API Documentation

The platform provides comprehensive API endpoints for:
- Campaign Management
- Influencer Management
- Analytics
- Payments
- Authentication
- Content Moderation

Detailed API documentation is available at `/docs` when running the application.

## Security Features

- JWT-based authentication
- Role-based access control
- API rate limiting
- Secure payment processing
- Input validation with Zod
- XSS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

For support or inquiries, please contact:
- Email: support@sponza.com
- Website: https://sponza.com

## Deployment

The project is deployed on Vercel:
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pracharprashar/v0-sponza-platform-spec)

## Development Status

Current Version: 0.1.0
