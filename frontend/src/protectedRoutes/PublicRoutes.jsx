import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PublicRoutes() {
  const { authUser, isLoginCheckDone } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginCheckDone && authUser?.id) {
      navigate(`${ROUTES.HOME}`);
    }
  }, [authUser, isLoginCheckDone, navigate]);

  return <Outlet />;
}

export default PublicRoutes;
