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
  Star,
  Eye,
  MessageSquare,
  ArrowUpRight,
  Bell,
  Settings,
  LogOut,
  Target,
  Award,
  Activity,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardData {
  stats: {
    totalApplications: number
    acceptedApplications: number
    completedApplications: number
    pendingApplications: number
    totalEarnings: number
    thisMonthEarnings: number
    currentBalance: number
    totalFollowers: number
    avgEngagement: number
    profileRating: number
    totalReviews: number
  }
  recentApplications: any[]
  recentTransactions: any[]
  availableCampaigns: any[]
  profile: {
    isComplete: boolean
    availabilityStatus: string
    niche: string[]
    socialMediaStats: any[]
  }
}

export default function InfluencerDashboard() {
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
      const response = await fetch("/api/influencer/dashboard")
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

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
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
      case "applied":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "completed":
        return <Award className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "completed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Sponza
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Influencer Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your performance overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant={dashboardData.profile.availabilityStatus === "available" ? "default" : "secondary"}
                className="capitalize"
              >
                {dashboardData.profile.availabilityStatus}
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Profile Completion Alert */}
        {!dashboardData.profile.isComplete && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-700">
              Complete your profile to get better campaign recommendations.{" "}
              <Link href="/influencer/profile" className="font-medium underline">
                Complete Profile
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(dashboardData.stats.totalEarnings)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{formatCurrency(dashboardData.stats.thisMonthEarnings)}</span>{" "}
                    this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.acceptedApplications}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.stats.pendingApplications} pending review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(dashboardData.stats.totalFollowers / 1000).toFixed(1)}K</div>
                  <p className="text-xs text-muted-foreground">{dashboardData.stats.avgEngagement}% avg engagement</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.stats.profileRating.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">Based on {dashboardData.stats.totalReviews} reviews</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Applications */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your latest campaign applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentApplications.length === 0 ? (
                        <div className="text-center py-8">
                          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">No applications yet</p>
                          <Link href="/influencer/campaigns">
                            <Button>
                              <Eye className="h-4 w-4 mr-2" />
                              Browse Campaigns
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        dashboardData.recentApplications.map((application) => (
                          <div
                            key={application._id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              {getStatusIcon(application.status)}
                              <div>
                                <h3 className="font-medium">{application.campaignId?.title}</h3>
                                <p className="text-sm text-gray-600">By {application.campaignId?.brandId?.name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getStatusColor(application.status)} variant="outline">
                                    {application.status}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    Applied: {formatDate(application.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">{formatCurrency(application.pricing)}</div>
                              <div className="text-sm text-gray-600">Proposed</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {dashboardData.recentApplications.length > 0 && (
                      <Link href="/influencer/applications">
                        <Button className="w-full mt-4" variant="outline">
                          View All Applications
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Available Campaigns */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/influencer/campaigns">
                      <Button className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        Browse Campaigns
                      </Button>
                    </Link>
                    <Link href="/influencer/profile">
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/influencer/wallet">
                      <Button className="w-full justify-start" variant="outline">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Manage Wallet
                      </Button>
                    </Link>
                    <Link href="/influencer/messages">
                      <Button className="w-full justify-start" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messages
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Campaigns</CardTitle>
                    <CardDescription>Campaigns matching your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.availableCampaigns.slice(0, 3).map((campaign) => (
                        <div key={campaign._id} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm line-clamp-1">{campaign.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">By {campaign.brandId?.name}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-semibold text-green-600">
                              {formatCurrency(campaign.budget)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {campaign.targetPlatforms?.[0]}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href="/influencer/campaigns">
                      <Button className="w-full mt-4" variant="ghost" size="sm">
                        View All Campaigns <ArrowUpRight className="h-3 w-3 ml-1" />
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
                          <span>Application Success Rate</span>
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
                          <span>{dashboardData.profile.isComplete ? "100%" : "60%"}</span>
                        </div>
                        <Progress value={dashboardData.profile.isComplete ? 100 : 60} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg. Engagement Rate</span>
                          <span>{dashboardData.stats.avgEngagement}%</span>
                        </div>
                        <Progress value={Math.min(dashboardData.stats.avgEngagement * 10, 100)} />
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
                <CardTitle>Available Campaigns</CardTitle>
                <CardDescription>Discover campaigns that match your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Browse and apply to campaigns</p>
                  <Link href="/influencer/campaigns">
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      Explore Campaigns
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track your campaign applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Manage your campaign applications</p>
                  <Link href="/influencer/applications">
                    <Button>
                      <Activity className="h-4 w-4 mr-2" />
                      View Applications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings & Wallet</CardTitle>
                <CardDescription>Manage your earnings and withdrawal requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Track your earnings and manage withdrawals</p>
                  <Link href="/influencer/wallet">
                    <Button>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Manage Wallet
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed insights into your performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Advanced analytics coming soon!</p>
                  <Button disabled>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
