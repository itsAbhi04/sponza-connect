"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, CheckCircle, XCircle, Clock, Users, MessageSquare, Loader2, Eye } from "lucide-react"
import { EnhancedBrandLayout } from "@/components/layouts/enhanced-brand-layout"
import { toast } from "sonner"

interface Application {
  _id: string
  influencerId: {
    _id: string
    name: string
    email: string
    profilePicture?: string
  }
  campaignId: {
    _id: string
    title: string
    budget: number
  }
  status: "applied" | "accepted" | "rejected"
  message: string
  proposedBudget?: number
  brandMessage?: string
  createdAt: string
  acceptedAt?: string
  rejectedAt?: string
}

export default function BrandApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [campaignFilter, setCampaignFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  useEffect(() => {
    fetchApplications()
  }, [pagination.page, statusFilter, campaignFilter])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (statusFilter !== "all") params.append("status", statusFilter)
      if (campaignFilter !== "all") params.append("campaignId", campaignFilter)

      const response = await fetch(`/api/brand/applications?${params.toString()}`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications)
        setPagination(data.pagination)
      } else {
        toast.error("Failed to fetch applications")
      }
    } catch (error) {
      console.error("Error fetching applications:", error)
      toast.error("Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptApplication = async (applicationId: string) => {
    try {
      setActionLoading(true)
      const response = await fetch(`/api/brand/applications/${applicationId}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: responseMessage,
        }),
      })

      if (response.ok) {
        toast.success("Application accepted successfully")
        setSelectedApplication(null)
        setResponseMessage("")
        fetchApplications()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to accept application")
      }
    } catch (error) {
      console.error("Error accepting application:", error)
      toast.error("Failed to accept application")
    } finally {
      setActionLoading(false)
    }
  }

  const handleRejectApplication = async (applicationId: string) => {
    try {
      setActionLoading(true)
      const response = await fetch(`/api/brand/applications/${applicationId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          reason: responseMessage,
        }),
      })

      if (response.ok) {
        toast.success("Application rejected")
        setSelectedApplication(null)
        setResponseMessage("")
        fetchApplications()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to reject application")
      }
    } catch (error) {
      console.error("Error rejecting application:", error)
      toast.error("Failed to reject application")
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-yellow-100 text-yellow-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "applied").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.influencerId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.campaignId.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <EnhancedBrandLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Applications</h1>
            <p className="text-gray-600">Review and manage influencer applications for your campaigns</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Review and manage influencer applications</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-2"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No applications found</p>
              </div>
            ) : (
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All ({filteredApplications.length})</TabsTrigger>
                  <TabsTrigger value="applied">Pending ({stats.pending})</TabsTrigger>
                  <TabsTrigger value="accepted">Accepted ({stats.accepted})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div key={application._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {application.influencerId.name.charAt(0)}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg">{application.influencerId.name}</h3>
                              <Badge className={getStatusColor(application.status)} variant="outline">
                                {getStatusIcon(application.status)}
                                <span className="ml-1 capitalize">{application.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{application.influencerId.email}</p>
                            <p className="text-sm font-medium text-blue-600">{application.campaignId.title}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Applied: {formatDate(application.createdAt)}</span>
                              {application.proposedBudget && (
                                <span>Proposed Budget: {formatCurrency(application.proposedBudget)}</span>
                              )}
                              <span>Campaign Budget: {formatCurrency(application.campaignId.budget)}</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{application.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Application</DialogTitle>
                                <DialogDescription>
                                  Review and respond to {selectedApplication?.influencerId.name}'s application
                                </DialogDescription>
                              </DialogHeader>
                              {selectedApplication && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Influencer Details</h4>
                                      <p className="text-sm">
                                        <strong>Name:</strong> {selectedApplication.influencerId.name}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Email:</strong> {selectedApplication.influencerId.email}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Campaign Details</h4>
                                      <p className="text-sm">
                                        <strong>Campaign:</strong> {selectedApplication.campaignId.title}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Budget:</strong> {formatCurrency(selectedApplication.campaignId.budget)}
                                      </p>
                                      {selectedApplication.proposedBudget && (
                                        <p className="text-sm">
                                          <strong>Proposed:</strong>{" "}
                                          {formatCurrency(selectedApplication.proposedBudget)}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Application Message</h4>
                                    <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                                      {selectedApplication.message}
                                    </p>
                                  </div>

                                  {selectedApplication.status === "applied" && (
                                    <div>
                                      <h4 className="font-medium mb-2">Your Response</h4>
                                      <Textarea
                                        placeholder="Write a message to the influencer..."
                                        value={responseMessage}
                                        onChange={(e) => setResponseMessage(e.target.value)}
                                        rows={3}
                                      />
                                    </div>
                                  )}

                                  {selectedApplication.status === "applied" && (
                                    <div className="flex justify-end gap-3">
                                      <Button
                                        variant="outline"
                                        onClick={() => handleRejectApplication(selectedApplication._id)}
                                        disabled={actionLoading}
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                      >
                                        {actionLoading ? (
                                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                          <XCircle className="h-4 w-4 mr-2" />
                                        )}
                                        Reject
                                      </Button>
                                      <Button
                                        onClick={() => handleAcceptApplication(selectedApplication._id)}
                                        disabled={actionLoading}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        {actionLoading ? (
                                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                        )}
                                        Accept
                                      </Button>
                                    </div>
                                  )}

                                  {selectedApplication.brandMessage && (
                                    <div>
                                      <h4 className="font-medium mb-2">Your Previous Response</h4>
                                      <p className="text-sm text-gray-700 p-3 bg-blue-50 rounded-lg">
                                        {selectedApplication.brandMessage}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="applied" className="space-y-4">
                  {filteredApplications
                    .filter((app) => app.status === "applied")
                    .map((application) => (
                      <div key={application._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        {/* Same content as above but filtered */}
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="accepted" className="space-y-4">
                  {filteredApplications
                    .filter((app) => app.status === "accepted")
                    .map((application) => (
                      <div key={application._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        {/* Same content as above but filtered */}
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="rejected" className="space-y-4">
                  {filteredApplications
                    .filter((app) => app.status === "rejected")
                    .map((application) => (
                      <div key={application._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        {/* Same content as above but filtered */}
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </EnhancedBrandLayout>
  )
}
