import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Award, Heart, Globe, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Empowering Influencer Marketing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sponza is revolutionizing the way brands and influencers connect, collaborate, and create impactful
              marketing campaigns.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To democratize influencer marketing by creating a transparent, efficient, and secure platform that
                  connects authentic creators with brands that share their values.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To become the world's most trusted influencer marketing platform, where creativity meets commerce and
                  meaningful partnerships drive real business results.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Heart className="h-8 w-8 text-red-600 mb-2" />
                  <CardTitle>Authenticity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We believe in genuine connections and authentic content that resonates with audiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We continuously evolve our platform to meet the changing needs of the influencer marketing industry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We foster a supportive community where creators and brands can thrive together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-center">John Doe</CardTitle>
                  <CardDescription className="text-center">CEO & Co-founder</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Former tech executive with 15+ years of experience in digital marketing and platform development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-center">Jane Smith</CardTitle>
                  <CardDescription className="text-center">CTO & Co-founder</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Tech innovator with expertise in AI and machine learning, previously at leading tech companies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-center">Mike Johnson</CardTitle>
                  <CardDescription className="text-center">Head of Marketing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Marketing strategist with a passion for influencer marketing and brand development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle className="text-3xl">10K+</CardTitle>
                  <CardDescription>Active Influencers</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-3xl">500+</CardTitle>
                  <CardDescription>Brand Partners</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle className="text-3xl">₹2Cr+</CardTitle>
                  <CardDescription>Creator Earnings</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-yellow-600 mb-2" />
                  <CardTitle className="text-3xl">4.9★</CardTitle>
                  <CardDescription>Platform Rating</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-3xl">Join Our Journey</CardTitle>
                <CardDescription className="text-white/80">
                  Be part of the future of influencer marketing
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
