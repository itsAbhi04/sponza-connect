"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users, TrendingUp } from "lucide-react"

interface InfluencerProfile {
  _id: string
  userId: {
    name: string
    profilePicture?: string
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
  availabilityStatus: string
}

interface InfluencerCardProps {
  influencer: InfluencerProfile
  onContact?: (influencerId: string) => void
  onViewProfile?: (influencerId: string) => void
  showActions?: boolean
}

export function InfluencerCard({ influencer, onContact, onViewProfile, showActions = true }: InfluencerCardProps) {
  const totalFollowers = influencer.socialMediaStats.reduce((sum, stat) => sum + stat.followers, 0)
  const avgEngagement =
    influencer.socialMediaStats.reduce((sum, stat) => sum + stat.engagementRate, 0) / influencer.socialMediaStats.length

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={influencer.userId.profilePicture || "/placeholder.svg"} />
            <AvatarFallback>{influencer.userId.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{influencer.userId.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {influencer.location}
            </div>
          </div>
          <Badge className={getAvailabilityColor(influencer.availabilityStatus)}>{influencer.availabilityStatus}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 line-clamp-3">{influencer.bio}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {totalFollowers.toLocaleString()} total followers
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 mr-2" />
            {avgEngagement.toFixed(1)}% avg engagement
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {influencer.niche.map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {influencer.socialMediaStats.map((stat) => (
            <Badge key={stat.platform} variant="secondary" className="text-xs">
              {stat.platform}: {stat.followers.toLocaleString()}
            </Badge>
          ))}
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewProfile?.(influencer._id)}>
              View Profile
            </Button>
            {influencer.availabilityStatus === "available" && (
              <Button size="sm" onClick={() => onContact?.(influencer._id)}>
                Contact
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
