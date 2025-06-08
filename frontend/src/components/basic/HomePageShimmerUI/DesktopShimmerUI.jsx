import { Skeleton } from "@/components/ui/skeleton";

export default function DesktopShimmerUI() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="space-y-8 mb-10">
        {/* Problems Section */}
        <div className="mt-16 space-y-4 mx-8 xl:mx-28">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Search and Filters */}
          <Skeleton className="h-10 w-full" />

          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-44" />
            <Skeleton className="h-10 w-44" />
            <Skeleton className="h-10 w-44" />
          </div>

          {/* Problems Table */}
          <div className="mt-6 border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b">
              <div className="col-span-1">
                <Skeleton className="h-6 w-6" />
              </div>
              <div className="col-span-3">
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="col-span-4">
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            {/* Problem Rows */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b">
                <div className="col-span-1">
                  <Skeleton className="h-6 w-6" />
                </div>
                <div className="col-span-3">
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="col-span-4">
                  <div className="flex flex-wrap gap-2">
                    {[...Array(Math.floor(Math.random() * 3) + 1)].map(
                      (_, i) => (
                        <Skeleton key={i} className="h-6 w-24 rounded-full" />
                      )
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-2 justify-end">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
