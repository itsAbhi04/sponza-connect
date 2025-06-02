"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, Zap, Target, BarChart, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function AIOnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
              AI Features
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Meet Your AI Assistant
            </h1>
            <p className="text-xl text-gray-600">
              Discover how our AI can help you create better campaigns and connect with the right influencers.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Onboarding Progress</span>
              <span className="text-sm font-medium text-purple-600">Step 2 of 3</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="h-6 w-6 text-purple-600" />
                  <CardTitle>Smart Matching</CardTitle>
                </div>
                <CardDescription>
                  Our AI analyzes thousands of profiles to find the perfect influencers for your brand.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span>Audience analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span>Engagement prediction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span>Brand fit scoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <CardTitle>Campaign Optimization</CardTitle>
                </div>
                <CardDescription>
                  AI-powered insights to help you create and optimize successful campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Content recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Timing optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Budget allocation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart className="h-6 w-6 text-green-600" />
                  <CardTitle>Performance Analytics</CardTitle>
                </div>
                <CardDescription>
                  Get detailed insights and predictions about your campaign performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span>ROI forecasting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span>Trend analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span>Competitive insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                  <CardTitle>AI Chat Assistant</CardTitle>
                </div>
                <CardDescription>
                  Get instant help and answers to your questions 24/7.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span>Quick answers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span>Campaign guidance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span>Best practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Try AI Assistant */}
          <Card className="mb-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader>
              <CardTitle>Try Your AI Assistant</CardTitle>
              <CardDescription className="text-white/80">
                Ask any question about influencer marketing or campaign creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => {
                    console.log("clicked");
                    
                    // Open AI chat interface
                  }}
                >
                  Start Chat
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  View Examples
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link href="/onboarding/profile">
              <Button variant="outline">Previous</Button>
            </Link>
            <Link href="/onboarding/preferences">
              <Button>Next</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
