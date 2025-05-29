import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface ActivityItem {
  id: string
  type: "campaign" | "application" | "payment" | "message"
  title: string
  description: string
  timestamp: Date
  user?: {
    name: string
    avatar?: string
  }
  status?: "success" | "pending" | "failed"
  amount?: number
}

interface RecentActivityProps {
  activities: ActivityItem[]
  loading?: boolean
}

export function RecentActivity({ activities, loading = false }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "campaign":
        return "🎯"
      case "application":
        return "📝"
      case "payment":
        return "💰"
      case "message":
        return "💬"
      default:
        return "📋"
    }
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    const variants = {
      success: "default",
      pending: "secondary",
      failed: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {activity.user ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{activity.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {getActivityIcon(activity.type)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <div className="flex items-center space-x-2">
                      {activity.amount && (
                        <span className="text-sm font-medium text-green-600">₹{activity.amount.toLocaleString()}</span>
                      )}
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
