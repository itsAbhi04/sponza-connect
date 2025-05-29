"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, DollarSign, Users, MapPin } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Campaign {
  _id: string
  title: string
  description: string
  budget: number
  targetPlatforms: string[]
  timeline: {
    startDate: Date
    endDate: Date
  }
  status: string
  brandId: {
    name: string
    profilePicture?: string
  }
  applicationCount?: number
  targetAudience?: {
    location?: string[]
    interests?: string[]
  }
}

interface CampaignCardProps {
  campaign: Campaign
  onApply?: (campaignId: string) => void
  onView?: (campaignId: string) => void
  showActions?: boolean
  userRole?: "brand" | "influencer" | "admin"
}

export function CampaignCard({
  campaign,
  onApply,
  onView,
  showActions = true,
  userRole = "influencer",
}: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default"
      case "draft":
        return "secondary"
      case "in-progress":
        return "outline"
      case "completed":
        return "default"
      case "archived":
        return "secondary"
      default:
        return "secondary"
    }
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

  const isExpired = new Date(campaign.timeline.endDate) < new Date()
  const daysLeft = Math.ceil(
    (new Date(campaign.timeline.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={campaign.brandId.profilePicture || "/placeholder.svg"} />
              <AvatarFallback>{campaign.brandId.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg line-clamp-1">{campaign.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{campaign.brandId.name}</p>
            </div>
          </div>
          <Badge variant={getStatusColor(campaign.status)}>{campaign.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>

        <div className="flex flex-wrap gap-2">
          {campaign.targetPlatforms.map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {getPlatformEmoji(platform)} {platform}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium">₹{campaign.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className={isExpired ? "text-red-600" : "text-gray-600"}>
              {isExpired ? "Expired" : `${daysLeft} days left`}
            </span>
          </div>
          {campaign.applicationCount !== undefined && (
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span>{campaign.applicationCount} applications</span>
            </div>
          )}
          {campaign.targetAudience?.location && campaign.targetAudience.location.length > 0 && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-600" />
              <span className="truncate">{campaign.targetAudience.location[0]}</span>
            </div>
          )}
        </div>

        {campaign.targetAudience?.interests && campaign.targetAudience.interests.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {campaign.targetAudience.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {campaign.targetAudience.interests.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{campaign.targetAudience.interests.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => onView?.(campaign._id)} className="flex-1">
              View Details
            </Button>
            {userRole === "influencer" && !isExpired && campaign.status === "published" && (
              <Button size="sm" onClick={() => onApply?.(campaign._id)} className="flex-1">
                Apply Now
              </Button>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Posted {formatDistanceToNow(new Date(campaign.timeline.startDate), { addSuffix: true })}
        </div>
      </CardContent>
    </Card>
  )
}
