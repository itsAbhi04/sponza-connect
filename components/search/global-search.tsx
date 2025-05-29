"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface SearchResults {
  campaigns?: any[]
  influencers?: any[]
}

export function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResults>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length > 2) {
        performSearch()
      } else {
        setResults({})
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query])

  const performSearch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data)
        setIsOpen(true)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults({})
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search campaigns, influencers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-4">
            {isLoading ? (
              <div className="text-center py-4">Searching...</div>
            ) : (
              <div className="space-y-4">
                {results.campaigns && results.campaigns.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Campaigns</h3>
                    <div className="space-y-2">
                      {results.campaigns.slice(0, 3).map((campaign) => (
                        <div key={campaign._id} className="text-sm p-2 hover:bg-muted rounded">
                          <div className="font-medium">{campaign.title}</div>
                          <div className="text-muted-foreground">{campaign.brandId.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.influencers && results.influencers.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Influencers</h3>
                    <div className="space-y-2">
                      {results.influencers.slice(0, 3).map((influencer) => (
                        <div key={influencer._id} className="text-sm p-2 hover:bg-muted rounded">
                          <div className="font-medium">{influencer.userId.name}</div>
                          <div className="text-muted-foreground">{influencer.niche.join(", ")}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!results.campaigns || results.campaigns.length === 0) &&
                  (!results.influencers || results.influencers.length === 0) && (
                    <div className="text-center py-4 text-muted-foreground">No results found for "{query}"</div>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
