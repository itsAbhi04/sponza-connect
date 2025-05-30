"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  RefreshCw,
  ArrowUp,
  Eye,
  Heart,
  Share2,
  MessageSquare,
} from "lucide-react"
import { EnhancedBrandLayout } from "@/components/layouts/enhanced-brand-layout"

interface AnalyticsData {
  overview: {
    totalSpent: number
    totalReach: number
    avgEngagement: number
    campaignCount: number
    roi: number
    conversionRate: number
  }
  campaignPerformance: any[]
  audienceInsights: any
  platformMetrics: any[]
  timeSeriesData: any[]
  topInfluencers: any[]
}

export default function BrandAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("engagement")

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/brand/analytics?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
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
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  if (loading) {
    return (
      <EnhancedBrandLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </EnhancedBrandLayout>
    )
  }

  return (
    <EnhancedBrandLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign Analytics</h1>
            <p className="text-gray-600 mt-1">Track your campaign performance and ROI</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchAnalyticsData}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analyticsData?.overview.totalSpent || 0)}</div>
              <div className="flex items-center text-blue-100 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Reach</CardTitle>
              <Users className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData?.overview.totalReach || 0)}</div>
              <div className="flex items-center text-green-100 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                +25% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Avg Engagement</CardTitle>
              <Heart className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData?.overview.avgEngagement?.toFixed(1) || 0}%</div>
              <div className="flex items-center text-purple-100 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                +5% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData?.overview.roi?.toFixed(1) || 0}x</div>
              <div className="flex items-center text-orange-100 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="influencers">Top Influencers</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Trends</CardTitle>
                  <CardDescription>Track your campaign metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Performance Chart</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Campaigns</CardTitle>
                  <CardDescription>Your best campaigns by engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData?.campaignPerformance?.slice(0, 5).map((campaign, index) => (
                      <div key={campaign._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{campaign.title}</p>
                            <p className="text-xs text-gray-500">{campaign.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{campaign.engagement}%</p>
                          <p className="text-xs text-gray-500">Engagement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Detailed breakdown of engagement across campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Views</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">2.5M</div>
                    <div className="text-xs text-blue-600">+15% vs last period</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-900">Likes</span>
                    </div>
                    <div className="text-2xl font-bold text-red-700">125K</div>
                    <div className="text-xs text-red-600">+22% vs last period</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Share2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Shares</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">8.5K</div>
                    <div className="text-xs text-green-600">+18% vs last period</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Comments</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-700">12.3K</div>
                    <div className="text-xs text-purple-600">+30% vs last period</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>Age and gender breakdown of your audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Demographics Chart</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Where your audience is located</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { country: "India", percentage: 45, audience: "2.1M" },
                      { country: "United States", percentage: 25, audience: "1.2M" },
                      { country: "United Kingdom", percentage: 15, audience: "720K" },
                      { country: "Canada", percentage: 10, audience: "480K" },
                      { country: "Australia", percentage: 5, audience: "240K" },
                    ].map((item) => (
                      <div key={item.country} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-semibold">
                              {item.country.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium">{item.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.percentage}%</div>
                          <div className="text-xs text-gray-500">{item.audience}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsData?.platformMetrics?.map((platform) => (
                <Card key={platform.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{platform.name.charAt(0)}</span>
                      </div>
                      <span>{platform.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Campaigns</span>
                        <span className="font-semibold">{platform.campaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reach</span>
                        <span className="font-semibold">{formatNumber(platform.reach)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Engagement</span>
                        <span className="font-semibold">{platform.engagement}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Spent</span>
                        <span className="font-semibold">{formatCurrency(platform.spent)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="influencers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Influencers</CardTitle>
                <CardDescription>Influencers who delivered the best results for your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.topInfluencers?.map((influencer, index) => (
                    <div key={influencer._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{influencer.name?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{influencer.name}</p>
                          <p className="text-sm text-gray-500">{formatNumber(influencer.followers)} followers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold text-green-600">{influencer.engagement}%</p>
                            <p className="text-xs text-gray-500">Engagement</p>
                          </div>
                          <div>
                            <p className="font-semibold">{influencer.campaigns}</p>
                            <p className="text-xs text-gray-500">Campaigns</p>
                          </div>
                          <Badge variant="outline">{influencer.rating}/5</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedBrandLayout>
  )
}
