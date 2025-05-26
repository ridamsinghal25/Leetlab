import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Skeleton } from "@/components/ui/skeleton";

function PageLayout() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="absolute inset-0 bg-opacity-80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#0e639c] rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-[#0e639c] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-[#0e639c] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <div className="text-center">
            <Skeleton className="h-4 w-48 bg-gray-600 mb-2" />
            <Skeleton className="h-3 w-32 bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default PageLayout;
