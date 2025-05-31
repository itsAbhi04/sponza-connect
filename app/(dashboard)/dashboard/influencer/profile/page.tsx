"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Sparkles, Instagram, Youtube, Twitter, Globe, Plus, Trash2, CheckCircle } from "lucide-react"
import { useState, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function InfluencerProfilePage() {
  const [socialLinks, setSocialLinks] = useState([
    { platform: "Instagram", username: "@sarahcreates", followers: "50K", verified: true },
    { platform: "YouTube", username: "Sarah Creates", followers: "25K", verified: false },
    { platform: "TikTok", username: "@sarahcreates", followers: "100K", verified: false },
  ])
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [completion, setCompletion] = useState(75)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddSocialProfile = () => {
    // Logic to add a new social profile (e.g., open a modal)
    alert("Add Social Profile functionality to be implemented")
  }

  const handleRemoveSocialLink = (index: number) => {
    const newSocialLinks = [...socialLinks]
    newSocialLinks.splice(index, 1)
    setSocialLinks(newSocialLinks)
  }

  const handlePortfolioItemAdd = () => {
    alert("Add Portfolio Item functionality to be implemented")
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Setup</h1>
            <p className="text-gray-600">Complete your profile to attract the right brands</p>
          </div>

          {/* Profile Completion */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Completion</CardTitle>
                <Badge className="bg-purple-100 text-purple-700">{completion}% Complete</Badge>
              </div>
              <CardDescription>Complete all sections to get discovered by more brands.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={completion} className="h-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span>Add portfolio items</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handlePortfolioItemAdd}>
                    Add Now
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span>Set your pricing</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Set Now
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span>Add social media links</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAddSocialProfile}>
                    Add Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Sections */}
          <Tabs defaultValue="basic" className="space-y-8">
            <TabsList className="grid grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Basic Info */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell brands about yourself</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Sarah Johnson" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="niche">Primary Niche</Label>
                        <Input id="niche" placeholder="Fashion, Beauty, Lifestyle" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Mumbai, India" />
                      </div>
                      <div>
                        <Label>Profile Picture</Label>
                        <div className="relative w-32 h-32 rounded-full overflow-hidden">
                          {profilePicture ? (
                            <img
                              src={profilePicture || "/placeholder.svg"}
                              alt="Profile"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-500">No Image</span>
                            </div>
                          )}
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4"
                            onClick={triggerFileInput}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            ref={fileInputRef}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Available for Collaborations</Label>
                        <p className="text-sm text-gray-500">Show brands you're open to new opportunities</p>
                      </div>
                      <Switch />
                    </div>

                    <Button className="w-full">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Media */}
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Profiles</CardTitle>
                  <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          {link.platform === "Instagram" && <Instagram className="h-6 w-6 text-pink-600" />}
                          {link.platform === "YouTube" && <Youtube className="h-6 w-6 text-red-600" />}
                          {link.platform === "TikTok" && <Globe className="h-6 w-6 text-black" />}
                          {link.platform === "Twitter" && <Twitter className="h-6 w-6 text-blue-400" />}
                          <div>
                            <h3 className="font-medium">{link.platform}</h3>
                            <p className="text-sm text-gray-600">{link.username}</p>
                            <p className="text-xs text-gray-500">{link.followers} followers</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {link.verified ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Verify
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Social Media Verification</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    To verify your {link.platform} account, please connect to our verification system.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>Connect</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveSocialLink(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full" onClick={handleAddSocialProfile}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Social Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Packages</CardTitle>
                  <CardDescription>Set your rates for different types of content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Instagram Post</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">₹</span>
                          <Input type="number" placeholder="5000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Instagram Reel</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">₹</span>
                          <Input type="number" placeholder="8000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>YouTube Video</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">₹</span>
                          <Input type="number" placeholder="15000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>TikTok Video</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">₹</span>
                          <Input type="number" placeholder="6000" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Custom Package Description</Label>
                      <Textarea
                        placeholder="Describe any custom packages or special offers..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button className="w-full">Save Pricing</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio */}
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Showcase your best work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Portfolio Item 1 */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                          <h3 className="font-medium mb-1">Summer Fashion Campaign</h3>
                          <p className="text-sm text-gray-600">Brand: Fashion Co.</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge>Instagram</Badge>
                            <Badge>Fashion</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Portfolio Item 2 */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                          <h3 className="font-medium mb-1">Beauty Product Review</h3>
                          <p className="text-sm text-gray-600">Brand: Beauty Brand</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge>YouTube</Badge>
                            <Badge>Beauty</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handlePortfolioItemAdd}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Portfolio Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
