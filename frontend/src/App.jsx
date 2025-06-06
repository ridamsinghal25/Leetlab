import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import ProblemPage from "./pages/ProblemPage";
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
import { ROOM_ID } from "./constants/constants";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import QuizPage from "./pages/QuizPage";
import NewQuizPage from "./pages/NewQuizPage";
import PricingPage from "./pages/PricingPage";
import BillingPage from "./pages/BillingPage";
import PaidUserRoutes from "./protectedRoutes/PaidUsersRoute";

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

            <Route path={ROUTES.HOME} element={<HomePage />} />

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
                      <RoomProvider id={ROOM_ID}>
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

            <Route path={ROUTES.QUIZ} element={<QuizPage />} />

            <Route element={<PaidUserRoutes />}>
              <Route path={ROUTES.NEWQUIZ} element={<NewQuizPage />} />
            </Route>

            <Route path={ROUTES.PRICING} element={<PricingPage />} />

            <Route path={ROUTES.BILLING} element={<BillingPage />} />

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

            <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />

            <Route path={ROUTES.LANDING} element={<LandingPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
