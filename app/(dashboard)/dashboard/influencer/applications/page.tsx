"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Clock } from "lucide-react"
import { useState } from "react"

// Sample application data (replace with your actual data fetching)
const applicationsData = [
  {
    id: 1,
    title: "Summer Fashion Collection",
    brand: "Fashion Brand",
    platform: "Instagram Reels",
    status: "Under Review",
    timeAgo: "2 days ago",
    feedback: "No feedback yet",
  },
  {
    id: 2,
    title: "Tech Product Review",
    brand: "Tech Company",
    platform: "YouTube",
    status: "Accepted",
    timeAgo: "1 day ago",
    feedback: "Brand loved your portfolio!",
  },
  {
    id: 3,
    title: "Beauty Product Launch",
    brand: "Beauty Brand",
    platform: "Instagram Posts",
    status: "Rejected",
    timeAgo: "3 days ago",
    feedback: "Looking for different style",
  },
  {
    id: 4,
    title: "Fitness Challenge",
    brand: "Fitness Brand",
    platform: "Instagram Stories",
    status: "Completed",
    timeAgo: "1 week ago",
    feedback: "Great work! Would love to work again",
  },
  {
    id: 5,
    title: "Another Fashion Campaign",
    brand: "Fashion Brand",
    platform: "TikTok",
    status: "Under Review",
    timeAgo: "1 day ago",
    feedback: "Awaiting review",
  },
  {
    id: 6,
    title: "Gaming Headset Review",
    brand: "Gaming Company",
    platform: "YouTube",
    status: "Accepted",
    timeAgo: "2 days ago",
    feedback: "Ready to start!",
  },
  {
    id: 7,
    title: "Skincare Product Promotion",
    brand: "Skincare Brand",
    platform: "Instagram Posts",
    status: "Rejected",
    timeAgo: "4 days ago",
    feedback: "Not the right fit",
  },
  {
    id: 8,
    title: "Home Decor Showcase",
    brand: "Home Goods Store",
    platform: "Pinterest",
    status: "Completed",
    timeAgo: "2 weeks ago",
    feedback: "Excellent collaboration!",
  },
]

const itemsPerPage = 3

export default function MyApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredApplications = applicationsData
    .filter((app) => {
      const searchTermLower = searchTerm.toLowerCase()
      return (
        app.title.toLowerCase().includes(searchTermLower) ||
        app.brand.toLowerCase().includes(searchTermLower) ||
        app.platform.toLowerCase().includes(searchTermLower)
      )
    })
    .filter((app) => {
      if (activeTab === "all") return true
      return app.status.toLowerCase() === activeTab
    })

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when tab changes
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when search term changes
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">My Applications</h1>
            <p className="text-gray-600">Track the status of your campaign applications</p>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Applications Tabs */}
          <Tabs defaultValue="all" className="space-y-8" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {/* All Applications */}
            <TabsContent value="all" className="space-y-6">
              {paginatedApplications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{app.title}</CardTitle>
                        <CardDescription>
                          {app.brand} • {app.platform}
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          app.status === "Under Review"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Applied {app.timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MessageSquare className="h-4 w-4" />
                          <span>{app.feedback}</span>
                        </div>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Pending Applications */}
            <TabsContent value="pending" className="space-y-6">
              {paginatedApplications.map(
                (app) =>
                  app.status.toLowerCase() === "pending" && (
                    <Card key={app.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{app.title}</CardTitle>
                            <CardDescription>
                              {app.brand} • {app.platform}
                            </CardDescription>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-700">Under Review</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>Applied {app.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>{app.feedback}</span>
                            </div>
                          </div>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </TabsContent>

            {/* Accepted Applications */}
            <TabsContent value="accepted" className="space-y-6">
              {paginatedApplications.map(
                (app) =>
                  app.status.toLowerCase() === "accepted" && (
                    <Card key={app.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{app.title}</CardTitle>
                            <CardDescription>
                              {app.brand} • {app.platform}
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>Accepted {app.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>{app.feedback}</span>
                            </div>
                          </div>
                          <Button>Start Campaign</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </TabsContent>

            {/* Rejected Applications */}
            <TabsContent value="rejected" className="space-y-6">
              {paginatedApplications.map(
                (app) =>
                  app.status.toLowerCase() === "rejected" && (
                    <Card key={app.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{app.title}</CardTitle>
                            <CardDescription>
                              {app.brand} • {app.platform}
                            </CardDescription>
                          </div>
                          <Badge className="bg-red-100 text-red-700">Rejected</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>Rejected {app.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>{app.feedback}</span>
                            </div>
                          </div>
                          <Button variant="outline">View Feedback</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </TabsContent>

            {/* Completed Applications */}
            <TabsContent value="completed" className="space-y-6">
              {paginatedApplications.map(
                (app) =>
                  app.status.toLowerCase() === "completed" && (
                    <Card key={app.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{app.title}</CardTitle>
                            <CardDescription>
                              {app.brand} • {app.platform}
                            </CardDescription>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">Completed</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>Completed {app.timeAgo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>{app.feedback}</span>
                            </div>
                          </div>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          {filteredApplications.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={goToPreviousPage} disabled={currentPage === 1} className="mr-2">
                Previous
              </Button>
              <Button variant="outline" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
