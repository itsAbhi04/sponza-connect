"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Shield,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  Activity,
  Target,
  Briefcase,
  Award,
} from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import Link from "next/link"

interface DashboardData {
  stats: {
    users: {
      total: number
      influencers: number
      brands: number
      newThisMonth: number
      growth: number
    }
    campaigns: {
      total: number
      active: number
      completed: number
      pending: number
    }
    applications: {
      total: number
      pending: number
      accepted: number
      successRate: number
    }
    revenue: {
      total: number
      thisMonth: number
      growth: number
    }
  }
  recentActivity: {
    users: any[]
    campaigns: any[]
    applications: any[]
  }
  insights: {
    topInfluencers: any[]
    topBrands: any[]
  }
}

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("auth-token")
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading || !dashboardData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and AI-powered insights</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/dashboard/admin/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Link href="/dashboard/admin/analytics">
              <Button>
                <Activity className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <Badge
                  className={
                    dashboardData.stats.users.growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }
                >
                  {dashboardData.stats.users.growth >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(dashboardData.stats.users.growth).toFixed(1)}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{dashboardData.stats.users.total.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Users</p>
              <div className="mt-2 text-xs text-gray-500">
                {dashboardData.stats.users.influencers} influencers, {dashboardData.stats.users.brands} brands
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{dashboardData.stats.campaigns.total.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <div className="mt-2 text-xs text-gray-500">
                {dashboardData.stats.campaigns.active} active, {dashboardData.stats.campaigns.pending} pending
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <Badge
                  className={
                    dashboardData.stats.revenue.growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }
                >
                  {dashboardData.stats.revenue.growth >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(dashboardData.stats.revenue.growth).toFixed(1)}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{formatCurrency(dashboardData.stats.revenue.total)}</h3>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <div className="mt-2 text-xs text-gray-500">
                {formatCurrency(dashboardData.stats.revenue.thisMonth)} this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  {dashboardData.stats.applications.successRate.toFixed(1)}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{dashboardData.stats.applications.total.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Applications</p>
              <div className="mt-2 text-xs text-gray-500">
                {dashboardData.stats.applications.pending} pending review
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/dashboard/admin/users">
                    <Button className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/campaigns">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Review Campaigns
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/ai-moderation">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      AI Moderation
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/transactions">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Transactions
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Engagement</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Campaign Success Rate</span>
                      <span>{dashboardData.stats.applications.successRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={dashboardData.stats.applications.successRate} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Platform Uptime</span>
                      <span>99.9%</span>
                    </div>
                    <Progress value={99.9} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Satisfaction</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Leading influencers and brands</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="influencers" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="influencers">Influencers</TabsTrigger>
                      <TabsTrigger value="brands">Brands</TabsTrigger>
                    </TabsList>
                    <TabsContent value="influencers" className="space-y-3 mt-4">
                      {dashboardData.insights.topInfluencers.map((influencer, index) => (
                        <div key={influencer._id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
                            </div>
                            <span className="text-sm font-medium">{influencer.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3 text-yellow-400" />
                            <span className="text-xs text-gray-500">{influencer.completedCampaigns}</span>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="brands" className="space-y-3 mt-4">
                      {dashboardData.insights.topBrands.map((brand, index) => (
                        <div key={brand._id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                            </div>
                            <span className="text-sm font-medium">{brand.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{formatCurrency(brand.totalSpent)}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>Latest users who joined the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.users.map((user) => (
                      <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              user.role === "influencer" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            <span
                              className={`text-xs font-semibold ${
                                user.role === "influencer" ? "text-green-600" : "text-blue-600"
                              }`}
                            >
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={user.role === "influencer" ? "default" : "secondary"}>{user.role}</Badge>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Campaigns */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Campaigns</CardTitle>
                  <CardDescription>Latest campaigns created on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.campaigns.map((campaign) => (
                      <div key={campaign._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              campaign.status === "published"
                                ? "bg-green-100"
                                : campaign.status === "pending"
                                  ? "bg-yellow-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            <Target
                              className={`h-4 w-4 ${
                                campaign.status === "published"
                                  ? "text-green-600"
                                  : campaign.status === "pending"
                                    ? "text-yellow-600"
                                    : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{campaign.title}</p>
                            <p className="text-xs text-gray-500">By {campaign.brandId?.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatCurrency(campaign.budget)}</p>
                          <Badge variant={campaign.status === "published" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    AI Platform Insights
                  </CardTitle>
                  <CardDescription>AI-generated platform insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">Growth Opportunity</h4>
                        <p className="text-sm text-gray-600">
                          Fashion and beauty categories showing 40% higher engagement rates. Consider promoting these
                          niches.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">User Behavior Trend</h4>
                        <p className="text-sm text-gray-600">
                          Peak activity hours: 6-8 PM. Campaign launches during this time see 25% better performance.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">Platform Health</h4>
                        <p className="text-sm text-gray-600">
                          User satisfaction scores increased by 15% this month. Quality control measures are working
                          effectively.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Important notifications requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800 mb-1">Payment Processing Delay</h4>
                        <p className="text-sm text-red-700">
                          Some payments are experiencing delays. 23 transactions pending review.
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          Review Transactions
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-800 mb-1">Pending Verifications</h4>
                        <p className="text-sm text-orange-700">
                          15 influencer profiles awaiting verification. Average wait time: 2.3 days.
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          Review Profiles
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-start gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Analytics Update</h4>
                        <p className="text-sm text-blue-700">
                          Monthly analytics report is ready for review. Performance metrics updated.
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key platform performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {dashboardData.stats.applications.successRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2.3</div>
                      <div className="text-sm text-gray-600">Avg Response Time (days)</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">87%</div>
                      <div className="text-sm text-gray-600">User Retention</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4.6</div>
                      <div className="text-sm text-gray-600">Platform Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue sources and distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Platform Fees</span>
                      <span className="font-semibold">{formatCurrency(dashboardData.stats.revenue.total * 0.7)}</span>
                    </div>
                    <Progress value={70} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium Subscriptions</span>
                      <span className="font-semibold">{formatCurrency(dashboardData.stats.revenue.total * 0.2)}</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Additional Services</span>
                      <span className="font-semibold">{formatCurrency(dashboardData.stats.revenue.total * 0.1)}</span>
                    </div>
                    <Progress value={10} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
