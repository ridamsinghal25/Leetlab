import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { usePlaylistStore } from "@/store/usePlaylistStore";

export const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen, getAllPlaylists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[95vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add to Playlist
          </DialogTitle>
          <DialogDescription>
            Save this problem to one of your playlists for later practice.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playlist">Select Playlist</Label>
            <Select
              disabled={isLoading}
              value={selectedPlaylist}
              onValueChange={setSelectedPlaylist}
            >
              <SelectTrigger id="playlist">
                <SelectValue placeholder="Select a playlist" />
              </SelectTrigger>
              <SelectContent>
                {playlists.map((playlist) => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedPlaylist || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add to Playlist"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
