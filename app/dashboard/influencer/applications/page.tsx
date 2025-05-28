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
import { ArrowLeft, Eye, Clock, CheckCircle, XCircle, Star, Loader2 } from "lucide-react"
import Link from "next/link"

export default function InfluencerApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/influencer/applications")
      const data = await response.json()

      if (response.ok) {
        setApplications(data.applications)
      } else {
        setError(data.error || "Failed to fetch applications")
      }
    } catch (err) {
      setError("Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "completed":
        return <Star className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
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
          <Link href="/dashboard/influencer" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-gray-600">Track your campaign applications and their status</p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Overview of all your campaign applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="applied" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="applied">Pending ({filterApplicationsByStatus("applied").length})</TabsTrigger>
                <TabsTrigger value="accepted">Accepted ({filterApplicationsByStatus("accepted").length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({filterApplicationsByStatus("rejected").length})</TabsTrigger>
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
                        {status === "applied" && (
                          <Link href="/dashboard/influencer/campaigns">
                            <Button className="mt-4">Browse Campaigns</Button>
                          </Link>
                        )}
                      </div>
                    ) : (
                      filterApplicationsByStatus(status).map((application: any) => (
                        <div key={application._id} className="border rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {getStatusIcon(application.status)}
                                <h3 className="text-lg font-semibold">{application.campaignId?.title}</h3>
                                <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                              </div>

                              <p className="text-gray-600 mb-4">
                                By {application.campaignId?.brandId?.name || "Brand"}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Your Proposal Price</span>
                                  <div className="text-xl font-bold text-green-600">
                                    ₹{application.pricing.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Campaign Budget</span>
                                  <div className="text-xl font-bold">
                                    ₹{application.campaignId?.budget?.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Applied On</span>
                                  <div className="text-lg font-medium">{formatDate(application.createdAt)}</div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Your Proposal</h4>
                                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">{application.proposal}</p>
                              </div>

                              {application.feedback && (
                                <div className="mb-4">
                                  <h4 className="font-medium mb-2">Brand Feedback</h4>
                                  <div className="bg-blue-50 p-3 rounded">
                                    {application.feedback.rating && (
                                      <div className="flex items-center mb-2">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-medium">{application.feedback.rating}/5</span>
                                      </div>
                                    )}
                                    <p className="text-sm text-gray-700">{application.feedback.comment}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="ml-6">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Campaign
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{application.campaignId?.title}</DialogTitle>
                                    <DialogDescription>Campaign Details</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Description</h4>
                                      <p className="text-gray-700">{application.campaignId?.description}</p>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">Target Platforms</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {application.campaignId?.targetPlatforms?.map((platform: string) => (
                                          <Badge key={platform} variant="outline">
                                            {platform}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">Deliverables</h4>
                                      <div className="space-y-2">
                                        {application.campaignId?.deliverables?.map(
                                          (deliverable: any, index: number) => (
                                            <div key={index} className="p-3 bg-gray-50 rounded">
                                              <div className="font-medium">
                                                {deliverable.quantity}x {deliverable.type} on {deliverable.platform}
                                              </div>
                                              <div className="text-sm text-gray-600 mt-1">
                                                {deliverable.description}
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">Timeline</h4>
                                      <p className="text-gray-700">
                                        {formatDate(application.campaignId?.timeline?.startDate)} -{" "}
                                        {formatDate(application.campaignId?.timeline?.endDate)}
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
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
      </div>
    </div>
  )
}
