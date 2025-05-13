import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormFieldInput from "../basic/FormFieldInput";
import { uploadAvatarSchema } from "@/validations/zodValidations";
import { useAuthStore } from "@/store/useAuthStore";

export function UploadAvatarModal({ user, open, onOpenChange }) {
  const { isLoading, uploadAvatar } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(user.image?.url || null);
  const inputRef = useRef(null);

  const uploadAvatarForm = useForm({
    resolver: zodResolver(uploadAvatarSchema),
    defaultValues: {
      image: user.image || "",
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("avatar", data.image);

    const res = await uploadAvatar(formData);

    if (res?.success) {
      onOpenChange();
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);

        uploadAvatarForm.setValue(
          "image",
          ...uploadAvatarForm.getValues("image")
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const onAvatarClick = () => {
    inputRef.current.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here.
          </DialogDescription>
        </DialogHeader>
        <Form {...uploadAvatarForm}>
          <form
            onSubmit={uploadAvatarForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col items-center gap-4">
              <Avatar
                className="h-24 w-24 border-4 border-primary"
                onClick={onAvatarClick}
              >
                {imagePreview ? (
                  <AvatarImage
                    src={imagePreview || "/placeholder.svg"}
                    alt={user?.name}
                  />
                ) : (
                  <AvatarFallback className="text-3xl bg-primary/20">
                    {user.name ? user.name.charAt(0) : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <FormFieldInput
                  form={uploadAvatarForm}
                  name="image"
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
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
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
