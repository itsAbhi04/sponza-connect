"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Target,
  Users,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Plus,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Fashion Brand!</h1>
              <p className="text-gray-600">Here's your campaign performance overview</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Budget Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,25,000</div>
                <p className="text-xs text-green-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-gray-600">2 pending approvals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Influencers</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-600">8 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +0.8% from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Campaigns */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>Your ongoing influencer collaborations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Campaign 1 */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Summer Collection Launch</h3>
                          <Badge className="bg-green-100 text-green-700">In Progress</Badge>
                        </div>
                        <p className="text-sm text-gray-600">5 Influencers • Instagram Reels</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Budget: ₹75,000</span>
                          <span>Progress: 60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>

                    {/* Campaign 2 */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Tech Product Review</h3>
                          <Badge className="bg-yellow-100 text-yellow-700">Pending Review</Badge>
                        </div>
                        <p className="text-sm text-gray-600">3 Influencers • YouTube</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Budget: ₹50,000</span>
                          <span>Progress: 40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>

                    {/* Campaign 3 */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Fitness Challenge</h3>
                          <Badge className="bg-blue-100 text-blue-700">Planning</Badge>
                        </div>
                        <p className="text-sm text-gray-600">4 Influencers • Instagram Stories</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Budget: ₹30,000</span>
                          <span>Progress: 20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest influencer applications to review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Application 1 */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <Badge className="bg-purple-100 text-purple-700">New</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Fashion Influencer • 50K Followers</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Applied: 2 hours ago</span>
                          <span>Engagement: 4.8%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>

                    {/* Application 2 */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Mike Chen</h3>
                          <Badge className="bg-purple-100 text-purple-700">New</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Tech Influencer • 100K Followers</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Applied: 5 hours ago</span>
                          <span>Engagement: 5.2%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights & Quick Actions */}
            <div className="space-y-8">
              {/* AI Performance Insights */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <CardTitle>AI Insights</CardTitle>
                  </div>
                  <CardDescription>Campaign performance recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Campaign Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engagement Rate</span>
                          <span className="text-green-600">+15%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Top Performing Content</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Instagram Reels: 6.2% engagement</li>
                        <li>• YouTube Reviews: 5.8% engagement</li>
                        <li>• Instagram Stories: 4.5% engagement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recommended Actions</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Increase video content</li>
                        <li>• Focus on peak hours</li>
                        <li>• Engage with comments</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-4">
                      <div className="flex flex-col items-center gap-2">
                        <Target className="h-5 w-5" />
                        <span className="text-sm">Create Campaign</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span className="text-sm">Find Influencers</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4">
                      <div className="flex flex-col items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        <span className="text-sm">Messages</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto py-4">
                      <div className="flex flex-col items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        <span className="text-sm">Payments</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 