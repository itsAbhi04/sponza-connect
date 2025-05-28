"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ArrowLeft, Filter, Eye, Star, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"

export default function DiscoverInfluencersPage() {
  const [influencers, setInfluencers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    niche: "",
    platform: "",
    minFollowers: "",
    maxFollowers: "",
    location: "",
    availability: "",
  })
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchInfluencers()
  }, [filters])

  const fetchInfluencers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })

      const response = await fetch(`/api/influencers?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setInfluencers(data.influencers)
      } else {
        setError(data.error || "Failed to fetch influencers")
      }
    } catch (err) {
      setError("Failed to fetch influencers")
    } finally {
      setLoading(false)
    }
  }

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`
    }
    return followers.toString()
  }

  const getPlatformIcon = (platform: string) => {
    // You can replace these with actual platform icons
    const icons: { [key: string]: string } = {
      Instagram: "📷",
      YouTube: "📺",
      TikTok: "🎵",
      Twitter: "🐦",
      LinkedIn: "💼",
      Facebook: "👥",
    }
    return icons[platform] || "📱"
  }

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
  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/brand" className="inline-flex items-center text-purple-600 hover:text-purple-700">
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                        {platform}
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
            <p className="text-gray-500">No influencers found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influencers.map((influencer: any) => (
              <Card key={influencer._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{influencer.userId?.name?.charAt(0) || "I"}</span>
                  </div>
                  <CardTitle className="text-lg">{influencer.userId?.name}</CardTitle>
                  <CardDescription>{influencer.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Bio */}
                    <p className="text-sm text-gray-700 line-clamp-2">{influencer.bio}</p>

                    {/* Niches */}
                    <div className="flex flex-wrap gap-1">
                      {influencer.niche?.slice(0, 3).map((niche: string) => (
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

                    {/* Social Media Stats */}
                    <div className="space-y-2">
                      {influencer.socialMediaStats?.slice(0, 2).map((stat: any) => (
                        <div key={stat.platform} className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <span className="mr-2">{getPlatformIcon(stat.platform)}</span>
                            {stat.platform}
                          </span>
                          <span className="font-medium">{formatFollowers(stat.followers)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">
                          {influencer.averageRating?.toFixed(1) || "0.0"}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">({influencer.totalReviews || 0})</span>
                      </div>
                      <Badge
                        variant={influencer.availabilityStatus === "available" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {influencer.availabilityStatus}
                      </Badge>
                    </div>

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
                            <DialogTitle>{selectedInfluencer?.userId?.name}</DialogTitle>
                            <DialogDescription>Influencer Profile Details</DialogDescription>
                          </DialogHeader>
                          {selectedInfluencer && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-medium mb-2">Bio</h4>
                                <p className="text-gray-700">{selectedInfluencer.bio}</p>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Social Media Presence</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  {selectedInfluencer.socialMediaStats?.map((stat: any) => (
                                    <div key={stat.platform} className="p-3 bg-gray-50 rounded">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium">{stat.platform}</span>
                                        <span className="text-sm text-gray-600">@{stat.username}</span>
                                      </div>
                                      <div className="mt-2">
                                        <div className="text-lg font-bold">{formatFollowers(stat.followers)}</div>
                                        <div className="text-sm text-gray-600">{stat.engagementRate}% engagement</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Pricing Structure</h4>
                                <div className="space-y-2">
                                  {selectedInfluencer.pricingStructure?.map((pricing: any, index: number) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                                    >
                                      <span>{pricing.service}</span>
                                      <span className="font-medium">₹{pricing.price.toLocaleString()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {selectedInfluencer.portfolio && selectedInfluencer.portfolio.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Portfolio</h4>
                                  <div className="grid grid-cols-3 gap-2">
                                    {selectedInfluencer.portfolio.slice(0, 6).map((item: string, index: number) => (
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

                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
