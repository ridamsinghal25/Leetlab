import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function LoggedInRoutes() {
  const { authUser, isCheckingAuth, isLoginCheckDone } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && !authUser && isLoginCheckDone) {
      navigate(`${ROUTES.LANDING}`);
    }
  }, [authUser, isCheckingAuth, navigate, isLoginCheckDone]);

  if (isLoginCheckDone) {
    return <Outlet />;
  }

  return <></>;
}

export default LoggedInRoutes;
