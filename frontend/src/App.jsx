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
import { axiosInstance } from "./lib/axios";
import ClientLoading from "./components/basic/CollaborativeEditorShimmerUI/ClientLoading";
import PublicRoutes from "./protectedRoutes/PublicRoutes";
import LandingPage from "./pages/LandingPage";

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
                      authEndpoint={async (room) => {
                        const response = await axiosInstance.post(
                          "/liveblock/auth",
                          {
                            room: JSON.stringify(room),
                          }
                        );

                        return JSON.parse(response.data);
                      }}
                    >
                      <RoomProvider id="my-room">
                        <ClientSideSuspense fallback={<ClientLoading />}>
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

          {/* Public routes */}
          <Route element={<PublicRoutes />}>
            <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />

            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            <Route path={ROUTES.LANDING} element={<LandingPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
