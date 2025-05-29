"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Target, Building } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchResult {
  campaigns: Array<{
    _id: string
    title: string
    description: string
    budget: number
    targetPlatforms: string[]
    brandId: { name: string }
  }>
  influencers: Array<{
    _id: string
    userId: {
      name: string
      profilePicture?: string
    }
    bio: string
    niche: string[]
    location: string
    averageRating: number
  }>
  brands: Array<{
    _id: string
    name: string
    email: string
    profilePicture?: string
  }>
}

interface GlobalSearchProps {
  onResultClick?: (type: string, id: string) => void
  placeholder?: string
}

export function GlobalSearch({
  onResultClick,
  placeholder = "Search campaigns, influencers, brands...",
}: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      performSearch(debouncedQuery)
    } else {
      setResults(null)
      setShowResults(false)
    }
  }, [debouncedQuery])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=5`)
      if (response.ok) {
        const data = await response.json()
        setResults(data)
        setShowResults(true)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResultClick = (type: string, id: string) => {
    setShowResults(false)
    setQuery("")
    onResultClick?.(type, id)
  }

  const getTotalResults = () => {
    if (!results) return 0
    return results.campaigns.length + results.influencers.length + results.brands.length
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results && getTotalResults() > 0) {
              setShowResults(true)
            }
          }}
          className="pl-10"
        />
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
            ) : results && getTotalResults() > 0 ? (
              <div className="divide-y">
                {/* Campaigns */}
                {results.campaigns.length > 0 && (
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Campaigns</span>
                    </div>
                    <div className="space-y-2">
                      {results.campaigns.map((campaign) => (
                        <div
                          key={campaign._id}
                          className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleResultClick("campaign", campaign._id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium line-clamp-1">{campaign.title}</p>
                              <p className="text-xs text-muted-foreground">{campaign.brandId.name}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs font-medium text-green-600">
                                  ₹{campaign.budget.toLocaleString()}
                                </span>
                                <div className="flex space-x-1">
                                  {campaign.targetPlatforms.slice(0, 2).map((platform) => (
                                    <Badge key={platform} variant="outline" className="text-xs">
                                      {platform}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Influencers */}
                {results.influencers.length > 0 && (
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Influencers</span>
                    </div>
                    <div className="space-y-2">
                      {results.influencers.map((influencer) => (
                        <div
                          key={influencer._id}
                          className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleResultClick("influencer", influencer._id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={influencer.userId.profilePicture || "/placeholder.svg"} />
                              <AvatarFallback>{influencer.userId.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{influencer.userId.name}</p>
                              <p className="text-xs text-muted-foreground">{influencer.location}</p>
                              <div className="flex space-x-1 mt-1">
                                {influencer.niche.slice(0, 2).map((niche) => (
                                  <Badge key={niche} variant="secondary" className="text-xs">
                                    {niche}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ⭐ {influencer.averageRating.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brands */}
                {results.brands.length > 0 && (
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Brands</span>
                    </div>
                    <div className="space-y-2">
                      {results.brands.map((brand) => (
                        <div
                          key={brand._id}
                          className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleResultClick("brand", brand._id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={brand.profilePicture || "/placeholder.svg"} />
                              <AvatarFallback>{brand.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{brand.name}</p>
                              <p className="text-xs text-muted-foreground">{brand.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No results found for "{query}"</div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
