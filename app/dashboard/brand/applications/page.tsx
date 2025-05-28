"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, Check, X, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ManageApplicationsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/campaigns?status=published")
      const data = await response.json()

      if (response.ok) {
        setCampaigns(data.campaigns)
        if (data.campaigns.length > 0) {
          setSelectedCampaign(data.campaigns[0])
          fetchApplications(data.campaigns[0]._id)
        }
      } else {
        setError(data.error || "Failed to fetch campaigns")
      }
    } catch (err) {
      setError("Failed to fetch campaigns")
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async (campaignId: string) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/applications`)
      const data = await response.json()

      if (response.ok) {
        setApplications(data.applications)
      } else {
        setError(data.error || "Failed to fetch applications")
      }
    } catch (err) {
      setError("Failed to fetch applications")
    }
  }

  const handleApplicationAction = async (applicationId: string, action: "accept" | "reject") => {
    try {
      setActionLoading(applicationId)
      setError("")

      const response = await fetch(`/api/applications/${applicationId}/${action}`, {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Application ${action}ed successfully!`)
        fetchApplications(selectedCampaign._id) // Refresh applications
      } else {
        setError(data.error || `Failed to ${action} application`)
      }
    } catch (err) {
      setError(`Failed to ${action} application`)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "completed":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filterApplicationsByStatus = (status: string) => {
    return applications.filter((app: any) => app.status === status)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/brand" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Applications</h1>
          <p className="text-gray-600">Review and manage influencer applications for your campaigns</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Campaign Selector */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Campaign</CardTitle>
                <CardDescription>Choose a campaign to view applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {campaigns.map((campaign: any) => (
                    <button
                      key={campaign._id}
                      onClick={() => {
                        setSelectedCampaign(campaign)
                        fetchApplications(campaign._id)
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedCampaign?._id === campaign._id
                          ? "border-purple-200 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium text-sm">{campaign.title}</div>
                      <div className="text-xs text-gray-500 mt-1">Budget: ₹{campaign.budget.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications */}
          <div className="lg:col-span-3">
            {selectedCampaign ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCampaign.title}</CardTitle>
                  <CardDescription>Applications for this campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="applied" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="applied">
                        Pending ({filterApplicationsByStatus("applied").length})
                      </TabsTrigger>
                      <TabsTrigger value="accepted">
                        Accepted ({filterApplicationsByStatus("accepted").length})
                      </TabsTrigger>
                      <TabsTrigger value="rejected">
                        Rejected ({filterApplicationsByStatus("rejected").length})
                      </TabsTrigger>
                      <TabsTrigger value="completed">
                        Completed ({filterApplicationsByStatus("completed").length})
                      </TabsTrigger>
                    </TabsList>

                    {["applied", "accepted", "rejected", "completed"].map((status) => (
                      <TabsContent key={status} value={status}>
                        <div className="space-y-4">
                          {filterApplicationsByStatus(status).length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-gray-500">No {status} applications</p>
                            </div>
                          ) : (
                            filterApplicationsByStatus(status).map((application: any) => (
                              <div key={application._id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold">
                                        {application.influencerId?.name?.charAt(0) || "I"}
                                      </span>
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{application.influencerId?.name}</h4>
                                      <p className="text-sm text-gray-600">{application.influencerId?.email}</p>
                                      <div className="mt-2">
                                        <Badge className={getStatusColor(application.status)}>
                                          {application.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-lg">₹{application.pricing.toLocaleString()}</div>
                                    <div className="text-sm text-gray-500">Proposed Price</div>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <h5 className="font-medium mb-2">Proposal</h5>
                                  <p className="text-gray-700 text-sm">{application.proposal}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                  <div className="text-sm text-gray-500">
                                    Applied on {formatDate(application.createdAt)}
                                  </div>

                                  <div className="flex space-x-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Eye className="h-4 w-4 mr-2" />
                                          View Details
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>{application.influencerId?.name}</DialogTitle>
                                          <DialogDescription>Application Details</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <div>
                                            <h4 className="font-medium mb-2">Proposal</h4>
                                            <p className="text-gray-700">{application.proposal}</p>
                                          </div>
                                          <div>
                                            <h4 className="font-medium mb-2">Proposed Price</h4>
                                            <p className="text-2xl font-bold text-green-600">
                                              ₹{application.pricing.toLocaleString()}
                                            </p>
                                          </div>
                                          <div>
                                            <h4 className="font-medium mb-2">Application Date</h4>
                                            <p className="text-gray-700">{formatDate(application.createdAt)}</p>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>

                                    {application.status === "applied" && (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => handleApplicationAction(application._id, "accept")}
                                          disabled={actionLoading === application._id}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          {actionLoading === application._id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <>
                                              <Check className="h-4 w-4 mr-2" />
                                              Accept
                                            </>
                                          )}
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => handleApplicationAction(application._id, "reject")}
                                          disabled={actionLoading === application._id}
                                        >
                                          {actionLoading === application._id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <>
                                              <X className="h-4 w-4 mr-2" />
                                              Reject
                                            </>
                                          )}
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">Select a campaign to view applications</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
