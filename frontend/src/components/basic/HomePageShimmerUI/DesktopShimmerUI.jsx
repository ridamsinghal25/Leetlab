import { Skeleton } from "@/components/ui/skeleton";

export default function DesktopShimmerUI() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full">
          <Skeleton className="w-5 h-5 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8 mb-10">
        {/* Welcome Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mt-24">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-7 w-full mx-auto" />
          <Skeleton className="h-7 w-5/6 mx-auto" />
        </div>

        {/* Problems Section */}
        <div className="mt-16 space-y-4 mx-28">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
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
            {[...Array(8)].map((_, index) => (
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
                  <div className="flex items-center space-x-2">
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
