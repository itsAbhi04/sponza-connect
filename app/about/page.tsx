import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Shield, TrendingUp, Heart, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sponza
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-purple-600 font-medium">
              About
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-purple-600 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">About Sponza</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            Connecting Brands with
            <br />
            Authentic Creators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sponza is India's premier influencer marketing platform, empowering brands to discover authentic creators
            and enabling influencers to monetize their content through meaningful partnerships.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-purple-100">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To democratize influencer marketing by creating a transparent, secure, and efficient platform where
                brands can discover the perfect creators for their campaigns, and influencers can build sustainable
                careers through authentic partnerships.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader>
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To become the global leader in influencer marketing technology, fostering a creator economy where
                authentic storytelling drives meaningful brand connections and empowers creators to thrive in the
                digital landscape.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Our Story</CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Founded in 2024, Sponza emerged from the vision to bridge the gap between brands and creators
              </CardDescription>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  In the rapidly evolving digital landscape, we recognized that traditional marketing approaches were
                  becoming less effective, while authentic creator content was driving real engagement and conversions.
                  However, the process of connecting brands with the right influencers was fragmented, time-consuming,
                  and often lacked transparency.
                </p>
                <p>
                  Sponza was born to solve these challenges. We built a comprehensive platform that not only facilitates
                  discovery and collaboration but also ensures secure payments, transparent communication, and
                  data-driven insights. Our technology-first approach combines AI-powered matching algorithms with human
                  expertise to create meaningful partnerships.
                </p>
                <p>
                  Today, Sponza serves thousands of brands and creators across India, facilitating millions in campaign
                  value while maintaining our commitment to authenticity, transparency, and creator empowerment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-green-100">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Open communication, clear pricing, and honest reporting in all our interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-100">
              <CardHeader>
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Authenticity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Promoting genuine creator content and meaningful brand partnerships over artificial engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building a supportive ecosystem where creators and brands can grow together.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-100">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Continuously evolving our platform with cutting-edge technology and user feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Platform Impact</CardTitle>
              <CardDescription className="text-purple-100 text-lg">
                The numbers that showcase our growing community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">10K+</div>
                  <div className="text-purple-100">Active Creators</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-purple-100">Brand Partners</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">₹2Cr+</div>
                  <div className="text-purple-100">Creator Earnings</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-purple-100">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals building the future of influencer marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AK</span>
                </div>
                <CardTitle>Arjun Kumar</CardTitle>
                <CardDescription>Co-Founder & CEO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Former marketing executive with 10+ years in digital advertising. Passionate about creator economy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">PS</span>
                </div>
                <CardTitle>Priya Sharma</CardTitle>
                <CardDescription>Co-Founder & CTO</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tech entrepreneur and AI specialist. Previously built scalable platforms at leading tech companies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">RG</span>
                </div>
                <CardTitle>Rahul Gupta</CardTitle>
                <CardDescription>Head of Creator Relations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Former content creator turned business strategist. Advocates for creator rights and fair compensation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Join Sponza?</CardTitle>
              <CardDescription className="text-lg">
                Whether you're a brand looking to connect with creators or an influencer ready to monetize your content,
                we're here to help you succeed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register?role=brand">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                    Join as Brand
                  </button>
                </Link>
                <Link href="/auth/register?role=influencer">
                  <button className="px-6 py-3 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                    Join as Creator
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
