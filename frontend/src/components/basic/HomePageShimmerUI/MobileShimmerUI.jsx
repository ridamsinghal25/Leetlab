import { ChevronLeft, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MobileShimmer() {
  return (
    <div className="min-h-screen w-screen mx-20">
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full">
          <Circle className="w-5 h-5" />
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>

        {/* Problems Section */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Create Playlist Button */}
          <Skeleton className="h-12 w-full" />

          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-52" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Problem Card */}
          <div className="mt-6 border rounded-lg overflow-hidden p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-24 bg-red-100" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-3" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>

            <Skeleton className="h-8 w-3/4 mb-4" />

            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-6 w-32 bg-amber-50 rounded-full"
                />
              ))}
            </div>

            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
