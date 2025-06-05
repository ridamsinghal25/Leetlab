import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuizPageShimmerUI() {
  return (
    <div className="container mx-auto px-8 py-8">
      {/* Header Card Skeleton */}
      <Card className="border shadow-lg mb-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" disabled>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Skeleton className="h-9 w-64" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="w-full text-white">
          <CardHeader className="pb-2">
            <Skeleton className="h-8 w-64 mb-2 " />
            <Skeleton className="h-4 w-48 " />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative pt-6 pb-6">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-6">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>

              {/* Chart grid lines */}
              <div className="ml-10 h-full flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-dashed h-0 w-full" />
                ))}
              </div>

              {/* Chart line shimmer */}
              <div className="absolute left-10 right-0 top-0 bottom-0 flex items-center">
                <div className="w-full h-[2px] bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 animate-pulse" />
              </div>

              {/* Data points shimmer */}
              <div className="absolute left-10 right-0 top-0 bottom-0 flex justify-between items-center py-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-3 w-3 rounded-full bg-gray-600 animate-pulse"
                  />
                ))}
              </div>

              {/* X-axis labels */}
              <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-400">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-16" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-4 w-56" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-7 w-20 mb-2" />
                    <div className="flex justify-between w-full">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
