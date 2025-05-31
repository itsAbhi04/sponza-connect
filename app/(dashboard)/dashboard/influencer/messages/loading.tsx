import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"

export default function MessagesLoading() {
  return (
    <EnhancedInfluencerLayout>
      <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat List Skeleton */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 flex items-center gap-3 border-b border-gray-100 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window Skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className="max-w-[70%] animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 animate-pulse">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </EnhancedInfluencerLayout>
  )
}
