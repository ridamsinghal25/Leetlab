import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PublicRoutes() {
  const { isLoggedIn, isLoginCheckDone } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginCheckDone && isLoggedIn) {
      navigate(`${ROUTES.HOME}`);
    }
  }, [isLoggedIn, isLoginCheckDone, navigate]);

  return <Outlet />;
}

export default PublicRoutes;
