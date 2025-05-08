import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Pencil,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useActions } from "../../store/useActions";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePlaylistModal } from "../modals/CreatePlaylistModal";
import { AddToPlaylistModal } from "../modals/AddToPlaylistModal";
import {
  DIFFICULTIES_OPTIONS,
  EASY_DIFFICULTY,
  MEDIUM_DIFFICULTY,
} from "@/constants/constants";

export const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border-none shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <CardTitle className="text-2xl font-bold">Problems</CardTitle>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-1 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create Playlist
        </Button>
      </CardHeader>
      <CardContent>
        {/* Filters - Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <Input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Difficulties</SelectItem>
              {DIFFICULTIES_OPTIONS.map((diff) => (
                <SelectItem key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger>
              <SelectValue placeholder="Select tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Card View (visible on small screens) */}
        <div className="block md:hidden space-y-4">
          {paginatedProblems.length > 0 ? (
            paginatedProblems.map((problem) => {
              const isSolved = problem.solvedBy.some(
                (user) => user.userId === authUser?.id
              );
              return (
                <Card key={problem.id} className="overflow-hidden">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isSolved}
                          disabled
                          className="data-[state=checked]:bg-green-900 data-[state=checked]:border-green-900"
                        />
                        <Badge
                          variant={
                            problem.difficulty === EASY_DIFFICULTY
                              ? "success"
                              : problem.difficulty === MEDIUM_DIFFICULTY
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {authUser?.role === "ADMIN" && (
                          <>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(problem.id)}
                              className="h-8 w-8"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              disabled
                              className="h-8 w-8"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/problem/${problem.id}`}
                      className="font-medium text-primary text-lg hover:underline block"
                    >
                      {problem.title}
                    </Link>

                    <div className="flex flex-wrap gap-1">
                      {(problem.tags || []).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full gap-1 mt-2"
                      onClick={() => handleAddToPlaylist(problem.id)}
                    >
                      <Bookmark className="h-4 w-4" />
                      Save to Playlist
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No problems found.
            </div>
          )}
        </div>

        {/* Desktop Table View (hidden on small screens) */}
        <div className="hidden md:block rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Solved</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProblems.length > 0 ? (
                  paginatedProblems.map((problem) => {
                    const isSolved = problem.solvedBy.some(
                      (user) => user.userId === authUser?.id
                    );
                    return (
                      <TableRow key={problem.id}>
                        <TableCell>
                          <Checkbox
                            checked={isSolved}
                            disabled
                            className="data-[state=checked]:bg-green-900 data-[state=checked]:border-green-900"
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/problem/${problem.id}`}
                            className="font-medium hover:underline text-primary"
                          >
                            {problem.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {(problem.tags || []).map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              problem.difficulty === EASY_DIFFICULTY
                                ? "success"
                                : problem.difficulty === MEDIUM_DIFFICULTY
                                ? "warning"
                                : "destructive"
                            }
                          >
                            {problem.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-row justify-end gap-2">
                            {authUser?.role === "ADMIN" && (
                              <>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(problem.id)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete problem</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="secondary" size="icon">
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit problem</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 whitespace-nowrap"
                              onClick={() => handleAddToPlaylist(problem.id)}
                            >
                              <Bookmark className="h-4 w-4" />
                              <span className="hidden lg:inline">
                                Save to Playlist
                              </span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No problems found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between sm:justify-center space-x-2 mt-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <span className="text-xs sm:text-sm">
              Page {currentPage} of {Math.max(1, totalPages)}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </Card>
  );
};
