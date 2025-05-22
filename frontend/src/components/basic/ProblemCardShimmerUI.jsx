import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProblemCardShimmerUI() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardHeader>
          <CardContent className="pb-2 flex-grow">
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from({ length: 3 }).map((_, tagIndex) => (
                <Skeleton key={tagIndex} className="h-5 w-16 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
