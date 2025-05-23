import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

function ProblemSolvedByUser() {
  const { getSolvedProblemByUser, solvedProblems, isFetchingSolvedProblems } =
    useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

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
                    <TableCell className="font-medium">
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
        </>
      )}
    </div>
  );
}

export default ProblemSolvedByUser;
