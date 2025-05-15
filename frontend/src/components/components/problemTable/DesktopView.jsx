import { Link } from "react-router-dom";
import { Bookmark, Pencil, Trash } from "lucide-react";
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

function ProblemTableDesktopView({ paginatedProblems, authUser }) {
  return (
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
                        to={ROUTES.PROBLEM.replace(":id", problem.id)}
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
  );
}

export default ProblemTableDesktopView;
