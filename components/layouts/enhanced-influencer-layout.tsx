"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Target,
  DollarSign,
  BarChart3,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Calendar,
  User,
  Briefcase,
  Wallet,
  Star,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Dashboard", href: "/dashboard/influencer", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/influencer/campaigns", icon: Target },
  { name: "Applications", href: "/dashboard/influencer/applications", icon: Briefcase },
  { name: "Earnings", href: "/dashboard/influencer/earnings", icon: DollarSign },
  { name: "Analytics", href: "/dashboard/influencer/analytics", icon: BarChart3 },
  { name: "Messages", href: "/dashboard/influencer/messages", icon: MessageSquare },
  { name: "Calendar", href: "/dashboard/influencer/calendar", icon: Calendar },
  { name: "Wallet", href: "/dashboard/influencer/wallet", icon: Wallet },
]

const mobileNavigation = [
  { name: "Dashboard", href: "/dashboard/influencer", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/influencer/campaigns", icon: Target },
  { name: "Applications", href: "/dashboard/influencer/applications", icon: Briefcase },
  { name: "Messages", href: "/dashboard/influencer/messages", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/influencer/profile", icon: User },
]

interface InfluencerLayoutProps {
  children: React.ReactNode
}

export function EnhancedInfluencerLayout({ children }: InfluencerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState(0)
  const [profileRating, setProfileRating] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
    fetchNotifications()
    fetchProfileRating()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    }
  }

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications?unread=true")
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.count || 0)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    }
  }

  const fetchProfileRating = async () => {
    try {
      const response = await fetch("/api/influencer/profile/rating")
      if (response.ok) {
        const data = await response.json()
        setProfileRating(data.rating || 0)
      }
    } catch (error) {
      console.error("Failed to fetch profile rating:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Mobile sidebar backdrop */}
      <div
        className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden", sidebarOpen ? "block" : "hidden")}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-white/95 backdrop-blur-xl border-r border-green-200/60 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-green-200/60">
          <Link href="/dashboard/influencer" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Sponza
              </span>
              <div className="text-xs text-slate-500 font-medium">Creator Studio</div>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Summary */}
        <div className="px-6 py-4 border-b border-green-200/60">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt="Influencer" />
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                {user?.name?.charAt(0) || "I"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{user?.name || "Creator"}</p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.floor(profileRating) ? "text-yellow-400 fill-current" : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500">{profileRating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-green-200/60 p-4 space-y-3">
          <Link href="/dashboard/influencer/referrals">
            <Button
              variant="outline"
              className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
            >
              <Gift className="mr-2 h-4 w-4" />
              Refer & Earn
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-green-200/60">
          <div className="flex h-16 items-center justify-between px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                Creator Account
              </Badge>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications > 9 ? "9+" : notifications}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt="Influencer" />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        {user?.name?.charAt(0) || "I"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "Creator"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
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
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 pb-20 lg:pb-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-green-200/60 lg:hidden">
          <div className="flex items-center justify-around py-2">
            {mobileNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200",
                    isActive ? "text-green-600 bg-green-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-green-600" : "text-slate-400")} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
