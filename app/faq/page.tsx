import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageSquare, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about Sponza
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {/* Getting Started */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    To create an account, click the "Get Started" button in the top right corner. You'll need to provide your email address, create a password, and choose whether you're a brand or an influencer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the different account types?</AccordionTrigger>
                  <AccordionContent>
                    Sponza offers two main account types: Brand accounts for companies looking to collaborate with influencers, and Influencer accounts for content creators seeking brand partnerships.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I complete my profile?</AccordionTrigger>
                  <AccordionContent>
                    After creating your account, you'll be guided through a profile completion process. This includes adding your bio, social media links, and portfolio content.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Campaigns & Collaboration */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Campaigns & Collaboration</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I create a campaign?</AccordionTrigger>
                  <AccordionContent>
                    Brands can create campaigns by navigating to the Campaigns section and clicking "Create New Campaign." You'll need to provide campaign details, budget, and requirements.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How are payments processed?</AccordionTrigger>
                  <AccordionContent>
                    Payments are processed securely through our integrated payment system. Funds are held in escrow until campaign deliverables are completed and approved.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>What happens if a campaign is disputed?</AccordionTrigger>
                  <AccordionContent>
                    In case of disputes, our support team will review the case and mediate between the brand and influencer to reach a fair resolution.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Account & Security */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Account & Security</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-7">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Click the "Forgot Password" link on the login page. You'll receive an email with instructions to reset your password.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>How secure is my data?</AccordionTrigger>
                  <AccordionContent>
                    We use industry-standard encryption and security measures to protect your data. All sensitive information is encrypted and stored securely.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>Can I delete my account?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can delete your account from the Account Settings page. Please note that this action is permanent and cannot be undone.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle>Still Need Help?</CardTitle>
                <CardDescription>Our support team is here to assist you</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
