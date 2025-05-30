"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Briefcase,
  Share2,
  Copy,
  Lightbulb,
  Zap,
  BarChart3,
  Calendar,
  Wallet,
  TrendingDown,
  ExternalLink,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DashboardData {
  stats: {
    totalEarnings: number
    thisMonthEarnings: number
    earningsChange: number
    pendingEarnings: number
    currentBalance: number
    activeCampaigns: number
    totalFollowers: number
    avgEngagement: number
    profileRating: number
    totalReviews: number
  }
  applications: {
    total: number
    pending: number
    accepted: number
    rejected: number
    completed: number
    successRate: number
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

interface PerformanceData {
  snapshot: any
  applications: any
  socialMedia: any[]
  recentTransactions: any[]
  activeCampaignsList: any[]
}

interface RecommendationsData {
  recommendations: any[]
  insights: any
  profileOptimization: string[]
}

interface ReferralData {
  referralCode: string
  totalReferrals: number
  thisMonthReferrals: number
  totalEarnings: number
  pendingEarnings: number
  recentReferrals: any[]
  tips: string[]
}

interface InsightsData {
  engagementTips: string[]
  profileOptimization: any[]
  campaignSuccessMetrics: any
  trendAlerts: string[]
  performanceTrends: any
  bestPostingTimes: any
  contentRecommendations: string[]
}

interface OnboardingData {
  progressPercentage: number
  completedItems: number
  totalItems: number
  checklist: any[]
  tips: string[]
  isComplete: boolean
  nextSteps: any[]
}

export default function InfluencerDashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [recommendationsData, setRecommendationsData] = useState<RecommendationsData | null>(null)
  const [referralData, setReferralData] = useState<ReferralData | null>(null)
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [
        dashboardResponse,
        performanceResponse,
        recommendationsResponse,
        referralResponse,
        insightsResponse,
        onboardingResponse,
      ] = await Promise.all([
        fetch("/api/influencer/dashboard"),
        fetch("/api/influencer/performance"),
        fetch("/api/influencer/recommendations?limit=5"),
        fetch("/api/influencer/referrals"),
        fetch("/api/influencer/insights"),
        fetch("/api/influencer/onboarding"),
      ])

      if (dashboardResponse.ok) {
        setDashboardData(await dashboardResponse.json())
      }
      if (performanceResponse.ok) {
        setPerformanceData(await performanceResponse.json())
      }
      if (recommendationsResponse.ok) {
        setRecommendationsData(await recommendationsResponse.json())
      }
      if (referralResponse.ok) {
        setReferralData(await referralResponse.json())
      }
      if (insightsResponse.ok) {
        setInsightsData(await insightsResponse.json())
      }
      if (onboardingResponse.ok) {
        setOnboardingData(await onboardingResponse.json())
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

  const copyReferralCode = () => {
    if (referralData?.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode)
      toast.success("Referral code copied to clipboard!")
    }
  }

  const shareReferralCode = () => {
    if (referralData?.referralCode) {
      const shareText = `Join Sponza with my referral code: ${referralData.referralCode}`
      if (navigator.share) {
        navigator.share({
          title: "Join Sponza",
          text: shareText,
          url: `https://sponza.com/register?ref=${referralData.referralCode}`,
        })
      } else {
        navigator.clipboard.writeText(shareText)
        toast.success("Referral message copied to clipboard!")
      }
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
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
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
              {dashboardData?.profile.availabilityStatus && (
                <Badge
                  variant={dashboardData.profile.availabilityStatus === "available" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {dashboardData.profile.availabilityStatus}
                </Badge>
              )}
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={fetchAllData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
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
        {/* Onboarding Progress */}
        {onboardingData && !onboardingData.isComplete && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Complete your profile setup ({onboardingData.progressPercentage}%)</strong>
                  <p className="text-sm mt-1">{onboardingData.tips[0]}</p>
                </div>
                <Link href="/dashboard/influencer/profile">
                  <Button size="sm" className="ml-4">
                    Continue Setup
                  </Button>
                </Link>
              </div>
              <Progress value={onboardingData.progressPercentage} className="mt-2" />
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Completion Alert */}
        {dashboardData && !dashboardData.profile.isComplete && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-700">
              Complete your profile to get better campaign recommendations.{" "}
              <Link href="/dashboard/influencer/profile" className="font-medium underline">
                Complete Profile
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Trend Alerts */}
        {insightsData?.trendAlerts && insightsData.trendAlerts.length > 0 && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              <strong>Trending Now:</strong> {insightsData.trendAlerts[0]}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(dashboardData?.stats.totalEarnings || 0)}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    {dashboardData?.stats.earningsChange && dashboardData.stats.earningsChange > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span
                      className={
                        dashboardData?.stats.earningsChange && dashboardData.stats.earningsChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {dashboardData?.stats.earningsChange?.toFixed(1) || 0}%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.stats.activeCampaigns || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.applications?.pending || 0} pending review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {((dashboardData?.stats.totalFollowers || 0) / 1000).toFixed(1)}K
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.stats.avgEngagement || 0}% avg engagement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.applications?.successRate || 0}%</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.applications?.accepted || 0} of {dashboardData?.applications?.total || 0} applications
                  </p>
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
                      {!dashboardData?.recentApplications || dashboardData.recentApplications.length === 0 ? (
                        <div className="text-center py-8">
                          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">No applications yet</p>
                          <Link href="/dashboard/influencer/campaigns">
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
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
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

                    {dashboardData?.recentApplications && dashboardData.recentApplications.length > 0 && (
                      <Link href="/dashboard/influencer/applications">
                        <Button className="w-full mt-4" variant="outline">
                          View All Applications
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Recommendations */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/dashboard/influencer/campaigns">
                      <Button className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        Browse Campaigns
                      </Button>
                    </Link>
                    <Link href="/dashboard/influencer/profile">
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/influencer/wallet">
                      <Button className="w-full justify-start" variant="outline">
                        <Wallet className="h-4 w-4 mr-2" />
                        Manage Wallet
                      </Button>
                    </Link>
                    <Link href="/dashboard/influencer/messages">
                      <Button className="w-full justify-start" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messages
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>Campaigns matching your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recommendationsData?.recommendations?.slice(0, 3).map((campaign) => (
                        <div key={campaign._id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm line-clamp-1">{campaign.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {campaign.matchScore}% match
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">By {campaign.brandId?.name}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-green-600">
                              {formatCurrency(campaign.budget)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {campaign.targetPlatforms?.[0]}
                            </Badge>
                          </div>
                          {campaign.matchReasons && campaign.matchReasons.length > 0 && (
                            <p className="text-xs text-blue-600 mt-1">{campaign.matchReasons[0]}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <Link href="/dashboard/influencer/campaigns">
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
                          <span>{dashboardData?.applications?.successRate || 0}%</span>
                        </div>
                        <Progress value={dashboardData?.applications?.successRate || 0} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Profile Completion</span>
                          <span>{onboardingData?.progressPercentage || 0}%</span>
                        </div>
                        <Progress value={onboardingData?.progressPercentage || 0} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg. Engagement Rate</span>
                          <span>{dashboardData?.stats.avgEngagement || 0}%</span>
                        </div>
                        <Progress value={Math.min((dashboardData?.stats.avgEngagement || 0) * 10, 100)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Detailed Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(performanceData?.snapshot.thisMonthEarnings || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span
                      className={
                        performanceData?.snapshot.earningsChange && performanceData.snapshot.earningsChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {performanceData?.snapshot.earningsChange > 0 ? "+" : ""}
                      {performanceData?.snapshot.earningsChange?.toFixed(1) || 0}%
                    </span>{" "}
                    vs last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(performanceData?.snapshot.pendingEarnings || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Awaiting campaign completion</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(performanceData?.snapshot.currentBalance || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Available for withdrawal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {performanceData?.snapshot.profileRating?.toFixed(1) || "0.0"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {performanceData?.snapshot.totalReviews || 0} reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Social Media Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Performance</CardTitle>
                <CardDescription>Your platform statistics and engagement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {performanceData?.socialMedia?.map((platform) => (
                    <div key={platform.platform} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{platform.platform}</h3>
                        <Badge variant="outline">@{platform.username}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Followers:</span>
                          <span className="font-medium">{platform.followers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Engagement:</span>
                          <span className="font-medium">{platform.engagementRate}%</span>
                        </div>
                        <Progress value={Math.min(platform.engagementRate * 10, 100)} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest earnings and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData?.recentTransactions?.map((transaction) => (
                    <div key={transaction._id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            transaction.status === "completed"
                              ? "bg-green-500"
                              : transaction.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "campaign_payment" ? "text-green-600" : "text-blue-600"
                          }`}
                        >
                          {transaction.type === "withdrawal" ? "-" : "+"}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Recommendations</CardTitle>
                <CardDescription>AI-powered campaigns matching your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendationsData?.recommendations?.map((campaign) => (
                    <div key={campaign._id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{campaign.title}</h3>
                            <Badge variant="secondary">{campaign.matchScore}% match</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">By {campaign.brandId?.name}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{campaign.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-bold text-green-600">{formatCurrency(campaign.budget)}</p>
                          <p className="text-xs text-gray-500">Budget</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        {campaign.targetPlatforms?.map((platform: string) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>

                      {campaign.matchReasons && campaign.matchReasons.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-blue-700 mb-1">Why this matches you:</p>
                          <ul className="text-xs text-blue-600 space-y-1">
                            {campaign.matchReasons.map((reason: string, index: number) => (
                              <li key={index}>• {reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">Deadline: {formatDate(campaign.timeline.endDate)}</div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {recommendationsData?.insights && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Market Insights</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Total Campaigns:</span>
                        <span className="font-medium ml-2">{recommendationsData.insights.totalCampaigns}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">High Match:</span>
                        <span className="font-medium ml-2">{recommendationsData.insights.highMatchCampaigns}</span>
                      </div>
                      <div>
                        <span className="text-blue-700">Avg Budget:</span>
                        <span className="font-medium ml-2">
                          {formatCurrency(recommendationsData.insights.avgBudget)}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-700">Trending:</span>
                        <span className="font-medium ml-2">{recommendationsData.insights.trendingPlatforms?.[0]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Track your income and manage withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">
                          {formatCurrency(performanceData?.snapshot.totalEarnings || 0)}
                        </div>
                        <p className="text-sm text-green-600">Total Earnings</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-700">
                          {formatCurrency(performanceData?.snapshot.pendingEarnings || 0)}
                        </div>
                        <p className="text-sm text-yellow-600">Pending</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">
                          {formatCurrency(performanceData?.snapshot.currentBalance || 0)}
                        </div>
                        <p className="text-sm text-blue-600">Available</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Recent Transactions</h4>
                      {performanceData?.recentTransactions?.slice(0, 5).map((transaction) => (
                        <div key={transaction._id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                transaction.type === "campaign_payment" ? "text-green-600" : "text-blue-600"
                              }`}
                            >
                              {formatCurrency(transaction.amount)}
                            </p>
                            <Badge
                              variant={transaction.status === "completed" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/dashboard/influencer/wallet">
                      <Button className="w-full">
                        <Wallet className="h-4 w-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </CardContent>
                </Card>

                {insightsData?.performanceTrends && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Earnings Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Trend:</span>
                          <Badge
                            variant={
                              insightsData.performanceTrends.trend === "increasing"
                                ? "default"
                                : insightsData.performanceTrends.trend === "decreasing"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {insightsData.performanceTrends.trend}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Growth:</span>
                          <span
                            className={insightsData.performanceTrends.growth > 0 ? "text-green-600" : "text-red-600"}
                          >
                            {insightsData.performanceTrends.growth > 0 ? "+" : ""}
                            {insightsData.performanceTrends.growth?.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="referrals">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Program</CardTitle>
                    <CardDescription>Earn rewards by inviting friends to Sponza</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">{referralData?.totalReferrals || 0}</div>
                        <p className="text-sm text-purple-600">Total Referrals</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">
                          {formatCurrency(referralData?.totalEarnings || 0)}
                        </div>
                        <p className="text-sm text-green-600">Total Earned</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{referralData?.thisMonthReferrals || 0}</div>
                        <p className="text-sm text-blue-600">This Month</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Your Referral Code</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={copyReferralCode}>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button size="sm" variant="outline" onClick={shareReferralCode}>
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                        <div className="text-2xl font-mono font-bold text-center p-3 bg-white rounded border">
                          {referralData?.referralCode || "Loading..."}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Recent Referrals</h4>
                        <div className="space-y-2">
                          {referralData?.recentReferrals?.slice(0, 5).map((referral) => (
                            <div key={referral._id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{referral.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{referral.name}</p>
                                  <p className="text-xs text-gray-500">{formatDate(referral.createdAt)}</p>
                                </div>
                              </div>
                              <Badge variant="default" className="text-xs">
                                Active
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {referralData?.tips?.map((tip, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Share Your Code</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on Instagram
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on Twitter
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              {/* AI Insights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Engagement Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {insightsData?.engagementTips?.map((tip, index) => (
                        <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      Profile Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {insightsData?.profileOptimization?.map((optimization, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{optimization.suggestion}</span>
                            <Badge
                              variant={
                                optimization.priority === "high"
                                  ? "destructive"
                                  : optimization.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {optimization.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-green-600">{optimization.impact}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Best Posting Times */}
              {insightsData?.bestPostingTimes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-500" />
                      Best Posting Times
                    </CardTitle>
                    <CardDescription>Optimal times to post on each platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(insightsData.bestPostingTimes).map(([platform, times]) => (
                        <div key={platform} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{platform}</h4>
                          <div className="space-y-1">
                            {(times as string[]).map((time, index) => (
                              <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {time}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Content Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-purple-500" />
                    Content Recommendations
                  </CardTitle>
                  <CardDescription>AI-powered content ideas for better engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {insightsData?.contentRecommendations?.map((recommendation, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-800">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Success Metrics */}
              {insightsData?.campaignSuccessMetrics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-indigo-500" />
                      Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-700">
                          {insightsData.campaignSuccessMetrics.successRate}%
                        </div>
                        <p className="text-sm text-indigo-600">Success Rate</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">
                          {insightsData.campaignSuccessMetrics.completionRate}%
                        </div>
                        <p className="text-sm text-green-600">Completion Rate</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-700">
                          {formatCurrency(insightsData.campaignSuccessMetrics.avgCampaignBudget)}
                        </div>
                        <p className="text-sm text-yellow-600">Avg Budget</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">
                          {insightsData.campaignSuccessMetrics.totalReach?.toLocaleString() || 0}
                        </div>
                        <p className="text-sm text-blue-600">Total Reach</p>
                      </div>
                    </div>

                    {insightsData.campaignSuccessMetrics.insights && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Key Insights</h4>
                        {insightsData.campaignSuccessMetrics.insights.map((insight: string, index: number) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{insight}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Detailed performance insights and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-gray-500 mb-6">
                    Get detailed insights into your performance, audience demographics, and earning trends.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 max-w-md mx-auto">
                    <p>• Detailed audience analytics</p>
                    <p>• Performance comparison with similar influencers</p>
                    <p>• Predictive earnings forecasts</p>
                    <p>• Campaign ROI analysis</p>
                  </div>
                  <Button className="mt-6" disabled>
                    <Bell className="h-4 w-4 mr-2" />
                    Notify Me When Available
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
