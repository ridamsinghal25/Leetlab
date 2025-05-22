import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EASY_DIFFICULTY, MEDIUM_DIFFICULTY } from "@/constants/constants";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ProblemCardShimmerUI } from "@/components/basic/ProblemCardShimmerUI";

export const ProblemCard = ({ problems, isFetching }) => {
  if (isFetching) {
    return <ProblemCardShimmerUI />;
  }

  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">
          No problems found in this category
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {problems.map((problem) => (
        <Link
          to={ROUTES.PROBLEM.replace(":id", problem.id)}
          key={problem.id}
          className="block transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
        >
          <Card className="h-full overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{problem.title}</CardTitle>
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
              <CardDescription className="line-clamp-2 mt-2">
                {problem.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="flex flex-wrap gap-2 mt-2">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
