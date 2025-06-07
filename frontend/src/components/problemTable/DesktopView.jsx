import { Link } from "react-router-dom";
import { Bookmark, Loader2, Lock, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  EASY_DIFFICULTY,
  MEDIUM_DIFFICULTY,
  USER_ROLES,
} from "@/constants/constants";
import { ROUTES } from "@/constants/routes";

function ProblemTableDesktopView({
  paginatedProblems,
  authUser,
  handleDelete,
  handleAddToPlaylist,
  isDeletingProblem,
}) {
  return (
    <div className="hidden md:block rounded-lg border overflow-hidden bg-card">
      <div className="overflow-x-auto dark:bg-black">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[60px] font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Problem</TableHead>
              <TableHead className="font-semibold">Companies</TableHead>
              <TableHead className="font-semibold">Tags</TableHead>
              <TableHead className="font-semibold">Difficulty</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );
                return (
                  <TableRow
                    key={problem.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSolved}
                        disabled
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <Link
                        to={ROUTES.PROBLEM.replace(":id", problem.id)}
                        className="px-2 py-1 rounded-md font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 max-w-[250px] truncate block"
                      >
                        {problem.title}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-sm">
                      {authUser?.isSubscribed ? (
                        <div>
                          {problem?.companies &&
                          problem?.companies.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {problem.companies
                                .slice(0, 3)
                                .map((company, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-700 border-blue-200 text-xs font-medium"
                                  >
                                    {company}
                                  </Badge>
                                ))}
                              {problem.companies.length > 3 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant="outline"
                                        className="text-xs cursor-help"
                                      >
                                        +{problem.companies.length - 3} more
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="space-y-1">
                                        {problem.companies
                                          .slice(3)
                                          .map((company, idx) => (
                                            <div key={idx} className="text-sm">
                                              {company}
                                            </div>
                                          ))}
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              No companies
                            </span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="cursor-pointer"
                                >
                                  <Lock className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-amber-600">
                                  Upgrade to pro plan to view companies
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-sm">
                      {problem.tags && problem.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {problem.tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-amber-100 text-amber-700 border-amber-200 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {problem.tags.length > 3 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="outline"
                                    className="text-xs cursor-help"
                                  >
                                    +{problem.tags.length - 3} more
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="space-y-1">
                                    {problem.tags.slice(3).map((tag, idx) => (
                                      <div key={idx} className="text-sm">
                                        {tag}
                                      </div>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No tags
                        </span>
                      )}
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
                        className="font-medium"
                      >
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-row justify-end gap-2">
                        {authUser?.role === USER_ROLES.ADMIN && (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(problem.id)}
                                    className="h-8 w-8 cursor-pointer"
                                    disabled={isDeletingProblem}
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
                                  <Link
                                    to={ROUTES.UPDATE_PROBLEM.replace(
                                      ":id",
                                      problem.id
                                    )}
                                  >
                                    <Button
                                      variant="secondary"
                                      size="icon"
                                      className="h-8 w-8 cursor-pointer"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit problem</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 whitespace-nowrap hover:bg-primary/5"
                                onClick={() => handleAddToPlaylist(problem.id)}
                              >
                                <Bookmark
                                  className={`h-4 w-4 transition-colors ${
                                    problem.problemsPlaylists?.length
                                      ? "fill-primary text-primary" // use your theme's primary
                                      : "fill-none text-muted-foreground dark:text-muted"
                                  }`}
                                />
                                <span className="hidden lg:inline">
                                  Save to Playlist
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {problem.problemsPlaylists?.length > 0 ? (
                                <div className="flex items-center gap-1 max-w-[250px]">
                                  <div className="whitespace-nowrap">
                                    Saved to
                                  </div>
                                  <div className="flex gap-0.5 min-w-0 flex-1">
                                    {problem.problemsPlaylists?.map(
                                      ({ playlist }) => (
                                        <p
                                          key={playlist.id}
                                          className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full truncate max-w-[80px]"
                                        >
                                          {playlist.name}
                                        </p>
                                      )
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <p>Save to playlist</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="text-muted-foreground text-lg">
                    No problems found.
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or search criteria.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProblemTableDesktopView;
