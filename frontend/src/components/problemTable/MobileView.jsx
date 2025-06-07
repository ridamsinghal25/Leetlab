import { Link } from "react-router-dom";
import {
  Bookmark,
  Building2,
  Loader2,
  Lock,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  EASY_DIFFICULTY,
  MEDIUM_DIFFICULTY,
  USER_ROLES,
} from "@/constants/constants";
import { ROUTES } from "@/constants/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ProblemTableMobileView({
  paginatedProblems,
  authUser,
  handleDelete,
  handleAddToPlaylist,
  isDeletingProblem,
}) {
  return (
    <div className="block md:hidden space-y-4">
      {paginatedProblems.length > 0 ? (
        paginatedProblems?.map((problem) => {
          const isSolved = problem?.solvedBy?.some(
            (user) => user.userId === authUser?.id
          );

          return (
            <Card
              key={problem.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 space-y-4">
                {/* Header with status and actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isSolved}
                      disabled
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
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
                  </div>

                  {authUser?.role === USER_ROLES.ADMIN && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(problem.id)}
                        className="h-8 w-8 cursor-pointer"
                        disabled={isDeletingProblem}
                      >
                        {isDeletingProblem ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                      </Button>
                      <Link
                        to={ROUTES.UPDATE_PROBLEM.replace(":id", problem.id)}
                      >
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Problem title */}
                <div>
                  <Link
                    to={ROUTES.PROBLEM.replace(":id", problem.id)}
                    className="px-2 py-1 rounded-md font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 max-w-xs line-clamp-1"
                  >
                    {problem.title}
                  </Link>
                </div>
                {/* Companies section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Asked by:</span>
                  </div>
                  {authUser?.isSubscribed ? (
                    <div>
                      {problem?.companies && problem?.companies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {problem.companies.map((company, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium"
                            >
                              {company}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="ml-2">
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
                              Upgrade to pro plan
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>

                {/* Tags section */}
                {problem.tags && problem.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-medium">
                      Tags:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save to playlist button */}
                <Button
                  variant="outline"
                  className="w-full gap-2 mt-4 hover:bg-primary/5"
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
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg">
            No problems found.
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Try adjusting your filters or search criteria.
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemTableMobileView;
