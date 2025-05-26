import { Link } from "react-router-dom";
import { Bookmark, Pencil, Trash } from "lucide-react";
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

function ProblemTableMobileView({
  paginatedProblems,
  authUser,
  handleDelete,
  handleAddToPlaylist,
}) {
  return (
    <div className="block md:hidden space-y-4">
      {paginatedProblems.length > 0 ? (
        paginatedProblems.map((problem) => {
          const isSolved = problem.solvedBy.some(
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
                        className="h-8 w-8"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                      <Link
                        to={ROUTES.UPDATE_PROBLEM.replace(":id", problem.id)}
                      >
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Problem title */}
                <Link
                  to={ROUTES.PROBLEM.replace(":id", problem.id)}
                  className="font-semibold text-foreground text-lg hover:text-primary transition-colors block leading-tight"
                >
                  {problem.title}
                </Link>

                {/* Companies section */}
                {problem.companies && problem.companies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span className="font-medium">Asked by:</span>
                    </div>
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
                  </div>
                )}

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
