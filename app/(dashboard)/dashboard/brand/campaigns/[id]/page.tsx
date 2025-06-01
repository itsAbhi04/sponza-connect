"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { EnhancedBrandLayout } from "@/components/layouts/enhanced-brand-layout"
import { toast } from "sonner"

interface Campaign {
  _id: string
  title: string
  description: string
  budget: number
  status: "draft" | "published" | "in-progress" | "completed" | "archived"
  targetPlatforms: string[]
  timeline: {
    startDate: string
    endDate: string
  }
  deliverables: Array<{
    type: string
    description: string
    quantity: number
    platform: string
  }>
  metrics: {
    totalApplications: number
    acceptedApplications: number
    pendingApplications: number
    contentSubmitted: number
    contentApproved: number
    totalViews: number
    totalEngagements: number
  }
  createdAt: string
  updatedAt: string
}

interface Application {
  _id: string
  influencerId: {
    _id: string
    name: string
    email: string
    profilePicture?: string
  }
  status: "applied" | "accepted" | "rejected"
  proposedBudget?: number
  message: string
  createdAt: string
}

interface Content {
  _id: string
  influencerId: {
    _id: string
    name: string
    email: string
    profilePicture?: string
  }
  type: string
  platform: string
  title: string
  status: "draft" | "submitted" | "approved" | "rejected" | "published"
  metrics: {
    views?: number
    likes?: number
    comments?: number
    shares?: number
  }
  createdAt: string
}

export default function CampaignDetailsPage() {
  const params = useParams()
  const campaignId = params.id as string

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (campaignId) {
      fetchCampaignDetails()
    }
  }, [campaignId])

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/brand/campaigns/${campaignId}`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setCampaign(data.campaign)
        setApplications(data.applications || [])
        setContent(data.content || [])
      } else {
        toast.error("Failed to fetch campaign details")
      }
    } catch (error) {
      console.error("Error fetching campaign details:", error)
      toast.error("Failed to fetch campaign details")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-gray-600" />
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-purple-600" />
      case "archived":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
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
      case "archived":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
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
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </EnhancedBrandLayout>
    )
  }

  if (!campaign) {
    return (
      <EnhancedBrandLayout>
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Campaign not found</p>
        </div>
      </EnhancedBrandLayout>
    )
  }

  const completionPercentage =
    campaign.deliverables.length > 0
      ? (campaign.metrics.contentApproved / campaign.deliverables.reduce((sum, d) => sum + d.quantity, 0)) * 100
      : 0

  return (
    <EnhancedBrandLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/brand/campaigns">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Campaigns
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                {getStatusIcon(campaign.status)}
                <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
                <Badge className={getStatusColor(campaign.status)} variant="outline">
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-gray-600">Campaign Details & Performance</p>
            </div>
          </div>
          <Link href={`/dashboard/brand/campaigns/${campaignId}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Campaign
            </Button>
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(campaign.budget)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-blue-600">{campaign.metrics.totalApplications}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">{formatNumber(campaign.metrics.totalViews)}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagements</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatNumber(campaign.metrics.totalEngagements)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Progress</CardTitle>
            <CardDescription>Track the completion of your campaign deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Content Completion</span>
                  <span>{completionPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={completionPercentage} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span>Content Submitted</span>
                  <span className="font-semibold text-blue-600">{campaign.metrics.contentSubmitted}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span>Content Approved</span>
                  <span className="font-semibold text-green-600">{campaign.metrics.contentApproved}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span>Accepted Influencers</span>
                  <span className="font-semibold text-purple-600">{campaign.metrics.acceptedApplications}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-700">{campaign.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Timeline</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        {formatDate(campaign.timeline.startDate)} - {formatDate(campaign.timeline.endDate)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Target Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.targetPlatforms.map((platform) => (
                        <Badge key={platform} variant="secondary">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {campaign.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{deliverable.type}</p>
                          <p className="text-sm text-gray-600">{deliverable.description}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {deliverable.platform}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{deliverable.quantity}</p>
                          <p className="text-xs text-gray-500">Required</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Applications ({applications.length})</CardTitle>
                <CardDescription>Manage influencer applications for this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No applications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{application.influencerId.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{application.influencerId.name}</h3>
                            <p className="text-sm text-gray-600">{application.influencerId.email}</p>
                            <p className="text-sm text-gray-500 mt-1">{application.message}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {application.proposedBudget && (
                            <div className="text-right">
                              <p className="font-semibold">{formatCurrency(application.proposedBudget)}</p>
                              <p className="text-xs text-gray-500">Proposed</p>
                            </div>
                          )}
                          <Badge
                            variant={application.status === "accepted" ? "default" : "secondary"}
                            className={
                              application.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : application.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {application.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Submissions ({content.length})</CardTitle>
                <CardDescription>Review and approve content from influencers</CardDescription>
              </CardHeader>
              <CardContent>
                {content.length === 0 ? (
                  <div className="text-center py-8">
                    <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No content submitted yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {content.map((item) => (
                      <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{item.influencerId.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-600">by {item.influencerId.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.platform}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {item.metrics.views && (
                            <div className="text-right">
                              <p className="font-semibold">{formatNumber(item.metrics.views)}</p>
                              <p className="text-xs text-gray-500">Views</p>
                            </div>
                          )}
                          <Badge
                            variant={item.status === "approved" ? "default" : "secondary"}
                            className={
                              item.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : item.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : item.status === "submitted"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                            }
                          >
                            {item.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Reach</span>
                      <span className="font-semibold">{formatNumber(campaign.metrics.totalViews)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Engagements</span>
                      <span className="font-semibold">{formatNumber(campaign.metrics.totalEngagements)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engagement Rate</span>
                      <span className="font-semibold">
                        {campaign.metrics.totalViews > 0
                          ? ((campaign.metrics.totalEngagements / campaign.metrics.totalViews) * 100).toFixed(2)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cost per View</span>
                      <span className="font-semibold">
                        {campaign.metrics.totalViews > 0
                          ? formatCurrency(campaign.budget / campaign.metrics.totalViews)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Application Response Rate</span>
                        <span>
                          {campaign.metrics.totalApplications > 0
                            ? (
                                (campaign.metrics.acceptedApplications / campaign.metrics.totalApplications) *
                                100
                              ).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          campaign.metrics.totalApplications > 0
                            ? (campaign.metrics.acceptedApplications / campaign.metrics.totalApplications) * 100
                            : 0
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Content Approval Rate</span>
                        <span>
                          {campaign.metrics.contentSubmitted > 0
                            ? ((campaign.metrics.contentApproved / campaign.metrics.contentSubmitted) * 100).toFixed(1)
                            : 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          campaign.metrics.contentSubmitted > 0
                            ? (campaign.metrics.contentApproved / campaign.metrics.contentSubmitted) * 100
                            : 0
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Campaign Completion</span>
                        <span>{completionPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={completionPercentage} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedBrandLayout>
  )
}
