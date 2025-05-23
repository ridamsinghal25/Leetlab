import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const {
    currentPlaylists,
    getPlayListDetails,
    addProblemToPlaylist,
    isLoading,
  } = usePlaylistStore();

  const selectPlaylistForm = useForm({
    defaultValues: {
      playlistId: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      getPlayListDetails();
    }
  }, [isOpen, getPlayListDetails]);

  const handleSubmit = async (data) => {
    await addProblemToPlaylist(data.playlistId, [problemId]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[75vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add to Playlist
          </DialogTitle>
          <DialogDescription>
            Save this problem to one of your playlists for later practice.
          </DialogDescription>
        </DialogHeader>

        <Form {...selectPlaylistForm}>
          <form
            onSubmit={selectPlaylistForm.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={selectPlaylistForm.control}
              name="playlistId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select playlist</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a playlist" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currentPlaylists.length === 0 ? (
                        <SelectItem key={"no-playlist-found"} disabled>
                          No playlist found
                        </SelectItem>
                      ) : (
                        currentPlaylists.map((playlist) => (
                          <SelectItem key={playlist.id} value={playlist.id}>
                            {playlist.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
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
                      Please wait...
                    </>
                  ) : (
                    "Add to Playlist"
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
