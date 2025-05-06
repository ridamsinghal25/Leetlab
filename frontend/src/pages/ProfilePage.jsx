import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, ImageIcon } from "lucide-react";

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

// Main Profile Component
export default function ProfilePage() {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-background lg:w-3/4">
      <div className="mx-auto py-6 px-4 space-y-8">
        {/* Header with back button */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  {authUser?.image ? (
                    <AvatarImage
                      src={authUser.image || "/placeholder.svg"}
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

              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{authUser?.name}</h2>
                <Badge variant="outline" className="mt-2">
                  {authUser?.role}
                </Badge>
              </div>

              <div className="ml-auto">
                <Button>Edit Profile</Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium break-all">{authUser?.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* User ID */}
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-medium text-xs break-all">
                      {authUser.id}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Role Status */}
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium">{authUser.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {authUser.role === "ADMIN"
                        ? "Full system access"
                        : "Limited access"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Image Status */}
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Profile Image
                    </p>
                    <p className="font-medium">
                      {authUser.image ? "Uploaded" : "Not Set"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {authUser.image
                        ? "Image available"
                        : "Upload a profile picture"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Edit Profile</Button>
              <Button>Change Password</Button>
            </div>
          </CardContent>
        </Card>

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
