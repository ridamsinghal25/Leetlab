import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, ImageIcon, IdCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import ProblemSolvedByUser from "@/components/views/ProblemSolvedByUser";
import PlaylistProfile from "@/components/views/PlaylistProfile";
import ProfileSubmission from "@/components/views/ProfileSubmission";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { UploadAvatarModal } from "@/components/modals/UploadAvatarModal";

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
        authUser?.role === "ADMIN" ? "Full system access" : "Limited access",
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

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-center items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar
                  className="h-24 w-24 border-4 border-primary"
                  onClick={() => setShowEditProfileModal(true)}
                >
                  {authUser?.image?.url ? (
                    <AvatarImage
                      src={authUser.image?.url || "/placeholder.svg"}
                      alt={authUser.name}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl bg-primary/20">
                      {authUser?.name ? authUser.name.charAt(0) : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-background flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              {userInfo.map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium break-all">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setShowPasswordModal(true)}>
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

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
        <Tabs defaultValue="problems" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="problems">Problems Solved</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="mt-6">
            <ProblemSolvedByUser />
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <PlaylistProfile />
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <ProfileSubmission />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
