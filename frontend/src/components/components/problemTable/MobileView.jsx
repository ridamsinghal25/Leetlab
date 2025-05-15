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
                    {authUser?.role === USER_ROLES.ADMIN && (
                      <>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(problem.id)}
                          className="h-8 w-8 cursor-pointer z-10"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                        <Link
                          to={ROUTES.UPDATE_PROBLEM.replace(":id", problem.id)}
                        >
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 cursor-pointer z-10"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <Link
                  to={ROUTES.PROBLEM.replace(":id", problem.id)}
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
  );
}

export default ProblemTableMobileView;
