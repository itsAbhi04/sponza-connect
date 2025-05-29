"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Users } from "lucide-react"

interface Campaign {
  _id: string
  title: string
  description: string
  budget: number
  targetPlatforms: string[]
  status: string
  timeline: {
    startDate: Date
    endDate: Date
  }
  brandId: {
    name: string
  }
}

interface CampaignCardProps {
  campaign: Campaign
  onApply?: (campaignId: string) => void
  onView?: (campaignId: string) => void
  showActions?: boolean
}

export function CampaignCard({ campaign, onApply, onView, showActions = true }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.title}</CardTitle>
          <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">by {campaign.brandId.name}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 line-clamp-3">{campaign.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget: ₹{campaign.budget.toLocaleString()}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(campaign.timeline.startDate).toLocaleDateString()} -{" "}
            {new Date(campaign.timeline.endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {campaign.targetPlatforms.join(", ")}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {campaign.targetPlatforms.map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onView?.(campaign._id)}>
              View Details
            </Button>
            {campaign.status === "published" && (
              <Button size="sm" onClick={() => onApply?.(campaign._id)}>
                Apply Now
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
