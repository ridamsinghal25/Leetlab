import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, ExternalLink, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProblemStore } from "@/store/useProblemStore";
import {
  DIFFICULTIES_OPTIONS,
  EASY_DIFFICULTY,
  MEDIUM_DIFFICULTY,
} from "@/constants/constants";
import { ROUTES } from "@/constants/routes";
import { ProblemSolvedShimmerUI } from "@/components/basic/ProfilePageShimmerUI/ProblemSolvedShimmerUI";
import { useAuthStore } from "@/store/useAuthStore";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProblemSolvedByUser() {
  const {
    getSolvedProblemByUser,
    solvedProblems,
    isFetchingSolvedProblems,
    totalProblems,
  } = useProblemStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser || solvedProblems.length) return;
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (solvedProblems.length / totalProblems) * 100
  );

  if (isFetchingSolvedProblems) {
    return <ProblemSolvedShimmerUI />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems Solved</h2>
      </div>

      {solvedProblems.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium">No problems solved yet</h3>
            <p className="text-muted-foreground mt-2">
              Start solving problems to see them listed here!
            </p>
            <Button className="mt-4" asChild>
              <Link to={ROUTES.HOME}>View Problems</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Progress Overview Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="w-32 h-32 flex-shrink-0">
                  <CircularProgressbar
                    value={solvedProblems.length}
                    text={`${progressPercentage}%`}
                    maxValue={totalProblems}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor:
                        progressPercentage >= 75
                          ? "#10b981"
                          : progressPercentage >= 50
                          ? "#f59e0b"
                          : "#ef4444",
                      textColor: "#374151",
                      trailColor: "#f3f4f6",
                      pathTransitionDuration: 0.5,
                    })}
                  />
                </div>
                <div className="flex flex-col items-center text-center md:text-left">
                  <h3 className="text-2xl font-bold text-green-600">
                    {solvedProblems.length} / {totalProblems}
                  </h3>
                  <p className="text-muted-foreground">Problems Completed</p>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">
                      {totalProblems - solvedProblems.length} problems remaining
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {DIFFICULTIES_OPTIONS?.map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      {
                        solvedProblems.filter((p) => p.difficulty === item)
                          .length
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Problem</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solvedProblems.map((problem) => (
                  <TableRow key={problem.id}>
                    <TableCell className="font-medium max-w-[100px] sm:max-w-[200px] truncate block">
                      {problem.title}
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
                        <CheckCircle size={12} />
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {problem.tags &&
                          problem.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Tag size={10} />
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={ROUTES.PROBLEM.replace(":id", problem.id)}>
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardFooter className="bg-muted/50 p-4">
              <div className="flex justify-between items-center w-full">
                <span className="text-sm">
                  Total problems solved:{" "}
                  <span className="font-bold">{solvedProblems.length}</span>
                </span>
                <Button size="sm" asChild>
                  <Link to={ROUTES.HOME}>Solve more problems</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}

export default ProblemSolvedByUser;
