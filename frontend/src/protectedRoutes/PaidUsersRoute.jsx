import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";

const PaidUserRoutes = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  useEffect(() => {
    if (!authUser?.isSubscribed) {
      navigate(ROUTES.BILLING);
    }
  }, [authUser, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PaidUserRoutes;
