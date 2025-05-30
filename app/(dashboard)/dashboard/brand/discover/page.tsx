"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Filter,
  Eye,
  Star,
  MessageSquare,
  Loader2,
  Users,
  TrendingUp,
  MapPin,
  Award,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface Influencer {
  _id: string
  userId: {
    name: string
    email: string
    profilePicture?: string
    verificationStatus: string
  }
  bio: string
  location: string
  niche: string[]
  socialMediaStats: Array<{
    platform: string
    followers: number
    engagementRate: number
    username: string
  }>
  averageRating: number
  totalReviews: number
  availabilityStatus: string
  matchScore?: number
  matchReasons?: string[]
  pricingStructure: Array<{
    service: string
    price: number
    description: string
  }>
  portfolio: string[]
}

export default function BrandDiscoverInfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    niche: "",
    platform: "",
    minFollowers: "",
    maxFollowers: "",
    location: "",
    availability: "",
    minRating: "",
  })
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  })

  useEffect(() => {
    fetchInfluencers()
  }, [filters, pagination.page])

  const fetchInfluencers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value)
      })

      const response = await fetch(`/api/brand/influencers/discover?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setInfluencers(data.influencers)
        setPagination(data.pagination)
      } else {
        setError(data.error || "Failed to fetch influencers")
      }
    } catch (err) {
      setError("Failed to fetch influencers")
    } finally {
      setLoading(false)
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

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

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "busy":
        return "secondary"
      case "unavailable":
        return "destructive"
      default:
        return "secondary"
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/brand/dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Influencers</h1>
          <p className="text-gray-600">Find the perfect influencers for your brand campaigns</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Niche</label>
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
                <label className="text-sm font-medium">Platform</label>
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
                <label className="text-sm font-medium">Min Followers</label>
                <Input
                  type="number"
                  placeholder="e.g., 1000"
                  value={filters.minFollowers}
                  onChange={(e) => setFilters({ ...filters, minFollowers: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Max Followers</label>
                <Input
                  type="number"
                  placeholder="e.g., 100000"
                  value={filters.maxFollowers}
                  onChange={(e) => setFilters({ ...filters, maxFollowers: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="e.g., Mumbai"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Availability</label>
                <Select
                  value={filters.availability}
                  onValueChange={(value) => setFilters({ ...filters, availability: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Min Rating</label>
                <Select
                  value={filters.minRating}
                  onValueChange={(value) => setFilters({ ...filters, minRating: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any rating</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.0">4.0+ stars</SelectItem>
                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Influencers Grid */}
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-gray-500 mt-2">Loading influencers...</p>
          </div>
        ) : influencers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No influencers found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {influencers.map((influencer) => {
                const totalFollowers = influencer.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)
                const avgEngagement =
                  influencer.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) /
                  (influencer.socialMediaStats.length || 1)

                return (
                  <Card key={influencer._id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {influencer.userId?.name?.charAt(0) || "I"}
                        </span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <CardTitle className="text-lg">{influencer.userId?.name}</CardTitle>
                        {influencer.userId.verificationStatus === "verified" && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{influencer.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Bio */}
                        <p className="text-sm text-gray-700 line-clamp-2">{influencer.bio}</p>

                        {/* Match Score and Availability */}
                        <div className="flex items-center justify-between">
                          <Badge variant={getAvailabilityColor(influencer.availabilityStatus)} className="capitalize">
                            {influencer.availabilityStatus}
                          </Badge>
                          {influencer.matchScore && (
                            <Badge variant="outline" className="text-xs">
                              {influencer.matchScore}% match
                            </Badge>
                          )}
                        </div>

                        {/* Niches */}
                        <div className="flex flex-wrap gap-1">
                          {influencer.niche?.slice(0, 3).map((niche) => (
                            <Badge key={niche} variant="outline" className="text-xs">
                              {niche}
                            </Badge>
                          ))}
                          {influencer.niche?.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{influencer.niche.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{formatFollowers(totalFollowers)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span>{avgEngagement.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>
                              {influencer.averageRating.toFixed(1)} ({influencer.totalReviews})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-purple-600" />
                            <span>{influencer.socialMediaStats.length} platforms</span>
                          </div>
                        </div>

                        {/* Social Media Stats */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-700">Platforms:</p>
                          <div className="flex flex-wrap gap-2">
                            {influencer.socialMediaStats?.slice(0, 2).map((stat) => (
                              <div
                                key={stat.platform}
                                className="flex items-center space-x-1 bg-gray-50 rounded-md px-2 py-1"
                              >
                                <span className="text-sm">{getPlatformEmoji(stat.platform)}</span>
                                <span className="text-xs font-medium">{formatFollowers(stat.followers)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Match Reasons */}
                        {influencer.matchReasons && influencer.matchReasons.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-700">Why this match:</p>
                            <div className="flex flex-wrap gap-1">
                              {influencer.matchReasons.slice(0, 2).map((reason, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {reason}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => setSelectedInfluencer(influencer)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                  <span>{selectedInfluencer?.userId?.name}</span>
                                  {selectedInfluencer?.userId.verificationStatus === "verified" && (
                                    <CheckCircle className="h-5 w-5 text-blue-500" />
                                  )}
                                </DialogTitle>
                                <DialogDescription>Influencer Profile Details</DialogDescription>
                              </DialogHeader>
                              {selectedInfluencer && (
                                <div className="space-y-6 max-h-96 overflow-y-auto">
                                  <div>
                                    <h4 className="font-medium mb-2">Bio</h4>
                                    <p className="text-gray-700">{selectedInfluencer.bio}</p>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Social Media Presence</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedInfluencer.socialMediaStats?.map((stat) => (
                                        <div key={stat.platform} className="p-3 bg-gray-50 rounded">
                                          <div className="flex items-center justify-between">
                                            <span className="font-medium flex items-center space-x-1">
                                              <span>{getPlatformEmoji(stat.platform)}</span>
                                              <span>{stat.platform}</span>
                                            </span>
                                            <span className="text-sm text-gray-600">@{stat.username}</span>
                                          </div>
                                          <div className="mt-2">
                                            <div className="text-lg font-bold">{formatFollowers(stat.followers)}</div>
                                            <div className="text-sm text-gray-600">
                                              {stat.engagementRate}% engagement
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Pricing Structure</h4>
                                    <div className="space-y-2">
                                      {selectedInfluencer.pricingStructure?.map((pricing, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                                        >
                                          <div>
                                            <span className="font-medium">{pricing.service}</span>
                                            {pricing.description && (
                                              <p className="text-sm text-gray-600">{pricing.description}</p>
                                            )}
                                          </div>
                                          <span className="font-medium">{formatCurrency(pricing.price)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {selectedInfluencer.portfolio && selectedInfluencer.portfolio.length > 0 && (
                                    <div>
                                      <h4 className="font-medium mb-2">Portfolio</h4>
                                      <div className="grid grid-cols-3 gap-2">
                                        {selectedInfluencer.portfolio.slice(0, 6).map((item, index) => (
                                          <div key={index} className="aspect-square bg-gray-200 rounded">
                                            <img
                                              src={item || "/placeholder.svg"}
                                              alt={`Portfolio ${index + 1}`}
                                              className="w-full h-full object-cover rounded"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" className="flex-1" disabled={influencer.availabilityStatus !== "available"}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
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
