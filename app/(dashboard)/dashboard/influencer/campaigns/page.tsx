"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Target, Star, TrendingUp } from "lucide-react"
import { InfluencerLayout } from "@/components/layouts/influencer-layout"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import { toast } from "sonner"

interface Campaign {
  _id: string
  title: string
  description: string
  budget: number
  status: string
  targetPlatforms: string[]
  timeline: {
    startDate: string
    endDate: string
  }
  brandId: {
    name: string
    profilePicture?: string
  }
  targetAudience?: {
    location?: string[]
    interests?: string[]
  }
  matchScore?: number
  matchReasons?: string[]
}

export default function InfluencerCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [recommendations, setRecommendations] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [budgetFilter, setBudgetFilter] = useState("all")

  useEffect(() => {
    fetchCampaigns()
    fetchRecommendations()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns")
      const data = await response.json()

      if (response.ok) {
        setCampaigns(data.campaigns || [])
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error)
    }
  }

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/influencer/recommendations?limit=10")
      const data = await response.json()

      if (response.ok) {
        setRecommendations(data.recommendations || [])
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (campaignId: string) => {
    try {
      // This would open an application modal in a real app
      toast.success("Application submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit application")
    }
  }

  const handleView = (campaignId: string) => {
    // Navigate to campaign details
    console.log("View campaign:", campaignId)
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.brandId.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === "all" || campaign.targetPlatforms.includes(platformFilter)
    const matchesBudget =
      budgetFilter === "all" ||
      (budgetFilter === "low" && campaign.budget < 10000) ||
      (budgetFilter === "medium" && campaign.budget >= 10000 && campaign.budget < 50000) ||
      (budgetFilter === "high" && campaign.budget >= 50000)

    return matchesSearch && matchesPlatform && matchesBudget && campaign.status === "published"
  })

  if (loading) {
    return (
      <InfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading campaigns...</p>
          </div>
        </div>
      </InfluencerLayout>
    )
  }

  return (
    <InfluencerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">Discover and apply to campaigns that match your profile</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Budget Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="low">Under ₹10K</SelectItem>
              <SelectItem value="medium">₹10K - ₹50K</SelectItem>
              <SelectItem value="high">Above ₹50K</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="recommended" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recommended">
              <Star className="h-4 w-4 mr-2" />
              Recommended ({recommendations.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              <Target className="h-4 w-4 mr-2" />
              All Campaigns ({filteredCampaigns.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            {recommendations.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
                  <p className="text-gray-500 mb-6">
                    Complete your profile to get personalized campaign recommendations
                  </p>
                  <Button>Complete Profile</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <TrendingUp className="h-5 w-5 inline mr-2" />
                    AI-Powered Recommendations
                  </h3>
                  <p className="text-gray-600">
                    These campaigns are specially selected based on your profile, niche, and engagement metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((campaign) => (
                    <div key={campaign._id} className="relative">
                      {campaign.matchScore && campaign.matchScore >= 80 && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge className="bg-green-500 text-white">Perfect Match</Badge>
                        </div>
                      )}
                      <CampaignCard
                        campaign={campaign}
                        onApply={handleApply}
                        onView={handleView}
                        showMatchScore={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all">
            {filteredCampaigns.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search filters to find more campaigns</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign._id} campaign={campaign} onApply={handleApply} onView={handleView} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </InfluencerLayout>
  )
}
