"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  _id: string
  message: string
  type: "campaign_update" | "application_status" | "payment" | "referral" | "admin"
  readStatus: boolean
  createdAt: string
}

interface NotificationCenterProps {
  userId: string
}

export function NotificationCenter({ userId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [userId])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/notifications")
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.notifications.filter((n: Notification) => !n.readStatus).length)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readStatus: true }),
      })

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId ? { ...notification, readStatus: true } : notification,
          ),
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.readStatus)

      await Promise.all(
        unreadNotifications.map((notification) =>
          fetch(`/api/notifications/${notification._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ readStatus: true }),
          }),
        ),
      )

      setNotifications((prev) => prev.map((notification) => ({ ...notification, readStatus: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "campaign_update":
        return "🎯"
      case "application_status":
        return "📝"
      case "payment":
        return "💰"
      case "referral":
        return "🎁"
      case "admin":
        return "⚠️"
      default:
        return "📢"
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "campaign_update":
        return "blue"
      case "application_status":
        return "purple"
      case "payment":
        return "green"
      case "referral":
        return "orange"
      case "admin":
        return "red"
      default:
        return "gray"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {loading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No notifications yet</div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.readStatus ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 text-lg">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.readStatus ? "font-medium" : ""}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                            <div className="flex items-center space-x-1">
                              <Badge
                                variant="outline"
                                className={`text-xs border-${getNotificationColor(notification.type)}-200 text-${getNotificationColor(notification.type)}-700`}
                              >
                                {notification.type.replace("_", " ")}
                              </Badge>
                              {!notification.readStatus && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification._id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
