import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import FormFieldInput from "../basic/FormFieldInput";
import { changePasswordSchema } from "@/validations/zodValidations";
import { useAuthStore } from "@/store/useAuthStore";

export default function ChangePasswordModal({ open, onOpenChange }) {
  const { isLoading, updateUserPassword } = useAuthStore();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changePasswordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data) {
    const res = await updateUserPassword(data);

    if (res?.success) {
      onOpenChange();
      changePasswordForm.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Update your password to keep your account secure.
          </DialogDescription>
        </DialogHeader>
        <Form {...changePasswordForm}>
          <form
            onSubmit={changePasswordForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="relative">
              <FormFieldInput
                form={changePasswordForm}
                label="Current Password"
                name="currentPassword"
                placeholder="Enter current password"
                type={showCurrentPassword ? "text" : "password"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-5 hover:bg-transparent hover:opacity-100"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="relative">
              <FormFieldInput
                form={changePasswordForm}
                label="New Password"
                name="newPassword"
                placeholder="Enter new password"
                type={showNewPassword ? "text" : "password"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-5 hover:bg-transparent hover:opacity-100"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="relative">
              <FormFieldInput
                form={changePasswordForm}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                type={showConfirmPassword ? "text" : "password"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-5 hover:bg-transparent hover:opacity-100"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            <DialogFooter>
              <div className="flex w-full items-center justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Changing..." : "Change Password"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
