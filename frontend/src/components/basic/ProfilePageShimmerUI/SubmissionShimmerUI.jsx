import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SubmissionShimmerUI() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Skeleton className="h-8 w-48" />

        <div className="flex flex-col sm:flex-row md:items-center gap-4 w-full md:w-auto">
          <Skeleton className="h-10 w-full sm:w-40" />

          {/* Submission Stats */}
          <div className="flex gap-3">
            <Card className="w-24 h-20 flex items-center justify-center shadow-sm">
              <CardContent className="p-2 flex flex-col items-center justify-center text-center">
                <Skeleton className="h-3 w-12 mb-2" />
                <Skeleton className="h-7 w-8" />
              </CardContent>
            </Card>

            <Card className="w-24 h-20 flex items-center justify-center shadow-sm">
              <CardContent className="p-2 flex flex-col items-center justify-center text-center">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-7 w-8" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="mt-3">
              <Card>
                <CardContent className="p-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {/* Code Section */}
                    <div className="px-6 py-4 border-t border-border">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <div className="relative rounded-md bg-muted p-4 overflow-x-auto">
                        <Skeleton className="h-[120px] w-full" />
                      </div>
                    </div>

                    {/* Input/Output Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 border-t border-border">
                      <div>
                        <Skeleton className="h-6 w-16 mb-2" />
                        <div className="relative rounded-md bg-muted p-4">
                          <Skeleton className="h-[80px] w-full" />
                        </div>
                      </div>

                      <div>
                        <Skeleton className="h-6 w-20 mb-2" />
                        <div className="relative rounded-md bg-muted p-4">
                          <Skeleton className="h-[80px] w-full" />
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-4 border-t border-border">
                      <Card>
                        <CardContent className="p-4 flex items-center gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-28 mb-1" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 flex items-center gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </CardContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
