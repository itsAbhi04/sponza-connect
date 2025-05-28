"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Download, Upload, CreditCard, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"

export default function InfluencerWalletPage() {
  const [wallet, setWallet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [withdrawing, setWithdrawing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  })

  useEffect(() => {
    fetchWallet()
  }, [])

  const fetchWallet = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/wallet")
      const data = await response.json()

      if (response.ok) {
        setWallet(data.wallet)
      } else {
        setError(data.error || "Failed to fetch wallet")
      }
    } catch (err) {
      setError("Failed to fetch wallet")
    } finally {
      setLoading(false)
    }
  }

  const handleWithdrawal = async () => {
    if (
      !withdrawalData.amount ||
      !withdrawalData.accountNumber ||
      !withdrawalData.ifscCode ||
      !withdrawalData.accountHolderName
    ) {
      setError("Please fill in all withdrawal details")
      return
    }

    const amount = Number.parseFloat(withdrawalData.amount)
    if (amount < 100) {
      setError("Minimum withdrawal amount is ₹100")
      return
    }

    if (amount > wallet.balance) {
      setError("Insufficient balance")
      return
    }

    try {
      setWithdrawing(true)
      setError("")

      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          bankDetails: {
            accountNumber: withdrawalData.accountNumber,
            ifscCode: withdrawalData.ifscCode,
            accountHolderName: withdrawalData.accountHolderName,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Withdrawal request submitted successfully!")
        setWithdrawalData({
          amount: "",
          accountNumber: "",
          ifscCode: "",
          accountHolderName: "",
        })
        fetchWallet() // Refresh wallet data
      } else {
        setError(data.error || "Failed to submit withdrawal request")
      }
    } catch (err) {
      setError("Failed to submit withdrawal request")
    } finally {
      setWithdrawing(false)
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "campaign_payment":
        return <CreditCard className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <Download className="h-4 w-4 text-red-600" />
      case "referral_reward":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      default:
        return <Upload className="h-4 w-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "campaign_payment":
      case "referral_reward":
        return "text-green-600"
      case "withdrawal":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
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
          <h1 className="text-3xl font-bold mb-2">Wallet & Earnings</h1>
          <p className="text-gray-600">Manage your earnings and withdrawal requests</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Balance */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>Available for withdrawal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-4">
                    ₹{wallet?.balance?.toLocaleString() || "0"}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" disabled={!wallet?.balance || wallet.balance < 100}>
                        <Download className="h-4 w-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                          Enter your bank details to withdraw funds. Minimum withdrawal amount is ₹100.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (₹)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={withdrawalData.amount}
                            onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                            min="100"
                            max={wallet?.balance || 0}
                            disabled={withdrawing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accountHolderName">Account Holder Name</Label>
                          <Input
                            id="accountHolderName"
                            placeholder="Enter account holder name"
                            value={withdrawalData.accountHolderName}
                            onChange={(e) =>
                              setWithdrawalData({ ...withdrawalData, accountHolderName: e.target.value })
                            }
                            disabled={withdrawing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            placeholder="Enter account number"
                            value={withdrawalData.accountNumber}
                            onChange={(e) => setWithdrawalData({ ...withdrawalData, accountNumber: e.target.value })}
                            disabled={withdrawing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input
                            id="ifscCode"
                            placeholder="Enter IFSC code"
                            value={withdrawalData.ifscCode}
                            onChange={(e) =>
                              setWithdrawalData({ ...withdrawalData, ifscCode: e.target.value.toUpperCase() })
                            }
                            disabled={withdrawing}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() =>
                              setWithdrawalData({
                                amount: "",
                                accountNumber: "",
                                ifscCode: "",
                                accountHolderName: "",
                              })
                            }
                            disabled={withdrawing}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleWithdrawal} disabled={withdrawing}>
                            {withdrawing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Submit Request"
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <p className="text-sm text-gray-500 mt-4">Withdrawals are processed within 1-3 business days</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your recent earnings and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                {wallet?.transactions?.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wallet?.transactions?.map((transaction: any) => (
                      <div key={transaction._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <h4 className="font-medium">{transaction.description}</h4>
                            <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                          </div>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Summary</CardTitle>
              <CardDescription>Overview of your earnings by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₹
                    {wallet?.transactions
                      ?.filter((t: any) => t.type === "campaign_payment" && t.status === "completed")
                      ?.reduce((sum: number, t: any) => sum + t.amount, 0)
                      ?.toLocaleString() || "0"}
                  </div>
                  <p className="text-sm text-gray-600">Campaign Earnings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ₹
                    {wallet?.transactions
                      ?.filter((t: any) => t.type === "referral_reward" && t.status === "completed")
                      ?.reduce((sum: number, t: any) => sum + t.amount, 0)
                      ?.toLocaleString() || "0"}
                  </div>
                  <p className="text-sm text-gray-600">Referral Rewards</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    ₹
                    {Math.abs(
                      wallet?.transactions
                        ?.filter((t: any) => t.type === "withdrawal" && t.status === "completed")
                        ?.reduce((sum: number, t: any) => sum + t.amount, 0) || 0,
                    )?.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Withdrawn</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
