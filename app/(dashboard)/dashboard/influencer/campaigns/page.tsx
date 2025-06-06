"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Filter, Eye, Send, Loader2, DollarSign, Calendar, Target, SortAsc, SortDesc } from "lucide-react"
import Link from "next/link"

interface Campaign {
  _id: string
  title: string
  description: string
  budget: number
  targetPlatforms: string[]
  timeline: {
    startDate: string
    endDate: string
  }
  brandId: {
    name: string
    email: string
  }
  deliverables: Array<{
    type: string
    platform: string
    quantity: number
    description: string
  }>
  requirements: string[]
  matchScore?: number
}

export default function InfluencerCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    platform: "",
    minBudget: "",
    maxBudget: "",
    niche: "",
  })
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [applicationData, setApplicationData] = useState({
    proposal: "",
    pricing: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  })
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [applicationStatus, setApplicationStatus] = useState<{
    [campaignId: string]: "pending" | "success" | "failed" | null
  }>({})

  useEffect(() => {
    fetchCampaigns()
  }, [filters, pagination.page, sortOrder, sortBy])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value)
      })

      if (sortBy) {
        params.append("sortBy", sortBy)
        if (sortOrder) {
          params.append("sortOrder", sortOrder)
        }
      }

      const response = await fetch(`/api/influencer/campaigns/discover?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setCampaigns(data.campaigns)
        setPagination(data.pagination)
      } else {
        setError(data.error || "Failed to fetch campaigns")
      }
    } catch (err) {
      setError("Failed to fetch campaigns")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (campaignId: string) => {
    if (!applicationData.proposal || !applicationData.pricing) {
      setError("Please fill in all application details")
      return
    }

    try {
      setApplying(campaignId)
      setError("")
      setApplicationStatus((prev) => ({ ...prev, [campaignId]: "pending" }))

      const response = await fetch(`/api/campaigns/${campaignId}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposal: applicationData.proposal,
          pricing: Number.parseFloat(applicationData.pricing),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Application submitted successfully!")
        setApplicationData({ proposal: "", pricing: "" })
        setSelectedCampaign(null)
        setApplicationStatus((prev) => ({ ...prev, [campaignId]: "success" }))
        // Remove applied campaign from list
        setCampaigns(campaigns.filter((c) => c._id !== campaignId))
      } else {
        setError(data.error || "Failed to submit application")
        setApplicationStatus((prev) => ({ ...prev, [campaignId]: "failed" }))
      }
    } catch (err) {
      setError("Failed to submit application")
      setApplicationStatus((prev) => ({ ...prev, [campaignId]: "failed" }))
    } finally {
      setApplying(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"]
  const niches = [
    "Fashion",
    "Beauty",
    "Technology",
    "Lifestyle",
    "Food",
    "Travel",
    "Fitness",
    "Gaming",
    "Education",
    "Business",
  ]

  const getPlatformEmoji = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "📸"
      case "youtube":
        return "📺"
      case "tiktok":
        return "🎵"
      case "twitter":
        return "🐦"
      case "linkedin":
        return "💼"
      case "facebook":
        return "👥"
      default:
        return "📱"
    }
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/influencer/dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Campaigns</h1>
          <p className="text-gray-600">Find campaigns that match your niche and apply to collaborate with brands</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={filters.platform} onValueChange={(value) => setFilters({ ...filters, platform: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All platforms</SelectItem>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {getPlatformEmoji(platform)} {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Niche</Label>
                <Select value={filters.niche} onValueChange={(value) => setFilters({ ...filters, niche: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All niches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All niches</SelectItem>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Min Budget</Label>
                <Input
                  type="number"
                  placeholder="e.g., 5000"
                  value={filters.minBudget}
                  onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Budget</Label>
                <Input
                  type="number"
                  placeholder="e.g., 50000"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error/Success Messages */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {/* Campaigns Grid */}
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-gray-500 mt-2">Loading campaigns...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No campaigns found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Campaigns</h2>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleSort("budget")}>
                  Sort by Budget
                  {sortBy === "budget" && (
                    <>
                      {sortOrder === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      )}
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSort("timeline.endDate")}>
                  Sort by End Date
                  {sortBy === "timeline.endDate" && (
                    <>
                      {sortOrder === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign._id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                        <CardDescription className="mt-1">By {campaign.brandId?.name || "Brand"}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                        {campaign.matchScore && (
                          <Badge variant="outline" className="text-xs">
                            {campaign.matchScore}% match
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700 line-clamp-3">{campaign.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                          <span className="font-medium">{formatCurrency(campaign.budget)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                          <span>{formatDate(campaign.timeline?.endDate)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {campaign.targetPlatforms?.slice(0, 3).map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {getPlatformEmoji(platform)} {platform}
                          </Badge>
                        ))}
                        {campaign.targetPlatforms?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{campaign.targetPlatforms.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{campaign.title}</DialogTitle>
                              <DialogDescription>Campaign Details</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-gray-700">{campaign.description}</p>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Budget</h4>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(campaign.budget)}</p>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Target Platforms</h4>
                                <div className="flex flex-wrap gap-2">
                                  {campaign.targetPlatforms?.map((platform) => (
                                    <Badge key={platform} variant="outline">
                                      {getPlatformEmoji(platform)} {platform}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Deliverables</h4>
                                <div className="space-y-2">
                                  {campaign.deliverables?.map((deliverable, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded">
                                      <div className="font-medium">
                                        {deliverable.quantity}x {deliverable.type} on {deliverable.platform}
                                      </div>
                                      <div className="text-sm text-gray-600 mt-1">{deliverable.description}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Timeline</h4>
                                <p className="text-gray-700">
                                  {formatDate(campaign.timeline?.startDate)} - {formatDate(campaign.timeline?.endDate)}
                                </p>
                              </div>

                              {campaign.requirements && campaign.requirements.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Requirements</h4>
                                  <ul className="list-disc list-inside space-y-1">
                                    {campaign.requirements.map((req, index) => (
                                      <li key={index} className="text-sm text-gray-700">
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => setSelectedCampaign(campaign)}
                              disabled={
                                applicationStatus[campaign._id] === "pending" ||
                                applicationStatus[campaign._id] === "success"
                              }
                            >
                              <Send className="h-4 w-4 mr-2" />
                              {applicationStatus[campaign._id] === "pending"
                                ? "Applying..."
                                : applicationStatus[campaign._id] === "success"
                                  ? "Applied"
                                  : "Apply"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply to Campaign</DialogTitle>
                              <DialogDescription>
                                Submit your proposal for "{selectedCampaign?.title}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="proposal">Your Proposal</Label>
                                <Textarea
                                  id="proposal"
                                  placeholder="Explain why you're perfect for this campaign, your approach, and what value you'll bring..."
                                  value={applicationData.proposal}
                                  onChange={(e) => setApplicationData({ ...applicationData, proposal: e.target.value })}
                                  rows={4}
                                  maxLength={1000}
                                />
                                <div className="text-sm text-gray-500">
                                  {applicationData.proposal.length}/1000 characters
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="pricing">Your Price (₹)</Label>
                                <Input
                                  id="pricing"
                                  type="number"
                                  placeholder="Enter your proposed price"
                                  value={applicationData.pricing}
                                  onChange={(e) => setApplicationData({ ...applicationData, pricing: e.target.value })}
                                  min="0"
                                />
                              </div>

                              {applicationStatus[selectedCampaign?._id] === "failed" && (
                                <Alert variant="destructive">
                                  <AlertDescription>Application failed. Please try again.</AlertDescription>
                                </Alert>
                              )}

                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedCampaign(null)
                                    setApplicationData({ proposal: "", pricing: "" })
                                  }}
                                  disabled={applying === selectedCampaign?._id}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleApply(selectedCampaign!._id)}
                                  disabled={
                                    applying === selectedCampaign?._id ||
                                    applicationStatus[selectedCampaign?._id] === "pending"
                                  }
                                >
                                  {applying === selectedCampaign?._id ||
                                  applicationStatus[selectedCampaign?._id] === "pending" ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      Submitting...
                                    </>
                                  ) : (
                                    "Submit Application"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
