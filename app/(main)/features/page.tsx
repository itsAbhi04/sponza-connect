import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  DollarSign,
  Shield,
  Star,
  TrendingUp,
  MessageSquare,
  BarChart,
  Zap,
  Globe,
  Smartphone,
  Award,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Features - Influencer Marketing Tools & Solutions',
  description: 'Discover Sponza\'s powerful influencer marketing tools including AI-powered matching, campaign management, analytics, and secure payments. Streamline your influencer marketing campaigns.',
  openGraph: {
    title: 'Features - Influencer Marketing Tools & Solutions',
    description: 'Discover Sponza\'s powerful influencer marketing tools including AI-powered matching, campaign management, analytics, and secure payments.',
    images: [
      {
        url: '/features-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Sponza Features - Influencer Marketing Tools'
      }
    ]
  },
  twitter: {
    title: 'Features - Influencer Marketing Tools & Solutions',
    description: 'Discover Sponza\'s powerful influencer marketing tools including AI-powered matching, campaign management, analytics, and secure payments.',
    images: ['/features-twitter.jpg']
  }
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
              Platform Features
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything You Need for
              <br />
              Successful Influencer Marketing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover powerful tools and features designed to streamline your influencer marketing campaigns
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithm matches brands with the perfect influencers based on audience, niche, and
                  engagement rates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Campaign Management</CardTitle>
                <CardDescription>
                  End-to-end campaign management with real-time tracking, deliverable management, and performance
                  analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Integrated Razorpay payments with escrow protection, automated payouts, and transparent fee structure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>
                  All influencers undergo verification process ensuring authentic followers and genuine engagement rates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Rating System</CardTitle>
                <CardDescription>
                  Transparent rating and review system helps brands make informed decisions and builds trust in the
                  community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics and insights to measure campaign performance and ROI effectively.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Additional Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MessageSquare className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Built-in Messaging</h3>
                    <p className="text-gray-600">
                      Secure in-platform messaging system for seamless communication between brands and influencers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <BarChart className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Performance Tracking</h3>
                    <p className="text-gray-600">
                      Real-time tracking of campaign metrics, engagement rates, and ROI calculations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Quick Campaign Setup</h3>
                    <p className="text-gray-600">
                      Streamlined process for creating and launching campaigns with customizable templates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Globe className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Global Reach</h3>
                    <p className="text-gray-600">
                      Access to influencers and brands from around the world with multi-language support.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Smartphone className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Mobile App</h3>
                    <p className="text-gray-600">
                      Manage campaigns, communicate, and track performance on the go with our mobile app.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Quality Assurance</h3>
                    <p className="text-gray-600">
                      Content review and approval system to ensure brand guidelines are followed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
                <CardDescription className="text-white/80">
                  Join thousands of brands and influencers already using Sponza
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/register?role=brand">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                      Start as Brand
                    </Button>
                  </Link>
                  <Link href="/auth/register?role=influencer">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-purple-600"
                    >
                      Join as Influencer
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
