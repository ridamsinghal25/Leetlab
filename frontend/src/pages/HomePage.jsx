import { ProblemsShimmerUI } from "@/components/basic/HomePageShimmerUI/ShimmerUIWrapper";
import Navbar from "@/components/basic/Navbar";
import { ProblemsTable } from "@/components/problemTable/ProblemsTable";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useProblemStore } from "@/store/useProblemStore";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActions } from "@/store/useActions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreatePlaylistModal } from "@/components/modals/CreatePlaylistModal";
import { AddToPlaylistModal } from "@/components/modals/AddToPlaylistModal";
import { DIFFICULTIES_OPTIONS, PROBLEMS_PER_PAGE } from "@/constants/constants";
import { HomePageShimmerUI } from "@/components/basic/HomePageShimmerUI/HomePageShimmerUI";

const HomePage = () => {
  const {
    isProblemsLoading,
    getAllProblems,
    problems,
    deleteProblemFromState,
    getAllProblemsCount,
    problemsCount,
  } = useProblemStore();
  const { authUser } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { onDeleteProblem, isDeletingProblem } = useActions();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [selectedCompany, setSelectedCompany] = useState("ALL");
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

  const allCompanies = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const companySet = new Set();
    problems.forEach((p) => p.companies?.forEach((c) => companySet.add(c)));

    return Array.from(companySet);
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
      )
      .filter((problem) =>
        selectedCompany === "ALL"
          ? true
          : problem.companies?.includes(selectedCompany)
      );
  }, [problems, search, difficulty, selectedTag, selectedCompany]);

  useEffect(() => {
    if (!problemsCount) {
      getAllProblemsCount();
    }
  }, []);

  useEffect(() => {
    if (problemsCount) {
      setTotalPages(Math.ceil(problemsCount / PROBLEMS_PER_PAGE));
    }
  }, [problemsCount]);

  useEffect(() => {
    if (
      problems.length < currentPage * PROBLEMS_PER_PAGE &&
      problems.length !== problemsCount
    ) {
      getAllProblems(currentPage, PROBLEMS_PER_PAGE);
    }
  }, [getAllProblems, currentPage]);

  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * PROBLEMS_PER_PAGE,
      currentPage * PROBLEMS_PER_PAGE
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = async (id) => {
    await onDeleteProblem(id);

    deleteProblemFromState(id);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  if (isProblemsLoading && !problems.length) {
    return <HomePageShimmerUI />;
  }

  return (
    <div>
      <Navbar />

      <section className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-16 relative">
        <div className="max-w-4xl text-center mb-8 sm:mb-12 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to <span className="text-primary">LeetLab</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A platform inspired by LeetCode to help you prepare for coding
            interviews and improve your skills by solving challenging problems.
          </p>
        </div>

        {isProblemsLoading ? (
          <ProblemsShimmerUI />
        ) : (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
                        {diff.charAt(0).toUpperCase() +
                          diff.slice(1).toLowerCase()}
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

                {authUser?.isSubscribed && (
                  <Select
                    value={selectedCompany}
                    onValueChange={setSelectedCompany}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Companies</SelectItem>
                      {allCompanies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              {problems.length > 0 ? (
                <ProblemsTable
                  paginatedProblems={paginatedProblems}
                  authUser={authUser}
                  handleDelete={handleDelete}
                  handleAddToPlaylist={handleAddToPlaylist}
                  isDeletingProblem={isDeletingProblem}
                />
              ) : (
                <div className="mt-10 p-6 sm:p-8 border border-dashed border-primary rounded-lg text-center w-full max-w-md mx-auto">
                  <p className="text-lg font-medium text-muted-foreground">
                    No problems found. Check back later or contact an
                    administrator.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <CreatePlaylistModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        <AddToPlaylistModal
          isOpen={isAddToPlaylistModalOpen}
          onClose={() => setIsAddToPlaylistModalOpen(false)}
          problemId={selectedProblemId}
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
      </section>
    </div>
  );
};

export default HomePage;
