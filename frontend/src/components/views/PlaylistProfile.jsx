import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, ExternalLink, BookOpen, Clock, List } from "lucide-react";
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

function PlaylistProfile() {
  const { getAllPlaylists, playlists, deletePlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Easy
          </Badge>
        );
      case "MEDIUM":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Medium
          </Badge>
        );
      case "HARD":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Hard
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Playlists</h2>
        <Button>Create Playlist</Button>
      </div>

      {playlists.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium">No playlists found</h3>
            <p className="text-muted-foreground mt-2">
              Create your first playlist to organize problems!
            </p>
            <Button className="mt-4">Create Playlist</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {playlists.map((playlist) => (
              <AccordionItem key={playlist.id} value={playlist.id}>
                <Card>
                  <CardContent className="p-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold">{playlist.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <List size={14} />
                              <span>{playlist.problems.length} problems</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>
                                Created {formatDate(playlist.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="px-6 pb-2">
                        <p className="text-muted-foreground">
                          {playlist.description}
                        </p>
                      </div>

                      <div className="px-6 py-4 border-t border-border">
                        <h4 className="text-lg font-semibold mb-3">
                          Problems in this playlist
                        </h4>

                        {playlist.problems.length === 0 ? (
                          <div className="bg-muted p-4 rounded-md">
                            <span>No problems added to this playlist yet.</span>
                          </div>
                        ) : (
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
                              {playlist.problems.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell className="font-medium">
                                    {item.problem.title}
                                  </TableCell>
                                  <TableCell>
                                    {getDifficultyBadge(
                                      item.problem.difficulty
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {item.problem.tags &&
                                        item.problem.tags.map((tag, idx) => (
                                          <Badge
                                            key={idx}
                                            variant="outline"
                                            className="flex items-center gap-1"
                                          >
                                            <Tag size={10} />
                                            {tag}
                                          </Badge>
                                        ))}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="outline" size="sm" asChild>
                                      <Link
                                        href={`/problem/${item.problem.id}`}
                                      >
                                        <ExternalLink
                                          size={12}
                                          className="mr-1"
                                        />
                                        Solve
                                      </Link>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
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
