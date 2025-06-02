"use client"

import type React from "react"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface RazorpayCheckoutProps {
  orderId: string
  amount: number
  currency: string
  onSuccess: (response: any) => void
  onError: (error: any) => void
  disabled?: boolean
  children: React.ReactNode
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function RazorpayCheckout({
  orderId,
  amount,
  currency,
  onSuccess,
  onError,
  disabled = false,
  children,
}: RazorpayCheckoutProps) {
  const { toast } = useToast()

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = () => {
    if (!window.Razorpay) {
      toast({
        title: "Error",
        description: "Payment gateway not loaded. Please try again.",
        variant: "destructive",
      })
      return
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Sponza Platform",
      description: "Payment for campaign",
      order_id: orderId,
      handler: (response: any) => {
        onSuccess(response)
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#7C3AED",
      },
      modal: {
        ondismiss: () => {
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled by user",
            variant: "destructive",
          })
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on("payment.failed", (response: any) => {
      onError(response.error)
    })
    rzp.open()
  }

  return (
    <Button onClick={handlePayment} disabled={disabled}>
      {children}
    </Button>
  )
}
