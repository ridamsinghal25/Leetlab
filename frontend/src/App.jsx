import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import ProblemPage from "./pages/ProblemPage";
import Layout from "./protectedRoutes/Layout";

import AddProblem from "./pages/AddProblem";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./protectedRoutes/AdminRoute";
import UpdateProblem from "./pages/UpdateProblem";
import { ROUTES } from "./constants/routes";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-start  ">
      <Toaster />
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to={ROUTES.LOGIN} />}
          />
        </Route>

        <Route
          path={ROUTES.SIGNUP}
          element={!authUser ? <SignUpPage /> : <Navigate to={ROUTES.HOME} />}
        />
        <Route
          path={ROUTES.LOGIN}
          element={!authUser ? <LoginPage /> : <Navigate to={ROUTES.HOME} />}
        />

        <Route
          path={ROUTES.PROBLEM}
          element={authUser ? <ProblemPage /> : <Navigate to={ROUTES.LOGIN} />}
        />
        <Route element={<AdminRoute />}>
          <Route
            path={ROUTES.ADD_PROBLEM}
            element={authUser ? <AddProblem /> : <Navigate to={ROUTES.LOGIN} />}
          />

          <Route
            path={ROUTES.UPDATE_PROBLEM}
            element={
              authUser ? <UpdateProblem /> : <Navigate to={ROUTES.LOGIN} />
            }
          />
        </Route>

        <Route
          path={ROUTES.PROFILE}
          element={authUser ? <ProfilePage /> : <Navigate to={ROUTES.LOGIN} />}
        />
      </Routes>
    </div>
  );
};

export default App;
