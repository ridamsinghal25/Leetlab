import { Skeleton } from "@/components/ui/skeleton";

export default function MobileShimmer() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8">
      {/* Content */}
      <div className="mx-auto py-8">
        {/* Problems Section */}
        <div className="mt-12 space-y-4">
          {/* Create Playlist Button */}
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Search and Filters */}

          <Skeleton className="h-12 w-full" />

          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Problem Card */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="mt-6 border rounded-lg overflow-hidden p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-24 bg-red-100" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8" />
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
          ))}
        </div>
      </div>
    </div>
  );
}
