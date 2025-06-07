import { useMediaQuery } from "usehooks-ts";
import { Code, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import MobileShimmer from "./MobileShimmerUI";
import DesktopShimmerUI from "./DesktopShimmerUI";

export function HomePageShimmerUI() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full">
            <Code className="w-5 h-5" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full">
          <Circle className="w-5 h-5" />
        </div>
      </header>

      {/* Welcome Section - Responsive */}
      <div
        className={`text-center space-y-4 max-w-3xl mx-auto ${
          isMobile ? "mt-8 px-4" : "mt-24"
        }`}
      >
        <Skeleton
          className={`mx-auto ${isMobile ? "h-8 w-full" : "h-16 w-3/4"}`}
        />
        <Skeleton
          className={`mx-auto ${isMobile ? "h-4 w-full" : "h-7 w-full"}`}
        />
        <Skeleton
          className={`mx-auto ${isMobile ? "h-4 w-5/6" : "h-7 w-5/6"}`}
        />
      </div>

      {/* Content Section */}
      {isMobile ? <MobileShimmer /> : <DesktopShimmerUI />}
    </div>
  );
}
