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
  Eye,
  MessageSquare,
  ArrowUpRight,
  Settings,
  Target,
  Award,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Briefcase,
  Lightbulb,
  BarChart3,
  Wallet,
  TrendingDown,
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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
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
    <div className="space-y-6">
      {/* Onboarding Progress */}
      {onboardingData && !onboardingData.isComplete && (
        <Alert className="border-blue-200 bg-blue-50">
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
        <Alert className="border-orange-200 bg-orange-50">
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
        <Alert className="border-green-200 bg-green-50">
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
                          <Badge variant="secondary">{campaign.matchScore}% match</Badge>
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

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
              <CardDescription>Earn rewards by inviting friends to Sponza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Share your referral code and earn rewards</p>
                <Link href="/dashboard/influencer/referrals">
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    View Referrals
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Get personalized insights to improve your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Unlock AI-powered insights to boost your influence</p>
                <Link href="/dashboard/influencer/insights">
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    View Insights
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed performance insights and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Track your performance with advanced analytics</p>
                <Link href="/dashboard/influencer/analytics">
                  <Button>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
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
