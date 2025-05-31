"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  DollarSign,
  Target,
  Calendar,
  Download,
  RefreshCw,
  Instagram,
  Youtube,
  Twitter,
  Globe,
} from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"

interface AnalyticsData {
  overview: {
    totalEarnings: number
    totalApplications: number
    completedCampaigns: number
    averageEarningsPerCampaign: number
    earningsGrowth: number
    profileViews: number
    totalFollowers: number
  }
  platformBreakdown: Array<{
    platform: string
    followers: number
    engagementRate: number
    posts: number
    reach: number
  }>
  topPerformingContent: Array<{
    contentId: string
    platform: string
    type: string
    engagement: number
    reach: number
    date: string
  }>
  engagementTrends: Array<{
    date: string
    engagement: number
    reach: number
    followers: number
  }>
  campaignPerformance: Array<{
    id: string
    title: string
    platform: string
    earnings: number
    status: string
    completedAt: string
  }>
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function InfluencerAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("monthly")
  const [dateRange, setDateRange] = useState("30d")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [period, dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/influencer/analytics?period=${period}&range=${dateRange}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`)
      }
      const data = await response.json()
      setAnalyticsData(data)
    } catch (error: any) {
      console.error("Failed to fetch analytics:", error)
      setError(error.message || "Failed to fetch analytics")
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  if (error) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <Button variant="outline" onClick={fetchAnalytics} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  return (
    <EnhancedInfluencerLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Track your performance and growth</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] sm:w-auto">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchAnalytics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analyticsData?.overview.totalEarnings || 0)}</div>
              <div className="flex items-center text-green-100 text-sm">
                {analyticsData?.overview.earningsGrowth && analyticsData.overview.earningsGrowth > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(analyticsData?.overview.earningsGrowth || 0).toFixed(1)}% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData?.overview.totalFollowers || 0)}</div>
              <div className="text-blue-100 text-sm">Across all platforms</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData?.overview.profileViews || 0)}</div>
              <div className="text-purple-100 text-sm">This period</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Campaigns</CardTitle>
              <Target className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData?.overview.completedCampaigns || 0}</div>
              <div className="text-orange-100 text-sm">Completed successfully</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            <TabsTrigger value="overview" className="text-sm sm:text-base">
              Overview
            </TabsTrigger>
            <TabsTrigger value="platforms" className="text-sm sm:text-base">
              Platforms
            </TabsTrigger>
            <TabsTrigger value="content" className="text-sm sm:text-base">
              Content
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="text-sm sm:text-base">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="growth" className="text-sm sm:text-base">
              Growth
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Trend</CardTitle>
                  <CardDescription>Your earnings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData?.engagementTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="engagement" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Followers across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData?.platformBreakdown || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ platform, followers }) => `${platform}: ${formatNumber(followers)}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="followers"
                      >
                        {analyticsData?.platformBreakdown?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(analyticsData?.overview.averageEarningsPerCampaign || 0)}
                    </div>
                    <div className="text-sm text-green-700">Avg. Earnings per Campaign</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {(
                        ((analyticsData?.overview.completedCampaigns || 0) /
                          Math.max(analyticsData?.overview.totalApplications || 1, 1)) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-blue-700">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {analyticsData?.platformBreakdown?.reduce((avg, p) => avg + p.engagementRate, 0) /
                        Math.max(analyticsData?.platformBreakdown?.length || 1, 1) || 0}
                      %
                    </div>
                    <div className="text-sm text-purple-700">Avg. Engagement Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsData?.platformBreakdown?.map((platform, index) => (
                <Card key={platform.platform}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcon(platform.platform)}
                        <CardTitle>{platform.platform}</CardTitle>
                      </div>
                      <Badge variant="outline">{formatNumber(platform.followers)} followers</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</span>
                        <span className="font-medium">{platform.engagementRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Posts</span>
                        <span className="font-medium">{platform.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Reach</span>
                        <span className="font-medium">{formatNumber(platform.reach)}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min(platform.engagementRate * 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Your best performing posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.topPerformingContent?.map((content, index) => (
                    <div
                      key={content.contentId}
                      className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-200 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            {getPlatformIcon(content.platform)}
                            <span className="font-medium">
                              {content.platform} {content.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(content.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatNumber(content.engagement)} engagements</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatNumber(content.reach)} reach
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Your recent campaign results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.campaignPerformance?.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                    >
                      <div>
                        <h3 className="font-medium">{campaign.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{campaign.platform}</Badge>
                          <Badge
                            className={
                              campaign.status === "completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{formatCurrency(campaign.earnings)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(campaign.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Track your growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analyticsData?.engagementTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="followers" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="reach" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedInfluencerLayout>
  )
}
