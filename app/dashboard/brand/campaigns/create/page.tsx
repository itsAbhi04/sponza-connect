"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetPlatforms: [] as string[],
    budget: "",
    deliverables: [
      {
        type: "",
        description: "",
        quantity: 1,
        platform: "",
      },
    ],
    timeline: {
      startDate: "",
      endDate: "",
    },
    requirements: [""],
    targetAudience: {
      ageRange: "",
      gender: "",
      location: [""],
      interests: [""],
    },
  })

  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"]
  const deliverableTypes = ["Post", "Story", "Reel", "Video", "Blog", "Review"]
  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55+", "All Ages"]
  const genders = ["Male", "Female", "All", "Non-binary"]

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        targetPlatforms: [...formData.targetPlatforms, platform],
      })
    } else {
      setFormData({
        ...formData,
        targetPlatforms: formData.targetPlatforms.filter((p) => p !== platform),
      })
    }
  }

  const addDeliverable = () => {
    setFormData({
      ...formData,
      deliverables: [
        ...formData.deliverables,
        {
          type: "",
          description: "",
          quantity: 1,
          platform: "",
        },
      ],
    })
  }

  const removeDeliverable = (index: number) => {
    setFormData({
      ...formData,
      deliverables: formData.deliverables.filter((_, i) => i !== index),
    })
  }

  const updateDeliverable = (index: number, field: string, value: any) => {
    const updatedDeliverables = formData.deliverables.map((deliverable, i) =>
      i === index ? { ...deliverable, [field]: value } : deliverable,
    )
    setFormData({
      ...formData,
      deliverables: updatedDeliverables,
    })
  }

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    })
  }

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    })
  }

  const updateRequirement = (index: number, value: string) => {
    const updatedRequirements = formData.requirements.map((req, i) => (i === index ? value : req))
    setFormData({
      ...formData,
      requirements: updatedRequirements,
    })
  }

  const addLocation = () => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        location: [...formData.targetAudience.location, ""],
      },
    })
  }

  const removeLocation = (index: number) => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        location: formData.targetAudience.location.filter((_, i) => i !== index),
      },
    })
  }

  const updateLocation = (index: number, value: string) => {
    const updatedLocations = formData.targetAudience.location.map((loc, i) => (i === index ? value : loc))
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        location: updatedLocations,
      },
    })
  }

  const addInterest = () => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        interests: [...formData.targetAudience.interests, ""],
      },
    })
  }

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        interests: formData.targetAudience.interests.filter((_, i) => i !== index),
      },
    })
  }

  const updateInterest = (index: number, value: string) => {
    const updatedInterests = formData.targetAudience.interests.map((interest, i) => (i === index ? value : interest))
    setFormData({
      ...formData,
      targetAudience: {
        ...formData.targetAudience,
        interests: updatedInterests,
      },
    })
  }

  const handleSubmit = async (status: "draft" | "published") => {
    try {
      setLoading(true)
      setError("")

      // Validate required fields
      if (!formData.title || !formData.description || !formData.budget) {
        setError("Please fill in all required fields")
        return
      }

      if (formData.targetPlatforms.length === 0) {
        setError("Please select at least one target platform")
        return
      }

      if (!formData.timeline.startDate || !formData.timeline.endDate) {
        setError("Please set campaign timeline")
        return
      }

      // Clean up data
      const cleanedData = {
        ...formData,
        budget: Number.parseFloat(formData.budget),
        deliverables: formData.deliverables.filter((d) => d.type && d.platform),
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        targetAudience: {
          ...formData.targetAudience,
          location: formData.targetAudience.location.filter((l) => l.trim() !== ""),
          interests: formData.targetAudience.interests.filter((i) => i.trim() !== ""),
        },
      }

      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Campaign ${status === "draft" ? "saved as draft" : "published"} successfully!`)
        setTimeout(() => {
          router.push("/dashboard/brand")
        }, 2000)
      } else {
        setError(data.error || "Failed to create campaign")
      }
    } catch (err) {
      setError("Failed to create campaign")
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-3xl font-bold mb-2">Create Campaign</h1>
          <p className="text-gray-600">Create a new influencer marketing campaign</p>
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

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Campaign title, description, and budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer Collection Launch"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  maxLength={100}
                />
                <div className="text-sm text-gray-500">{formData.title.length}/100 characters</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals, brand message, and what you're looking for in influencers..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  maxLength={2000}
                />
                <div className="text-sm text-gray-500">{formData.description.length}/2000 characters</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Campaign Budget (₹) *</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="50000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  min="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Target Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Target Platforms *</CardTitle>
              <CardDescription>Select the social media platforms for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={formData.targetPlatforms.includes(platform)}
                      onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                    />
                    <Label htmlFor={platform}>{platform}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Deliverables</CardTitle>
                  <CardDescription>Specify what content you need from influencers</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addDeliverable}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deliverable
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Deliverable {index + 1}</h4>
                      {formData.deliverables.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeDeliverable(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={deliverable.type}
                          onValueChange={(value) => updateDeliverable(index, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {deliverableTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Select
                          value={deliverable.platform}
                          onValueChange={(value) => updateDeliverable(index, "platform", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {platforms.map((platform) => (
                              <SelectItem key={platform} value={platform}>
                                {platform}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={deliverable.quantity}
                          onChange={(e) => updateDeliverable(index, "quantity", Number.parseInt(e.target.value) || 1)}
                          min="1"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Brief description"
                          value={deliverable.description}
                          onChange={(e) => updateDeliverable(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Timeline *</CardTitle>
              <CardDescription>Set the start and end dates for your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.timeline.startDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeline: { ...formData.timeline, startDate: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.timeline.endDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeline: { ...formData.timeline, endDate: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Requirements</CardTitle>
                  <CardDescription>Specify any special requirements or guidelines</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., Must include brand hashtag #YourBrand"
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                    />
                    {formData.requirements.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeRequirement(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
              <CardDescription>Define your target audience demographics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <Select
                    value={formData.targetAudience.ageRange}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        targetAudience: { ...formData.targetAudience, ageRange: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={formData.targetAudience.gender}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        targetAudience: { ...formData.targetAudience, gender: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Target Locations</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addLocation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.targetAudience.location.map((location, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="e.g., Mumbai, Delhi, Bangalore"
                        value={location}
                        onChange={(e) => updateLocation(index, e.target.value)}
                      />
                      {formData.targetAudience.location.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeLocation(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Target Interests</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addInterest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Interest
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.targetAudience.interests.map((interest, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="e.g., Fashion, Technology, Fitness"
                        value={interest}
                        onChange={(e) => updateInterest(index, e.target.value)}
                      />
                      {formData.targetAudience.interests.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeInterest(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </>
              )}
            </Button>
            <Button onClick={() => handleSubmit("published")} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Campaign"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
