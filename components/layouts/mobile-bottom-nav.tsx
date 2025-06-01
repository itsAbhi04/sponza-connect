"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Target, DollarSign, MessageSquare, Settings, User, FileText, Wallet, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MobileBottomNavProps {
  userRole: "influencer" | "brand" | "admin"
  unreadMessages?: number
  unreadNotifications?: number
}

export function MobileBottomNav({ userRole, unreadMessages = 0, unreadNotifications = 0 }: MobileBottomNavProps) {
  const pathname = usePathname()

  const getNavItems = () => {
    switch (userRole) {
      case "influencer":
        return [
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
      case "brand":
        return [
          {
            href: "/dashboard/brand",
            icon: BarChart3,
            label: "Dashboard",
            badge: null,
          },
          {
            href: "/dashboard/brand/campaigns",
            icon: Target,
            label: "Campaigns",
            badge: null,
          },
          {
            href: "/dashboard/brand/discover",
            icon: User,
            label: "Discover",
            badge: null,
          },
          {
            href: "/dashboard/brand/messages",
            icon: MessageSquare,
            label: "Messages",
            badge: unreadMessages > 0 ? unreadMessages : null,
          },
          {
            href: "/dashboard/brand/analytics",
            icon: BarChart3,
            label: "Analytics",
            badge: null,
          },
        ]
      case "admin":
        return [
          {
            href: "/dashboard/admin",
            icon: BarChart3,
            label: "Dashboard",
            badge: null,
          },
          {
            href: "/dashboard/admin/users",
            icon: User,
            label: "Users",
            badge: null,
          },
          {
            href: "/dashboard/admin/campaigns",
            icon: Target,
            label: "Campaigns",
            badge: null,
          },
          {
            href: "/dashboard/admin/analytics",
            icon: BarChart3,
            label: "Analytics",
            badge: null,
          },
          {
            href: "/dashboard/admin/settings",
            icon: Settings,
            label: "Settings",
            badge: null,
          },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 relative ${
                isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[16px] h-4 flex items-center justify-center rounded-full p-0">
                    {item.badge > 9 ? "9+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-600 rounded-b-full" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
