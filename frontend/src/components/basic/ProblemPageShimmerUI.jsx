import { Skeleton } from "../ui/skeleton";

export function ProblemPageShimmer() {
  return (
    <div className="space-y-6 w-full mx-2">
      {/* Problem Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-6 w-16 bg-red-100" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="border rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          {["Description", "Submissions", "Editorial", "Hints"].map(
            (tab, index) => (
              <div
                key={index}
                className={`px-4 py-1 ${
                  index === 0 ? "border-b-2 border-gray-600" : ""
                }`}
              >
                <Skeleton className="h-10 w-28" />
              </div>
            )
          )}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Panel - Problem Description */}
          <div className="p-6 space-y-6 border-r">
            {/* Problem Statement */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Examples Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />

              {/* Example Box */}
              <div className="border rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16 bg-blue-100" />
                  <Skeleton className="h-10 w-full bg-gray-600" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-20 bg-blue-100" />
                  <Skeleton className="h-10 w-full bg-gray-600" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-28 bg-green-100" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-gray-800 p-0 min-h-[500px]">
            <div className="flex justify-between items-center p-2 border-b border-gray-700">
              <Skeleton className="h-6 w-28 bg-gray-700" />
              <Skeleton className="h-6 w-32 bg-gray-700" />
            </div>
            <div className="p-4 space-y-3">
              {[...Array(15)].map((_, index) => (
                <div key={index} className="flex">
                  <Skeleton className="h-5 w-8 bg-gray-700 mr-4" />
                  <Skeleton
                    className="h-5 bg-gray-700"
                    style={{ width: `${Math.floor(Math.random() * 70) + 30}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
