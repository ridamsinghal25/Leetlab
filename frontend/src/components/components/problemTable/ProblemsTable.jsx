import { useState, useMemo } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useActions } from "../../../store/useActions";
import { usePlaylistStore } from "../../../store/usePlaylistStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePlaylistModal } from "../../modals/CreatePlaylistModal";
import { AddToPlaylistModal } from "../../modals/AddToPlaylistModal";
import { DIFFICULTIES_OPTIONS } from "@/constants/constants";
import ProblemTableMobileView from "./MobileView";
import ProblemTableDesktopView from "./DesktopView";
import { useProblemStore } from "@/store/useProblemStore";

export const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { isLoading, createPlaylist } = usePlaylistStore();
  const { deleteProblemFromState } = useProblemStore();

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
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = async (id) => {
    await onDeleteProblem(id);

    deleteProblemFromState(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <Card className="w-full max-w-6xl md:min-w-5xl mx-auto border-none shadow-lg">
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
        <ProblemTableMobileView
          paginatedProblems={paginatedProblems}
          authUser={authUser}
          handleDelete={handleDelete}
          handleAddToPlaylist={handleAddToPlaylist}
        />

        {/* Desktop Table View (hidden on small screens) */}
        <ProblemTableDesktopView
          paginatedProblems={paginatedProblems}
          authUser={authUser}
          handleDelete={handleDelete}
          handleAddToPlaylist={handleAddToPlaylist}
        />

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
        isLoading={isLoading}
      />

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </Card>
  );
};
