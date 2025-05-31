"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Check,
  CheckCheck,
  Filter,
  MoreVertical,
  DollarSign,
  MessageSquare,
  Target,
  User,
  Settings,
  Gift,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  _id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  relatedId?: any
  actionUrl?: string
  priority: "low" | "medium" | "high"
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  useEffect(() => {
    fetchNotifications()
  }, [filter])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter !== "all") {
        if (filter === "unread") params.append("unread", "true")
        else params.append("type", filter)
      }

      const response = await fetch(`/api/influencer/notifications?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationIds: string[]) => {
    try {
      const response = await fetch("/api/influencer/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "markRead",
          notificationIds,
        }),
      })

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) => (notificationIds.includes(notif._id) ? { ...notif, isRead: true } : notif)),
        )
        setUnreadCount((prev) => Math.max(0, prev - notificationIds.length))
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/influencer/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "markAllRead",
        }),
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" ? "text-red-500" : priority === "medium" ? "text-yellow-500" : "text-blue-500"

    switch (type) {
      case "campaign_application":
        return <Target className={`h-5 w-5 ${iconClass}`} />
      case "campaign_accepted":
        return <CheckCircle className={`h-5 w-5 text-green-500`} />
      case "campaign_rejected":
        return <XCircle className={`h-5 w-5 text-red-500`} />
      case "payment":
        return <DollarSign className={`h-5 w-5 text-green-500`} />
      case "message":
        return <MessageSquare className={`h-5 w-5 ${iconClass}`} />
      case "profile":
        return <User className={`h-5 w-5 ${iconClass}`} />
      case "system":
        return <Settings className={`h-5 w-5 ${iconClass}`} />
      case "promotion":
        return <Gift className={`h-5 w-5 ${iconClass}`} />
      default:
        return <Bell className={`h-5 w-5 ${iconClass}`} />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-700">Low</Badge>
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.isRead
    return notif.type === filter
  })

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const selectAllVisible = () => {
    const visibleIds = filteredNotifications.map((n) => n._id)
    setSelectedNotifications(visibleIds)
  }

  const clearSelection = () => {
    setSelectedNotifications([])
  }

  if (loading) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  return (
    <EnhancedInfluencerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              Stay updated with your latest activities
              {unreadCount > 0 && <Badge className="ml-2 bg-red-100 text-red-700">{unreadCount} unread</Badge>}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="unread">Unread Only</SelectItem>
                <SelectItem value="campaign_application">Campaign Applications</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{selectedNotifications.length} notification(s) selected</span>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => markAsRead(selectedNotifications)}>
                    <Check className="h-4 w-4 mr-2" />
                    Mark Read
                  </Button>
                  <Button size="sm" variant="outline" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={selectAllVisible}
              disabled={filteredNotifications.length === 0}
            >
              Select All Visible
            </Button>
            <Button variant="outline" size="sm" onClick={clearSelection} disabled={selectedNotifications.length === 0}>
              Clear Selection
            </Button>
          </div>
          <span className="text-sm text-gray-500">{filteredNotifications.length} notification(s)</span>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">
                  {filter === "unread"
                    ? "You're all caught up! No unread notifications."
                    : "You don't have any notifications yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification._id}
                className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                  !notification.isRead ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                } ${selectedNotifications.includes(notification._id) ? "ring-2 ring-green-500" : ""}`}
                onClick={() => toggleSelectNotification(notification._id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{getNotificationIcon(notification.type, notification.priority)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3
                              className={`text-sm font-medium ${
                                !notification.isRead ? "text-gray-900" : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            {getPriorityBadge(notification.priority)}
                            {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </div>
                          <p className={`text-sm ${!notification.isRead ? "text-gray-700" : "text-gray-500"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                            {notification.actionUrl && (
                              <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead([notification._id])
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && filteredNotifications.length % 20 === 0 && (
          <div className="text-center">
            <Button variant="outline" onClick={fetchNotifications}>
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </EnhancedInfluencerLayout>
  )
}
