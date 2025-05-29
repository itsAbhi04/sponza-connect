"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, TrendingUp, MapPin, MessageCircle } from "lucide-react"

interface SocialMediaStat {
  platform: string
  followers: number
  engagementRate: number
  username: string
}

interface Influencer {
  _id: string
  userId: {
    name: string
    email: string
    profilePicture?: string
  }
  bio: string
  location: string
  niche: string[]
  socialMediaStats: SocialMediaStat[]
  averageRating: number
  totalReviews: number
  availabilityStatus: "available" | "busy" | "unavailable"
  matchScore?: number
  matchReasons?: string[]
}

interface InfluencerCardProps {
  influencer: Influencer
  onContact?: (influencerId: string) => void
  onView?: (influencerId: string) => void
  showActions?: boolean
  showMatchScore?: boolean
}

export function InfluencerCard({
  influencer,
  onContact,
  onView,
  showActions = true,
  showMatchScore = false,
}: InfluencerCardProps) {
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

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const totalFollowers = influencer.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)

  const avgEngagement =
    influencer.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) /
    (influencer.socialMediaStats.length || 1)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={influencer.userId.profilePicture || "/placeholder.svg"} />
              <AvatarFallback>{influencer.userId.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{influencer.userId.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{influencer.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge variant={getAvailabilityColor(influencer.availabilityStatus)}>{influencer.availabilityStatus}</Badge>
            {showMatchScore && influencer.matchScore && (
              <Badge variant="outline" className="text-xs">
                {influencer.matchScore}% match
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{influencer.bio}</p>

        <div className="flex flex-wrap gap-1">
          {influencer.niche.map((niche) => (
            <Badge key={niche} variant="secondary" className="text-xs">
              {niche}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{formatFollowers(totalFollowers)} followers</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span>{avgEngagement.toFixed(1)}% engagement</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>
              {influencer.averageRating.toFixed(1)} ({influencer.totalReviews} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700">Platforms:</p>
          <div className="flex flex-wrap gap-2">
            {influencer.socialMediaStats.map((stat) => (
              <div key={stat.platform} className="flex items-center space-x-1 bg-gray-50 rounded-md px-2 py-1">
                <span className="text-sm">{getPlatformEmoji(stat.platform)}</span>
                <span className="text-xs font-medium">{formatFollowers(stat.followers)}</span>
              </div>
            ))}
          </div>
        </div>

        {showMatchScore && influencer.matchReasons && influencer.matchReasons.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Match Reasons:</p>
            <div className="flex flex-wrap gap-1">
              {influencer.matchReasons.map((reason, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => onView?.(influencer._id)} className="flex-1">
              View Profile
            </Button>
            {influencer.availabilityStatus === "available" && (
              <Button size="sm" onClick={() => onContact?.(influencer.userId._id)} className="flex-1">
                <MessageCircle className="h-4 w-4 mr-1" />
                Contact
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
