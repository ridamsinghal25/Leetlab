import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { USER_ROLES } from "@/constants/constants";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";

const AdminRoute = () => {
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
    if (authUser.role !== USER_ROLES.ADMIN) {
      navigate(ROUTES.HOME);
    }
  }, [authUser, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminRoute;
