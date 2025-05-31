"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MobileBottomNav } from "./mobile-bottom-nav"
import {
  BarChart3,
  FileText,
  Target,
  DollarSign,
  MessageSquare,
  Bell,
  Settings,
  User,
  Wallet,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EnhancedInfluencerLayoutProps {
  children: React.ReactNode
}

export function EnhancedInfluencerLayout({ children }: EnhancedInfluencerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard/influencer",
      icon: BarChart3,
      label: "Dashboard",
      badge: null,
    },
    {
      href: "/dashboard/influencer/analytics",
      icon: BarChart3,
      label: "Analytics",
      badge: null,
    },
    {
      href: "/dashboard/influencer/applications",
      icon: FileText,
      label: "Applications",
      badge: null,
    },
    {
      href: "/dashboard/influencer/campaigns",
      icon: Target,
      label: "Campaigns",
      badge: null,
    },
    {
      href: "/dashboard/influencer/earnings",
      icon: DollarSign,
      label: "Earnings",
      badge: null,
    },
    {
      href: "/dashboard/influencer/messages",
      icon: MessageSquare,
      label: "Messages",
      badge: unreadMessages > 0 ? unreadMessages : null,
    },
    {
      href: "/dashboard/influencer/notifications",
      icon: Bell,
      label: "Notifications",
      badge: unreadNotifications > 0 ? unreadNotifications : null,
    },
    {
      href: "/dashboard/influencer/preferences",
      icon: Settings,
      label: "Preferences",
      badge: null,
    },
    {
      href: "/dashboard/influencer/profile",
      icon: User,
      label: "Profile",
      badge: null,
    },
    {
      href: "/dashboard/influencer/settings",
      icon: Settings,
      label: "Settings",
      badge: null,
    },
    {
      href: "/dashboard/influencer/wallet",
      icon: Wallet,
      label: "Wallet",
      badge: null,
    },
  ]

  useEffect(() => {
    // Fetch unread counts
    const fetchUnreadCounts = async () => {
      try {
        const [messagesRes, notificationsRes] = await Promise.all([
          fetch("/api/influencer/messages/unread-count"),
          fetch("/api/influencer/notifications?unread=true"),
        ])

        if (messagesRes.ok) {
          const messagesData = await messagesRes.json()
          setUnreadMessages(messagesData.count || 0)
        }

        if (notificationsRes.ok) {
          const notificationsData = await notificationsRes.json()
          setUnreadNotifications(notificationsData.unreadCount || 0)
        }
      } catch (error) {
        console.error("Failed to fetch unread counts:", error)
      }
    }

    fetchUnreadCounts()

    // Set up polling for real-time updates
    const interval = setInterval(fetchUnreadCounts, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-lg">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Sponza</span>
              </Link>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md relative ${
                      isActive ? "bg-green-100 text-green-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-auto bg-red-500 text-white text-xs">
                        {item.badge > 9 ? "9+" : item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">Influencer</div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/influencer/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/influencer/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sponza</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/influencer/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/influencer/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Sponza</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-4 space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-green-100 text-green-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-auto bg-red-500 text-white text-xs">
                        {item.badge > 9 ? "9+" : item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        userRole="influencer"
        unreadMessages={unreadMessages}
        unreadNotifications={unreadNotifications}
      />
    </div>
  )
}
