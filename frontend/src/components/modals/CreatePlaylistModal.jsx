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
import { zodResolver } from "@hookform/resolvers/zod";
import { playlistSchema } from "@/validations/zodValidations";
import { Loader2 } from "lucide-react";
import FormFieldInput from "../basic/FormFieldInput";
import { Form } from "../ui/form";
import FormFieldTextarea from "../basic/FormFieldTextarea";
import { usePlaylistStore } from "@/store/usePlaylistStore";

export const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const { isLoading, createPlaylist } = usePlaylistStore();

  const playlistForm = useForm({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleFormSubmit = async (data) => {
    await createPlaylist(data);
    playlistForm.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[75vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Playlist
          </DialogTitle>
          <DialogDescription>
            Create a new playlist to organize your favorite problems.
          </DialogDescription>
        </DialogHeader>

        <Form {...playlistForm}>
          <form
            onSubmit={playlistForm.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormFieldInput
              form={playlistForm}
              label="Playlist Name"
              name="name"
              placeholder="Enter playlist name"
              type="text"
            />

            <FormFieldTextarea
              form={playlistForm}
              label="Playlist Description"
              name="description"
              placeholder="Enter playlist description"
              type="text"
              className="min-h-[100px]"
            />

            <DialogFooter>
              <div className="flex w-full items-center justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Playlist"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
