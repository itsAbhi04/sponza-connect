"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, CreditCard, Building2, History, TrendingUp, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, AlertDialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Transaction {
  id: number
  type: string
  description: string
  date: string
  amount: number
  platform: string
}

export default function WalletPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/wallet/route")
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions || [])
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  const handleWithdrawalRequest = async () => {
    if (!withdrawalAmount || !selectedPaymentMethod) {
      toast({
        title: "Error",
        description: "Please enter withdrawal amount and select payment method.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(withdrawalAmount),
          methodId: selectedPaymentMethod,
        }),
      })

      if (response.ok) {
        toast({
          title: "Withdrawal Request Sent",
          description: `Withdrawal request of $${withdrawalAmount} sent via ${selectedPaymentMethod}.`,
        })
        setWithdrawalAmount("")
        setSelectedPaymentMethod("")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to send withdrawal request.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending withdrawal request:", error)
      toast({
        title: "Error",
        description: "Failed to send withdrawal request.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet & Earnings</h1>
            <p className="text-gray-600">Manage your earnings and withdrawals</p>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Available Balance</CardTitle>
                <CardDescription>Ready to withdraw</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$2,450.00</span>
                  <Badge className="bg-green-100 text-green-700">+$150 this week</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Pending Earnings</CardTitle>
                <CardDescription>From active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$850.00</span>
                  <Badge className="bg-yellow-100 text-yellow-700">2 campaigns</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Total Earnings</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$12,450.00</span>
                  <Badge className="bg-blue-100 text-blue-700">+24% this month</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Withdrawal Methods */}
            <div className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Withdrawal Methods</CardTitle>
                  <CardDescription>Add or manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bank Account */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">HDFC Bank</h4>
                        <p className="text-sm text-gray-500">•••• 4567</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Default</Badge>
                  </div>

                  {/* PayPal */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-gray-500">john@example.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Set Default
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add New Method
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <AlertDialogTitle>Withdraw Funds</AlertDialogTitle>
                        <DialogDescription>Enter the amount to withdraw and select a payment method.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            type="number"
                            id="amount"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="paymentMethod" className="text-right">
                            Payment Method
                          </Label>
                          <Select onValueChange={setSelectedPaymentMethod}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank">Bank Account</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleWithdrawalRequest}>Request Withdrawal</Button>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full">
                    <History className="h-4 w-4 mr-2" />
                    View Transaction History
                  </Button>
                  <Button variant="destructive" className="w-full flex items-center justify-center gap-2">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Security Check
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Transaction History */}
            <div className="lg:col-span-2">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>Your recent earnings and withdrawals</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Platform</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.type === "income" ? "Income" : "Withdrawal"}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell className="text-right">
                            {transaction.amount > 0
                              ? `+$${transaction.amount.toFixed(2)}`
                              : `-$${Math.abs(transaction.amount).toFixed(2)}`}
                          </TableCell>
                          <TableCell>{transaction.platform}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
