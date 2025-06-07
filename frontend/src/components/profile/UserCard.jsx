import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function ProfileCard({
  authUser,
  userInfo,
  setShowEditProfileModal,
  setShowPasswordModal,
}) {
  return (
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
                  alt={authUser?.name}
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
                  <p className="text-sm text-muted-foreground">{item.label}</p>
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
  );
}

export default ProfileCard;
