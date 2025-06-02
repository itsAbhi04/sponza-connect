"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { RazorpayCheckout } from "@/components/payments/razorpay-checkout"
import { EnhancedBrandLayout } from "@/components/layouts/enhanced-brand-layout"
import { CheckCircle, AlertCircle, Clock, CreditCard, Calendar, CheckCheck } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/razorpay"

interface Subscription {
  _id: string
  planType: "free" | "premium_monthly" | "premium_annual"
  status: "active" | "pending" | "cancelled" | "expired"
  startDate: string
  endDate?: string
  features: {
    maxCampaigns: number
    maxBudget: number
    analytics: string
    support: string
    verification: string
    customBranding: boolean
    apiAccess: boolean
  }
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<"premium_monthly" | "premium_annual" | null>(null)
  const [paymentOrder, setPaymentOrder] = useState<any>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/subscription")
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error)
      toast({
        title: "Error",
        description: "Failed to fetch subscription data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPlan = (plan: "premium_monthly" | "premium_annual") => {
    setSelectedPlan(plan)
  }

  const initiateSubscription = async () => {
    if (!selectedPlan) return

    try {
      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType: selectedPlan }),
      })

      if (response.ok) {
        const data = await response.json()
        setPaymentOrder(data)
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to initiate subscription",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to initiate subscription:", error)
      toast({
        title: "Error",
        description: "Failed to initiate subscription",
        variant: "destructive",
      })
    }
  }

  const handlePaymentSuccess = async (response: any) => {
    try {
      const verifyResponse = await fetch("/api/subscription/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      })

      if (verifyResponse.ok) {
        toast({
          title: "Success",
          description: "Subscription activated successfully",
        })
        setSelectedPlan(null)
        setPaymentOrder(null)
        fetchSubscription()
      } else {
        toast({
          title: "Error",
          description: "Payment verification failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment verification failed:", error)
      toast({
        title: "Error",
        description: "Payment verification failed",
        variant: "destructive",
      })
    }
  }

  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error)
    toast({
      title: "Payment Failed",
      description: error.description || "Payment failed. Please try again.",
      variant: "destructive",
    })
    setPaymentOrder(null)
  }

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Subscription cancelled successfully",
        })
        setCancelDialogOpen(false)
        fetchSubscription()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to cancel subscription",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <EnhancedBrandLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </EnhancedBrandLayout>
    )
  }

  return (
    <EnhancedBrandLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Subscription</h1>
            <p className="text-gray-600">Manage your subscription plan and billing</p>
          </div>
        </div>

        {/* Current Subscription */}
        {subscription && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription details</CardDescription>
                </div>
                {getStatusBadge(subscription.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {subscription.planType === "free"
                      ? "Free Plan"
                      : subscription.planType === "premium_monthly"
                        ? "Premium Monthly"
                        : "Premium Annual"}
                  </h3>
                  <p className="text-gray-600">
                    {subscription.planType === "free"
                      ? "Basic features for getting started"
                      : subscription.planType === "premium_monthly"
                        ? "Advanced features billed monthly"
                        : "All premium features with annual billing"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {formatDate(subscription.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Renewal Date</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {subscription.endDate ? formatDate(subscription.endDate) : "N/A"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Campaigns</p>
                      <p className="text-sm text-gray-600">
                        {subscription.features.maxCampaigns === 999
                          ? "Unlimited campaigns"
                          : `Up to ${subscription.features.maxCampaigns} campaigns`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Maximum Budget</p>
                      <p className="text-sm text-gray-600">
                        Up to ₹{(subscription.features.maxBudget / 1000).toFixed(0)}K per campaign
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-sm text-gray-600">
                        {subscription.features.analytics.charAt(0).toUpperCase() +
                          subscription.features.analytics.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-sm text-gray-600">
                        {subscription.features.support.charAt(0).toUpperCase() + subscription.features.support.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Verification</p>
                      <p className="text-sm text-gray-600">
                        {subscription.features.verification.charAt(0).toUpperCase() +
                          subscription.features.verification.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCheck
                      className={`h-5 w-5 ${
                        subscription.features.customBranding ? "text-green-600" : "text-gray-400"
                      } mr-2 mt-0.5`}
                    />
                    <div>
                      <p className="font-medium">Custom Branding</p>
                      <p className="text-sm text-gray-600">
                        {subscription.features.customBranding ? "Included" : "Not included"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCheck
                      className={`h-5 w-5 ${
                        subscription.features.apiAccess ? "text-green-600" : "text-gray-400"
                      } mr-2 mt-0.5`}
                    />
                    <div>
                      <p className="font-medium">API Access</p>
                      <p className="text-sm text-gray-600">
                        {subscription.features.apiAccess ? "Included" : "Not included"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {subscription.planType !== "free" && subscription.status === "active" && (
                <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel Subscription</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Subscription</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel your subscription? You will still have access to premium
                        features until the end of your current billing period.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                      <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                        Keep Subscription
                      </Button>
                      <Button variant="destructive" onClick={handleCancelSubscription}>
                        Cancel Subscription
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {subscription.planType === "free" && (
                <Button onClick={() => setSelectedPlan("premium_monthly")}>Upgrade Now</Button>
              )}
            </CardFooter>
          </Card>
        )}

        {/* Upgrade Plans */}
        {(!subscription ||
          subscription.planType === "free" ||
          subscription.status === "cancelled" ||
          subscription.status === "expired") && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Upgrade Your Plan</h2>
            <Tabs defaultValue="monthly" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (Save 17%)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Premium Monthly</CardTitle>
                    <CardDescription>For growing businesses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-4xl font-bold">
                      ₹2,999<span className="text-lg font-normal">/month</span>
                    </div>
                    <ul className="space-y-2">
                      {SUBSCRIPTION_PLANS.premium_monthly.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleSelectPlan("premium_monthly")}
                      disabled={selectedPlan === "premium_monthly"}
                    >
                      {selectedPlan === "premium_monthly" ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="annual" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Premium Annual</CardTitle>
                    <CardDescription>Save 17% with annual billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-4xl font-bold">
                      ₹29,999<span className="text-lg font-normal">/year</span>
                    </div>
                    <ul className="space-y-2">
                      {SUBSCRIPTION_PLANS.premium_annual.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleSelectPlan("premium_annual")}
                      disabled={selectedPlan === "premium_annual"}
                    >
                      {selectedPlan === "premium_annual" ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {selectedPlan && (
              <div className="space-y-6">
                <Alert>
                  <AlertTitle>Ready to upgrade?</AlertTitle>
                  <AlertDescription>
                    You've selected the {selectedPlan === "premium_monthly" ? "Premium Monthly" : "Premium Annual"}{" "}
                    plan. Click the button below to proceed with payment.
                  </AlertDescription>
                </Alert>

                {paymentOrder ? (
                  <RazorpayCheckout
                    orderId={paymentOrder.razorpaySubscription.id}
                    amount={
                      selectedPlan === "premium_monthly"
                        ? SUBSCRIPTION_PLANS.premium_monthly.amount
                        : SUBSCRIPTION_PLANS.premium_annual.amount
                    }
                    currency="INR"
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    subscriptionId={paymentOrder.razorpaySubscription.id}
                  >
                    <Button className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </RazorpayCheckout>
                ) : (
                  <Button className="w-full" onClick={initiateSubscription}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Payment
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </EnhancedBrandLayout>
  )
}
