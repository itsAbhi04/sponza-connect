"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Building,
  MessageSquare,
  Eye,
  Filter,
} from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"
import { toast } from "sonner"

interface Invitation {
  _id: string
  brandId: {
    _id: string
    name: string
    email: string
    profilePicture?: string
  }
  campaignId?: {
    _id: string
    title: string
    budget: number
    description: string
    timeline: {
      startDate: string
      endDate: string
    }
  }
  message: string
  customTerms: string
  status: "pending" | "accepted" | "declined" | "expired"
  sentAt: string
  expiresAt: string
  response?: {
    message: string
    pricing: number
    timeline: string
  }
}

export default function InfluencerInvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [proposedPricing, setProposedPricing] = useState("")
  const [proposedTimeline, setProposedTimeline] = useState("")
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("all")

  useEffect(() => {
    fetchInvitations()
  }, [filter])

  const fetchInvitations = async () => {
    try {
      const token = localStorage.getItem("token")
      const statusParam = filter !== "all" ? `&status=${filter}` : ""
      const response = await fetch(`/api/influencer/invitations?${statusParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setInvitations(data.invitations || [])
      }
    } catch (error) {
      console.error("Failed to fetch invitations:", error)
    }
  }

  const handleInvitationResponse = async (invitationId: string, status: "accepted" | "declined") => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      const response = await fetch("/api/influencer/invitations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          invitationId,
          status,
          response:
            status === "accepted"
              ? {
                  message: responseMessage,
                  pricing: proposedPricing ? Number.parseFloat(proposedPricing) : undefined,
                  timeline: proposedTimeline,
                }
              : undefined,
        }),
      })

      if (response.ok) {
        toast.success(`Invitation ${status} successfully`)
        setSelectedInvitation(null)
        setResponseMessage("")
        setProposedPricing("")
        setProposedTimeline("")
        fetchInvitations()
      } else {
        const error = await response.json()
        toast.error(error.message || `Failed to ${status} invitation`)
      }
    } catch (error) {
      console.error("Response error:", error)
      toast.error(`Failed to ${status} invitation`)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "declined":
        return "bg-red-100 text-red-700"
      case "expired":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "declined":
        return <XCircle className="h-4 w-4" />
      case "expired":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const isExpired = (expiresAt: string) => {
    return new Date() > new Date(expiresAt)
  }

  const pendingCount = invitations.filter((inv) => inv.status === "pending").length
  const acceptedCount = invitations.filter((inv) => inv.status === "accepted").length
  const declinedCount = invitations.filter((inv) => inv.status === "declined").length

  return (
    <EnhancedInfluencerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign Invitations</h1>
            <p className="text-gray-600">Manage invitations from brands</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setFilter(filter === "all" ? "pending" : "all")}>
              <Filter className="h-4 w-4 mr-2" />
              {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Invitations</p>
                  <p className="text-2xl font-bold text-gray-900">{invitations.length}</p>
                </div>
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
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
                  <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {invitations.length > 0
                      ? Math.round(((acceptedCount + declinedCount) / invitations.length) * 100)
                      : 0}
                    %
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invitations List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Invitations</CardTitle>
            <CardDescription>Review and respond to brand invitations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({invitations.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                <TabsTrigger value="accepted">Accepted ({acceptedCount})</TabsTrigger>
                <TabsTrigger value="declined">Declined ({declinedCount})</TabsTrigger>
              </TabsList>

              <TabsContent value={filter} className="mt-6">
                <div className="space-y-4">
                  {invitations.length === 0 ? (
                    <div className="text-center py-12">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">No invitations found</p>
                      <p className="text-sm text-gray-400">
                        {filter === "pending"
                          ? "You don't have any pending invitations"
                          : "Brands will send you invitations here"}
                      </p>
                    </div>
                  ) : (
                    invitations.map((invitation) => (
                      <div key={invitation._id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={invitation.brandId.profilePicture || "/placeholder.svg"}
                                alt={invitation.brandId.name}
                              />
                              <AvatarFallback>{invitation.brandId.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{invitation.brandId.name}</h3>
                              <p className="text-sm text-gray-600">{invitation.brandId.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusIcon(invitation.status)}
                                <Badge className={getStatusColor(invitation.status)}>{invitation.status}</Badge>
                                {isExpired(invitation.expiresAt) && invitation.status === "pending" && (
                                  <Badge variant="destructive">Expired</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Sent: {formatDate(invitation.sentAt)}</p>
                            <p className="text-sm text-gray-500">Expires: {formatDate(invitation.expiresAt)}</p>
                          </div>
                        </div>

                        {invitation.campaignId && (
                          <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-4 w-4 text-blue-600" />
                              <h4 className="font-medium text-blue-900">Campaign Details</h4>
                            </div>
                            <h5 className="font-semibold mb-2">{invitation.campaignId.title}</h5>
                            <p className="text-sm text-gray-700 mb-3">{invitation.campaignId.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span>Budget: {formatCurrency(invitation.campaignId.budget)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span>
                                  {new Date(invitation.campaignId.timeline.startDate).toLocaleDateString()} -
                                  {new Date(invitation.campaignId.timeline.endDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {invitation.message && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium mb-2">Personal Message</h4>
                            <p className="text-sm text-gray-700">{invitation.message}</p>
                          </div>
                        )}

                        {invitation.customTerms && (
                          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium mb-2">Custom Terms</h4>
                            <p className="text-sm text-gray-700">{invitation.customTerms}</p>
                          </div>
                        )}

                        {invitation.response && (
                          <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium mb-2">Your Response</h4>
                            <p className="text-sm text-gray-700 mb-2">{invitation.response.message}</p>
                            {invitation.response.pricing && (
                              <p className="text-sm text-gray-700">
                                Proposed Pricing: {formatCurrency(invitation.response.pricing)}
                              </p>
                            )}
                            {invitation.response.timeline && (
                              <p className="text-sm text-gray-700">Timeline: {invitation.response.timeline}</p>
                            )}
                          </div>
                        )}

                        <div className="flex gap-3">
                          {invitation.status === "pending" && !isExpired(invitation.expiresAt) && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    onClick={() => setSelectedInvitation(invitation)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Accept
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Accept Invitation</DialogTitle>
                                    <DialogDescription>
                                      Respond to {invitation.brandId.name}'s invitation
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Response Message</label>
                                      <Textarea
                                        placeholder="Thank you for the invitation. I'm excited to work with your brand..."
                                        value={responseMessage}
                                        onChange={(e) => setResponseMessage(e.target.value)}
                                        rows={4}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Proposed Pricing (Optional)</label>
                                        <Input
                                          type="number"
                                          placeholder="Enter amount in ₹"
                                          value={proposedPricing}
                                          onChange={(e) => setProposedPricing(e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Timeline (Optional)</label>
                                        <Input
                                          placeholder="e.g., 2 weeks for delivery"
                                          value={proposedTimeline}
                                          onChange={(e) => setProposedTimeline(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                      <Button variant="outline" onClick={() => setSelectedInvitation(null)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() => handleInvitationResponse(invitation._id, "accepted")}
                                        disabled={loading}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        {loading ? "Accepting..." : "Accept Invitation"}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                onClick={() => handleInvitationResponse(invitation._id, "declined")}
                                disabled={loading}
                                className="border-red-200 text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </EnhancedInfluencerLayout>
  )
}
