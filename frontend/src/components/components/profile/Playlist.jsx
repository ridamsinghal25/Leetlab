import { useEffect } from "react";
import { ExternalLink, BookOpen, Clock, List, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { EASY_DIFFICULTY, MEDIUM_DIFFICULTY } from "@/constants/constants";
import { ROUTES } from "@/constants/routes";
import { PlaylistShimmerUI } from "@/components/basic/ProfilePageShimmerUI/PlaylistShimmerUI";

function PlaylistProfile() {
  const {
    getAllPlayListDetailsOfUser,
    playlists,
    deletePlaylist,
    isFetchingPlaylists,
  } = usePlaylistStore();

  useEffect(() => {
    getAllPlayListDetailsOfUser();
  }, [getAllPlayListDetailsOfUser]);

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (isFetchingPlaylists) {
    return <PlaylistShimmerUI />;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">My Playlists</h2>
        <Button>Create Playlist</Button>
      </div>

      {playlists?.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium">No playlists found</h3>
            <p className="text-muted-foreground mt-2 text-center">
              Create your first playlist to organize problems!
            </p>
            <Button className="mt-4">Create Playlist</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {playlists.map((playlist) => (
              <AccordionItem
                key={playlist?.id}
                value={playlist?.id}
                className="mt-3"
              >
                <Card>
                  <CardContent className="p-0">
                    <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-2 sm:gap-4 w-full">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-base sm:text-xl font-bold truncate">
                            {playlist.name}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <List size={14} className="shrink-0" />
                              <span>{playlist?.problems?.length} problems</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="shrink-0" />
                              <span>
                                Created {formatDate(playlist.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="px-4 sm:px-6 pb-2">
                        <div className="bg-muted/40 rounded-md p-3">
                          <p className="text-sm sm:text-base">
                            {playlist.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 sm:px-6 py-4 border-t border-border">
                        <h4 className="text-base sm:text-lg font-semibold mb-3">
                          Problems in this playlist
                        </h4>

                        {playlist?.problems?.length === 0 ? (
                          <div className="bg-muted p-4 rounded-md">
                            <span className="text-sm">
                              No problems added to this playlist yet.
                            </span>
                          </div>
                        ) : (
                          <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Problem</TableHead>
                                  <TableHead>Difficulty</TableHead>
                                  <TableHead>Tags</TableHead>
                                  <TableHead className="text-right">
                                    Action
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {playlist?.problems.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                      <span className="line-clamp-1">
                                        {item.problem.title}
                                      </span>
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          item.problem.difficulty ===
                                          EASY_DIFFICULTY
                                            ? "success"
                                            : item.problem.difficulty ===
                                              MEDIUM_DIFFICULTY
                                            ? "warning"
                                            : "destructive"
                                        }
                                      >
                                        {item.problem.difficulty}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex flex-wrap gap-1">
                                        {item.problem.tags &&
                                          item.problem.tags
                                            .slice(0, 2)
                                            .map((tag, idx) => (
                                              <Badge
                                                key={idx}
                                                variant="outline"
                                                className="flex items-center gap-1"
                                              >
                                                <Tag size={10} />
                                                <span className="truncate max-w-[60px] sm:max-w-none">
                                                  {tag}
                                                </span>
                                              </Badge>
                                            ))}
                                        {item.problem.tags &&
                                          item.problem.tags.length > 2 && (
                                            <Badge variant="outline">
                                              +{item.problem.tags.length - 2}
                                            </Badge>
                                          )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                      >
                                        <a
                                          href={ROUTES.PROBLEM.replace(
                                            ":id",
                                            item.problem.id
                                          )}
                                        >
                                          <ExternalLink
                                            size={12}
                                            className="mr-1 shrink-0"
                                          />
                                          Solve
                                        </a>
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(playlist.id)}
                          >
                            Delete Playlist
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </CardContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default PlaylistProfile;
