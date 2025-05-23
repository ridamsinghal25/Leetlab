import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import ProblemPage from "./pages/ProblemPage";
import HomeLayout from "./layouts/HomeLayout";
import AddProblem from "./pages/AddProblem";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./protectedRoutes/AdminRoute";
import UpdateProblem from "./pages/UpdateProblem";
import { ROUTES } from "./constants/routes";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "./pages/CollaborativeEditor";
import ActivityPage from "./pages/ActivityPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import LoggedInRoutes from "./protectedRoutes/LoggedInRoutes";
import PageLayout from "./layouts/PageLayouts";

const App = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-start  ">
      <Toaster />
      <Routes>
        <Route element={<PageLayout />}>
          {/* Logged in routes */}
          <Route element={<LoggedInRoutes />}>
            {/* Home routes */}
            <Route element={<HomeLayout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
            </Route>

            <Route path={ROUTES.PROBLEM} element={<ProblemPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

            <Route
              path={ROUTES.COLLABORATIVE_EDITOR}
              element={
                authUser ? (
                  <div>
                    <LiveblocksProvider
                      publicApiKey={
                        import.meta.env.VITE_LIVEBLOCK_EDITOR_PUBLIC_KEY
                      }
                    >
                      <RoomProvider id="my-room">
                        <ClientSideSuspense fallback={<div>Loading...</div>}>
                          <CollaborativeEditor />
                        </ClientSideSuspense>
                      </RoomProvider>
                    </LiveblocksProvider>
                  </div>
                ) : (
                  <Navigate to={ROUTES.LOGIN} />
                )
              }
            />

            <Route path={ROUTES.MY_ACTIVITIES} element={<ActivityPage />} />

            {/* Admin routes */}
            <Route element={<AdminRoute />}>
              <Route path={ROUTES.ADD_PROBLEM} element={<AddProblem />} />

              <Route path={ROUTES.UPDATE_PROBLEM} element={<UpdateProblem />} />
            </Route>
          </Route>

          <Route
            path={ROUTES.SIGNUP}
            element={!authUser ? <SignUpPage /> : <Navigate to={ROUTES.HOME} />}
          />

          <Route
            path={ROUTES.LOGIN}
            element={!authUser ? <LoginPage /> : <Navigate to={ROUTES.HOME} />}
          />
        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
