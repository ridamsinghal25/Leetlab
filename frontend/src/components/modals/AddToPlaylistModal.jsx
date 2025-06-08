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
import { useProblemStore } from "@/store/useProblemStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectPlaylistSchema } from "@/validations/zodValidations";

export const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const {
    currentPlaylists,
    getPlayListDetails,
    addProblemToPlaylist,
    isFetchingPlaylistDetails,
    isLoading,
  } = usePlaylistStore();
  const { updateProblemsPlaylistInfoInState } = useProblemStore();

  const selectPlaylistForm = useForm({
    resolver: zodResolver(selectPlaylistSchema),
    defaultValues: {
      playlistId: "",
    },
  });

  useEffect(() => {
    if (isOpen && currentPlaylists.length === 0) {
      getPlayListDetails();
    }
  }, [isOpen, getPlayListDetails]);

  const handleSubmit = async (data) => {
    const res = await addProblemToPlaylist(data.playlistId, [problemId]);

    if (res.success) {
      const playlist = res.playlist[0];

      const playlistDetails = {
        id: playlist.playlistId,
        name: playlist.playlist.name,
      };

      updateProblemsPlaylistInfoInState(playlist.problemId, playlistDetails);
    }

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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a playlist" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isFetchingPlaylistDetails ? (
                        <SelectItem
                          key={"loading-playlist"}
                          value="__loading__"
                          disabled
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </SelectItem>
                      ) : currentPlaylists.length === 0 ? (
                        <SelectItem
                          key={"no-playlist-found"}
                          value="__empty__"
                          disabled
                        >
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
