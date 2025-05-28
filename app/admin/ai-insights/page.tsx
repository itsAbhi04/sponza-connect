"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MessageSquare,
  Heart,
  Share2,
} from "lucide-react"

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
              <p className="text-gray-600">AI-generated performance insights and recommendations</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8%</div>
                <p className="text-xs text-gray-500">+0.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-gray-500">+0.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Audience Growth</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-gray-500">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Content Quality</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7/10</div>
                <p className="text-xs text-gray-500">+0.3 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="influencers">Influencers</TabsTrigger>
              <TabsTrigger value="brands">Brands</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Insights</CardTitle>
                  <CardDescription>AI-generated insights for platform optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Top Performing Categories</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Fashion</span>
                            <span className="text-sm font-medium">+25%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-green-600 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Technology</span>
                            <span className="text-sm font-medium">+18%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-green-600 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Engagement Trends</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Comments</span>
                            <span className="text-sm font-medium">+15%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Shares</span>
                            <span className="text-sm font-medium">+22%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-2 bg-blue-600 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-4">AI Recommendations</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <p className="font-medium">Optimize Post Timing</p>
                            <p className="text-sm text-gray-600">
                              AI analysis shows that posts published between 6-8 PM have 25% higher engagement
                              rates.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <p className="font-medium">Content Mix Strategy</p>
                            <p className="text-sm text-gray-600">
                              Balance your content with 40% educational, 30% entertaining, and 30% promotional
                              posts for optimal engagement.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <p className="font-medium">Audience Targeting</p>
                            <p className="text-sm text-gray-600">
                              Focus on the 25-34 age group, which shows 35% higher conversion rates for your
                              content.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="influencers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Influencer Insights</CardTitle>
                  <CardDescription>AI-generated insights for influencer optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium">Comment Quality</h4>
                        </div>
                        <div className="text-2xl font-bold">8.5/10</div>
                        <p className="text-sm text-gray-600">Based on 1,234 comments</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-red-600" />
                          <h4 className="font-medium">Engagement Rate</h4>
                        </div>
                        <div className="text-2xl font-bold">5.2%</div>
                        <p className="text-sm text-gray-600">Above platform average</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Share2 className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium">Share Rate</h4>
                        </div>
                        <div className="text-2xl font-bold">3.8%</div>
                        <p className="text-sm text-gray-600">+0.5% from last month</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-4">Growth Opportunities</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium">Content Diversification</p>
                            <p className="text-sm text-gray-600">
                              Expand into video content, which shows 40% higher engagement in your niche.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium">Audience Engagement</p>
                            <p className="text-sm text-gray-600">
                              Increase response rate to comments by 50% to boost community engagement.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium">Brand Collaborations</p>
                            <p className="text-sm text-gray-600">
                              Focus on tech and lifestyle brands, which align best with your audience.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brands" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Insights</CardTitle>
                  <CardDescription>AI-generated insights for brand optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium">Campaign Success</h4>
                        </div>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-sm text-gray-600">Above industry average</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <h4 className="font-medium">Audience Match</h4>
                        </div>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-sm text-gray-600">With influencer audience</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium">ROI</h4>
                        </div>
                        <div className="text-2xl font-bold">3.5x</div>
                        <p className="text-sm text-gray-600">Average return on investment</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-4">Optimization Opportunities</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium">Campaign Timing</p>
                            <p className="text-sm text-gray-600">
                              Launch campaigns during Q2 for 30% higher engagement rates.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium">Influencer Selection</p>
                            <p className="text-sm text-gray-600">
                              Focus on micro-influencers (10K-50K followers) for better engagement rates.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <ArrowUpRight className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <p className="font-medium">Content Strategy</p>
                            <p className="text-sm text-gray-600">
                              Increase video content by 40% to improve campaign performance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 