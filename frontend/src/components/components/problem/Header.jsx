import {
  Bookmark,
  Clock,
  ChevronRight,
  Users,
  Home,
  MemoryStickIcon as Memory,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EASY_DIFFICULTY, MEDIUM_DIFFICULTY } from "@/constants/constants";
import { ROUTES } from "@/constants/routes";

function ProblemPageHeader({ problem, submissionCount }) {
  return (
    <header className="border-b bg-card shadow-sm h-16 py-2">
      <div className="container px-2 sm:px-4 h-full">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="flex-shrink-0"
            >
              <Link to={ROUTES.HOME}>
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground hidden xs:flex" />
            <h1 className="text-sm sm:text-base md:text-xl font-bold truncate">
              {problem.title}
            </h1>

            <Badge
              className="ml-1 sm:ml-2 flex-shrink-0"
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

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Updated</span>
                <span className="truncate max-w-20 sm:max-w-none">
                  {new Date(problem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <Separator
                orientation="vertical"
                className="h-3 sm:h-4 hidden sm:block"
              />

              <div className="hidden sm:flex items-center gap-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="">{submissionCount} Submissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProblemPageHeader;
