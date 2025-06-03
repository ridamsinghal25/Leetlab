import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import ProblemSolvedByUser from "@/components/components/profile/ProblemSolvedByUser";
import PlaylistProfile from "@/components/components/profile/Playlist";
import ProfileSubmission from "@/components/components/profile/Submission";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { UploadAvatarModal } from "@/components/modals/UploadAvatarModal";
import ProfileCard from "@/components/components/profile/UserCard";
import { USER_ROLES } from "@/constants/constants";

// Main Profile Component
export default function ProfilePage() {
  const { authUser } = useAuthStore();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const userInfo = [
    {
      label: "Name",
      value: authUser?.name,
      icon: <User className="h-5 w-5 text-primary" />,
    },
    {
      label: "Email",
      value: authUser?.email,
      icon: <Mail className="h-5 w-5 text-primary" />,
    },
    {
      label: "User ID",
      value: authUser?.id,
      icon: <IdCard className="h-5 w-5 text-primary" />,
    },
    {
      label: "Role",
      value: authUser?.role,
      icon: <Shield className="h-5 w-5 text-primary" />,
      subtext:
        authUser?.role === USER_ROLES.ADMIN
          ? "Full system access"
          : "Limited access",
    },
  ];

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  const toggleEditProfileModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  return (
    <div className="min-h-screen bg-background lg:w-3/4">
      <div className="mx-auto py-6 px-4 space-y-8">
        {/* Header with back button */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={ROUTES.HOME}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        {/* Modals */}
        <ChangePasswordModal
          open={showPasswordModal}
          onOpenChange={togglePasswordModal}
        />

        <UploadAvatarModal
          user={authUser}
          open={showEditProfileModal}
          onOpenChange={toggleEditProfileModal}
        />

        {/* Tabs for different sections */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="problems">Problems Solved</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile"
            className="mt-6 max-w-[550px] min-w-[550px] sm:max-w-none"
          >
            <ProfileCard
              authUser={authUser}
              userInfo={userInfo}
              setShowEditProfileModal={toggleEditProfileModal}
              setShowPasswordModal={togglePasswordModal}
            />
          </TabsContent>

          <TabsContent
            value="problems"
            className="mt-6 max-w-[550px] min-w-[550px] sm:max-w-none"
          >
            <ProblemSolvedByUser />
          </TabsContent>

          <TabsContent
            value="playlists"
            className="mt-6 max-w-[550px] min-w-[550px] sm:max-w-none"
          >
            <PlaylistProfile />
          </TabsContent>

          <TabsContent
            value="submissions"
            className="mt-6 max-w-[550px] min-w-[550px] sm:max-w-none"
          >
            <ProfileSubmission />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
