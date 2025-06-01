"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Plus,
  Eye,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Briefcase,
  Star,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardData {
  stats: {
    totalCampaigns: number
    activeCampaigns: number
    completedCampaigns: number
    draftCampaigns: number
    totalApplications: number
    pendingApplications: number
    acceptedApplications: number
    totalSpent: number
    thisMonthSpent: number
    currentBalance: number
    totalReach: number
    avgCampaignBudget: number
    successRate: number
  }
  recentCampaigns: any[]
  recentApplications: any[]
  recentTransactions: any[]
  recommendedInfluencers: any[]
  profile: {
    isComplete: boolean
    companyName: string
    industry: string
    website: string
  }
}

export default function BrandDashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/brand/dashboard")
      const data = await response.json()

      if (response.ok) {
        setDashboardData(data)
      } else {
        setError(data.error || "Failed to fetch dashboard data")
      }
    } catch (err) {
      setError("Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-gray-600" />
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Activity className="h-4 w-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "published":
        return "bg-green-100 text-green-700"
      case "in-progress":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!dashboardData) return null

  return (
    <div className="space-y-6">
      {/* Profile Completion Alert */}
      {!dashboardData.profile.isComplete && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700">
            Complete your brand profile to attract more influencers.{" "}
            <Link href="/dashboard/brand/profile" className="font-medium underline">
              Complete Profile
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="influencers">Influencers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.stats.totalSpent)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{formatCurrency(dashboardData.stats.thisMonthSpent)}</span> this
                  month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.activeCampaigns}</div>
                <p className="text-xs text-muted-foreground">{dashboardData.stats.draftCampaigns} drafts pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(dashboardData.stats.totalReach / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">Estimated audience reach</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.successRate}%</div>
                <p className="text-xs text-muted-foreground">Campaign completion rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Campaigns */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Campaigns</CardTitle>
                  <CardDescription>Your latest campaign activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentCampaigns.length === 0 ? (
                      <div className="text-center py-8">
                        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No campaigns yet</p>
                        <Link href="/dashboard/brand/campaigns/create">
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Campaign
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      dashboardData.recentCampaigns.map((campaign) => (
                        <div key={campaign._id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(campaign.status)}
                            <div>
                              <h3 className="font-medium">{campaign.title}</h3>
                              <p className="text-sm text-gray-600">
                                {campaign.targetPlatforms?.join(", ") || "Multiple platforms"}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getStatusColor(campaign.status)} variant="outline">
                                  {campaign.status}
                                </Badge>
                                <span className="text-xs text-gray-500">Created: {formatDate(campaign.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(campaign.budget)}</div>
                            <div className="text-sm text-gray-600">Budget</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {dashboardData.recentCampaigns.length > 0 && (
                    <Link href="/dashboard/brand/campaigns">
                      <Button className="w-full mt-4" variant="outline">
                        View All Campaigns
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Applications */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard/brand/campaigns/create">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Campaign
                    </Button>
                  </Link>
                  <Link href="/dashboard/brand/discover">
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Discover Influencers
                    </Button>
                  </Link>
                  <Link href="/dashboard/brand/applications">
                    <Button className="w-full justify-start" variant="outline">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Manage Applications
                    </Button>
                  </Link>
                  <Link href="/dashboard/brand/messages">
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                  </Link>
                  <Link href="/dashboard/brand/analytics">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest influencer applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.recentApplications.slice(0, 3).map((application) => (
                      <div key={application._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-semibold">
                              {application.influencerId?.name?.charAt(0) || "I"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{application.influencerId?.name}</p>
                            <p className="text-xs text-gray-500">{application.campaignId?.title}</p>
                          </div>
                        </div>
                        <Badge variant={application.status === "applied" ? "default" : "secondary"} className="text-xs">
                          {application.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Link href="/dashboard/brand/applications">
                    <Button className="w-full mt-4" variant="ghost" size="sm">
                      View All Applications <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Influencers</CardTitle>
                  <CardDescription>Top-rated influencers for your brand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.recommendedInfluencers.slice(0, 3).map((influencer) => {
                      const totalFollowers = influencer.socialMediaStats?.reduce(
                        (sum: number, stat: any) => sum + stat.followers,
                        0,
                      )
                      return (
                        <div key={influencer._id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-xs font-semibold">
                                {influencer.userId?.name?.charAt(0) || "I"}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{influencer.userId?.name}</p>
                              <p className="text-xs text-gray-500">{formatFollowers(totalFollowers)} followers</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{influencer.averageRating?.toFixed(1) || "0.0"}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Link href="/dashboard/brand/discover">
                    <Button className="w-full mt-4" variant="ghost" size="sm">
                      Discover More <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Campaign Success Rate</span>
                        <span>{dashboardData.stats.successRate}%</span>
                      </div>
                      <Progress value={dashboardData.stats.successRate} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Application Response Rate</span>
                        <span>
                          {dashboardData.stats.totalApplications > 0
                            ? Math.round(
                                (dashboardData.stats.acceptedApplications / dashboardData.stats.totalApplications) *
                                  100,
                              )
                            : 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          dashboardData.stats.totalApplications > 0
                            ? (dashboardData.stats.acceptedApplications / dashboardData.stats.totalApplications) * 100
                            : 0
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Profile Completion</span>
                        <span>{dashboardData.profile.isComplete ? "100%" : "70%"}</span>
                      </div>
                      <Progress value={dashboardData.profile.isComplete ? 100 : 70} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>My Campaigns</CardTitle>
              <CardDescription>Manage all your campaigns and track their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Manage your campaigns</p>
                <Link href="/dashboard/brand/campaigns">
                  <Button>
                    <Target className="h-4 w-4 mr-2" />
                    View All Campaigns
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="influencers">
          <Card>
            <CardHeader>
              <CardTitle>Discover Influencers</CardTitle>
              <CardDescription>Find and connect with influencers that match your brand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Find the perfect influencers for your campaigns</p>
                <Link href="/dashboard/brand/discover">
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Discover Influencers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Manage Applications</CardTitle>
              <CardDescription>Review and manage influencer applications for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Review applications from influencers</p>
                <Link href="/dashboard/brand/applications">
                  <Button>
                    <Briefcase className="h-4 w-4 mr-2" />
                    View Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>Detailed insights and performance metrics for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Advanced analytics coming soon!</p>
                <Button disabled>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Wallet & Payments</CardTitle>
              <CardDescription>Manage your payments and transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Manage your payments and billing</p>
                <Link href="/dashboard/brand/wallet">
                  <Button>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Manage Payments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
