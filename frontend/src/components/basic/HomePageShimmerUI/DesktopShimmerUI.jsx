import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function DesktopShimmerUI() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
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
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
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
            {[...Array(4)].map((_, index) => (
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

function HomePageShimmer({ isMobile }) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded-md mx-auto"></div>
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mx-auto"></div>
        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md mx-auto"></div>
      </div>

      {/* Problems Section */}
      <div className="mt-16 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md"></div>
        </div>

        {/* Search and Filters */}
        <div
          className={`${
            isMobile ? "flex flex-col space-y-4" : "flex items-center space-x-4"
          }`}
        >
          <div className="h-10 bg-gray-200 animate-pulse rounded-md flex-grow"></div>
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
        </div>

        {/* Problems Table */}
        <div className="mt-6 border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
            <div className="col-span-1">
              <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className="col-span-3">
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className="col-span-4">
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className="col-span-2">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className="col-span-2">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>

          {/* Problem Rows */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b">
              <div className="col-span-1">
                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
              <div className="col-span-3">
                <div className="h-6 w-full bg-gray-200 animate-pulse rounded-md"></div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-wrap gap-2">
                  {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-24 bg-gray-200 animate-pulse rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProblemPageShimmer({ isMobile }) {
  return (
    <div className="space-y-6">
      {/* Problem Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-8 w-40 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-6 w-16 bg-red-200 animate-pulse rounded-md"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="border rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          {[
            "Description",
            "Submissions",
            "Editorial",
            "Hints",
            "Code Editor",
          ].map((tab, index) => (
            <div
              key={index}
              className={`px-6 py-4 ${
                index === 0 ? "border-b-2 border-gray-800" : ""
              }`}
            >
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Panel - Problem Description */}
          <div className="p-6 space-y-6 border-r">
            {/* Problem Statement */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-4/5 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md"></div>
            </div>

            {/* Examples Section */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md"></div>

              {/* Example Box */}
              <div className="border rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                  <div className="h-5 w-16 bg-blue-200 animate-pulse rounded-md"></div>
                  <div className="h-10 w-full bg-gray-800 animate-pulse rounded-md"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-5 w-20 bg-blue-200 animate-pulse rounded-md"></div>
                  <div className="h-10 w-full bg-gray-800 animate-pulse rounded-md"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-5 w-28 bg-green-200 animate-pulse rounded-md"></div>
                  <div className="h-24 w-full bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-gray-900 p-0 min-h-[500px]">
            <div className="flex justify-between items-center p-2 border-b border-gray-700">
              <div className="h-6 w-28 bg-gray-700 animate-pulse rounded-md"></div>
              <div className="h-6 w-32 bg-gray-700 animate-pulse rounded-md"></div>
            </div>
            <div className="p-4 space-y-3">
              {[...Array(15)].map((_, index) => (
                <div key={index} className="flex">
                  <div className="h-5 w-8 bg-gray-700 animate-pulse rounded-md mr-4"></div>
                  <div
                    className="h-5 bg-gray-700 animate-pulse rounded-md"
                    style={{ width: `${Math.floor(Math.random() * 70) + 30}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
